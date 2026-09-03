export type ListingCategory = "konut" | "ticari" | "arsa" | "proje" | "yatirim";
export type ListingStatus = "SATILIK" | "KİRALIK";

export interface Listing {
  slug: string;
  title: string;
  district: string;
  city: string;
  status: ListingStatus;
  category: ListingCategory;
  price: string;
  image: string;
  features: string[];
}

export const listings: Listing[] = [
  {
    slug: "luks-residence-dairesi",
    title: "Lüks Residence Dairesi",
    district: "Levent, Beşiktaş",
    city: "İstanbul",
    status: "SATILIK",
    category: "konut",
    price: "19.750.000 TL",
    image: "/images/listing-1.jpg",
    features: ["3+1 165 m²", "2 Kat", "Kapalı Otopark"],
  },
  {
    slug: "modern-villa",
    title: "Modern Villa",
    district: "Büyükçekmece",
    city: "İstanbul",
    status: "KİRALIK",
    category: "konut",
    price: "32.500.000 TL",
    image: "/images/listing-2.jpg",
    features: ["4+2 220 m²", "2 Kat", "Bahçeli"],
  },
  {
    slug: "ofis-kati",
    title: "Ofis Katı",
    district: "Maslak, Sarıyer",
    city: "İstanbul",
    status: "KİRALIK",
    category: "ticari",
    price: "28.000.000 TL",
    image: "/images/listing-3.jpg",
    features: ["300 m²", "A Katı", "Plazada", "Otopark"],
  },
  {
    slug: "cadde-uzeri-dukkan",
    title: "Cadde Üzeri Dükkan",
    district: "Nişantaşı, Şişli",
    city: "İstanbul",
    status: "SATILIK",
    category: "ticari",
    price: "15.250.000 TL",
    image: "/images/listing-4.jpg",
    features: ["120 m²", "Yüksek Tavan", "Cephe"],
  },
  {
    slug: "arsa-konut-imarli",
    title: "Arsa - Konut İmarlı",
    district: "Çatalca",
    city: "İstanbul",
    status: "SATILIK",
    category: "arsa",
    price: "26.000.000 TL",
    image: "/images/listing-5.jpg",
    features: ["25.000 m²", "E=0.40 İmarlı", "Yola Cephe"],
  },
  {
    slug: "vadi-excellence-projesi",
    title: "Vadi Excellence Projesi",
    district: "Kağıthane",
    city: "İstanbul",
    status: "SATILIK",
    category: "proje",
    price: "8.950.000 TL",
    image: "/images/listing-6.jpg",
    features: ["1+1 - 3+1", "55 m² - 180 m²", "Site İçi m²"],
  },
  {
    slug: "plaza-kat",
    title: "Plaza Kat",
    district: "Ataşehir",
    city: "İstanbul",
    status: "SATILIK",
    category: "ticari",
    price: "45.000.000 TL",
    image: "/images/listing-7.jpg",
    features: ["600 m²", "A Katı", "Asansör", "Plazada"],
  },
  {
    slug: "sanayi-imarli-arsa",
    title: "Sanayi İmarlı Arsa",
    district: "Arnavutköy",
    city: "İstanbul",
    status: "SATILIK",
    category: "yatirim",
    price: "38.750.000 TL",
    image: "/images/listing-8.jpg",
    features: ["10.000 m²", "Sanayi İmarlı", "Yola Cephe"],
  },
  {
    slug: "ticari-plaza-ofisi",
    title: "Ticari Plaza Ofisi",
    district: "Şişli / Maslak",
    city: "İstanbul",
    status: "SATILIK",
    category: "ticari",
    price: "18.750.000 TL",
    image: "/images/card-ticari.jpg",
    features: ["250 m²", "Kat 12", "Asansör", "Açık Otopark"],
  },
  {
    slug: "yatirimlik-arsa",
    title: "Yatırımlık Arsa",
    district: "Çorlu",
    city: "İstanbul",
    status: "SATILIK",
    category: "arsa",
    price: "29.000.000 TL",
    image: "/images/card-arsa.jpg",
    features: ["2.500 m²", "Ana Yola Cephe", "İmarlı"],
  },
];

export const categoryLabels: Record<ListingCategory, string> = {
  konut: "Konut",
  ticari: "Ticari",
  arsa: "Arsa",
  proje: "Projeler",
  yatirim: "Yatırım Fırsatları",
};
