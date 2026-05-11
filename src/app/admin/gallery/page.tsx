import { createClient } from "@/lib/supabase/server";
import GalleryClient from "./GalleryClient";
import type { GalleryImage } from "@/lib/supabase/types";

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1
          className="text-2xl font-bold tracking-widest uppercase text-cream mb-1"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Galeria
        </h1>
        <p className="text-cream/40 text-sm">
          Przeciągnij zdjęcia aby zmienić kolejność
        </p>
      </div>

      <GalleryClient initialImages={(data ?? []) as GalleryImage[]} />
    </div>
  );
}
