-- RLS policies for: enquiries, guest_bookings, bookings, user_profiles
--
-- Context: every DB query in this app goes through the anon key (see
-- src/lib/supabase.ts, src/lib/auth.ts) - there is no service_role key
-- anywhere in the codebase, and no API route touches Supabase. RLS is the
-- ONLY access control layer. Policies below are derived from actual query
-- patterns in the code, not assumptions - see conversation notes for the
-- file/line evidence behind each one.
--
-- REVISION 2: the first version of this file caused a live production
-- outage. Any policy on user_profiles whose USING/WITH CHECK clause ran a
-- subquery against user_profiles itself (the admin check, the
-- "counterparty can read your profile" check, and the role-is-unchanged
-- check on update) triggered Postgres error 42P17 "infinite recursion
-- detected in policy for relation user_profiles" - confirmed live via a
-- direct REST call returning HTTP 500 with that exact message, which broke
-- every authenticated user_profiles read/write, not just the RLS test
-- account. Root cause: resolving a self-referencing subquery re-invokes
-- that same table's RLS policies, which re-invokes the subquery, etc.
-- Postgres does not short-circuit this just because a different, simpler
-- policy could independently grant the needed row.
--
-- Fix (the standard Supabase-documented pattern for this): move every
-- self-referencing check into a SECURITY DEFINER function. Such a function
-- runs with the privileges of its owner, which bypasses RLS for the
-- queries inside its own body - so the lookup no longer re-triggers the
-- policy that's calling it. Applied throughout below, including in the
-- other three tables' policies, since any query against user_profiles
-- (from anywhere) still invokes user_profiles' own policies - fixing only
-- the two broken user_profiles policies fixes the root cause everywhere
-- else too, but routing every "my profile id" / "am I admin" check through
-- the same two functions is more consistent and avoids repeating the
-- subquery in nine different places.
--
-- Do not run this against production until each flow below has been
-- tested against a copy/staging project:
--   - guest checkout (bookings/new, unauthenticated)         -> guest_bookings insert
--   - contact form (contact/page.tsx, unauthenticated)       -> enquiries insert
--   - client signup -> first /dashboard visit                -> user_profiles insert
--   - client: view own bookings, create a booking            -> bookings select/insert
--   - driver: view assigned bookings (both tables)           -> bookings/guest_bookings select
--   - driver: accept / reject / mark complete                -> bookings/guest_bookings update
--   - admin: dashboard stats, bookings list, driver assign   -> all 4 tables, unrestricted select
--   - profile self-edit (profile/page.tsx)                   -> user_profiles update
--   - negative test: authenticated non-admin cannot read/write another
--     user's bookings, cannot set role='admin' on insert or update

begin;

-- ============================================================
-- Helper functions (SECURITY DEFINER - bypass RLS internally,
-- breaking the self-referencing recursion described above)
-- ============================================================

create or replace function public.my_profile_id()
returns uuid
language sql
security definer
set search_path = public
stable
as $$
  select id from public.user_profiles where user_id = auth.uid();
$$;

create or replace function public.my_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select role from public.user_profiles where user_id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.user_profiles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

-- ============================================================
-- enquiries
-- ============================================================
alter table public.enquiries enable row level security;

-- contact/page.tsx: public contact form, no auth check at all
create policy "anyone can submit an enquiry"
  on public.enquiries
  for insert
  to anon, authenticated
  with check (true);

-- No SELECT policy exists in the app today (no admin UI reads this table),
-- but an admin-only read is added defensively so this doesn't become a
-- silent dead end the moment someone builds that screen.
create policy "admins can read enquiries"
  on public.enquiries
  for select
  to authenticated
  using (public.is_admin());

-- ============================================================
-- guest_bookings
-- ============================================================
alter table public.guest_bookings enable row level security;

-- bookings/new/page.tsx: unauthenticated checkout path
create policy "anyone can create a guest booking"
  on public.guest_bookings
  for insert
  to anon, authenticated
  with check (true);

-- bookings/page.tsx driver branch: .eq('driver_id', profile.id)
create policy "drivers can read their assigned guest bookings"
  on public.guest_bookings
  for select
  to authenticated
  using (driver_id = public.my_profile_id());

-- admin/page.tsx, admin/bookings/page.tsx: unfiltered select
create policy "admins can read all guest bookings"
  on public.guest_bookings
  for select
  to authenticated
  using (public.is_admin());

-- bookings/page.tsx acceptBooking/rejectBooking/markBookingComplete: these
-- call .update(...).eq('id', bookingId) with NO driver_id filter client-side
-- - this policy is the only thing stopping a driver from touching another
-- driver's guest booking.
create policy "drivers can update their assigned guest bookings"
  on public.guest_bookings
  for update
  to authenticated
  using (driver_id = public.my_profile_id())
  with check (driver_id = public.my_profile_id());

