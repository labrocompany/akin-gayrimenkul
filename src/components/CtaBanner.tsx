import Image from "next/image";
import Button from "./Button";
import { withBasePath } from "@/lib/paths";

export default function CtaBanner({
  title,
  image = "/images/cta-bridge.jpg",
}: {
  title: string;
  image?: string;
}) {
  return (
    <section className="container-page py-10">
      <div className="relative rounded-2xl overflow-hidden bg-secondary-600">
        <Image
          src={withBasePath(image)}
          alt="İstanbul"
          fill
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 via-secondary-600/85 to-transparent" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5 px-6 sm:px-10 py-8">
          <h3 className="text-white font-bold text-xl sm:text-2xl text-center lg:text-left max-w-lg">
            {title}
          </h3>
          <div className="flex items-center gap-3 shrink-0">
            <Button href="/portfoyunuzu-satalim" variant="secondary" size="lg">
              Portföy Ver
            </Button>
            <Button href="/proje-satis-danismanlik" variant="primary" size="lg">
              Projem İçin Görüşelim
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
