"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";
import { navLinks } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border-soft/70">
      <div className="container-page flex items-center justify-between py-3 gap-4">
        <Logo />

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14.5px] font-medium transition-colors pb-1 border-b-2 ${
                  active
                    ? "text-ink border-primary-500"
                    : "text-ink-soft border-transparent hover:text-primary-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button href="/portfoyunuzu-satalim" variant="outline" size="md">
            Portföy Ver
          </Button>
          <Button href="/iletisim" variant="primary" size="md">
            Bize Ulaşın
          </Button>
        </div>

        <button
          type="button"
          aria-label="Menü"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2 text-ink"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border-soft bg-cream">
          <nav className="container-page flex flex-col py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-[15px] font-medium ${
                  pathname === link.href ? "text-primary-600" : "text-ink-soft"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <Button
                href="/portfoyunuzu-satalim"
                variant="outline"
                size="md"
                className="flex-1"
              >
                Portföy Ver
              </Button>
              <Button
                href="/iletisim"
                variant="primary"
                size="md"
                className="flex-1"
              >
                Bize Ulaşın
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
