-- ============================================================
-- AVOO CREATOR PORTFOLIO — SKEMA DATABASE SUPABASE
--
-- Cara pakai (sekali saja, ±2 menit):
--   1. Buka https://supabase.com → buat project (atau pakai yang ada)
--   2. Dashboard project → SQL Editor → New query
--   3. Tempel SELURUH isi file ini → klik Run
--   4. Ambil SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY di
--      Project Settings → API, lalu isi .env.local (lihat .env.example)
--
-- File ini aman dijalankan berulang (idempotent).
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- Pengaturan situs (key-value JSON) ----------
create table if not exists public.settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

-- ---------- Akun admin (login halaman /admin) ----------
create table if not exists public.admin_users (
  id            uuid primary key default gen_random_uuid(),
  username      text not null unique,
  password_hash text not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ---------- Proyek ----------
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  number      text not null,
  title       jsonb not null,
  category    jsonb not null,
  description jsonb not null,
  tags        jsonb not null default '[]'::jsonb,
  status      text not null default 'konsep',
  year        text,
  link        text,
  sort_order  int  not null default 0,
  updated_at  timestamptz not null default now()
);
create index if not exists projects_sort_idx on public.projects (sort_order);

-- ---------- Layanan ----------
create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  number      text not null,
  slug        text not null unique,
  title       jsonb not null,
  description jsonb not null,
  outputs     jsonb not null default '[]'::jsonb,
  icon        text not null default 'code',
  duration    jsonb,
  sort_order  int  not null default 0,
  updated_at  timestamptz not null default now()
);
create index if not exists services_sort_idx on public.services (sort_order);

-- ---------- Kelompok keahlian ----------
create table if not exists public.expertise_groups (
  id               uuid primary key default gen_random_uuid(),
  group_id         text not null unique,
  title            jsonb not null,
  description      jsonb not null,
  long_description jsonb not null,
  skills           jsonb not null default '[]'::jsonb,
  tools            jsonb not null default '[]'::jsonb,
  sort_order       int  not null default 0,
  updated_at       timestamptz not null default now()
);
create index if not exists expertise_sort_idx on public.expertise_groups (sort_order);

-- ---------- Pengalaman ----------
create table if not exists public.experience_items (
  id          uuid primary key default gen_random_uuid(),
  year        text not null,
  title       jsonb not null,
  role        jsonb not null,
  description jsonb not null,
  category    jsonb not null,
  highlight   boolean not null default false,
  sort_order  int  not null default 0,
  updated_at  timestamptz not null default now()
);
create index if not exists experience_sort_idx on public.experience_items (sort_order);

-- ---------- Kategori partisipasi ----------
create table if not exists public.participation_categories (
  id          uuid primary key default gen_random_uuid(),
  cat_id      text not null unique,
  number      text not null,
  title       jsonb not null,
  description jsonb not null,
  items       jsonb not null default '[]'::jsonb,
  sort_order  int  not null default 0,
  updated_at  timestamptz not null default now()
);
create index if not exists participation_sort_idx on public.participation_categories (sort_order);

-- ---------- FAQ ----------
create table if not exists public.faq_items (
  id         uuid primary key default gen_random_uuid(),
  q          jsonb not null,
  a          jsonb not null,
  sort_order int  not null default 0,
  updated_at timestamptz not null default now()
);
create index if not exists faq_sort_idx on public.faq_items (sort_order);

-- ---------- Konten halaman Tentang (satu baris, id = 'about') ----------
create table if not exists public.about_content (
  id           text primary key default 'about',
  intro        jsonb not null default '[]'::jsonb,
  values_json  jsonb not null default '[]'::jsonb,
  facts        jsonb not null default '[]'::jsonb,
  quote_text   jsonb not null,
  quote_author text not null default '',
  photo_url    text not null default '',
  photo_alt    jsonb not null default '{"id":"","en":""}'::jsonb,
  updated_at   timestamptz not null default now()
);
-- Kompatibel database lama (tabel sudah ada sebelum fitur foto):
alter table public.about_content add column if not exists photo_url text not null default '';
alter table public.about_content add column if not exists photo_alt jsonb not null default '{"id":"","en":""}'::jsonb;

-- ---------- Pesanan jasa (form pemesanan) ----------
create table if not exists public.orders (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null,
  email      text,
  service    text not null,
  message    text not null,
  budget     text,
  deadline   text,
  ref_link   text,
  locale     text not null default 'id',
  status     text not null default 'baru',
  created_at timestamptz not null default now()
);
create index if not exists orders_created_idx on public.orders (created_at desc);

-- ============================================================
-- KEAMANAN
-- RLS diaktifkan TANPA policy → role anon/authenticated
-- (kredensial publik Supabase) tidak bisa membaca/menulis apa pun.
-- Aplikasi ini selalu memakai SUPABASE_SERVICE_ROLE_KEY di sisi
-- server (Next.js), yang otomatis melewati RLS.
-- Jangan tambahkan policy kecuali kamu tahu apa yang kamu lakukan.
-- ============================================================
alter table public.settings                 enable row level security;
alter table public.admin_users              enable row level security;
alter table public.projects                 enable row level security;
alter table public.services                 enable row level security;
alter table public.expertise_groups         enable row level security;
alter table public.experience_items         enable row level security;
alter table public.participation_categories enable row level security;
alter table public.faq_items                enable row level security;
alter table public.about_content            enable row level security;
alter table public.orders                   enable row level security;

-- ============================================================
-- STORAGE MEDIA (foto profil & gambar lain dari dashboard)
-- Bucket publik "media" — unggahan dilakukan lewat /api/admin/upload
-- memakai service_role (server), sehingga tidak perlu policy tambahan.
-- URL publik berbentuk:
--   <SUPABASE_URL>/storage/v1/object/public/media/<path>
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;
