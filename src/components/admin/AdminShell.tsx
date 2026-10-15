"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  Briefcase,
  BrainCircuit,
  Milestone,
  Users,
  HelpCircle,
  UserRound,
  GitBranch,
  Settings,
  KeyRound,
  LogOut,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { t } from "./strings";
import { cn } from "@/lib/utils";
import { OrdersPanel, AccountPanel } from "./panels/OrdersAccountPanels";
import {
  ProjectsPanel,
  ServicesPanel,
  ExpertisePanel,
  ExperiencePanel,
  FaqPanel,
  ApproachPanel,
} from "./panels/CollectionPanels";
import { ParticipationPanel } from "./panels/ParticipationPanel";
import { AboutPanel } from "./panels/AboutPanel";
import { SiteSettingsPanel } from "./panels/SiteSettingsPanel";

const NAV = [
  { key: "ringkasan", icon: LayoutDashboard },
  { key: "pesanan", icon: Inbox },
  { key: "proyek", icon: FolderKanban },
  { key: "layanan", icon: Briefcase },
  { key: "keahlian", icon: BrainCircuit },
  { key: "pengalaman", icon: Milestone },
  { key: "partisipasi", icon: Users },
  { key: "faq", icon: HelpCircle },
  { key: "tentang", icon: UserRound },
  { key: "langkah", icon: GitBranch },
  { key: "situs", icon: Settings },
  { key: "akun", icon: KeyRound },
] as const;

type SectionKey = (typeof NAV)[number]["key"];

export function AdminShell({ username }: { username: string }) {
  const router = useRouter();
  const [section, setSection] = useState<SectionKey>("ringkasan");

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <LayoutDashboard size={17} />
            </div>
            <div className="min-w-0">
              <p className="font-display font-extrabold tracking-tight leading-none truncate">
                {t.shell.judul}
              </p>
              <p className="font-mono text-[11px] text-muted-foreground truncate">
                @{username}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex">
              <Button variant="outline" size="sm" className="gap-1.5">
                {t.shell.lihatSitus}
                <ExternalLink size={13} />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={logout} className="gap-1.5 text-muted-foreground">
              <LogOut size={14} />
              {t.shell.keluar}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 mx-auto w-full max-w-[1280px] px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <aside className="min-w-0 lg:sticky lg:top-24 self-start">
            <p className="hidden lg:block text-xs text-muted-foreground leading-relaxed mb-4">
              {t.shell.sub}
            </p>
            <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 -mx-1 px-1" aria-label="Menu admin">
              {NAV.map((item) => {
                const Icon = item.icon;
                const active = section === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSection(item.key)}
                    className={cn(
                      "flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-accent/10 text-accent font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    )}
                  >
                    <Icon size={15} className={active ? "text-accent" : ""} />
                    {t.nav[item.key]}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Konten */}
          <main className="min-w-0">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-6">
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
                  {t.nav[section]}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">{t.navDesc[section]}</p>
              </div>
              {section === "ringkasan" && <Overview onGo={setSection} />}
              {section === "pesanan" && <OrdersPanel />}
              {section === "proyek" && <ProjectsPanel />}
              {section === "layanan" && <ServicesPanel />}
              {section === "keahlian" && <ExpertisePanel />}
              {section === "pengalaman" && <ExperiencePanel />}
              {section === "partisipasi" && <ParticipationPanel />}
              {section === "faq" && <FaqPanel />}
              {section === "tentang" && <AboutPanel />}
              {section === "langkah" && <ApproachPanel />}
              {section === "situs" && <SiteSettingsPanel />}
              {section === "akun" && <AccountPanel username={username} />}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ================= RINGKASAN ================= */

function Overview({ onGo }: { onGo: (s: SectionKey) => void }) {
  const [stats, setStats] = useState<{
    orders: number;
    baru: number;
    last?: { name: string; service: string; createdAt: string } | null;
    content: Record<string, number>;
  } | null>(null);

  useEffect(() => {
    let alive = true;
    Promise.all([
      fetch("/api/admin/orders"),
      fetch("/api/admin/content/projects"),
      fetch("/api/admin/content/services"),
      fetch("/api/admin/content/expertise"),
    ])
      .then(async ([ordersRes, proyekRes, layananRes, keahlianRes]) => {
        const ordersJson = await ordersRes.json();
        const proyekJson = await proyekRes.json();
        const layananJson = await layananRes.json();
        const keahlianJson = await keahlianRes.json();
        const orders = ordersJson.orders ?? [];
        if (!alive) return;
        setStats({
          orders: orders.length,
          baru: orders.filter((o: { status: string }) => o.status === "baru").length,
          last: orders[0]
            ? {
                name: orders[0].name,
                service: orders[0].service,
                createdAt: orders[0].createdAt,
              }
            : null,
          content: {
            proyek: proyekJson.items?.length ?? 0,
            layanan: layananJson.items?.length ?? 0,
            keahlian: keahlianJson.items?.length ?? 0,
          },
        });
      })
      .catch(() => {
        if (alive) setStats({ orders: 0, baru: 0, content: {} });
      });
    return () => {
      alive = false;
    };
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="animate-spin text-muted-foreground" size={22} />
      </div>
    );
  }

  const cards: { label: string; value: string | number; onClick?: () => void; sub?: string }[] = [
    {
      label: t.ringkasan.pesananBaru,
      value: stats.baru,
      sub: `${t.ringkasan.totalPesanan}: ${stats.orders}`,
      onClick: () => onGo("pesanan"),
    },
    {
      label: t.nav.proyek,
      value: stats.content.proyek ?? 0,
      onClick: () => onGo("proyek"),
    },
    {
      label: t.nav.layanan,
      value: stats.content.layanan ?? 0,
      onClick: () => onGo("layanan"),
    },
    {
      label: t.nav.keahlian,
      value: stats.content.keahlian ?? 0,
      onClick: () => onGo("keahlian"),
    },
  ];

  return (
    <div className="grid min-w-0 grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={c.onClick}
            className="card-editorial p-5 text-left transition-transform hover:-translate-y-0.5"
          >
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className="mt-2 font-display text-4xl font-extrabold">{c.value}</p>
            {c.sub && <p className="mt-1 font-mono text-[11px] text-muted-foreground">{c.sub}</p>}
          </button>
        ))}
      </div>

      <div className="card-editorial p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {t.ringkasan.terakhir}
        </p>
        {stats.last ? (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="font-semibold">{stats.last.name}</span>
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] text-accent">
              {stats.last.service}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {new Date(stats.last.createdAt).toLocaleString("id-ID")}
            </span>
            <Button variant="outline" size="sm" className="ml-auto" onClick={() => onGo("pesanan")}>
              {t.nav.pesanan}
            </Button>
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">{t.ringkasan.tidakAda}</p>
        )}
      </div>

      <p className="rounded-xl border border-accent/25 bg-accent/5 p-4 text-sm leading-relaxed text-foreground/90">
        {t.ringkasan.tips}
      </p>
    </div>
  );
}
