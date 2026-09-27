import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource-variable/montserrat";
import "./globals.css";
import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {SITE_ORIGIN} from "@/lib/seo";
import {Icon} from "@/components/icons";
import {whatsappLink} from "@/lib/contact";

export const metadata:Metadata={
  metadataBase:new URL(SITE_ORIGIN),
  title:"Page not found | Kaaveri Tours and Travels",
  description:"This page does not exist. Go to the Kaaveri Tours and Travels home page or send a travel enquiry."
};

export default function GlobalNotFound(){
  return <html lang="en">
    <body>
      <main className="not-found-page shell">
        <Link href="/" className="not-found-brand"><Image src="/brand/kaaveri-logo.png" width={1200} height={400} alt="Kaaveri Tours and Travels" preload/></Link>
        <p className="eyebrow">404</p>
        <h1>This page does not exist.</h1>
        <p lang="mr" className="not-found-mr">हे पान अस्तित्वात नाही.</p>
        <p className="lead">The link may be old or mistyped. Start from the home page, or send your travel enquiry directly.</p>
        <nav className="not-found-links" aria-label="Useful pages">
          <Link className="btn btn-primary" href="/"><span className="btn-label">Home</span><span className="btn-icon"><Icon name="arrow" size={17}/></span></Link>
          <Link className="btn btn-ghost" href="/mr" lang="mr"><span className="btn-label">मुख्यपृष्ठ</span><span className="btn-icon"><Icon name="arrow" size={17}/></span></Link>
          <Link className="btn btn-ghost" href="/contact#enquiry"><span className="btn-label">Enquire</span><span className="btn-icon"><Icon name="form" size={17}/></span></Link>
          <a className="btn btn-ghost" href={whatsappLink()} target="_blank" rel="noreferrer"><span className="btn-label">WhatsApp</span><span className="btn-icon"><Icon name="whatsapp" size={17}/></span></a>
        </nav>
      </main>
    </body>
  </html>;
}
