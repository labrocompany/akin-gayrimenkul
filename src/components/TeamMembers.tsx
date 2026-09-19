"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { subscribeTeamMembers, type TeamMember } from "@/lib/teamService";
import { siteConfig } from "@/lib/site";

function FounderCard() {
  return (
    <div className="bg-white rounded-2xl border border-border-soft p-6 sm:p-8 grid sm:grid-cols-[auto_1fr] gap-6 items-center">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 bg-primary-500/10 flex items-center justify-center">
        <span className="text-2xl sm:text-3xl font-extrabold text-primary-600">
          HVY
        </span>
      </div>
      <div>
        <h3 className="font-bold text-ink text-lg">Hüsamettin Vehbi Yay</h3>
        <p className="text-sm text-primary-600 font-semibold mt-0.5">
          Kurucu &amp; Yönetici Ortak
        </p>
        <p className="text-[13.5px] text-muted mt-2 leading-relaxed max-w-xl">
          Akın Emlak Gayrimenkul &amp; Danışmanlık&apos;ı, güven ve
          kurumsallık ilkeleriyle kurarak İstanbul&apos;un farklı
          bölgelerinde hizmet veren bir marka haline getirdi. Portföy ve
          proje satış süreçlerinde ekibimize doğrudan öncülük eder.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-3 text-[13px] text-ink-soft">
          <a href={siteConfig.phoneHref} className="flex items-center gap-1.5 hover:text-primary-600">
            <Phone size={14} className="text-primary-500" />
            {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-1.5 hover:text-primary-600"
          >
            <Mail size={14} className="text-primary-500" />
            {siteConfig.email}
          </a>
        </div>
      </div>
    </div>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="bg-white rounded-2xl border border-border-soft p-6 flex flex-col items-center text-center">
      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-primary-500/10 shrink-0">
        {member.fotoUrl ? (
          <Image
            src={member.fotoUrl}
            alt={member.adSoyad}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-xl font-extrabold text-primary-600">
            {member.adSoyad
              .split(/\s+/)
              .filter(Boolean)
              .map((part) => part[0])
              .join("")
              .slice(0, 3)
              .toLocaleUpperCase("tr-TR")}
          </span>
        )}
      </div>
      <h3 className="font-bold text-ink text-lg mt-4">{member.adSoyad}</h3>
      <p className="text-sm text-primary-600 font-semibold mt-0.5">{member.unvan}</p>
      {member.aciklama ? (
        <p className="text-[13.5px] text-muted mt-2 leading-relaxed">{member.aciklama}</p>
      ) : null}
    </article>
  );
}

export default function TeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeTeamMembers((data) => {
      setMembers(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <section className="container-page py-10 space-y-5">
      <FounderCard />
      {loading ? (
        <p className="text-center text-sm text-muted py-4">Yükleniyor...</p>
      ) : members.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
