import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/paths";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 shrink-0 ${className}`}
    >
      <div className="relative w-11 h-11 shrink-0">
        <Image
          src={withBasePath("/images/logo.png")}
          alt="Akın Emlak Gayrimenkul & Danışmanlık"
          fill
          sizes="44px"
          className="object-contain"
          priority
        />
      </div>
      <div className="leading-tight">
        <div className="font-extrabold tracking-wide text-ink text-[15px]">
          AKIN
        </div>
        <div className="text-[8px] font-semibold tracking-wider text-primary-500 leading-[1.35]">
          EMLAK GAYRİMENKUL
          <br />
          &amp; DANIŞMANLIK
        </div>
      </div>
    </Link>
  );
}
