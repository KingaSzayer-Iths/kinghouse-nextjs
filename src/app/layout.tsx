import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KingHouse Design",
  description:
    "Kuraterade ljusstakar och doftljus med fokus på skandinavisk design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Gör att Next.js kan hantera scrollningen korrekt vid navigering
    // även när smooth scrolling används i globals.css
    <html lang="sv" data-scroll-behavior="smooth">
      <body className={geist.variable}>
        <a href="#main-content" className="skip-link">
          Hoppa till huvudinnehåll
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}