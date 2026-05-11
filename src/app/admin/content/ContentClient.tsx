"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Content } from "@/lib/supabase/types";

interface ContentClientProps {
  initialContent: Content[];
}

const LONG_FIELDS = new Set(["description", "founder_bio", "quote", "footer_tagline"]);

const SECTIONS = [
  {
    id: "hero",
    label: "Hero",
    fields: [
      { key: "tagline",       label: "Tagline",           placeholder: "Barber Shop · Est 2022" },
      { key: "description",   label: "Opis",              placeholder: "Sztuka strzyżenia. Precyzja w każdym detalu." },
      { key: "cta_primary",   label: "Przycisk główny",   placeholder: "Zarezerwuj wizytę" },
      { key: "cta_secondary", label: "Przycisk drugi",    placeholder: "Zobacz prace" },
    ],
  },
  {
    id: "rezerwacja",
    label: "Rezerwacja",
    fields: [
      { key: "eyebrow",     label: "Eyebrow",          placeholder: "Umów się online" },
      { key: "heading",     label: "Nagłówek",         placeholder: "Zarezerwuj wizytę" },
      { key: "description", label: "Opis",             placeholder: "Szybko, wygodnie, bez telefonowania. Booksy dostępny 24/7." },
      { key: "cta_booksy",  label: "Przycisk Booksy",  placeholder: "Otwórz Booksy" },
      { key: "phone",       label: "Telefon",          placeholder: "452 353 324" },
    ],
  },
  {
    id: "galeria",
    label: "Galeria",
    fields: [
      { key: "heading", label: "Nagłówek", placeholder: "Galeria" },
    ],
  },
  {
    id: "services",
    label: "Usługi — sekcja",
    fields: [
      { key: "heading",     label: "Nagłówek", placeholder: "Nasze usługi" },
      { key: "description", label: "Opis",     placeholder: "Każda wizyta to indywidualne podejście i dbałość o każdy detal." },
    ],
  },
  {
    id: "academy",
    label: "Zeus Academy",
    fields: [
      { key: "eyebrow",        label: "Eyebrow",           placeholder: "Edukacja" },
      { key: "heading",        label: "Nagłówek",          placeholder: "Zeus Academy" },
      { key: "subtitle",       label: "Podtytuł",          placeholder: "Szkoła mistrzów barberstwa" },
      { key: "description",    label: "Opis",              placeholder: "Zeus Academy to miejsce..." },
      { key: "features_label", label: "Etykieta cech",     placeholder: "Co oferujemy" },
      { key: "feature1",       label: "Cecha 1",           placeholder: "Kursy podstawowe i zaawansowane" },
      { key: "feature2",       label: "Cecha 2",           placeholder: "Certyfikaty uznawane w branży" },
      { key: "feature3",       label: "Cecha 3",           placeholder: "Małe grupy — maksymalnie 6 osób" },
      { key: "feature4",       label: "Cecha 4",           placeholder: "Nauka na prawdziwych klientach" },
      { key: "quote",          label: "Cytat",             placeholder: "Barberstwo to nie tylko zawód..." },
      { key: "quote_author",   label: "Autor cytatu",      placeholder: "Oleh Gonipirenko, Założyciel" },
      { key: "cta",            label: "Przycisk",          placeholder: "Zapisz się na kurs" },
      { key: "stat1_value",    label: "Statystyka 1 — wartość", placeholder: "3+" },
      { key: "stat1_label",    label: "Statystyka 1 — opis",    placeholder: "Lata doświadczenia" },
      { key: "stat2_value",    label: "Statystyka 2 — wartość", placeholder: "6" },
      { key: "stat2_label",    label: "Statystyka 2 — opis",    placeholder: "Max. osób w grupie" },
      { key: "stat3_value",    label: "Statystyka 3 — wartość", placeholder: "100%" },
      { key: "stat3_label",    label: "Statystyka 3 — opis",    placeholder: "Certyfikowane kursy" },
    ],
  },
  {
    id: "contact",
    label: "Kontakt",
    fields: [
      { key: "eyebrow",        label: "Eyebrow",           placeholder: "Kontakt" },
      { key: "heading",        label: "Nagłówek",          placeholder: "Znajdź nas" },
      { key: "founder_name",   label: "Imię założyciela",  placeholder: "Oleh Gonipirenko" },
      { key: "founder_bio",    label: "Opis założyciela",  placeholder: "Pasjonat barberstwa z wieloletnim doświadczeniem..." },
      { key: "address",        label: "Adres",             placeholder: "ul. Przykładowa 1, Lublin" },
      { key: "phone",          label: "Telefon",           placeholder: "452 353 324" },
      { key: "instagram",      label: "Instagram",         placeholder: "@zeus_hairdress" },
      { key: "footer_tagline", label: "Tagline w stopce",  placeholder: "Sztuka strzyżenia. Precyzja w każdym detalu." },
    ],
  },
];

export default function ContentClient({ initialContent }: ContentClientProps) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    for (const row of initialContent) {
      map[`${row.section}:${row.key}`] = row.value;
    }
    return map;
  });
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const supabase = createClient();

  async function handleSave(section: string, key: string) {
    const fieldKey = `${section}:${key}`;
    setSaving(fieldKey);

    const value = values[fieldKey] ?? "";

    const existing = initialContent.find(
      (c) => c.section === section && c.key === key
    );

    if (existing) {
      await supabase
        .from("content")
        .update({ value, updated_at: new Date().toISOString() })
        .eq("id", existing.id);
    } else {
      await supabase.from("content").insert({ section, key, value });
    }

    setSaving(null);
    setSaved(fieldKey);
    setTimeout(() => setSaved(null), 2000);
  }

  return (
    <div className="space-y-10">
      {SECTIONS.map((section) => (
        <div key={section.id} className="border border-gold/10 p-6">
          <h3
            className="text-gold text-sm font-semibold tracking-widest uppercase mb-6 pb-4 border-b border-gold/10"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {section.label}
          </h3>

          <div className="space-y-6">
            {section.fields.map((field) => {
              const fieldKey = `${section.id}:${field.key}`;
              const isSaving = saving === fieldKey;
              const isSaved = saved === fieldKey;

              return (
                <div key={field.key}>
                  <label
                    className="block text-cream/50 text-xs tracking-widest uppercase mb-2"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    {field.label}
                  </label>
                  <div className="flex gap-3">
                    <textarea
                      value={values[fieldKey] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(e) =>
                        setValues((v) => ({
                          ...v,
                          [fieldKey]: e.target.value,
                        }))
                      }
                      rows={LONG_FIELDS.has(field.key) ? 4 : 2}
                      className="flex-1 bg-transparent border border-gold/20 text-cream text-sm px-3 py-2 focus:outline-none focus:border-gold resize-none transition-colors placeholder:text-cream/20"
                      style={{ fontFamily: "var(--font-lato)" }}
                    />
                    <button
                      onClick={() => handleSave(section.id, field.key)}
                      disabled={isSaving}
                      className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors self-start ${
                        isSaved
                          ? "bg-green-900/50 text-green-400"
                          : "bg-gold text-bg hover:bg-gold-light"
                      } disabled:opacity-50`}
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      {isSaving ? "..." : isSaved ? "✓" : "Zapisz"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
