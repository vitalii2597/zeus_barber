"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const NAV_LINKS = [
  { href: "#rezerwacja", label: "Rezerwacja" },
  { href: "#academy", label: "Academy" },
  { href: "#galeria", label: "Galeria" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Scroll state
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Drawer animation
  useEffect(() => {
    if (!drawerRef.current) return;
    if (open) {
      gsap.to(drawerRef.current, { x: "0%", duration: 0.4, ease: "power3.out" });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(drawerRef.current, { x: "100%", duration: 0.35, ease: "power3.in" });
      document.body.style.overflow = "";
    }
  }, [open]);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith("#")) {
      e.preventDefault();
      setOpen(false);
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          height: scrolled ? "64px" : "80px",
          background: scrolled ? "rgba(10,12,22,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "1px solid transparent",
          transition: "height 0.4s ease, background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          style={{ textDecoration: "none", display: "flex", alignItems: "center", lineHeight: 1 }}
        >
          <Image
            src="/zeus-emblem.png"
            alt="Zeus Barber Shop"
            width={206}
            height={152}
            style={{
              height: "44px",
              width: "auto",
              display: "block",
            }}
          />
        </a>

        {/* Desktop nav */}
        <nav
          aria-label="Nawigacja główna"
          style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--gold)" : "rgba(240,234,214,0.65)",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                  padding: "0.75rem 0",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {link.label}
              </a>
            );
          })}

          <a
            href="https://booksy.com/pl-pl/335658_zeus-barber-shop-academy_barber-shop_6832_lublin#ba_s=sh_1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Zarezerwuj wizytę przez Booksy (otwiera nową kartę)"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--bg)",
              background: "var(--gold)",
              textDecoration: "none",
              padding: "0.65rem 1.4rem",
              transition: "background 0.25s ease",
              display: "inline-flex",
              alignItems: "center",
              minHeight: "44px",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--gold-light)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--gold)")}
          >
            Booksy
          </a>
        </nav>

        {/* Hamburger */}
        <button
          ref={hamburgerRef}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          className="hamburger-btn"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "1px",
                background: "var(--gold)",
                opacity: i === 1 && open ? 0 : 1,
                transform:
                  i === 0 && open
                    ? "translateY(6px) rotate(45deg)"
                    : i === 2 && open
                    ? "translateY(-6px) rotate(-45deg)"
                    : "none",
                transition: "transform 0.3s ease, opacity 0.2s ease",
              }}
            />
          ))}
        </button>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu nawigacyjne"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "280px",
          background: "rgba(10,12,22,0.98)",
          borderLeft: "1px solid rgba(201,168,76,0.12)",
          zIndex: 99,
          transform: "translateX(100%)",
          display: "flex",
          flexDirection: "column",
          padding: "6rem 2.5rem 3rem",
          gap: "0.5rem",
        }}
      >
        <nav aria-label="Menu mobilne">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                display: "block",
                fontFamily: "var(--font-ui)",
                fontSize: "0.9rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(240,234,214,0.75)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(201,168,76,0.08)",
                padding: "1.1rem 0",
                minHeight: "44px",
                transition: "color 0.2s ease",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="https://booksy.com/pl-pl/335658_zeus-barber-shop-academy_barber-shop_6832_lublin#ba_s=sh_1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Zarezerwuj wizytę przez Booksy (otwiera nową kartę)"
          className="btn-gold"
          style={{ textAlign: "center", marginTop: "1.5rem", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          Zarezerwuj
        </a>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 98,
            background: "rgba(0,0,0,0.5)",
          }}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
