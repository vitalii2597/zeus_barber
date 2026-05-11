-- ================================================
-- Zeus Barber Shop — Supabase Setup SQL
-- Run this in Supabase SQL Editor
-- ================================================

-- 1. GALLERY IMAGES
create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  storage_path text not null,
  alt text,
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

alter table gallery_images enable row level security;

-- Public read
create policy "Public can read gallery" on gallery_images
  for select using (true);

-- Authenticated write
create policy "Authenticated can insert gallery" on gallery_images
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated can update gallery" on gallery_images
  for update using (auth.role() = 'authenticated');

create policy "Authenticated can delete gallery" on gallery_images
  for delete using (auth.role() = 'authenticated');


-- 2. SERVICES
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  duration_min integer not null default 30,
  active boolean not null default true,
  sort_order integer not null default 0
);

alter table services enable row level security;

create policy "Public can read active services" on services
  for select using (true);

create policy "Authenticated can manage services" on services
  for all using (auth.role() = 'authenticated');


-- 3. CONTENT
create table if not exists content (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  key text not null,
  value text not null default '',
  updated_at timestamptz default now(),
  unique(section, key)
);

alter table content enable row level security;

create policy "Public can read content" on content
  for select using (true);

create policy "Authenticated can manage content" on content
  for all using (auth.role() = 'authenticated');


-- 4. STORAGE BUCKET
-- Run in Supabase Dashboard → Storage → New Bucket
-- Name: gallery
-- Public: true
-- Or via SQL:
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

create policy "Public read gallery storage" on storage.objects
  for select using (bucket_id = 'gallery');

create policy "Authenticated upload gallery" on storage.objects
  for insert with check (bucket_id = 'gallery' and auth.role() = 'authenticated');

create policy "Authenticated delete gallery" on storage.objects
  for delete using (bucket_id = 'gallery' and auth.role() = 'authenticated');


-- 5. SEED — default services
insert into services (name, description, price, duration_min, active, sort_order) values
  ('Strzyżenie', 'Klasyczne strzyżenie włosów', 60, 30, true, 0),
  ('Strzyżenie + Broda', 'Strzyżenie włosów i stylizacja brody', 90, 45, true, 1),
  ('Broda', 'Przycinanie i kształtowanie brody', 50, 20, true, 2),
  ('Golenie brzytwą', 'Tradycyjne golenie brzytwą', 70, 30, true, 3),
  ('Korekta brody', 'Korekta i pielęgnacja brody', 40, 15, true, 4)
on conflict do nothing;
