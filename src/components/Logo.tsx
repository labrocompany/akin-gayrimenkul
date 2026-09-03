import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex flex-col items-center gap-1 shrink-0 ${className}`}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        className="text-primary-500"
      >
        <path
          d="M20 2L20 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M12 36V20L16 16V12L20 8L24 12V16L28 20V36"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M6 36V26L10 22"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M34 36V26L30 22"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M4 36H36"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <div className="text-center leading-tight">
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
