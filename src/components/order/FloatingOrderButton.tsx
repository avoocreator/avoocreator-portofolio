"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useOrderModal } from "./OrderModalProvider";
import { useLang } from "@/i18n/LangProvider";

/** Tombol melayang untuk memesan — muncul di semua halaman kecuali /admin */
export function FloatingOrderButton() {
  const { open } = useOrderModal();
  const pathname = usePathname();
  const { dict } = useLang();

  if (pathname.startsWith("/admin")) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={() => open()}
      className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-accent text-accent-foreground pl-4 pr-5 py-3 shadow-[0_8px_28px_-6px_rgb(226_102_31/0.55)] hover:shadow-[0_10px_36px_-6px_rgb(226_102_31/0.7)] transition-shadow"
      aria-label={dict.nav.orderCta}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-50" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
      </span>
      <MessageCircle size={18} />
      <span className="text-sm font-semibold">{dict.nav.orderCta}</span>
    </motion.button>
  );
}
