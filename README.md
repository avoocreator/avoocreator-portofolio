# Avoo Creator — Portfolio v3 (Supabase Edition)

Website portfolio **Avoo Creator (Avian)** — web developer, graphic designer, dan
creative technologist. Next.js 16 dengan **CMS admin buatan sendiri (pure dari
website)** dan **Supabase sebagai database**: semua konten situs bisa diedit lewat
dashboard `/admin` tanpa menyentuh kode sama sekali. Tanpa Strapi, tanpa Prisma,
tanpa file database lokal — konten tersimpan di cloud Supabase.

## Fitur

- **7 halaman publik** — Beranda, Tentang, Keahlian, Partisipasi (+detail per kategori), Proyek, Layanan, Kontak
- **Form pemesanan 3 langkah** — pesanan tersimpan di Supabase + pesan rapi otomatis ke WhatsApp
- **CMS Admin `/admin`** (100% buatan sendiri, bukan layanan pihak ketiga) — login username & password, lalu kelola *semua* konten:
  - Proyek, Layanan, Keahlian, Pengalaman, Partisipasi (+item), FAQ — CRUD penuh, urutan bisa diatur, bilingual ID/EN
  - Konten halaman Tentang (intro, nilai kerja, fakta, kutipan) + **foto profil**
    (unggah langsung ke Supabase Storage — rasio disarankan 4:5, minimal 800×1000 px)
  - Editor keahlian visual: **slider 0–100** + label tingkat (Pemula → Ahli) + pratinjau bar
    seperti di halaman publik — tidak perlu menebak angka
  - **Logo perangkat di Keahlian bisa dikelola** — per grup: unggah logo sendiri
    (rasio 1:1 persegi, minimal 128×128 px, PNG/WebP transparan, maks 2 MB),
    pilih ikon bawaan (±20 brand populer), atau biarkan kosong (tampil huruf awal
    nama). Marquee "alat yang dipakai" ikut mengikuti data ini otomatis.
  - Langkah kerja (cara kerja) di halaman Keahlian & Layanan
  - Pengaturan situs: tagline, WhatsApp, email, lokasi, status ketersediaan, sosial media, statistik, peran hero
  - Pesanan masuk: filter status (baru/diproses/selesai/arsip), ubah status, chat WA, hapus
  - Akun: ganti username & password kapan saja
- **Toggle ID/EN** — seluruh konten & UI bilingual
- **Dark/light mode** — tema paper editorial & void studio
- **Anti-kosong** — kalau Supabase belum terhubung / tabel masih kosong, situs publik otomatis memakai data bawaan (`src/data`); begitu halaman admin dibuka pertama kali, database ter-seed otomatis
- **Panduan setup di dalam aplikasi** — buka `/admin` tanpa env → muncul langkah-langkah koneksi Supabase (tidak perlu baca kode)

## Teknologi

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion ·
**Supabase (Postgres + REST)** · scrypt (hash password) · session cookie HMAC ·
simple-icons · next-themes · shadcn/ui

## Mulai Cepat

```bash
npm install
npm run dev
# buka http://localhost:3000
```

Situs langsung jalan dengan data bawaan. Untuk mengaktifkan admin + database:

1. Buat project gratis di [supabase.com](https://supabase.com)
2. Dashboard Supabase → **SQL Editor** → tempel seluruh isi [`supabase/schema.sql`](./supabase/schema.sql) → **Run**
   (sekalian membuat tabel + bucket penyimpanan `media` untuk unggah foto & logo perangkat)
3. **Project Settings → API** → salin *Project URL* & *service_role key*
4. Buat file `.env.local` di root proyek (sejajar `package.json`):
   ```env
   SUPABASE_URL=https://<project-ref>.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<service_role-key-kamu>
   ```
5. Restart `npm run dev` → buka `/admin` → login

Database pertama kali otomatis ter-seed (konten + akun admin) begitu halaman
admin dibuka. Tidak ada perintah migrasi, tidak ada `prisma generate`, tidak ada
binary khusus — jalan mulus di Windows, Mac, maupun Linux.

## Masuk sebagai Admin

1. Scroll ke footer situs → klik tombol **Admin** (atau buka langsung `/admin`)
2. Login dengan akun awal:
   - Username: `admin`
   - Password: `avoo2026`
3. **Segera ganti** username & password di menu **Akun** setelah login pertama.

> Catatan keamanan: password tersimpan sebagai hash scrypt (tidak pernah plaintext),
> sesi login berupa cookie httpOnly bertanda tangan HMAC yang berlaku 7 hari.
> Kunci `service_role` hanya dipakai di server (Next.js API routes) dan **tidak
> pernah** dikirim ke browser. Tabel Supabase dilindungi RLS tanpa policy —
> kredensial publik tidak bisa membaca/menulis apa pun. Jangan pernah commit
> file `.env.local` ke repository.

## Struktur

```
src/
├── app/
│   ├── admin/          # halaman admin (login + dashboard + layar setup)
│   ├── api/admin/      # API CRUD konten, pesanan, pengaturan, akun
│   ├── api/orders/     # API pesanan publik (POST) + daftar (khusus admin)
│   └── ...             # 7 halaman publik
├── components/
│   ├── admin/          # shell, form editor bilingual, panel tiap konten
│   ├── sections/       # section tiap halaman
│   └── ui/             # komponen shadcn/ui
├── data/               # data seed bawaan (fallback saat DB kosong)
├── i18n/               # provider bahasa + dictionary UI
└── lib/
    ├── db.ts           # klien Supabase (service role, server-only)
    ├── auth.ts         # hash password + session cookie
    ├── content.ts      # lapisan konten: Supabase → fallback seed
    ├── seed.ts         # pengisian data awal otomatis
    └── orders.ts       # pesanan
supabase/
└── schema.sql          # skema database — jalankan sekali di SQL Editor
```

## Deploy

Panduan lengkap (Vercel + Supabase, gratis):
**[PANDUAN-DEPLOY.md](./PANDUAN-DEPLOY.md)**

## Jalankan Lokal (troubleshooting)

**[JALANKAN-LOKAL.md](./JALANKAN-LOKAL.md)**
