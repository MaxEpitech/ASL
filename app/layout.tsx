import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ASL Jeux Écossais - Association des Jeux Écossais",
    template: "%s | ASL Jeux Écossais",
  },
  description: "Association des Jeux Écossais - Découvrez les Highland Games en France. Prestations pour mariages, festivals, team building et événements d'entreprise.",
  keywords: ["jeux écossais", "highland games", "mariages", "team building", "festivals", "luzarches", "événements écossais"],
  authors: [{ name: "ASL Jeux Écossais" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "ASL Jeux Écossais",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${robotoSlab.variable}`}>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
