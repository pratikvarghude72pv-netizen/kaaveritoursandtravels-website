import type { StaticImageData } from "next/image";
import ajanta from "@/assets/media/ajanta-real.webp";
import bhimashankar from "@/assets/media/bhimashankar-real.webp";
import ellora from "@/assets/media/ellora-real.webp";
import ghrishneshwar from "@/assets/media/ghrishneshwar-real.webp";
import trimbakeshwar from "@/assets/media/trimbakeshwar-real.webp";
import fleetDashboardDusk from "@/assets/media/fleet-dashboard-dusk-real.webp";
import fleetDashboardFront from "@/assets/media/fleet-dashboard-front-real.webp";
import fleetInteriorPortrait from "@/assets/media/fleet-interior-portrait-real.webp";
import fleetSeatsAisle from "@/assets/media/fleet-seats-aisle-real.webp";
import fleetExteriorLeft from "@/assets/media/fleet-exterior-left-real.webp";
import fleetExteriorFront from "@/assets/media/fleet-exterior-front-real.webp";
import fleetExteriorRight from "@/assets/media/fleet-exterior-right-real.webp";
import fleetSideSunset from "@/assets/media/fleet-side-sunset-real.webp";
import fleetSideSunsetDoor from "@/assets/media/fleet-side-sunset-door-real.webp";
import fleetSidePlate from "@/assets/media/fleet-side-plate-real.webp";
import fleetSideWheel from "@/assets/media/fleet-side-wheel-real.webp";
import fleetRearDecal from "@/assets/media/fleet-rear-decal-real.webp";
import fleetSeatsClose from "@/assets/media/fleet-seats-close-real.webp";
import fleetSeatsWindow from "@/assets/media/fleet-seats-window-real.webp";

export type SiteImage = StaticImageData;

/** Locally bundled photos include intrinsic dimensions and a blur placeholder. Credits: MEDIA-CREDITS.md */
export const siteMedia = {
  ajanta,
  bhimashankar,
  ellora,
  ghrishneshwar,
  trimbakeshwar,
  fleetDashboardDusk,
  fleetDashboardFront,
  fleetInteriorPortrait,
  fleetSeatsAisle,
  fleetExteriorLeft,
  fleetExteriorFront,
  fleetExteriorRight,
  fleetSideSunset,
  fleetSideSunsetDoor,
  fleetSidePlate,
  fleetSideWheel,
  fleetRearDecal,
  fleetSeatsClose,
  fleetSeatsWindow,
} as const;

/** The fleet showcase video (watermark-free crop of Kaaveri's own footage) and its poster frame. */
export const fleetVideo = {
  src: "/media/fleet-interior-tour.mp4",
  poster: fleetSideWheel,
} as const;
