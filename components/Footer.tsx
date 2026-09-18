import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-navy text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-[var(--radius-sm)]">
            <Image src={siteConfig.images.badge} alt="" width={40} height={40} className="h-10 w-10 rounded-full" />
            <Logo tone="dark" className="h-6 w-auto" />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Individuelles Bewerbungscoaching, berufliche Orientierung und praxisnahe Workshops in Frankfurt am
            Main und im Rhein-Main-Gebiet.
          </p>
          <p className="mt-4 font-mono text-xs text-white/50">
            CERTQUA-Zertifikat {siteConfig.certificate.number}
          </p>
          {/* Anbieterbereich: ausschließlich das Trägerzeichen, dezent und lesbar. */}
          <div className="mt-4 w-52 rounded-[var(--radius-sm)] bg-white p-2">
            <Link
              href="/dokumente/CERTQUA.pdf"
              className="block rounded-[var(--radius-sm)] p-1 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="CERTQUA – zugelassener Träger nach AZAV – Zertifikat Trägerzulassung (PDF)"
            >
              <Image
                src="/images/zertifikate/Certqua_Zeichen_AZAV_gross_4c.jpg"
                alt="CERTQUA – zugelassener Träger nach AZAV"
                width={783}
                height={396}
                sizes="208px"
                className="h-auto w-full object-contain"
              />
            </Link>
          </div>
        </div>

        <nav aria-label="Seiten">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/50">Seiten</h2>
          <ul className="space-y-2.5">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-[var(--radius-sm)]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/50">Kontakt</h2>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li>
              <a href={siteConfig.contact.phoneHref} className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-[var(--radius-sm)]">
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-[var(--radius-sm)]">
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.contact.whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-[var(--radius-sm)]"
              >
                WhatsApp
              </a>
            </li>
            <li className="pt-2 text-white/60">
              Geschäfts- und Postanschrift:
              <br />
              {siteConfig.address.street}
              <br />
              {siteConfig.address.zip} {siteConfig.address.city}
              <br />
              <span className="text-white/50">Keine Coachingtermine vor Ort</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/50">Rechtliches</h2>
          <ul className="space-y-2.5">
            <li>
              <Link href="/impressum" className="text-sm text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-[var(--radius-sm)]">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="text-sm text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-[var(--radius-sm)]">
                Datenschutz
              </Link>
            </li>
            <li>
              <a
                href={siteConfig.certificate.pdfHref}
                className="text-sm text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-[var(--radius-sm)]"
              >
                CERTQUA-Zertifikat (PDF)
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-5">
        <Container className="flex flex-col gap-2 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>Zulassungsnachweis nach § 178 SGB III · CERTQUA-Zertifikat {siteConfig.certificate.number}</p>
        </Container>
      </div>
    </footer>
  );
}
