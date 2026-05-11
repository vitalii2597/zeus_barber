import ScrollReveal from "./ScrollReveal";
import type { Service } from "@/lib/supabase/types";

const FALLBACK: Service[] = [
  {
    id: "1",
    name: "Strzyżenie",
    description: "Klasyczne strzyżenie maszynką i nożyczkami",
    price: 60,
    duration_min: 30,
    active: true,
    sort_order: 1,
  },
  {
    id: "2",
    name: "Strzyżenie + Broda",
    description: "Pełen zabieg — włosy i stylizacja brody",
    price: 90,
    duration_min: 50,
    active: true,
    sort_order: 2,
  },
  {
    id: "3",
    name: "Broda",
    description: "Modelowanie i stylizacja brody",
    price: 40,
    duration_min: 20,
    active: true,
    sort_order: 3,
  },
  {
    id: "4",
    name: "Fade",
    description: "Precyzyjny gradient przy skroniach i karku",
    price: 70,
    duration_min: 40,
    active: true,
    sort_order: 4,
  },
  {
    id: "5",
    name: "Hot Towel Shave",
    description: "Tradycyjne golenie brzytwą z gorącym ręcznikiem",
    price: 80,
    duration_min: 45,
    active: true,
    sort_order: 5,
  },
];

interface ServicesProps {
  services: Service[];
  content: Record<string, string>;
}

export default function Services({ services, content }: ServicesProps) {
  const heading     = content.heading     || "Nasze usługi";
  const description = content.description || "Każda wizyta to indywidualne podejście i dbałość o każdy detal.";
  const list = (services.length > 0 ? services : FALLBACK).filter(
    (s) => s.active
  );

  return (
    <section
      id="uslugi"
      className="section"
      style={{ background: "#0c0a06" }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "6rem",
          alignItems: "start",
        }}
        className="services-grid"
      >
        {/* Left — sticky heading */}
        <ScrollReveal>
          <div style={{ position: "sticky", top: "120px" }}>
            <p className="eyebrow" style={{ marginBottom: "1.2rem" }}>
              Cennik
            </p>
            <h2
              className="heading"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                marginBottom: "1.5rem",
              }}
            >
              {heading}
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
                fontSize: "0.85rem",
                lineHeight: 1.9,
                color: "rgba(240,234,214,0.6)",
                marginBottom: "2.5rem",
              }}
            >
              {description}
            </p>
            <a
              href="https://booksy.com/pl-pl/335658_zeus-barber-shop-academy_barber-shop_6832_lublin#ba_s=sh_1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zarezerwuj wizytę przez Booksy (otwiera nową kartę)"
              className="btn-gold"
            >
              Zarezerwuj
            </a>
          </div>
        </ScrollReveal>

        {/* Right — service rows */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {list.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.06}>
              <li
                className="svc-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "start",
                  gap: "2rem",
                  padding: "1.8rem 0",
                  borderBottom: "1px solid rgba(201,168,76,0.08)",
                  transition: "border-color 0.3s ease",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.88rem",
                      letterSpacing: "0.06em",
                      color: "var(--cream)",
                      marginBottom: service.description ? "0.45rem" : 0,
                    }}
                  >
                    {service.name}
                  </p>
                  {service.description && (
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        color: "rgba(240,234,214,0.55)",
                        lineHeight: 1.7,
                      }}
                    >
                      {service.description}
                    </p>
                  )}
                </div>

                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.9rem",
                      color: "var(--gold)",
                      letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {service.price} zł
                  </p>
                  {service.duration_min > 0 && (
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.68rem",
                        color: "rgba(240,234,214,0.4)",
                        marginTop: "0.25rem",
                      }}
                    >
                      {service.duration_min} min
                    </p>
                  )}
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>

      <style>{`
        .svc-row:hover { border-color: rgba(201,168,76,0.22) !important; }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .services-grid > div:first-child > div { position: static !important; }
        }
      `}</style>
    </section>
  );
}
