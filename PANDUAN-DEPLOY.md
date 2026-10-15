# PANDUAN DEPLOY — Avoo Creator Portfolio (Next.js + Admin CMS Sendiri + Supabase)

Panduan membawa website ini dari zero sampai online — **100% gratis**, tanpa
Strapi, tanpa Prisma. Semua konten dikelola dari dashboard `/admin` bawaan situs,
database-nya **Supabase** (Postgres di cloud, free tier).

---

## Ringkasan Arsitektur

```
┌────────────────────────────────────────────┐
│  Website (Vercel / VPS / laptop lokal)     │
│  Next.js 16 + Admin CMS buatan sendiri     │
│  └── Database: Supabase (Postgres cloud)   │
│      koneksi via SUPABASE_URL +            │
│      SUPABASE_SERVICE_ROLE_KEY             │
└────────────────────────────────────────────┘
```

**Prinsip penting:** semua konten punya dua sumber — Supabase dan data bawaan di
`src/data/`. Kalau Supabase belum terhubung / tabel kosong → website publik
otomatis memakai data bawaan (tidak pernah error layaknya dulu). Halaman `/admin`
akan menampilkan panduan koneksi bila database belum siap.

---

## LANGKAH 1 — Siapkan Supabase (±5 menit, sekali saja)

1. Daftar di [supabase.com](https://supabase.com) (gratis, bisa login pakai GitHub).
2. **New project** → beri nama (mis. `avoo-portfolio`) → pilih region terdekat
   (Singapore) → buat password database (boleh disimpan di password manager).
3. Setelah project jadi, buka **SQL Editor** (ikon terminal di sidebar) →
   **New query** → tempel **seluruh isi file [`supabase/schema.sql`](./supabase/schema.sql)**
   (termasuk pembuatan bucket `media` untuk unggah foto profil & logo perangkat)
   → klik **Run**. Semua tabel (proyek, layanan, keahlian, pesanan, dst.) langsung dibuat.
4. Buka **Project Settings (⚙) → API** dan salin dua nilai:
   - **Project URL** → ini `SUPABASE_URL`
   - **service_role** secret (bagian *Project API keys*) → ini `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ Kunci `service_role` itu rahasia — jangan pernah dibagikan atau di-commit.
> Aplikasi ini memakainya hanya di server (API routes Next.js), tidak pernah
> dikirim ke browser pengunjung.

---

## LANGKAH 2 — Push kode ke GitHub

1. Pastikan file `.env.local` (berisi kunci) ada di `.gitignore` — **sudah
   dikonfigurasi**, jangan diubah.
2. Push semua kode ke repo `avoocreator-portofolio`.

---

## PILIH JALUR DEPLOY

| Jalur | Cocok untuk | Catatan |
|---|---|---|
| **A. Vercel** (disarankan) | Gratis, custom domain, auto-deploy | Env diisi di dashboard Vercel |
| **B. VPS / hosting Node** | Kendali penuh | Env diisi di `.env.local` di server |

---

## BAGIAN A — Deploy ke Vercel (±10 menit)

1. Buka [vercel.com](https://vercel.com) → login pakai GitHub.
2. *Add New… → Project* → pilih repo `avoocreator-portofolio`.
3. Sebelum klik Deploy, buka **Environment Variables** dan tambahkan:

   | Variabel | Wajib? | Isi |
   |---|---|---|
   | `SUPABASE_URL` | **Wajib** | Project URL dari Langkah 1.4 |
   | `SUPABASE_SERVICE_ROLE_KEY` | **Wajib** | service_role key dari Langkah 1.4 |

4. Klik **Deploy** — selesai. Setiap push ke GitHub = auto-deploy.
5. Buka `https://situsmu.vercel.app` → situs tampil. Buka `/admin` → database
   ter-seed otomatis → login `admin / avoo2026` → **segera ganti password**.

### Domain sendiri (opsional)
Vercel → *Settings → Domains* → tambahkan domainmu, ikuti instruksi DNS.
Setelah domain aktif, update `metadataBase` di `src/app/layout.tsx` agar
pratinjau link sosial media memakai domain barumu.

### Tips unggahan gambar dari dashboard

| Media | Rasio | Ukuran disarankan | Batas file |
|---|---|---|---|
| Foto profil (Tentang) | 4:5 potret | min. 800×1000 px | 5 MB |
| Logo perangkat (Keahlian) | 1:1 persegi | min. 128×128 px | 2 MB |

Keduanya diunggah ke bucket `media` Supabase Storage otomatis saat kamu
menekan tombol unggah di dashboard — tanpa setup tambahan.

---

## BAGIAN B — VPS / Hosting Node

1. Upload kode ke server (git clone), pastikan Node.js 20+ terpasang.
2. Buat file `.env.local` di folder proyek:
   ```env
   SUPABASE_URL=https://<project-ref>.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<service_role-key-kamu>
   ```
3. Jalankan:
   ```bash
   npm install
   npm run build
   npm run start          # port 3000
   ```
4. Jalankan permanen dengan `pm2`:
   ```bash
   pm2 start npm --name avoo-portfolio -- run start
   pm2 save
   ```
5. Pasang reverse proxy (Nginx/Caddy) ke port 3000 + SSL (mis. `certbot`).
6. Login `/admin` → ganti password → kelola konten.

> Backup: data ada di Supabase (cloud) — gunakan fitur **Backups** di dashboard
> Supabase (atau *Database → Backups* pada paid plan; free tier cukup dengan
> SQL Editor → export berkala).

---

## Environment Variables

| Variabel | Lokal | Vercel | VPS |
|---|---|---|---|
| `SUPABASE_URL` | `.env.local` | Environment Variables | `.env.local` |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env.local` | Environment Variables | `.env.local` |

Tidak ada variabel lain yang wajib. Secret session admin dibuat & disimpan
otomatis di tabel `settings` Supabase saat login pertama.

---

## FAQ

**Q: Apakah konten hilang kalau database di-reset?**
Tidak. Situs publik kembali menampilkan data bawaan (`src/data`). Begitu kamu
login admin lagi, database ter-seed ulang dari data bawaan dan bisa diedit dari awal.

**Q: Apakah error dulu (`PrismaClientInitializationError`) bisa terulang?**
Tidak. Versi ini tidak memakai Prisma dan tidak menyimpan file database di
komputermu. Koneksi ke Supabase murni HTTP — tidak ada binary yang perlu
di-generate, tidak ada file `.db` yang bisa korup. Kalau env salah/empyty,
situs tetap jalan (data bawaan) dan `/admin` menampilkan panduan koneksi.

**Q: Bisa upload gambar lewat admin?**
Saat ini konten berupa teks; logo perangkat & foto profil bisa diunggah langsung
dari dashboard (Supabase Storage). Maskot & ikon layanan masih berupa file di
`public/`.

**Q: Bagaimana cara reset password admin kalau lupa?**
Buka Supabase → **Table Editor → admin_users** → hapus semua baris → buka
kembali `/admin` → sistem membuat ulang akun awal `admin / avoo2026`.
Segera ganti lagi setelah masuk.

**Q: Apakah aman kalau project URL (anon) bocor?**
Aman. Tabel dilindungi **Row Level Security tanpa policy** — kredensial publik
tidak bisa membaca/menulis apa pun. Hanya permintaan dengan kunci `service_role`
(yang hanya ada di servermu) yang bisa mengakses data.
