-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard/project/fdiaoljpthlnytgedxnt/sql)

-- Projects table
create table if not exists projects (
  id bigserial primary key,
  title text not null,
  slug text unique not null,
  description text,
  year integer,
  client text,
  tags jsonb not null default '[]'::jsonb,
  cover_image text,
  images jsonb not null default '[]'::jsonb,
  "order" integer not null default 0,
  featured boolean not null default false,
  quote text,
  show_quote_on_list boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table projects enable row level security;

-- Allow all operations (admin auth is enforced at the API layer via JWT)
create policy "allow_all" on projects
  for all
  using (true)
  with check (true);

-- Auto-update updated_at on row change
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_projects_updated_at
  before update on projects
  for each row
  execute function update_updated_at();

-- Storage: create a public bucket for project images
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

-- -------------------------------------------------------
-- Kontakt submissions (contact form)
-- -------------------------------------------------------
create table if not exists kontakt_submissions (
  id bigserial primary key,
  name text not null,
  email text not null,
  projektart text,
  nachricht text not null,
  created_at timestamptz not null default now()
);

alter table kontakt_submissions enable row level security;

-- Anyone can submit (public contact form)
create policy "public_insert" on kontakt_submissions
  for insert to anon
  with check (true);

-- Only authenticated admins can read submissions
create policy "admin_select" on kontakt_submissions
  for select using (auth.role() = 'authenticated');

-- Only authenticated admins can delete submissions
create policy "admin_delete" on kontakt_submissions
  for delete using (auth.role() = 'authenticated');

-- -------------------------------------------------------
-- Storage policies
create policy "Public read images"
  on storage.objects for select
  using (bucket_id = 'project-images');

create policy "Allow image upload"
  on storage.objects for insert
  with check (bucket_id = 'project-images');

create policy "Allow image delete"
  on storage.objects for delete
  using (bucket_id = 'project-images');
