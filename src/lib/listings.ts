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

export const categoryLabels: Record<ListingCategory, string> = {
  konut: "Konut",
  ticari: "Ticari",
  arsa: "Arsa",
  proje: "Projeler",
  yatirim: "Yatırım Fırsatları",
};
