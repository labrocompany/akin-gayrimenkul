import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Akın Emlak Gayrimenkul & Danışmanlık",
  description:
    "Bireysel portföy satışından büyük ölçekli projelerin satış yönetimine kadar tüm süreci profesyonel ekibimizle birlikte yönetiyoruz.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
