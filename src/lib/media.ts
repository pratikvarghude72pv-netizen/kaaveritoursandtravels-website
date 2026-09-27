import type { StaticImageData } from "next/image";
import ajanta from "@/assets/media/ajanta-real.webp";
import bhimashankar from "@/assets/media/bhimashankar-real.webp";
import ellora from "@/assets/media/ellora-real.webp";
import ghrishneshwar from "@/assets/media/ghrishneshwar-real.webp";
import oneWay from "@/assets/media/one-way-real.webp";
import suv from "@/assets/media/suv-real.webp";
import sedan from "@/assets/media/sedan-real.webp";
import staffShuttle from "@/assets/media/staff-shuttle-real.webp";
import trimbakeshwar from "@/assets/media/trimbakeshwar-real.webp";

export type SiteImage = StaticImageData;

/** Locally bundled photos include intrinsic dimensions and a blur placeholder. Credits: MEDIA-CREDITS.md */
export const siteMedia = {
  ajanta,
  bhimashankar,
  corporate: staffShuttle,
  ellora,
  ghrishneshwar,
  oneWay,
  trimbakeshwar,
  suv,
  sedan,
} as const;
