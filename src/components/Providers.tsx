"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { LangProvider } from "@/i18n/LangProvider";
import { OrderModalProvider } from "@/components/order/OrderModalProvider";
import type { Service } from "@/data/services";

interface ProvidersProps {
  children: React.ReactNode;
  services: Pick<Service, "slug" | "title" | "icon">[];
  whatsapp: string;
}

export function Providers({ children, services, whatsapp }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LangProvider>
        <OrderModalProvider services={services} whatsapp={whatsapp}>
          {children}
          <Toaster position="bottom-left" richColors closeButton />
        </OrderModalProvider>
      </LangProvider>
    </ThemeProvider>
  );
}
