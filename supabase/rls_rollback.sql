-- Emergency rollback for supabase/rls_policies.sql
-- Run this if enabling RLS breaks something in production and you need to
-- restore the pre-RLS (fully open) state immediately while you investigate.
-- This does NOT drop the policies - just turns enforcement back off, so
-- re-enabling later (`alter table ... enable row level security;`) brings
-- the same policies back without rewriting them.

begin;

alter table public.enquiries disable row level security;
alter table public.guest_bookings disable row level security;
alter table public.bookings disable row level security;
alter table public.user_profiles disable row level security;

commit;
