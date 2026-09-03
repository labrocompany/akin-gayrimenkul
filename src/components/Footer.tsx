import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Logo from "./Logo";
import { siteConfig } from "@/lib/site";
import { InstagramIcon, FacebookIcon, LinkedinIcon } from "./SocialIcons";

const hizmetler = [
  { label: "Portföy Alımı", href: "/portfoyler" },
  { label: "Portföy Satımı", href: "/portfoyunuzu-satalim" },
  { label: "Proje Satış & Danışmanlık", href: "/proje-satis-danismanlik" },
  { label: "Yetkili Satış Ofisi Danışmanlığı", href: "/proje-satis-danismanlik" },
  { label: "Gayrimenkul Değerleme", href: "/portfoyunuzu-satalim" },
];

const kurumsal = [
  { label: "Hakkımızda", href: "/iletisim" },
  { label: "Ekibimiz", href: "/iletisim" },
  { label: "Referanslarımız", href: "/portfoyler" },
  { label: "Kariyer", href: "/iletisim" },
  { label: "Blog", href: "/" },
];

const portfoyler = [
  { label: "Konut", href: "/portfoyler?kategori=konut" },
  { label: "Ticari", href: "/portfoyler?kategori=ticari" },
  { label: "Arsa", href: "/portfoyler?kategori=arsa" },
  { label: "Projeler", href: "/portfoyler?kategori=proje" },
  { label: "Yatırım Fırsatları", href: "/portfoyler?kategori=yatirim" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-cream-dark">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.1fr] gap-10">
          <div>
            <Logo className="items-start" />
            <p className="text-sm text-muted mt-4 max-w-[240px] leading-relaxed">
              Gayrimenkulde doğru strateji, doğru alıcı ve doğru sonuç için
              yanınızdayız.
            </p>
          </div>

          <FooterColumn title="Hizmetlerimiz" items={hizmetler} />
          <FooterColumn title="Kurumsal" items={kurumsal} />
          <FooterColumn title="Portföyler" items={portfoyler} />

          <div>
            <h4 className="font-semibold text-ink mb-4">İletişim</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-primary-500 shrink-0" />
                <a href={siteConfig.phoneHref} className="hover:text-primary-600">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-primary-500 shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-primary-600"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
            <h4 className="font-semibold text-ink mt-6 mb-3">Bizi Takip Edin</h4>
            <div className="flex items-center gap-3">
              <SocialIcon href={siteConfig.social.instagram}>
                <InstagramIcon size={16} />
              </SocialIcon>
              <SocialIcon href={siteConfig.social.facebook}>
                <FacebookIcon size={16} />
              </SocialIcon>
              <SocialIcon href={siteConfig.social.linkedin}>
                <LinkedinIcon size={16} />
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-soft flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>
            © {new Date().getFullYear()} Akın Emlak Gayrimenkul &amp;
            Danışmanlık. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-primary-600">
              Gizlilik Politikası
            </Link>
            <Link href="/" className="hover:text-primary-600">
              KVKK
            </Link>
            <Link href="/" className="hover:text-primary-600">
              Kullanım Şartları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-semibold text-ink mb-4">{title}</h4>
      <ul className="space-y-2.5 text-sm text-muted">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="hover:text-primary-600">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full bg-secondary-500/10 text-secondary-600 flex items-center justify-center hover:bg-secondary-500 hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}
