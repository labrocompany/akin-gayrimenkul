"use client";

import { useState, type FormEvent } from "react";
import { MessageSquare, ShieldCheck } from "lucide-react";
import Button from "@/components/Button";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-border-soft p-8 h-full flex flex-col items-center justify-center text-center min-h-[380px]">
        <div className="w-12 h-12 rounded-full bg-secondary-500/10 text-secondary-600 flex items-center justify-center mb-4">
          <ShieldCheck size={24} />
        </div>
        <h3 className="font-bold text-ink text-lg">Mesajınız İletildi</h3>
        <p className="text-sm text-muted mt-2 max-w-xs">
          En kısa sürede size dönüş yapacağız. Bizimle iletişime geçtiğiniz
          için teşekkür ederiz.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border-soft p-6 sm:p-7 h-full">
      <div className="flex items-center gap-2 mb-5">
        <MessageSquare size={18} className="text-primary-500" />
        <h3 className="font-bold text-ink text-lg">Bize Yazın</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid sm:grid-cols-2 gap-3.5">
          <Field label="Ad Soyad">
            <input required type="text" placeholder="Adınızı giriniz" className="form-input" />
          </Field>
          <Field label="Telefon">
            <input required type="tel" placeholder="5XX XXX XX XX" className="form-input" />
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          <Field label="E-posta">
            <input required type="email" placeholder="ornek@email.com" className="form-input" />
          </Field>
          <Field label="Hizmet Türü">
            <select className="form-select">
              <option value="">Seçiniz</option>
              <option>Portföy Satışı</option>
              <option>Gayrimenkul Arayışı</option>
              <option>Proje Satış Ofisi Danışmanlığı</option>
              <option>Diğer</option>
            </select>
          </Field>
        </div>
        <Field label="Konu">
          <input type="text" placeholder="Konu başlığını giriniz" className="form-input" />
        </Field>
        <Field label="Mesajınız">
          <textarea rows={4} placeholder="Mesajınızı buraya yazınız." className="form-textarea" />
        </Field>
        <Button type="submit" variant="primary" size="lg" className="w-full" withArrow>
          Mesaj Gönder
        </Button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}
