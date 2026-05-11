import ScrollReveal from "./ScrollReveal";

const ITEMS = [
  {
    label: "Rezerwacja",
    title: "Zarezerwuj wizytę",
    desc: "Online przez Booksy — 24/7",
    href: "https://booksy.com/pl-pl/335658_zeus-barber-shop-academy_barber-shop_6832_lublin#ba_s=sh_1",
    external: true,
  },
  {
    label: "Usługi",
    title: "Nasze usługi",
    desc: "Strzyżenie, broda i więcej",
    href: "#uslugi",
    external: false,
  },
  {
    label: "Academy",
    title: "Zeus Academy",
    desc: "Kursy dla barberów",
    href: "#academy",
    external: false,
  },
  {
    label: "Galeria",
    title: "Nasze prace",
    desc: "Każdy włos to dzieło sztuki",
    href: "#galeria",
    external: false,
  },
];

export default function CTAStrip() {
  return (
    <div
      className="cta-strip"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderTop: "1px solid rgba(201,168,76,0.12)",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
        background: "var(--bg)",
      }}
    >
      {ITEMS.map((item, i) => (
        <ScrollReveal key={item.label} delay={i * 0.07}>
          <a
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            aria-label={item.external ? `${item.title} (otwiera nową kartę)` : item.title}
            className="cta-card"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "2.8rem 2.2rem",
              textDecoration: "none",
              borderRight:
                i < ITEMS.length - 1
                  ? "1px solid rgba(201,168,76,0.12)"
                  : "none",
              background: "var(--bg)",
              transition: "background 0.3s ease",
              minHeight: "160px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "0.8rem",
                opacity: 0.75,
              }}
            >
              {item.label}
            </span>

            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.9rem",
                letterSpacing: "0.04em",
                color: "var(--cream)",
                marginBottom: "0.5rem",
              }}
            >
              {item.title}
            </span>

            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                color: "rgba(240,234,214,0.55)",
                lineHeight: 1.6,
                flex: 1,
                marginBottom: "1.4rem",
              }}
            >
              {item.desc}
            </span>

            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gold)",
                opacity: 0.65,
              }}
            >
              → {item.external ? "Przejdź" : "Zobacz"}
            </span>
          </a>
        </ScrollReveal>
      ))}

      <style>{`
        .cta-card:hover { background: rgba(201,168,76,0.03) !important; }
        .cta-card:hover > span:last-child { opacity: 1 !important; }
        @media (max-width: 768px) {
          .cta-strip { grid-template-columns: repeat(2, 1fr) !important; }
          .cta-card { border-right: none !important; border-bottom: 1px solid rgba(201,168,76,0.12); }
          .cta-strip > div:nth-child(odd) .cta-card { border-right: 1px solid rgba(201,168,76,0.12) !important; }
        }
        @media (max-width: 460px) {
          .cta-strip { grid-template-columns: 1fr !important; }
          .cta-strip > div:nth-child(odd) .cta-card { border-right: none !important; }
        }
      `}</style>
    </div>
  );
}
