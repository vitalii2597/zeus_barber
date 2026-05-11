"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full py-2 border border-gold/30 text-gold/60 text-xs tracking-widest uppercase hover:border-gold hover:text-gold transition-colors"
      style={{ fontFamily: "var(--font-cinzel)" }}
    >
      Wyloguj
    </button>
  );
}