-- admin/bookings/page.tsx: assigns driver_id on any guest booking
create policy "admins can update all guest bookings"
  on public.guest_bookings
  for update
  to authenticated
  using (public.is_admin());

-- ============================================================
-- bookings
-- ============================================================
alter table public.bookings enable row level security;

-- bookings/new/page.tsx: client_id set to the caller's own profile id
create policy "clients can create their own bookings"
  on public.bookings
  for insert
  to authenticated
  with check (client_id = public.my_profile_id());

-- bookings/page.tsx client branch: .eq('client_id', profile.id)
create policy "clients can read their own bookings"
  on public.bookings
  for select
  to authenticated
  using (client_id = public.my_profile_id());

-- bookings/page.tsx driver branch: .eq('driver_id', profile.id)
create policy "drivers can read their assigned bookings"
  on public.bookings
  for select
  to authenticated
  using (driver_id = public.my_profile_id());

-- admin/page.tsx, admin/bookings/page.tsx: unfiltered select
create policy "admins can read all bookings"
  on public.bookings
  for select
  to authenticated
  using (public.is_admin());

-- Same "no client-side driver_id filter on update" situation as guest_bookings.
-- No client-initiated update exists anywhere in the code (no cancel feature),
-- so clients get no update policy at all here - intentional, matches usage.
create policy "drivers can update their assigned bookings"
  on public.bookings
  for update
  to authenticated
  using (driver_id = public.my_profile_id())
  with check (driver_id = public.my_profile_id());

-- admin/bookings/page.tsx: assigns driver_id / updates status on any booking
create policy "admins can update all bookings"
  on public.bookings
  for update
  to authenticated
  using (public.is_admin());

-- ============================================================
-- user_profiles
-- ============================================================
alter table public.user_profiles enable row level security;

-- dashboard/page.tsx: the only insert path in the app - a client-side
-- "create my profile if it doesn't exist yet" fallback (there is no DB
-- trigger on auth.users, confirmed by the user). role comes straight from
-- auth signup metadata, which is attacker-controlled if someone calls
-- supabase.auth.signUp() directly instead of going through the app's
-- register form - so 'admin' is deliberately excluded here. This is the
-- ONLY thing preventing self-signup as an admin; it is not optional.
--
-- Note: this check does NOT need my_profile_id()/is_admin() - user_id =
-- auth.uid() is a direct comparison, not a subquery against user_profiles,
-- so it can't recurse.
create policy "users can create their own profile"
  on public.user_profiles
  for insert
  to authenticated
  with check (
    user_id = auth.uid()
    and role in ('client', 'driver')
  );

-- Every page fetches its own profile via .eq('user_id', user.id)
create policy "users can read their own profile"
  on public.user_profiles
  for select
  to authenticated
  using (user_id = auth.uid());

-- bookings/page.tsx embeds the counterparty's profile in its select():
--   client branch:  driver:user_profiles!bookings_driver_id_fkey(...)
--   driver branch:  client:user_profiles!bookings_client_id_fkey(...)
-- Without this, those joins silently return null and driver/client names
-- disappear from the booking list - not an error, just broken data.
-- Uses my_profile_id() instead of a raw self-subquery (this was one of the
-- two policies that caused the recursion bug).
create policy "booking counterparties can read each other's profile"
  on public.user_profiles
  for select
  to authenticated
  using (
    exists (
      select 1 from public.bookings b
      where (b.client_id = user_profiles.id or b.driver_id = user_profiles.id)
        and public.my_profile_id() in (b.client_id, b.driver_id)
    )
  );

-- admin/page.tsx (role='driver' filter), admin/bookings/page.tsx (client/driver
-- name joins): admin needs unrestricted profile visibility.
-- Uses is_admin() instead of a raw self-subquery (this was the other policy
-- that caused the recursion bug).
create policy "admins can read all profiles"
  on public.user_profiles
  for select
  to authenticated
  using (public.is_admin());

-- profile/page.tsx: self-edit of name/phone/dob/address/emergency contact.
-- role is pinned to its current value so an authenticated user cannot
-- grant themselves 'admin' (or 'driver') via a raw update call - the app
-- itself never attempts to change role through this path.
-- Uses my_role() instead of a raw self-subquery in WITH CHECK (this was a
-- third, update-only instance of the same recursion bug).
create policy "users can update their own profile"
  on public.user_profiles
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (
    user_id = auth.uid()
    and role = public.my_role()
  );

-- No admin update-all-profiles policy: no code path in the app updates
-- another user's profile. Add one explicitly (using is_admin(), same
-- pattern as above) if/when that becomes a real feature - don't add it
-- speculatively.

commit;
