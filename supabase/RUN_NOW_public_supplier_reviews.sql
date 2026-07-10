-- Public supplier reputation surface.
-- Allows anonymous visitors to read only approved supplier profiles, public active reviews,
-- and active supplier replies attached to those public reviews.

grant select on public.supplier_profiles to anon, authenticated;
grant select on public.reviews to anon, authenticated;
grant select on public.review_replies to anon, authenticated;

drop policy if exists "supplier_profiles_read_approved_or_related" on public.supplier_profiles;
create policy "supplier_profiles_read_approved_or_related" on public.supplier_profiles
for select to anon, authenticated
using (
  approval_status = 'approved'
  or ((select auth.uid()) is not null and user_id = (select auth.uid()))
  or public.is_admin()
);

drop policy if exists "reviews_public_and_related_read" on public.reviews;
create policy "reviews_public_and_related_read" on public.reviews
for select to anon, authenticated
using (
  (is_public = true and status = 'active')
  or ((select auth.uid()) is not null and buyer_id = (select auth.uid()))
  or public.is_admin()
  or exists (
    select 1
    from public.supplier_profiles sp
    where sp.id = supplier_id
      and sp.user_id = (select auth.uid())
  )
);

drop policy if exists "review_replies_related_read" on public.review_replies;
create policy "review_replies_related_read" on public.review_replies
for select to anon, authenticated
using (
  exists (
    select 1
    from public.reviews r
    left join public.supplier_profiles sp on sp.id = r.supplier_id
    where r.id = review_id
      and (
        (r.is_public = true and r.status = 'active' and review_replies.status = 'active')
        or r.buyer_id = (select auth.uid())
        or sp.user_id = (select auth.uid())
        or public.is_admin()
      )
  )
);
