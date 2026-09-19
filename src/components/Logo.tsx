import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/paths";

const sizes = {
  sm: "h-14 w-auto object-contain",
  md: "h-16 sm:h-[4.5rem] w-auto object-contain",
  lg: "h-[4.5rem] sm:h-24 w-auto object-contain",
};

export default function Logo({
  className = "",
  size = "lg",
}: {
  className?: string;
  size?: keyof typeof sizes;
}) {
  return (
    <Link href="/" className={`flex items-center shrink-0 ${className}`}>
      <Image
        src={withBasePath("/images/logo.png")}
        alt="Akın Emlak Gayrimenkul & Danışmanlık"
        width={1600}
        height={1318}
        className={sizes[size]}
        priority
      />
    </Link>
  );
}
