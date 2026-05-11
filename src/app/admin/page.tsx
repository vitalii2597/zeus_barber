import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ count: galleryCount }, { count: servicesCount }] = await Promise.all([
    supabase
      .from("gallery_images")
      .select("*", { count: "exact", head: true }),
    supabase.from("services").select("*", { count: "exact", head: true }),
  ]);

  const cards = [
    {
      title: "Galeria",
      desc: `${galleryCount ?? 0} zdjęć`,
      href: "/admin/gallery",
      icon: "◈",
    },
    {
      title: "Usługi",
      desc: `${servicesCount ?? 0} pozycji`,
      href: "/admin/services",
      icon: "◉",
    },
    {
      title: "Treści",
      desc: "Hero, Academy, Kontakt",
      href: "/admin/content",
      icon: "✦",
    },
    {
      title: "Strona główna",
      desc: "Podgląd witryny",
      href: "/",
      icon: "◆",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-10">
        <h1
          className="text-2xl font-bold tracking-widest uppercase text-cream mb-1"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Dashboard
        </h1>
        <p className="text-cream/40 text-sm">Witaj w panelu admina Zeus Barber Shop</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="border border-gold/20 p-6 hover:border-gold/60 transition-colors group"
          >
            <div className="text-gold text-2xl mb-4 group-hover:scale-110 transition-transform">
              {card.icon}
            </div>
            <p
              className="text-cream text-sm font-semibold tracking-widest uppercase mb-1"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {card.title}
            </p>
            <p className="text-cream/50 text-xs">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
