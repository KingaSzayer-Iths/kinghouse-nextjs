import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

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
    <html lang="sv">
      <body className={geist.variable}>
        <a href="#main-content" className="skip-link">
          Hoppa till huvudinnehåll
        </a>

        {children}
      </body>
    </html>
  );
}