import Image from "next/image";
import { BedDouble, Ruler, Car, MapPin } from "lucide-react";
import type { Listing } from "@/lib/listings";
import { withBasePath } from "@/lib/paths";

const featureIcons = [Ruler, BedDouble, Car, MapPin];

export default function ListingCard({ listing }: { listing: Listing }) {
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
          {listing.features.map((feature, i) => {
            const Icon = featureIcons[i % featureIcons.length];
            return (
              <span key={feature} className="flex items-center gap-1">
                <Icon size={13} className="text-primary-500" />
                {feature}
              </span>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-soft">
          <span className="font-bold text-ink text-[15px]">
            {listing.price}
          </span>
        </div>
      </div>
    </div>
  );
}
