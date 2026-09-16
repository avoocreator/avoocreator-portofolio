# Avoo Creator — Portfolio

Website portfolio personal untuk brand **Avoo Creator** (Avian) — developer, graphic designer, dan creative technologist. Proyek ini **frontend only**: belum ada backend, database, authentication, CMS, atau dashboard admin. Fokusnya adalah tampilan yang sudah matang, interaktif, dan siap dikembangkan ke backend di tahap berikutnya.

## Teknologi

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion (animasi UI)
- Lucide React (icon)

Website ini single-page (tidak pakai React Router) — semua section ada di satu halaman dan dinavigasi lewat scroll.

## Cara Install

```bash
npm install
```

## Struktur Halaman

Section yang ada, berurutan: Hero, About (bento grid), Expertise, Approach ("Cara Kerja"), Projects (dengan filter kategori + toggle tampilan grid/list), Experience (timeline), Services, Contact.

## Fitur Interaksi

- **Marquee ticker** di Hero — daftar role (Developer, Graphic Designer, dst) berjalan otomatis, berhenti dan menampilkan daftar statis kalau `prefers-reduced-motion` aktif.
- **Custom cursor** halus (titik + cincin yang mengikuti dengan sedikit delay) — otomatis nonaktif di perangkat sentuh, layar sempit, dan saat `prefers-reduced-motion` aktif.
- **Toggle tampilan Grid/List** di section Projects, selain filter kategori yang sudah ada.
- **Jam lokal** di footer (Jawa Timur, ID) yang update tiap 30 detik.
- Semua animasi scroll pakai Framer Motion `whileInView` dengan stagger, dan otomatis dipercepat/dimatikan kalau `prefers-reduced-motion` aktif.

## Cara Menjalankan Development Server

```bash
npm run dev
```

Buka `http://localhost:5173` di browser.

## Cara Build

```bash
npm run build
```

Build hasil ada di folder `dist/`. Untuk preview hasil build secara lokal:

```bash
npm run preview
```

## Struktur Folder

```
avoo-creator-portfolio/
├── public/
│   ├── assets/mascot/          # aset maskot asli (SVG), jangan diubah
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/              # Navbar, Footer
│   │   ├── sections/            # Hero, About, Expertise, Approach, Projects, Experience, Services, Contact
│   │   ├── ui/                  # Button, Tag, SectionHeading, ThemeToggle, BackToTop, Marquee, Cursor
│   │   └── mascot/               # komponen Mascot (bungkus <img> + animasi float)
│   ├── data/                    # semua konten yang mudah diedit (lihat bagian di bawah)
│   ├── hooks/                   # useTheme, useActiveSection, useReveal, usePrefersReducedMotion
│   ├── lib/                     # utilities kecil (cn, scrollToId)
│   ├── styles/index.css         # Tailwind + custom properties + base styles
│   ├── App.tsx
│   └── main.tsx
```

## Cara Mengganti Data Project

Edit `src/data/projects.ts`. Setiap project punya bentuk:

```ts
{
  number: '01',
  title: 'Nama Project',
  category: 'Web Development',
  description: 'Deskripsi singkat.',
  tags: ['React', 'TypeScript'],
  status: 'Berjalan', // 'Selesai' | 'Berjalan' | 'Riset' | 'Konsep'
  link: 'https://...', // kosongkan (hapus baris ini) kalau belum ada link publik
}
```

Beberapa item ditandai komentar `// PLACEHOLDER` — ini deskripsi sementara yang aman untuk diedit lebih detail begitu proyeknya sudah jelas.

Section lain yang datanya juga terpisah dan gampang diedit:
- `src/data/expertise.ts` — kategori & daftar skill
- `src/data/experience.ts` — timeline perjalanan
- `src/data/services.ts` — daftar layanan
- `src/data/nav.ts` — item navigasi

## Cara Mengganti Email dan Social Links

Edit `src/data/social.ts`:

```ts
export const contact = {
  email: 'email-asli-kamu@contoh.com',
}

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/username' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/username' },
  { label: 'Instagram', href: 'https://instagram.com/username' },
]
```

File ini juga dipakai di section Contact dan Footer, jadi cukup edit sekali.

## Cara Mengganti Aset Maskot

Aset asli ada di `public/assets/mascot/mascot-point.svg` dan `mascot-curious.svg`. Untuk mengganti:

1. Simpan file SVG baru ke `public/assets/mascot/`.
2. Update path di `src/components/mascot/Mascot.tsx` (object `sources`).
3. Pastikan alt text tetap deskriptif (misalnya `"Maskot Avoo Creator"`).

Kalau cuma ingin menambah pose baru tanpa mengganti yang lama, tambahkan key baru di `sources` dan di union type `MascotVariant`.

## Cara Menambahkan Project Baru

Tambahkan object baru di array `projects` pada `src/data/projects.ts`. Nomor (`number`) tidak wajib berurutan sempurna, tapi sebaiknya tetap unik.

## Cara Mengubah Warna Tema

Semua warna didefinisikan di `tailwind.config.js` pada bagian `theme.extend.colors`:

- `paper` — background light mode
- `ink` — teks & elemen gelap di light mode (termasuk `ink.navy` dan `ink.muted`)
- `void` — background dark mode
- `cream` — teks & elemen terang di dark mode
- `accent.orange` / `accent.orange-bright` — aksen oranye dari maskot
- `accent.teal` / `accent.teal-bright` — aksen teal dari mata maskot

Border tipis (hairline) pakai custom property `--border-light` di `src/styles/index.css`, otomatis menyesuaikan light/dark mode lewat class `.dark`.

## Catatan

- **Backend belum dibuat.** Form contact tidak mengirim email sungguhan — tombol email memakai `mailto:` dan tombol "Salin email" memakai Clipboard API.
- Semua link social & email di atas adalah **placeholder** (kecuali GitHub) — ganti sebelum website ini dipublikasikan.
- Website mendukung `prefers-reduced-motion` — animasi otomatis dikurangi kalau pengguna mengaktifkan setelan itu di sistem operasinya.
- Tema (light/dark) tersimpan di `localStorage` browser pengguna.
