"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { OrderModal } from "./OrderModal";
import type { Service } from "@/data/services";

interface OrderContextValue {
  open: (serviceSlug?: string) => void;
  close: () => void;
  isOpen: boolean;
}

const OrderContext = createContext<OrderContextValue>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

interface ProviderProps {
  children: React.ReactNode;
  services: Pick<Service, "slug" | "title" | "icon">[];
  whatsapp: string;
}

export function OrderModalProvider({ children, services, whatsapp }: ProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetService, setPresetService] = useState<string | undefined>(undefined);

  const open = useCallback((serviceSlug?: string) => {
    setPresetService(serviceSlug);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <OrderContext.Provider value={value}>
      {children}
      <OrderModal
        open={isOpen}
        onOpenChange={(v) => (v ? setIsOpen(true) : close())}
        services={services}
        whatsapp={whatsapp}
        presetService={presetService}
      />
    </OrderContext.Provider>
  );
}

export function useOrderModal() {
  return useContext(OrderContext);
}
