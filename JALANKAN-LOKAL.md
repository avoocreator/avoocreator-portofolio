# 🖥️ Panduan Jalankan Lokal (Windows / Mac / Linux)

> Versi ini **tidak memakai Prisma lagi** — error lama seperti
> `PrismaClientInitializationError` atau `@prisma/client did not initialize yet`
> tidak akan pernah muncul lagi, karena tidak ada binary/database lokal yang perlu
> di-generate. Database-nya sekarang **Supabase** (cloud, free tier).

## ✅ Cara Cepat

```powershell
npm install
npm run dev             # → buka http://localhost:3000
```

Situs langsung tampil dengan data bawaan — **tanpa database pun tetap jalan**.

## 🔌 Hubungkan Supabase (agar admin & pesanan aktif)

1. Buat project gratis di [supabase.com](https://supabase.com).
2. Dashboard → **SQL Editor** → tempel seluruh isi `supabase/schema.sql` → **Run**.
3. **Project Settings → API** → salin *Project URL* dan kunci *service_role*.
4. Buat file **`.env.local`** di root project (sejajar `package.json`):

   ```env
   SUPABASE_URL=https://<project-ref>.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<service_role-key-kamu>
   ```

5. Matikan server (Ctrl+C) lalu jalankan lagi:

   ```powershell
   npm run dev
   ```

6. Buka `http://localhost:3000/admin` → database ter-seed otomatis → login.

> 💡 Kalau env belum diisi, halaman `/admin` justru menampilkan panduan
> langkah demi langkah (dengan tombol salin) — jadi kamu tidak perlu menghafal
> urutan di atas.

## 🏗️ Build produksi di lokal (opsional)

```powershell
npm run build
npm run start      # jalankan hasil build → http://localhost:3000
```

> Catatan: `npm run build` **tidak wajib** untuk mencoba lokal, dan **tidak
> dijalankan manual saat deploy ke Vercel** — Vercel menjalankannya sendiri.

## ℹ️ Tentang warning-warning npm

| Warning | Artinya | Perlu ditindak? |
|---|---|---|
| `deprecated eslint@9.x` | Versi eslint sedikit tua | ❌ Tidak — hanya info |
| `intersection-observer polyfill` | Polyfill sudah tak perlu | ❌ Tidak dipakai kode kita |
| `recharts 2.x no longer active` | Library chart lama (warisan template) | ❌ Tidak dipakai website ini |

## 🚪 Admin & pesanan di local

- Buka `http://localhost:3000/admin` (atau klik tombol **Admin** di footer)
- Login awal: username `admin`, password `avoo2026`
- **Ganti username/password di menu Akun** setelah login pertama
- Pesanan dari popup pemesanan tersimpan di tabel `orders` di Supabase
- Semua konten yang diedit di dashboard langsung tampil di situs — tanpa restart
- Supabase gratis dan datanya tersimpan di cloud — ganti laptop pun data tetap ada

## ❓ Masih bermasalah?

| Gejala | Penyebab | Solusi |
|---|---|---|
| `/admin` menampilkan "Hubungkan Supabase dulu" | `.env.local` belum ada / belum diisi | Ikuti layar panduan itu |
| `/admin` bilang tabel belum siap padahal env sudah diisi | `schema.sql` belum di-Run | SQL Editor → tempel `supabase/schema.sql` → Run |
| Login salah terus | Password sudah pernah diganti | Reset via Supabase → Table Editor → `admin_users` (hapus baris) |
| Situs tampil tapi konten tidak bisa diedit | Kunci `service_role` salah | Salin ulang dari Project Settings → API |
