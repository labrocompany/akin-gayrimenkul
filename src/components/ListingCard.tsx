import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { Listing } from "@/lib/listings";
import { withBasePath } from "@/lib/paths";

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const detailLink = listing.link && isHttpUrl(listing.link) ? listing.link : "";
  return (
    <div className="group bg-white rounded-2xl border border-border-soft overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-shadow">
      <div className="relative h-[170px] w-full">
        <Image
          src={withBasePath(listing.image)}
          alt={listing.title}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
        />
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold text-white ${
            listing.status === "SATILIK" ? "bg-secondary-600/90" : "bg-ink/70"
          }`}
        >
          {listing.status}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-ink text-[15px]">{listing.title}</h3>
        <p className="text-xs text-muted mt-1">
          {listing.district} / {listing.city}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-[11.5px] text-muted">
          {listing.features.map((feature) => (
            <span key={feature}>{feature}</span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-border-soft">
          <span className="font-bold text-ink text-[15px]">
            {listing.price}
          </span>
          {detailLink ? (
            <a
              href={detailLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-sm font-semibold text-primary-600 hover:text-primary-700 shrink-0"
            >
              Devamı
              <ChevronRight size={15} />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
