import { createClient } from "@/lib/supabase/server";
import ContentClient from "./ContentClient";
import type { Content } from "@/lib/supabase/types";

export default async function AdminContentPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("content").select("*");

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1
          className="text-2xl font-bold tracking-widest uppercase text-cream mb-1"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Treści
        </h1>
        <p className="text-cream/40 text-sm">
          Edytuj teksty na stronie głównej
        </p>
      </div>

      <ContentClient initialContent={(data ?? []) as Content[]} />
    </div>
  );
}
