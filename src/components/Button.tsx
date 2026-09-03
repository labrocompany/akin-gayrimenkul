import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "outline-dark";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 border border-primary-500",
  secondary:
    "bg-secondary-500 text-white hover:bg-secondary-600 border border-secondary-500",
  outline:
    "bg-transparent text-ink border border-border-soft hover:border-primary-500 hover:text-primary-600",
  "outline-dark":
    "bg-transparent text-white border border-white/70 hover:bg-white/10",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-[15px]",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  className = "",
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
    disabled ? "opacity-60 cursor-not-allowed" : ""
  }`;

  const content = (
    <>
      {children}
      {withArrow && <ArrowRight size={16} strokeWidth={2.25} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
