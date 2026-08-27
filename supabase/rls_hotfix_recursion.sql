-- HOTFIX for the live "infinite recursion detected in policy for relation
-- user_profiles" (Postgres 42P17) bug found while testing rls_policies.sql
-- on production. This is currently breaking every authenticated read/write
-- of user_profiles for every real user, not just the test account - run
-- this immediately.
--
-- Drops the 9 policies from the first version of rls_policies.sql and
-- recreates all of them using SECURITY DEFINER helper functions instead of
-- raw self-referencing subqueries. Safe to run even if some of these
-- policies don't exist under these exact names (drop ... if exists).
-- Functionally identical end state to the corrected rls_policies.sql - this
-- file exists only because policies already live on production can't be
-- re-created with `create policy` without dropping them first.

begin;

-- ---- helper functions ----
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

-- ---- enquiries ----
drop policy if exists "admins can read enquiries" on public.enquiries;
create policy "admins can read enquiries"
  on public.enquiries for select to authenticated
  using (public.is_admin());

-- ---- guest_bookings ----
drop policy if exists "drivers can read their assigned guest bookings" on public.guest_bookings;
create policy "drivers can read their assigned guest bookings"
  on public.guest_bookings for select to authenticated
  using (driver_id = public.my_profile_id());

drop policy if exists "admins can read all guest bookings" on public.guest_bookings;
create policy "admins can read all guest bookings"
  on public.guest_bookings for select to authenticated
  using (public.is_admin());

drop policy if exists "drivers can update their assigned guest bookings" on public.guest_bookings;
create policy "drivers can update their assigned guest bookings"
  on public.guest_bookings for update to authenticated
  using (driver_id = public.my_profile_id())
  with check (driver_id = public.my_profile_id());

drop policy if exists "admins can update all guest bookings" on public.guest_bookings;
create policy "admins can update all guest bookings"
  on public.guest_bookings for update to authenticated
  using (public.is_admin());

-- ---- bookings ----
drop policy if exists "clients can create their own bookings" on public.bookings;
create policy "clients can create their own bookings"
  on public.bookings for insert to authenticated
  with check (client_id = public.my_profile_id());

drop policy if exists "clients can read their own bookings" on public.bookings;
create policy "clients can read their own bookings"
  on public.bookings for select to authenticated
  using (client_id = public.my_profile_id());

drop policy if exists "drivers can read their assigned bookings" on public.bookings;
create policy "drivers can read their assigned bookings"
  on public.bookings for select to authenticated
  using (driver_id = public.my_profile_id());

drop policy if exists "admins can read all bookings" on public.bookings;
create policy "admins can read all bookings"
  on public.bookings for select to authenticated
  using (public.is_admin());

drop policy if exists "drivers can update their assigned bookings" on public.bookings;
create policy "drivers can update their assigned bookings"
  on public.bookings for update to authenticated
  using (driver_id = public.my_profile_id())
  with check (driver_id = public.my_profile_id());

drop policy if exists "admins can update all bookings" on public.bookings;
create policy "admins can update all bookings"
  on public.bookings for update to authenticated
  using (public.is_admin());

-- ---- user_profiles (the actual source of the recursion) ----
drop policy if exists "booking counterparties can read each other's profile" on public.user_profiles;
create policy "booking counterparties can read each other's profile"
  on public.user_profiles for select to authenticated
  using (
    exists (
      select 1 from public.bookings b
      where (b.client_id = user_profiles.id or b.driver_id = user_profiles.id)
        and public.my_profile_id() in (b.client_id, b.driver_id)
    )
  );

drop policy if exists "admins can read all profiles" on public.user_profiles;
create policy "admins can read all profiles"
  on public.user_profiles for select to authenticated
  using (public.is_admin());

drop policy if exists "users can update their own profile" on public.user_profiles;
create policy "users can update their own profile"
  on public.user_profiles for update to authenticated
  using (user_id = auth.uid())
  with check (
    user_id = auth.uid()
    and role = public.my_role()
  );

-- "users can create their own profile" and "users can read their own
-- profile" are untouched - neither ever contained a self-referencing
-- subquery, so neither caused or was affected by the recursion bug.

commit;
