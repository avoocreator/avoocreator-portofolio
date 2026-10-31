import { z } from "zod";

/** URL http(s) saja (atau kosong). Menolak javascript:, data:, dll. */
export const optionalHttpUrl = (max = 400) =>
  z
    .string()
    .max(max)
    .refine(
      (v) => v === "" || /^https?:\/\/[^\s]+$/i.test(v),
      "URL harus diawali http:// atau https://",
    )
    .optional()
    .or(z.literal(""));

/** Tautan internal ("/proyek") atau http(s). Dipakai untuk link konten admin. */
export const contentLink = (max = 500) =>
  z
    .string()
    .max(max)
    .refine(
      (v) =>
        v === "" ||
        v.startsWith("/") ||
        /^https?:\/\/[^\s]+$/i.test(v) ||
        /^mailto:[^\s]+$/i.test(v),
      "Tautan tidak valid",
    )
    .optional()
    .nullable();
