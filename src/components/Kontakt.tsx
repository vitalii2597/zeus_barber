import ScrollReveal from "./ScrollReveal";

interface KontaktProps {
  content: Record<string, string>;
}

export default function Kontakt({ content }: KontaktProps) {
  const eyebrow      = content.eyebrow      || "Kontakt";
  const heading      = content.heading      || "Znajdź nas";
  const address      = content.address      ?? "";
  const founderName  = content.founder_name || "Oleh Gonipirenko";
  const founderBio   = content.founder_bio  || "Pasjonat barberstwa z wieloletnim doświadczeniem. Twórca Zeus Barber Shop i Zeus Academy.";
  const footerTagline = content.footer_tagline || "Sztuka strzyżenia. Precyzja w każdym detalu.";

  const phone     = content.phone     || "452 353 324";
  const instagram = content.instagram || "@zeus_hairdress";
  const phoneTel  = `tel:${phone.replace(/\s/g, "")}`;
  const igHref    = `https://instagram.com/${instagram.replace(/^@/, "")}`;

  const LINKS = [
    { label: "Telefon",   value: phone,               href: phoneTel },
    { label: "Instagram", value: instagram,            href: igHref },
    { label: "Booksy",    value: "Zarezerwuj online",  href: "https://booksy.com/pl-pl/335658_zeus-barber-shop-academy_barber-shop_6832_lublin#ba_s=sh_1" },
  ];

  return (
    <section
      id="kontakt"
      className="section"
      style={{ background: "var(--bg)", paddingBottom: 0 }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <ScrollReveal className="text-center" style={{ marginBottom: "5rem" }}>
          <p className="eyebrow" style={{ marginBottom: "1.2rem" }}>
            {eyebrow}
          </p>
          <h2
            className="heading"
            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: "1.5rem" }}
          >
            {heading}
          </h2>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "var(--gold)",
              opacity: 0.4,
              margin: "0 auto",
            }}
          />
        </ScrollReveal>

        {/* Two columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2px",
            background: "rgba(201,168,76,0.1)",
            marginBottom: "2px",
          }}
          className="contact-grid"
        >
          {/* Contact links */}
          <ScrollReveal delay={0.05}>
            <div style={{ background: "var(--bg)", padding: "3.5rem", height: "100%" }}>
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(240,234,214,0.4)",
                  marginBottom: "2.5rem",
                }}
              >
                Dane kontaktowe
              </p>

              {LINKS.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={item.href.startsWith("http") ? `${item.label}: ${item.value} (otwiera nową kartę)` : `${item.label}: ${item.value}`}
                  className="contact-link"
                  style={{
                    display: "block",
                    paddingBottom: "1.8rem",
                    marginBottom: i < LINKS.length - 1 ? "1.8rem" : 0,
                    borderBottom: i < LINKS.length - 1 ? "1px solid rgba(201,168,76,0.08)" : "none",
                    textDecoration: "none",
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      marginBottom: "0.5rem",
                      opacity: 0.8,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.92rem",
                      color: "rgba(240,234,214,0.75)",
                    }}
                  >
                    {item.value}
                  </p>
                </a>
              ))}

              {address && (
                <div
                  style={{
                    marginTop: "1.8rem",
                    paddingTop: "1.8rem",
                    borderTop: "1px solid rgba(201,168,76,0.08)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.52rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      marginBottom: "0.5rem",
                      opacity: 0.7,
                    }}
                  >
                    Adres
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.92rem",
                      color: "rgba(240,234,214,0.65)",
                    }}
                  >
                    {address}
                  </p>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Founder */}
          <ScrollReveal delay={0.15}>
            <div
              style={{
                background: "var(--bg)",
                padding: "3.5rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.52rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(240,234,214,0.2)",
                    marginBottom: "2.5rem",
                  }}
                >
                  Założyciel
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "1.5rem",
                    letterSpacing: "0.04em",
                    color: "var(--cream)",
                    marginBottom: "0.5rem",
                    lineHeight: 1.2,
                  }}
                >
                  {founderName}
                </p>
                <div
                  style={{
                    width: "28px",
                    height: "1px",
                    background: "var(--gold)",
                    opacity: 0.35,
                    marginBottom: "1.2rem",
                    marginTop: "1rem",
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    lineHeight: 2,
                    color: "rgba(240,234,214,0.4)",
                  }}
                >
                  {founderBio}
                </p>
              </div>

              <a
                href="https://booksy.com/pl-pl/335658_zeus-barber-shop-academy_barber-shop_6832_lublin#ba_s=sh_1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                style={{ display: "block", textAlign: "center", marginTop: "3rem" }}
              >
                Zarezerwuj wizytę
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Map */}
        <ScrollReveal>
          <div
            style={{
              overflow: "hidden",
              border: "1px solid rgba(201,168,76,0.08)",
              borderTop: "none",
              lineHeight: 0,
            }}
          >
            <iframe
              src="https://maps.google.com/maps?q=Zeus+Barber+Shop+Warszawa&output=embed&z=15"
              width="100%"
              height="340"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokalizacja Zeus Barber Shop"
              style={{
                border: 0,
                display: "block",
                filter: "grayscale(1) invert(1) brightness(0.8) hue-rotate(180deg)",
              }}
            />
          </div>
        </ScrollReveal>
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: "6rem",
          borderTop: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "4rem 1.5rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <p
              className="shimmer"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 900,
                letterSpacing: "0.2em",
                marginBottom: "0.8rem",
                display: "inline-block",
              }}
            >
              ZEUS
            </p>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(240,234,214,0.4)",
                marginBottom: "1.2rem",
              }}
            >
              Barber Shop
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                lineHeight: 1.8,
                color: "rgba(240,234,214,0.45)",
              }}
            >
              {footerTagline}
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(240,234,214,0.4)",
                marginBottom: "1.8rem",
              }}
            >
              Nawigacja
            </p>
            <nav aria-label="Linki nawigacyjne stopki">
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { href: "#rezerwacja", label: "Rezerwacja" },
                  { href: "#uslugi", label: "Usługi" },
                  { href: "#galeria", label: "Galeria" },
                  { href: "#academy", label: "Zeus Academy" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.85rem",
                        color: "rgba(240,234,214,0.55)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        display: "inline-block",
                        minHeight: "24px",
                      }}
                      className="footer-link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(240,234,214,0.4)",
                marginBottom: "1.8rem",
              }}
            >
              Kontakt
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "452 353 324", href: "tel:452353324", ariaLabel: "Zadzwoń: 452 353 324" },
                { label: "@zeus_hairdress", href: "https://instagram.com/zeus_hairdress", ariaLabel: "Instagram @zeus_hairdress (otwiera nową kartę)" },
                { label: "Booksy", href: "https://booksy.com/pl-pl/335658_zeus-barber-shop-academy_barber-shop_6832_lublin#ba_s=sh_1", ariaLabel: "Zarezerwuj przez Booksy (otwiera nową kartę)" },
              ].map((item) => (
                <li key={item.href}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: "rgba(240,234,214,0.55)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    display: "inline-block",
                    minHeight: "24px",
                  }}
                  className="footer-link"
                >
                  {item.label}
                </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div
          style={{
            borderTop: "1px solid rgba(201,168,76,0.07)",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.68rem",
              letterSpacing: "0.15em",
              color: "rgba(240,234,214,0.15)",
              textTransform: "uppercase",
            }}
          >
            © 2025 Zeus Barber Shop. All rights reserved.
          </p>
        </div>
      </footer>

      <style>{`
        .contact-link:hover { opacity: 0.65 !important; }
        .footer-link:hover { color: var(--gold) !important; }
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
