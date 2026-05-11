"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminLogoutButton from "./AdminLogoutButton";

const NAV_LINKS = [
  { href: "/admin",          label: "Dashboard", icon: "◆" },
  { href: "/admin/gallery",  label: "Galeria",   icon: "◈" },
  { href: "/admin/services", label: "Usługi",    icon: "◉" },
  { href: "/admin/content",  label: "Treści",    icon: "✦" },
];

interface AdminShellProps {
  children: React.ReactNode;
  userEmail?: string;
}

export default function AdminShell({ children, userEmail }: AdminShellProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);
  }

  return (
    <div className="min-h-screen flex bg-bg">
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-56 flex flex-col
          border-r border-gold/10 bg-bg
          transition-transform duration-300
          md:static md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="p-6 border-b border-gold/10">
          <p
            className="shimmer text-xl font-black tracking-widest uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ZEUS
          </p>
          <p
            className="text-xs tracking-widest uppercase mt-1 text-gold/50"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Admin
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ fontFamily: "var(--font-ui)" }}
                className={`
                  flex items-center gap-3 px-6 py-3 text-xs tracking-widest uppercase
                  border-l-2 transition-all
                  ${active
                    ? "border-gold bg-gold/5 text-gold"
                    : "border-transparent text-cream/50 hover:text-gold hover:bg-gold/5 hover:border-gold/30"
                  }
                `}
              >
                <span className="text-base opacity-70" aria-hidden="true">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User + logout */}
        <div className="p-6 border-t border-gold/10">
          {userEmail && (
            <p
              className="text-xs mb-3 truncate text-cream/35"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {userEmail}
            </p>
          )}
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-bg border-b border-gold/10">
          <p
            className="shimmer text-lg font-black tracking-widest uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ZEUS
          </p>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            className="p-2 text-gold text-xl leading-none"
          >
            {open ? "✕" : "☰"}
          </button>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
