import ScrollReveal from "./ScrollReveal";

interface ZeusAcademyProps {
  content: Record<string, string>;
}

const defaults: Record<string, string> = {
  eyebrow:        "Edukacja",
  heading:        "Zeus Academy",
  subtitle:       "Szkoła mistrzów barberstwa",
  description:    "Zeus Academy to miejsce, gdzie pasja do barberskiego rzemiosła spotyka się z profesjonalną wiedzą. Oferujemy kursy dla amatorów i zaawansowanych barberów, które otwierają drzwi do kariery.",
  feature1:       "Kursy podstawowe i zaawansowane",
  feature2:       "Certyfikaty uznawane w branży",
  feature3:       "Małe grupy — maksymalnie 6 osób",
  feature4:       "Nauka na prawdziwych klientach",
  features_label: "Co oferujemy",
  quote:          "Barberstwo to nie tylko zawód — to rzemiosło, które wymaga serca, cierpliwości i nieustannego doskonalenia.",
  quote_author:   "Oleh Gonipirenko, Założyciel",
  cta:            "Zapisz się na kurs",
  stat1_value:    "3+",
  stat1_label:    "Lata doświadczenia",
  stat2_value:    "6",
  stat2_label:    "Max. osób w grupie",
  stat3_value:    "100%",
  stat3_label:    "Certyfikowane kursy",
};

const FEATURES = ["feature1", "feature2", "feature3", "feature4"] as const;

export default function ZeusAcademy({ content }: ZeusAcademyProps) {
  const c = { ...defaults, ...content };

  const stats = [
    { num: c.stat1_value, label: c.stat1_label },
    { num: c.stat2_value, label: c.stat2_label },
    { num: c.stat3_value, label: c.stat3_label },
  ];

  return (
    <section
      id="academy"
      className="section"
      style={{ background: "#0c0a06" }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "start",
        }}
        className="academy-grid"
      >
        {/* Left column */}
        <ScrollReveal>
          <p className="eyebrow" style={{ marginBottom: "1.2rem" }}>
            {c.eyebrow}
          </p>
          <h2
            className="heading"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", marginBottom: "1.5rem" }}
          >
            {c.heading}
          </h2>
          <div
            style={{
              width: "32px",
              height: "1px",
              background: "var(--gold)",
              opacity: 0.4,
              marginBottom: "2rem",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.92rem",
              lineHeight: 2,
              color: "rgba(240,234,214,0.5)",
              marginBottom: "3rem",
            }}
          >
            {c.description}
          </p>

          {/* Quote block */}
          <blockquote
            style={{
              borderLeft: "2px solid rgba(201,168,76,0.3)",
              paddingLeft: "1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.8rem",
                lineHeight: 1.9,
                color: "rgba(240,234,214,0.45)",
                fontStyle: "italic",
                letterSpacing: "0.03em",
              }}
            >
              &ldquo;{c.quote}&rdquo;
            </p>
            <footer
              style={{
                marginTop: "1rem",
                fontFamily: "var(--font-ui)",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                opacity: 0.6,
              }}
            >
              — {c.quote_author}
            </footer>
          </blockquote>

          <a
            href="https://instagram.com/zeus_hairdress"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${c.cta} — Zeus Academy na Instagramie (otwiera nową kartę)`}
            className="btn-outline"
          >
            {c.cta}
          </a>
        </ScrollReveal>

        {/* Right column — features */}
        <ScrollReveal delay={0.12}>
          <div style={{ paddingTop: "0.5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(240,234,214,0.45)",
                marginBottom: "2rem",
              }}
            >
              {c.features_label}
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {FEATURES.map((key, i) => (
                <li
                  key={key}
                  className="feature-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2rem 1fr",
                    gap: "1.2rem",
                    alignItems: "start",
                    padding: "1.6rem 0",
                    borderBottom: "1px solid rgba(201,168,76,0.08)",
                    transition: "border-color 0.3s ease",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.65rem",
                      color: "var(--gold)",
                      opacity: 0.5,
                      paddingTop: "2px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.88rem",
                      color: "rgba(240,234,214,0.65)",
                      lineHeight: 1.7,
                    }}
                  >
                    {c[key]}
                  </p>
                </li>
              ))}
            </ul>

            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1px",
                background: "rgba(201,168,76,0.08)",
                marginTop: "3rem",
              }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: "#0c0a06",
                    padding: "1.5rem 1rem",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.6rem",
                      fontWeight: 700,
                      color: "var(--gold)",
                      letterSpacing: "0.05em",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {stat.num}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.68rem",
                      color: "rgba(240,234,214,0.5)",
                      lineHeight: 1.5,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .feature-row:hover { border-color: rgba(201,168,76,0.2) !important; }
        @media (max-width: 768px) {
          .academy-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
