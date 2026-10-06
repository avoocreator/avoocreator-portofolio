# PANDUAN DEPLOY — Avoo Creator Portfolio (Next.js + Strapi)

Panduan lengkap membawa website ini dari zero sampai online — **100% gratis**.

---

## Ringkasan Arsitektur

```
┌─────────────────────────┐        ┌──────────────────────────┐
│  Website (Vercel)       │  REST  │  Strapi CMS (Render)     │
│  Next.js 16             │ ─────► │  + PostgreSQL (Neon)     │
│  avoocreator-portofolio │        │  your-strapi.onrender.com│
└─────────────────────────┘        └──────────────────────────┘
          │
          └─ Tanpa Strapi? Website TETAP JALAN dengan data bawaan
             (fallback otomatis, tidak pernah tampil kosong).
```

**Prinsip penting:** semua konten punya dua sumber — Strapi (jika tersambung) dan
data bawaan di `src/data/`. Kalau Strapi belum di-setup, sedang tidur (free tier),
atau error → website otomatis memakai data bawaan. Jadi situs **tidak pernah mati**.

---

## BAGIAN A — Deploy Website ke Vercel (±10 menit)

1. **Simpan kode ini ke repo GitHub-mu**
   - Cara termudah: hapus seluruh isi repo `avoocreator-portofolio`, lalu upload semua file proyek ini
     (atau push via git).
   - Jangan upload folder `node_modules`, `.next`, dan `db/`.
2. **Vercel** → *Add New… → Project* → pilih repo `avoocreator-portofolio`.
3. Vercel otomatis mendeteksi **Next.js** — tidak perlu setting build apa pun. Klik **Deploy**.
4. Selesai. Setiap push ke GitHub = auto-deploy.

### Environment Variables (Vercel → Settings → Environment Variables)

| Variabel | Wajib? | Isi | Fungsi |
|---|---|---|---|
| `ADMIN_PASSCODE` | Disarankan | passcode rahasiamu | Gerbang halaman `/admin` |
| `STRAPI_URL` | Opsional | `https://strapi-mu.onrender.com` | Sambungkan CMS (Bagian B) |
| `STRAPI_TOKEN` | Opsional | token read dari Strapi | Baca konten privat (opsional) |
| `DATABASE_URL` | Tidak perlu | — | Hanya untuk dev lokal |

> Tanpa `STRAPI_URL`, pesanan masuk tersimpan di penyimpanan lokal server
> (cocok untuk demo). Setelah Strapi tersambung, pesanan tersimpan permanen di Strapi.

---

## BAGIAN B — Strapi 100% Gratis (Render + Neon, ±30 menit)

Strapi butuh server yang menyala terus. Combo gratis yang paling masuk akal:

- **Render** (web service free) — menjalankan Strapi. Kekurangan: tidur setelah 15 menit tanpa trafik; request pertama butuh ±50 detik bangun. Website-mu **tidak terpengaruh** (fallback aktif selama Strapi bangun).
- **Neon** (Postgres free, permanen) — database Strapi. 0,5 GB — jauh lebih dari cukup.

