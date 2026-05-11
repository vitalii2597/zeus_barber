import Image from "next/image";
import type { GalleryImage } from "@/lib/supabase/types";
import ScrollReveal from "./ScrollReveal";

export function GaleriaSkeleton() {
  return (
    <section
      id="galeria"
      className="section"
      style={{ background: "var(--bg)", paddingLeft: 0, paddingRight: 0 }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="text-center" style={{ marginBottom: "4rem" }}>
          <div style={{ width: "80px", height: "10px", background: "rgba(201,168,76,0.15)", margin: "0 auto 1.2rem", borderRadius: "2px" }} />
          <div style={{ width: "180px", height: "36px", background: "rgba(201,168,76,0.1)", margin: "0 auto 1.5rem", borderRadius: "2px" }} />
          <div style={{ width: "40px", height: "1px", background: "rgba(201,168,76,0.2)", margin: "0 auto" }} />
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "3px",
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="skeleton-cell"
            style={{ aspectRatio: "1 / 1", background: "rgba(201,168,76,0.06)" }}
          />
        ))}
      </div>
      <style>{`
        @keyframes skeletonPulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        .skeleton-cell { animation: skeletonPulse 1.6s ease-in-out infinite; }
        .skeleton-cell:nth-child(2n) { animation-delay:.2s; }
        .skeleton-cell:nth-child(3n) { animation-delay:.4s; }
        @media (prefers-reduced-motion:reduce) { .skeleton-cell { animation:none; } }
      `}</style>
    </section>
  );
}

interface GaleriaProps {
  images: GalleryImage[];
  content: Record<string, string>;
}

/* Editorial grid — every 5th item spans 2 cols, every 7th spans 2 rows */
function getSpan(i: number): { colSpan?: number; rowSpan?: number } {
  if (i === 0) return { colSpan: 2, rowSpan: 2 };
  if (i === 4) return { colSpan: 2 };
  return {};
}

export default function Galeria({ images, content }: GaleriaProps) {
  const heading = content.heading || "Galeria";
  const hasImages = images.length > 0;
  const displayItems = hasImages ? images : Array.from({ length: 9 });

  return (
    <section
      id="galeria"
      className="section"
      style={{
        background: "var(--bg)",
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <ScrollReveal
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>
              Nasze prace
            </p>
            <h2
              className="heading"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
            >
              {heading}
            </h2>
          </div>
          <a
            href="https://instagram.com/zeus_hairdress"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Więcej prac na Instagramie @zeus_hairdress (otwiera nową kartę)"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.68rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--gold)",
              textDecoration: "none",
              opacity: 0.7,
              paddingBottom: "3px",
              borderBottom: "1px solid rgba(201,168,76,0.3)",
              transition: "opacity 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            @zeus_hairdress →
          </a>
        </ScrollReveal>
      </div>

      {/* Editorial grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "300px",
          gap: "3px",
        }}
        className="gallery-grid"
      >
        {displayItems.map((img, i) => {
          const { colSpan, rowSpan } = getSpan(i);
          return (
            <ScrollReveal
              key={hasImages ? (img as GalleryImage).id : i}
              delay={Math.min(i * 0.04, 0.3)}
              style={{
                gridColumn: colSpan ? `span ${colSpan}` : undefined,
                gridRow: rowSpan ? `span ${rowSpan}` : undefined,
                position: "relative",
                overflow: "hidden",
                background: "rgba(201,168,76,0.04)",
              }}
            >
              {hasImages ? (
                <Image
                  src={(img as GalleryImage).url}
                  alt={(img as GalleryImage).alt ?? "Zeus Barber Shop"}
                  fill
                  className="gallery-img object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <svg
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id={`hatch-${i}`}
                      width="12"
                      height="12"
                      patternUnits="userSpaceOnUse"
                      patternTransform="rotate(45)"
                    >
                      <line
                        x1="0" y1="0" x2="0" y2="12"
                        stroke="rgba(201,168,76,0.07)"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#hatch-${i})`} />
                </svg>
              )}
              <div className="gallery-overlay" />
            </ScrollReveal>
          );
        })}
      </div>

      <style>{`
        .gallery-img { transition: transform 0.7s ease; }
        .gallery-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,12,22,0.5) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .gallery-grid > div:hover .gallery-img { transform: scale(1.06); }
        .gallery-grid > div:hover .gallery-overlay { opacity: 1; }
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 220px !important; }
        }
        @media (max-width: 480px) {
          .gallery-grid { grid-auto-rows: 180px !important; }
        }
      `}</style>
    </section>
  );
}
