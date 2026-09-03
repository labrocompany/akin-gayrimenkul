import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import { withBasePath } from "@/lib/paths";

export default function OfficeCard({
  name,
  subtitle,
  district,
  phone,
  phoneHref,
  image,
}: {
  name: string;
  subtitle?: string;
  district: string;
  phone: string;
  phoneHref: string;
  image: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border-soft p-3 flex gap-3 items-start hover:shadow-lg hover:shadow-black/5 transition-shadow">
      <div className="relative w-[76px] h-[76px] rounded-xl overflow-hidden shrink-0">
        <Image src={withBasePath(image)} alt={name} fill sizes="80px" className="object-cover" />
      </div>
      <div className="min-w-0">
        <h4 className="font-semibold text-ink text-[13.5px] leading-snug">
          {name}
          {subtitle && <span className="block text-ink-soft">{subtitle}</span>}
        </h4>
        <p className="text-xs text-muted mt-1">{district}</p>
        <a
          href={phoneHref}
          className="flex items-center gap-1.5 text-xs text-ink-soft mt-1.5 hover:text-primary-600"
        >
          <Phone size={12} className="text-primary-500" />
          {phone}
        </a>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(district)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-semibold text-primary-600 mt-1.5 hover:gap-1.5 transition-all"
        >
          Yol Tarifi Al <ArrowRight size={12} />
        </a>
      </div>
    </div>
  );
}