### B1. Buat database Neon
1. Daftar di [neon.tech](https://neon.tech) (gratis, pakai GitHub).
2. *Create project* → salin **connection string** (format `postgresql://user:pass@host/db?sslmode=require`).

### B2. Deploy Strapi di Render
1. Daftar [render.com](https://render.com) (pakai GitHub).
2. *New → Web Service* → hubungkan repo Strapi (lihat B3) → pilih **Build & deploy**:
   - **Build command:** `npm install && npm run build`
   - **Start command:** `npm run start`
   - **Instance type:** Free
3. *Advanced → Add Environment Variable*:
   ```
   DATABASE_URL = <connection string Neon>
   DATABASE_CLIENT = postgres
   NODE_ENV = production
   JWT_SECRET = (acak, min 16 karakter)
   ADMIN_JWT_SECRET = (acak, beda dari atas)
   APP_KEYS = (4 key acak, pisah koma)
   API_TOKEN_SALT = (acak)
   TRANSFER_TOKEN_SALT = (acak)
   HOST = 0.0.0.0
   PORT = 1337
   ```
4. Deploy → buka `https://<nama>.onrender.com/admin` → buat akun admin Strapi.

> **B3 — Repo Strapi:** paling cepat pakai template `npx create-strapi-app@latest strapi-mu --dbclient=postgres --dbconnectionstring="<connection string Neon>"`, push ke GitHub baru, lalu sambungkan ke Render.

### B4. Samakan URL di Vercel
Vercel → Environment Variables → `STRAPI_URL` = `https://<nama>.onrender.com` → **Redeploy**.

---

## BAGIAN C — Content Types di Strapi

Buat lewat **Strapi Admin → Content-Type Builder**. Nama & field HARUS sama persis.

### 1. `Project` (collection: api::project.project)
| Field | Tipe | Keterangan |
|---|---|---|
| number | Number (integer) | urutan tampil, cth 1 |
| title | Text (short) | |
| category | Text (short) | cth: Web Development |
| description | Text (long) | |
| tags | JSON | `["Next.js","Tailwind CSS"]` |
| status | Enumeration | `selesai, berjalan, riset, konsep` |
| year | Text (short) | cth: 2026 |
| link | Text (short) | URL GitHub/demo, boleh kosong |

### 2. `Service` (collection)
| Field | Tipe |
|---|---|
| number | Number (integer) |
| slug | UID |
| title | Text |
| description | Text (long) |
| outputs | JSON — `[{"id":"...","en":"..."}]` |
| icon | Text — salah satu: `code, pen, palette, presentation, sparkles, cpu` |
| duration | Text |

### 3. `Expertise Group` (collection)
| Field | Tipe |
|---|---|
| group_id | Text — `development, design, creative-tech, research` |
| title | Text |
| description | Text |
| long_description | Text (long) |
| skills | JSON — `[{"name":"React","level":82}]` |
| tools | JSON — `["vscode","github","figma"]` (lihat `src/data/tools.ts`) |

### 4. `Experience Item` (collection)
`year` (Text), `title` (Text), `role` (Text), `description` (Long text),
`category` (Text), `highlight` (Boolean).

### 5. `Participation Category` (collection)
| Field | Tipe |
|---|---|
| cat_id | Text — `organisasi, kompetisi, proyek` |
| number | Text — `01` |
| title | Text |
| description | Text |
| items | JSON — `[{"id":"mrt","title":{"id":"...","en":"..."},"role":{"id":"...","en":"..."},"description":{"id":"...","en":"..."},"link":"","featured":true}]` |

### 6. `Faq` (collection)
`question` (Text), `answer` (Long text).

### 7. `Site Setting` (SINGLE TYPE) — pengaturan situs
| Field | Tipe |
|---|---|
| whatsapp | Text — format `62812xxxxxxx` |
| email | Text |
| tagline | Text |
| location | Text |
| availability | Text |
| socials | JSON — `[{"label":"GitHub","href":"https://..."}]` |
| stats | JSON — `[{"value":6,"suffix":"+","label":{"id":"...","en":"..."}}]` |

### 8. `Pesanan` (collection) — jangan lewat Content-Type Builder manual field-nya bebas, tapi samakan:
`nama` (Text), `kontak_wa` (Text), `email` (Text), `layanan` (Text),
`kebutuhan` (Long text), `budget` (Text), `deadline` (Text), `referensi` (Text).

---

## BAGIAN D — Permissions (Settings → Roles → Public)

| Konten | Public |
|---|---|
| Semua collection konten (project, service, dst.) | ✅ find, findOne |
| `site-setting` | ✅ find |
| `pesanan` | ✅ **create** SAJA (jangan beri find/delete) |

---

## BAGIAN E — Dua Bahasa (ID/EN)

Website punya toggle ID/EN. Di Strapi:
1. *Settings → Internationalization* → tambah locale **id (Indonesian)** dan **en (English)**.
2. Di tiap content type, aktifkan plugin **i18n / Localization**.
3. Isi konten untuk kedua locale — website otomatis mengambil keduanya dan menggabungkannya.

Bentuk fleksibel yang diterima website:
- Field bilingual per locale Strapi (disarankan), **atau**
- Field `title_id` + `title_en` dalam satu locale, **atau**
- Field tunggal `title` (dipakai untuk kedua bahasa).

---

## BAGIAN F — Ganti Nomor WhatsApp & Email

**Tanpa Strapi:** edit `src/data/site.ts` → `whatsapp` dan `email` → push ke GitHub.
**Dengan Strapi:** ubah di *Site Setting* — langsung berubah tanpa redeploy.

Cek dashboard pesanan: `website-kamu.vercel.app/admin` (passcode = `ADMIN_PASSCODE`).

---

## BAGIAN G — Dev Lokal

```bash
npm install
npm run dev          # http://localhost:3000
```

Edit konten bawaan di `src/data/` (site, projects, expertise, services,
experience, participation, faq, about, approach). Semua bilingual `{ id, en }`.

---

## Struktur Proyek

```
src/
├── app/                  # Halaman (App Router)
│   ├── page.tsx          # Beranda
│   ├── tentang/          # Tentang
│   ├── keahlian/         # Keahlian
│   ├── partisipasi/      # Partisipasi + [kategori]
│   ├── proyek/           # Proyek
│   ├── layanan/          # Layanan + FAQ
│   ├── kontak/           # Kontak
│   ├── admin/            # Dashboard pesanan
│   └── api/              # orders, strapi-status
├── components/           # Navbar, Footer, OrderModal, UI kit…
├── data/                 # Konten bawaan (fallback + sumber utama)
├── i18n/                 # Toggle ID/EN
├── lib/                  # strapi.ts, content.ts, orders.ts
└── prisma/               # Skema pesanan lokal (opsional)
```
