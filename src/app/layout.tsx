import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SiteChrome } from "@/components/SiteChrome";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings, getServices } from "@/lib/content";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avoocreator-portofolio.vercel.app"),
  title: {
    default: "Avoo Creator — Avian",
    template: "%s — Avoo Creator",
  },
  description:
    "Portfolio Avoo Creator (Avian) — web developer, graphic designer, dan creative technologist dari Jawa Timur. Layanan website, desain, dan prototipe interaktif.",
  keywords: [
    "Avoo Creator",
    "Avian",
    "portfolio",
    "web developer",
    "graphic designer",
    "Jawa Timur",
    "jasa website",
  ],
  authors: [{ name: "Avian" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Avoo Creator — Avian",
    description:
      "Web developer & graphic designer yang membangun hal yang jalan — bukan sekadar tampil bagus.",
    url: "https://avoocreator-portofolio.vercel.app",
    siteName: "Avoo Creator",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary",
    title: "Avoo Creator — Avian",
    description: "Web developer & graphic designer — build things that run.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F3EF" },
    { media: "(prefers-color-scheme: dark)", color: "#12151F" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [site, services] = await Promise.all([getSiteSettings(), getServices()]);

  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${plexSans.variable} ${plexMono.variable} antialiased bg-background text-foreground min-h-dvh flex flex-col`}
      >
        <Providers
          services={services.map((s) => ({ slug: s.slug, title: s.title, icon: s.icon }))}
          whatsapp={site.whatsapp}
        >
          <div className="noise-overlay" aria-hidden="true" />
          <CustomCursor />
          <ScrollProgress />
          <SiteChrome
            footer={<Footer email={site.email} location={site.location} />}
          >
            {children}
          </SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
