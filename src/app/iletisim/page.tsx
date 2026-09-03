import Image from "next/image";
import { Phone, Mail, MessageCircle, MapPin, Clock3 } from "lucide-react";
import Button from "@/components/Button";
import OfficeCard from "@/components/OfficeCard";
import CtaBanner from "@/components/CtaBanner";
import ContactForm from "@/components/forms/ContactForm";
import { siteConfig, contactOffices } from "@/lib/site";

const quickContacts = [
  {
    icon: Phone,
    title: "Telefon",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  {
    icon: Mail,
    title: "E-posta",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Hemen Yazın",
    href: siteConfig.whatsappHref,
  },
  {
    icon: MapPin,
    title: "Ofis Ziyareti",
    value: siteConfig.address,
    href: "#ofislerimiz",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-page grid lg:grid-cols-2 gap-10 items-center pt-10 lg:pt-14">
          <div>
            <h1 className="font-extrabold tracking-tight text-4xl sm:text-[42px] leading-[1.15] text-ink">
              Bizimle
              <br />
              İletişime Geçin.
              <br />
              <span className="text-primary-500">
                Doğru Gayrimenkul Çözümü İçin.
              </span>
            </h1>
            <p className="mt-5 text-muted text-[15px] leading-relaxed max-w-md">
              Portföy satışı, gayrimenkul arayışı veya proje satış ofisi
              danışmanlığı için Akın Emlak ile iletişime geçebilirsiniz.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={siteConfig.phoneHref} variant="primary" size="lg" withArrow>
                Bizi Arayın
              </Button>
              <Button href="#iletisim-formu" variant="outline" size="lg">
                Formu Doldurun
              </Button>
            </div>
          </div>
          <div className="relative h-[260px] sm:h-[340px] lg:h-[400px] rounded-3xl overflow-hidden">
            <Image
              src="/images/hero-iletisim.jpg"
              alt="Akın Emlak satış ofisi"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickContacts.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.title}
                href={item.href}
                className="bg-white rounded-2xl border border-border-soft p-4 flex items-center gap-3 hover:border-primary-500 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary-500/10 text-primary-600 flex items-center justify-center shrink-0">
                  <Icon size={17} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[13px] font-semibold text-ink">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted truncate">{item.value}</p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section id="iletisim-formu" className="container-page py-6">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
          <ContactForm />

          <div className="bg-white rounded-2xl border border-border-soft p-6 sm:p-7">
            <h3 className="font-bold text-ink text-lg mb-5">İletişim Bilgileri</h3>
            <ul className="space-y-4 text-sm">
              <InfoRow icon={MapPin} title="Genel Merkez" value={siteConfig.address} />
              <InfoRow icon={Phone} title="Telefon" value={siteConfig.phone} href={siteConfig.phoneHref} />
              <InfoRow icon={Mail} title="E-posta" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
              <InfoRow icon={Clock3} title="Çalışma Saatleri" value={siteConfig.workingHours} />
              <InfoRow
                icon={MessageCircle}
                title="WhatsApp"
                value="Hemen mesaj gönderin"
                href={siteConfig.whatsappHref}
              />
            </ul>
          </div>
        </div>
      </section>

      <section id="ofislerimiz" className="container-page py-10">
        <h2 className="text-xl sm:text-2xl font-bold text-ink text-center mb-8">
          Ofislerimiz
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {contactOffices.map((office) => (
            <OfficeCard
              key={office.name}
              name={office.name}
              district={`${office.address}, ${office.district}`}
              phone={office.phone}
              phoneHref={office.phoneHref}
              image={office.image}
            />
          ))}
        </div>
      </section>

      <section className="container-page pb-10">
        <div className="rounded-2xl overflow-hidden border border-border-soft h-[320px]">
          <iframe
            title="Akın Emlak konum haritası"
            src="https://www.google.com/maps?q=Ata%C5%9Fehir,%20%C4%B0stanbul&output=embed"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <CtaBanner title="Gayrimenkulünüz veya Projeniz İçin Bizimle Hemen İletişime Geçin" />
    </>
  );
}

function InfoRow({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: typeof Phone;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="w-9 h-9 rounded-full bg-primary-500/10 text-primary-600 flex items-center justify-center shrink-0">
        <Icon size={15} />
      </div>
      <div>
        <p className="text-[13px] font-semibold text-ink">{title}</p>
        <p className="text-xs text-muted mt-0.5">{value}</p>
      </div>
    </>
  );

  return (
    <li className="flex items-start gap-3">
      {href ? (
        <a href={href} className="flex items-start gap-3 hover:text-primary-600">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}
