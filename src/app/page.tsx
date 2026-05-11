import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import CTAStrip from "@/components/CTAStrip";
import Services from "@/components/Services";
import Rezerwacja from "@/components/Rezerwacja";
import Galeria, { GaleriaSkeleton } from "@/components/Galeria";
import ZeusAcademy from "@/components/ZeusAcademy";
import Kontakt from "@/components/Kontakt";
import type { GalleryImage, Service } from "@/lib/supabase/types";

export const revalidate = 60;

async function getContent() {
  try {
    const supabase = await createClient();
    const { data: contentRows } = await supabase.from("content").select("*");

    const content: Record<string, Record<string, string>> = {};
    for (const row of contentRows ?? []) {
      if (!content[row.section]) content[row.section] = {};
      content[row.section][row.key] = row.value;
    }
    return content;
  } catch {
    return {};
  }
}

async function getServices(): Promise<Service[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    return (data ?? []) as Service[];
  } catch {
    return [];
  }
}

async function GaleriaSection({ content }: { content: Record<string, string> }) {
  try {
    const supabase = await createClient();
    const { data: images } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true });
    return <Galeria images={(images ?? []) as GalleryImage[]} content={content} />;
  } catch {
    return <Galeria images={[]} content={content} />;
  }
}

export default async function Home() {
  const [content, services] = await Promise.all([getContent(), getServices()]);

  return (
    <SmoothScroll>
      <main>
        <Hero content={content.hero ?? {}} />
        <CTAStrip />
        <Services services={services} content={content.services ?? {}} />
        <Rezerwacja content={content.rezerwacja ?? {}} />
        <Suspense fallback={<GaleriaSkeleton />}>
          <GaleriaSection content={content.galeria ?? {}} />
        </Suspense>
        <ZeusAcademy content={content.academy ?? {}} />
        <Kontakt content={content.contact ?? {}} />
      </main>
    </SmoothScroll>
  );
}
