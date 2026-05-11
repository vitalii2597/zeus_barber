"use client";

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: "fixed",
        top: "-100%",
        left: "1rem",
        zIndex: 9999,
        padding: "0.75rem 1.5rem",
        background: "var(--gold)",
        color: "var(--bg)",
        fontFamily: "var(--font-ui)",
        fontSize: "0.75rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        textDecoration: "none",
        transition: "top 0.2s ease",
      }}
      onFocus={(e) => { (e.currentTarget as HTMLElement).style.top = "1rem"; }}
      onBlur={(e) => { (e.currentTarget as HTMLElement).style.top = "-100%"; }}
    >
      Przejdź do treści
    </a>
  );
}
