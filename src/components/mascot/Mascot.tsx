import { cn } from "@/lib/utils";

interface MascotProps {
  variant?: "point" | "curious";
  className?: string;
  eager?: boolean;
  float?: boolean;
}

/** Maskot Avoo — aset orisinal (WebP hasil render SVG sumber) dengan animasi float halus */
export function Mascot({ variant = "point", className, eager = false, float = true }: MascotProps) {
  const src =
    variant === "point" ? "/assets/mascot/mascot-point.webp" : "/assets/mascot/mascot-curious.webp";
  return (
    <img
      src={src}
      alt="Maskot Avoo Creator"
      width={480}
      height={480}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      draggable={false}
      className={cn("select-none pointer-events-none", float && "animate-float", className)}
    />
  );
}
