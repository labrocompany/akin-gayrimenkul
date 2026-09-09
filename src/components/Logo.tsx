import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/paths";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center shrink-0 ${className}`}>
      <Image
        src={withBasePath("/images/logo.png")}
        alt="Akın Emlak Gayrimenkul & Danışmanlık"
        width={225}
        height={181}
        className="h-14 w-auto object-contain"
        priority
      />
    </Link>
  );
}
