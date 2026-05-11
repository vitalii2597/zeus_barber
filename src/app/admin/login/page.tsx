"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Nieprawidłowy email lub hasło.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1
            className="shimmer-text text-4xl font-black tracking-widest uppercase mb-2"
            style={{ fontFamily: "var(--font-cinzel-decorative)" }}
          >
            ZEUS
          </h1>
          <p
            className="text-gold text-xs tracking-[0.4em] uppercase"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Admin Panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-cream/60 text-xs tracking-widest uppercase mb-2"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border border-gold/30 text-cream px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
              style={{ fontFamily: "var(--font-lato)" }}
            />
          </div>

          <div>
            <label
              className="block text-cream/60 text-xs tracking-widest uppercase mb-2"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Hasło
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border border-gold/30 text-cream px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
              style={{ fontFamily: "var(--font-lato)" }}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gold text-bg font-bold tracking-widest uppercase text-sm hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 mt-2"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {loading ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>
      </div>
    </div>
  );
}
