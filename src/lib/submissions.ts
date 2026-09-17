import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

export type PortfoyTalebi = {
  gayrimenkulTuru: string;
  islemTipi: string;
  il: string;
  ilce: string;
  mahalle: string;
  metrekare: string;
  odaSayisi: string;
  binaYasi: string;
  fiyatBeklentisi: string;
  adSoyad: string;
  telefon: string;
  eposta: string;
  aciklama: string;
  dosyaAdlari: string[];
  fotoUrl: string[];
};

export type ProjeTalebi = {
  firmaAdi: string;
  yetkiliAdSoyad: string;
  telefon: string;
  eposta: string;
  projeAdi: string;
  projeKonumu: string;
  bagimsizBolumSayisi: string;
  talepTuru: string;
  not: string;
};

export type IletisimMesaji = {
  adSoyad: string;
  telefon: string;
  eposta: string;
  hizmetTuru: string;
  konu: string;
  mesaj: string;
};

export type HizliTalep = {
  gayrimenkulTuru: string;
  il: string;
  ilce: string;
  tahminiFiyat: string;
  telefon: string;
};

export async function uploadPortfoyPhoto(file: File) {
  const safeName = file.name.replace(/[^\w.\-]+/g, "_");
  const path = `portfoyTalepleri/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
  const storageRef = ref(storage, path);
  const contentType = file.type.startsWith("image/") ? file.type : "image/jpeg";
  await uploadBytes(storageRef, file, { contentType });
  return getDownloadURL(storageRef);
}

export async function createPortfoyTalebi(data: PortfoyTalebi) {
  await addDoc(collection(db, "portfoyTalepleri"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function createProjeTalebi(data: ProjeTalebi) {
  await addDoc(collection(db, "projeTalepleri"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function createIletisimMesaji(data: IletisimMesaji) {
  await addDoc(collection(db, "iletisimMesajlari"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function createHizliTalep(data: HizliTalep) {
  await addDoc(collection(db, "hizliTalepler"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}
