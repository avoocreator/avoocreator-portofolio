# Perbaikan & efisiensi (tampilan tidak diubah)

Hasil analisis repo `avoocreator-portofolio`. Tampilan, animasi, dan struktur data tetap sama.

## Masalah yang ditemukan → perbaikan

| # | Masalah | Dampak | Perbaikan |
|---|---|---|---|
| 1 | Setiap halaman menggantung ±7 detik (`GET / 200 in 7.6s`) | Situs terasa lambat/rusak, juga memicu error chunk saat dev | `supabase-js` terbaru otomatis mengulang GET yang gagal 3× (jeda 1+2+4 dtk). Dimatikan (`db: { retry: false }` di `lib/db.ts`); tiap permintaan diberi batas 4 dtk; kalau env Supabase kosong langsung pakai data bawaan |
| 2 | Tiap kunjungan menjalankan 3–9 query Supabase | Lambat + boros kuota | `lib/cache.ts`: cache memori 30 dtk, permintaan kembar digabung, data lama tetap dipakai kalau database error, circuit breaker 10 dtk. Admin yang menyimpan → cache langsung dibuang |
| 3 | Halaman login menampilkan "admin / avoo2026" ke semua orang; password yang sama tertulis di repo publik | Admin bisa diambil alih bila password belum diganti | Petunjuk hanya tampil di dev; akun awal bisa lewat env `ADMIN_USERNAME`/`ADMIN_PASSWORD`; panel admin menampilkan peringatan selama password bawaan masih dipakai |
| 4 | Login & pesanan tanpa pembatas | Brute-force & spam | `lib/rate-limit.ts`: login 8 gagal/10 mnt/IP, pesanan 6/10 mnt/IP (respons 429) |
| 5 | `refLink` pesanan & `link` konten menerima skema apa pun; email tidak divalidasi | Tautan `javascript:` bisa tersimpan | Validasi http(s) / email (`lib/validators.ts`) |
| 6 | Dua file maskot ±1 MB (SVG berisi PNG base64) di hero tiap halaman | LCP lambat | Dirender ke WebP ±65 KB, tampilan sama. SVG asli dipindah ke `design-source/mascot/` |
| 7 | Lapisan grain layar penuh dengan `mix-blend-mode` | Scroll berat di GPU lemah | Blend-mode dihapus (opacity disesuaikan) |
| 8 | 15 dependensi tak terpakai (mdxeditor, dnd-kit, next-intl, zustand, react-query, …) | `npm install` besar & lama (−308 paket) | Dihapus; `package-lock.json` dan `bun.lock` diperbarui |
| 9 | Peringatan `ignored package-lock.json in C:\Users\...` | Turbopack bingung menentukan root | `turbopack.root` + `outputFileTracingRoot` di `next.config.ts` |
| 10 | Tidak ada sitemap, 404 polos, tanpa security header | SEO & ketahanan | `sitemap.xml`, `robots.txt` (blokir /admin & /api), 404/500 bermerek, header keamanan dasar, cache `/assets` |

## File baru
`src/lib/cache.ts`, `src/lib/rate-limit.ts`, `src/lib/validators.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`,
`src/app/not-found.tsx`, `src/app/error.tsx`, `src/components/layout/StatusPage.tsx`,
`public/assets/mascot/*.webp`, `design-source/`, `IMPROVEMENTS.md`.
`public/robots.txt` diganti `app/robots.ts`.

## Env baru (semua opsional, lihat `.env.example`)
`ADMIN_USERNAME`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL`, `CONTENT_CACHE_TTL_MS`.

## Cara memakai
```bash
npm install
rmdir /s /q .next      # (CMD) hapus cache lama sebelum npm run dev
npm run dev
```
Di produksi isi `ADMIN_PASSWORD` **sebelum** membuka `/admin` pertama kali. Kalau akun admin sudah terlanjur dibuat
dengan password bawaan, ganti lewat menu Akun.

## Catatan & batasan
- Cache dan pembatas laju hidup di memori satu instance server. Di hosting serverless tiap instance punya sendiri
  (cache menyusul paling lama sesuai TTL; pembatas bersifat "best effort"). Untuk proteksi lintas-instance gunakan Redis/Upstash.
- Tidak diubah (saran): `ignoreBuildErrors: true` di `next.config.ts` (saat ini `tsc` bersih, bisa dimatikan agar error tipe
  tertangkap saat build), folder `.zscripts/` (sisa platform pembuat, ada `dev.pid` & PNG), `framer-motion` yang masih dipakai luas.
- Error `ChunkLoadError … framer-motion` tidak bisa direproduksi di lingkungan uji. Kemungkinan besar efek samping waktu muat 7 detik
  + cache `.next` lama; hapus `.next` lalu pantau.
