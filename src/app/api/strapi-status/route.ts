import { NextResponse } from "next/server";
import { strapiConfigured, STRAPI_URL, strapiFetch } from "@/lib/strapi";

export async function GET() {
  if (!strapiConfigured()) {
    return NextResponse.json({ configured: false, connected: false, url: "" });
  }
  const json = await strapiFetch<unknown>("/site-setting", { timeoutMs: 5000, revalidate: 0 });
  return NextResponse.json({
    configured: true,
    connected: json !== null,
    url: STRAPI_URL,
  });
}
