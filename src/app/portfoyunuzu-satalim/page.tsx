import Image from "next/image";
import { TrendingUp, Megaphone, Users, Handshake, Camera } from "lucide-react";
import Button from "@/components/Button";
import StatsRow from "@/components/StatsRow";
import SellPortfolioForm from "@/components/forms/SellPortfolioForm";

const processSteps = [
  { icon: TrendingUp, title: "Değerleme", description: "Uzman ekibimiz mülkünüzü analiz eder." },
  { icon: Megaphone, title: "Pazarlama", description: "Doğru kanallarda etkili şekilde pazarlarız." },
  { icon: Users, title: "Alıcı Yönetimi", description: "Nitelikli alıcılarla buluşturur." },
  { icon: Handshake, title: "Satış", description: "En iyi koşullarla satışı tamamlarız." },
];

const highlights = [
  { icon: TrendingUp, title: "Doğru Fiyatlandırma", description: "Piyasa analizine dayalı ve doğru fiyat." },
  { icon: Camera, title: "Profesyonel Sunum", description: "Mülkünüzü en iyi şekilde sunuyoruz." },
  { icon: Megaphone, title: "Güçlü Pazarlama", description: "Geniş ağımızla hızlı ve etkin pazarlama." },
];

export default function SellPortfolioPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-page grid lg:grid-cols-2 gap-10 items-center pt-10 lg:pt-14 pb-16 lg:pb-24">
          <div>
            <h1 className="font-extrabold tracking-tight text-4xl sm:text-[42px] leading-[1.15] text-ink">
              Portföyünüzü
              <br />
              Bize Gönderin.
              <br />
              <span className="text-primary-500">
                Doğru Fiyat, Doğru Alıcı, Hızlı Süreç.
              </span>
            </h1>
            <p className="mt-5 text-muted text-[15px] leading-relaxed max-w-md">
              Uzman ekibimizle en iyi değeri birlikte elde edelim.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="#portfoy-formu" variant="primary" size="lg" withArrow>
                Portföy Gönder
              </Button>
              <Button href="#portfoy-formu" variant="outline" size="lg">
                Ücretsiz Ön Değerleme
              </Button>
            </div>
          </div>
          <div className="relative h-[260px] sm:h-[340px] lg:h-[400px] rounded-3xl overflow-hidden">
            <Image
              src="/images/hero-satalim.jpg"
              alt="Modern villa"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="portfoy-formu" className="container-page pb-14 -mt-20 lg:-mt-24 relative z-10">
        <SellPortfolioForm />
      </section>

      <section className="container-page pb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-ink text-center mb-8">
          Sürecimiz Nasıl İşler?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="bg-white rounded-2xl border border-border-soft p-5 text-center flex flex-col items-center"
              >
                <div className="relative w-12 h-12 rounded-full bg-primary-500/10 text-primary-600 flex items-center justify-center mb-3">
                  <Icon size={20} />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-ink text-sm">{step.title}</h3>
                <p className="text-xs text-muted mt-1 leading-snug">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-page py-8">
        <div className="grid sm:grid-cols-3 gap-5">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-cream-dark rounded-2xl p-6 flex flex-col items-start"
              >
                <div className="w-11 h-11 rounded-full bg-white text-primary-600 flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-ink text-[15px]">
                  {item.title}
                </h3>
                <p className="text-[13px] text-muted mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="flex justify-center">
          <StatsRow className="justify-center gap-x-12" />
        </div>
      </section>
    </>
  );
}
