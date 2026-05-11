"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Service } from "@/lib/supabase/types";

interface ServicesClientProps {
  initialServices: Service[];
}

const emptyService: Omit<Service, "id"> = {
  name: "",
  description: "",
  price: 0,
  duration_min: 30,
  active: true,
  sort_order: 0,
};

export default function ServicesClient({
  initialServices,
}: ServicesClientProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Service, "id">>(emptyService);
  const [showAdd, setShowAdd] = useState(false);
  const supabase = createClient();

  async function handleToggleActive(service: Service) {
    const { data } = await supabase
      .from("services")
      .update({ active: !service.active })
      .eq("id", service.id)
      .select()
      .single();

    if (data) {
      setServices((prev) =>
        prev.map((s) => (s.id === service.id ? (data as Service) : s))
      );
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Usunąć tę usługę?")) return;
    await supabase.from("services").delete().eq("id", id);
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  async function handleSave() {
    if (editingId) {
      const { data } = await supabase
        .from("services")
        .update(form)
        .eq("id", editingId)
        .select()
        .single();

      if (data) {
        setServices((prev) =>
          prev.map((s) => (s.id === editingId ? (data as Service) : s))
        );
      }
      setEditingId(null);
    } else {
      const { data } = await supabase
        .from("services")
        .insert({ ...form, sort_order: services.length })
        .select()
        .single();

      if (data) {
        setServices((prev) => [...prev, data as Service]);
      }
      setShowAdd(false);
    }
    setForm(emptyService);
  }

  function startEdit(service: Service) {
    setEditingId(service.id);
    setForm({
      name: service.name,
      description: service.description ?? "",
      price: service.price,
      duration_min: service.duration_min,
      active: service.active,
      sort_order: service.sort_order,
    });
    setShowAdd(false);
  }

  const isFormOpen = showAdd || editingId !== null;

  return (
    <div>
      {/* Add button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setShowAdd(true);
            setEditingId(null);
            setForm(emptyService);
          }}
          className="px-6 py-3 bg-gold text-bg text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          + Dodaj usługę
        </button>
      </div>

      {/* Form */}
      {isFormOpen && (
        <div className="border border-gold/30 p-6 mb-6 bg-gold/5">
          <h3
            className="text-cream text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {editingId ? "Edytuj usługę" : "Nowa usługa"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-cream/50 text-xs tracking-widest uppercase mb-1"
                style={{ fontFamily: "var(--font-cinzel)" }}>
                Nazwa
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full bg-transparent border border-gold/30 text-cream px-3 py-2 text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-cream/50 text-xs tracking-widest uppercase mb-1"
                style={{ fontFamily: "var(--font-cinzel)" }}>
                Cena (zł)
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                className="w-full bg-transparent border border-gold/30 text-cream px-3 py-2 text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-cream/50 text-xs tracking-widest uppercase mb-1"
                style={{ fontFamily: "var(--font-cinzel)" }}>
                Czas (min)
              </label>
              <input
                type="number"
                value={form.duration_min}
                onChange={(e) => setForm((f) => ({ ...f, duration_min: Number(e.target.value) }))}
                className="w-full bg-transparent border border-gold/30 text-cream px-3 py-2 text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-cream/50 text-xs tracking-widest uppercase mb-1"
                style={{ fontFamily: "var(--font-cinzel)" }}>
                Opis
              </label>
              <input
                value={form.description ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full bg-transparent border border-gold/30 text-cream px-3 py-2 text-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-gold text-bg text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Zapisz
            </button>
            <button
              onClick={() => {
                setShowAdd(false);
                setEditingId(null);
              }}
              className="px-6 py-2 border border-gold/30 text-gold/60 text-xs tracking-widest uppercase hover:border-gold hover:text-gold transition-colors"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Anuluj
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="border border-gold/10">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gold/10">
              {["Usługa", "Opis", "Cena", "Czas", "Status", "Akcje"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-gold/60 text-xs tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service.id}
                className="border-b border-gold/5 hover:bg-gold/5 transition-colors"
              >
                <td className="px-4 py-4 text-cream text-sm font-medium">
                  {service.name}
                </td>
                <td className="px-4 py-4 text-cream/50 text-sm max-w-xs truncate">
                  {service.description ?? "—"}
                </td>
                <td className="px-4 py-4 text-gold text-sm font-semibold">
                  {service.price} zł
                </td>
                <td className="px-4 py-4 text-cream/50 text-sm">
                  {service.duration_min} min
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => handleToggleActive(service)}
                    className={`px-3 py-1 text-xs tracking-widest uppercase transition-colors ${
                      service.active
                        ? "bg-gold/20 text-gold hover:bg-gold/30"
                        : "bg-cream/5 text-cream/30 hover:bg-cream/10"
                    }`}
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    {service.active ? "Aktywna" : "Ukryta"}
                  </button>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(service)}
                      className="text-xs text-gold/60 hover:text-gold transition-colors tracking-widest uppercase"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      Edytuj
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-xs text-red-500/60 hover:text-red-400 transition-colors tracking-widest uppercase"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      Usuń
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {services.length === 0 && (
          <p className="text-center text-cream/30 text-sm py-12">
            Brak usług. Dodaj pierwszą usługę.
          </p>
        )}
      </div>
    </div>
  );
}
