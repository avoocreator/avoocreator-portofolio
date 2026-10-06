# Avoo Creator — Portfolio v2

Website portfolio **Avoo Creator (Avian)** — web developer, graphic designer, dan
creative technologist. Dibangun ulang dengan Next.js 16, lengkap dengan halaman
terpisah, sistem pemesanan jasa via WhatsApp, dashboard admin, toggle bahasa
ID/EN, dan integrasi CMS **Strapi** dengan fallback data bawaan.

## Fitur

- **7 halaman + admin** — Beranda, Tentang, Keahlian, Partisipasi (+detail per kategori), Proyek, Layanan, Kontak, `/admin`
- **Form pemesanan 3 langkah** — pilih jasa → detail kebutuhan → kirim: pesan rapi otomatis ke WhatsApp + pesanan tercatat di dashboard
- **Dashboard `/admin`** — daftar pesanan masuk, statistik, status koneksi Strapi
- **Toggle ID/EN** — seluruh UI & konten bilingual
- **Dark/light mode** — tema paper editorial & void studio
- **Animasi** — Framer Motion: reveal on scroll, tilt card, magnetic button, counter, marquee, parallax maskot, custom cursor
- **CMS Strapi (opsional)** — konten & pesanan lewat Strapi; tanpa Strapi situs tetap jalan dengan data bawaan (fallback otomatis)

## Teknologi

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion ·
Prisma (pesanan lokal) · Strapi REST (opsional) · simple-icons · next-themes · shadcn/ui

## Mulai Cepat

```bash
npm install
npm run dev
# buka http://localhost:3000
```

- Dashboard admin: `/admin` — passcode default `avoo2026` (ganti lewat env `ADMIN_PASSCODE`)
- Nomor WA/email placeholder: edit `src/data/site.ts`

## Deploy & CMS

Panduan lengkap 100% gratis (Vercel + Strapi di Render + Neon Postgres):
**[PANDUAN-DEPLOY.md](./PANDUAN-DEPLOY.md)**

## Struktur

```
src/
├── app/          # 7 halaman + admin + API routes
├── components/   # layout, order (modal WA), sections, ui kit
├── data/         # konten bilingual { id, en } — sumber utama
├── i18n/         # provider bahasa + dictionary
└── lib/          # strapi client, content layer, orders
```
