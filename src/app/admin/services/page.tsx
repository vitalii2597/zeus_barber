import { createClient } from "@/lib/supabase/server";
import ServicesClient from "./ServicesClient";
import type { Service } from "@/lib/supabase/types";

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1
          className="text-2xl font-bold tracking-widest uppercase text-cream mb-1"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Usługi
        </h1>
        <p className="text-cream/40 text-sm">
          Zarządzaj cennikiem i listą usług
        </p>
      </div>

      <ServicesClient initialServices={(data ?? []) as Service[]} />
    </div>
  );
}
