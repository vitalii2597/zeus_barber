"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import HeroCanvas from "./HeroCanvas";

interface HeroProps {
  content: Record<string, string>;
}

export default function Hero({ content }: HeroProps) {
  const tagline    = content.tagline     || "Barber Shop · Est 2022";
  const description = content.description || "Sztuka strzyżenia. Precyzja w każdym detalu.";
  const ctaPrimary  = content.cta_primary  || "Zarezerwuj wizytę";
  const ctaSecondary = content.cta_secondary || "Zobacz prace";
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.0,
        ease: "power3.out",
        delay: 0.5,
      });
      gsap.from(metaRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 1.0,
      });
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: "power3.out",
        delay: 1.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100svh",
        background: "var(--bg)",
        overflow: "hidden",
      }}
    >
      <HeroCanvas />

      {/* Bottom fade */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background: "linear-gradient(to top, var(--bg), transparent)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 2rem",
        }}
      >
        {/* Logo */}
        <div
          ref={logoRef}
          style={{ marginBottom: "1.5rem" }}
        >
          <Image
            src="/zeus-emblem.png"
            alt="Zeus Barber Shop emblem"
            width={206}
            height={152}
            priority
            style={{
              width: "clamp(182px, 29vw, 338px)",
              height: "auto",
              display: "block",
            }}
          />
        </div>

        <h1
          ref={titleRef}
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "clamp(3.6rem, 14.4vw, 13.2rem)",
            fontWeight: 700,
            letterSpacing: "0.12em",
            lineHeight: 0.88,
            color: "var(--cream)",
            textAlign: "center",
            marginBottom: "2.5rem",
          }}
        >
          ZEUS
        </h1>

        {/* Horizontal rule with label */}
        <div
          ref={metaRef}
          style={{
            width: "100%",
            maxWidth: "540px",
            textAlign: "center",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.2rem",
              marginBottom: "1.6rem",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.3)" }} />
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.68rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "var(--gold)",
                whiteSpace: "nowrap",
                opacity: 0.85,
              }}
            >
              {tagline}
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.3)" }} />
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
              lineHeight: 1.9,
              color: "rgba(240,234,214,0.6)",
            }}
          >
            {description}
          </p>
        </div>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="https://booksy.com/pl-pl/335658_zeus-barber-shop-academy_barber-shop_6832_lublin#ba_s=sh_1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Zarezerwuj wizytę przez Booksy (otwiera nową kartę)"
            className="btn-gold"
          >
            {ctaPrimary}
          </a>
          <a href="#galeria" className="btn-outline">
            {ctaSecondary}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.45)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "44px",
            background: "linear-gradient(to bottom, rgba(201,168,76,0.45), transparent)",
          }}
        />
      </div>
    </section>
  );
}
