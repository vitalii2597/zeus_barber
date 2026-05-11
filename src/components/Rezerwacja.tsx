import ScrollReveal from "./ScrollReveal";

interface RezerwacjaProps {
  content: Record<string, string>;
}

export default function Rezerwacja({ content }: RezerwacjaProps) {
  const eyebrow     = content.eyebrow     || "Umów się online";
  const heading     = content.heading     || "Zarezerwuj wizytę";
  const description = content.description || "Szybko, wygodnie, bez telefonowania. Booksy dostępny 24/7.";
  const ctaBooksy   = content.cta_booksy  || "Otwórz Booksy";
  const phone       = content.phone       || "452 353 324";
  const phoneTel    = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <section
      id="rezerwacja"
      style={{
        background: "var(--gold)",
        padding: "5rem 2rem",
        textAlign: "center",
      }}
    >
      <ScrollReveal>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.68rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(10,12,22,0.65)",
            marginBottom: "1.2rem",
          }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--bg)",
            lineHeight: 1.1,
            marginBottom: "1.8rem",
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.92rem",
            lineHeight: 1.8,
            color: "rgba(10,12,22,0.6)",
            maxWidth: "420px",
            margin: "0 auto 2.5rem",
          }}
        >
          {description}
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://booksy.com/pl-pl/335658_zeus-barber-shop-academy_barber-shop_6832_lublin#ba_s=sh_1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Zarezerwuj wizytę przez Booksy (otwiera nową kartę)"
            style={{
              display: "inline-block",
              padding: "0.85rem 2rem",
              background: "var(--bg)",
              color: "var(--gold)",
              fontFamily: "var(--font-ui)",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.25s ease",
            }}
          >
            {ctaBooksy}
          </a>
          <a
            href={phoneTel}
            style={{
              display: "inline-block",
              padding: "0.85rem 2rem",
              border: "1px solid rgba(10,12,22,0.25)",
              color: "var(--bg)",
              fontFamily: "var(--font-ui)",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.25s ease",
            }}
          >
            {phone}
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
