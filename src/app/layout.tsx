import type { Metadata } from "next";
import { Cinzel_Decorative, Cinzel, Lato } from "next/font/google";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import SkipLink from "@/components/SkipLink";
import "./globals.css";

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Zeus Barber Shop",
  description:
    "Profesjonalny barber shop. Rezerwuj wizytę online przez Booksy.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pl"
      className={`${cinzelDecorative.variable} ${cinzel.variable} ${lato.variable}`}
    >
      <body suppressHydrationWarning>
        <SkipLink />
        <ConditionalNavbar />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
      </body>
    </html>
  );
}
