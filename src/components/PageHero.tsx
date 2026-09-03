import Image from "next/image";
import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  image,
  imageAlt,
  actions,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description: string;
  image: string;
  imageAlt: string;
  actions?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page grid lg:grid-cols-2 gap-10 items-center py-12 lg:py-16">
        <div className="relative z-10">
          {eyebrow && (
            <p className="text-primary-600 font-semibold text-sm mb-3 tracking-wide">
              {eyebrow}
            </p>
          )}
          <h1
            className={`font-extrabold tracking-tight text-ink ${
              compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"
            } leading-[1.12]`}
          >
            {title}
            {highlight && (
              <>
                <br />
                <span className="text-primary-500">{highlight}</span>
              </>
            )}
          </h1>
          <p className="mt-5 text-muted text-[15px] leading-relaxed max-w-md">
            {description}
          </p>
          {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
        </div>

        <div className="relative h-[280px] sm:h-[340px] lg:h-[400px] rounded-3xl overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/40 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
