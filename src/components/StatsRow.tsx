import { stats } from "@/lib/site";

export default function StatsRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-8 gap-y-3 ${className}`}>
      {stats.map((stat) => (
        <div key={stat.label}>
          <div className="text-xl sm:text-2xl font-extrabold text-primary-500">
            {stat.value}
          </div>
          <div className="text-xs text-muted mt-0.5">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
