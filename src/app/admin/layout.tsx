import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Yönetim Paneli | Akın Emlak Gayrimenkul",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-full flex-1 bg-cream-dark">{children}</div>;
}
