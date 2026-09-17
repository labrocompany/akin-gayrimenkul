import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import type { Listing } from "@/lib/listings";

export type ListingRecord = Listing & { id: string };

export type ListingInput = {
  title: string;
  district: string;
  city: string;
  status: Listing["status"];
  category: Listing["category"];
  price: string;
  image: string;
  features: string[];
  link: string;
};

function toListingRecord(docSnap: QueryDocumentSnapshot<DocumentData>): ListingRecord {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    slug: docSnap.id,
    title: data.title,
    district: data.district,
    city: data.city,
    status: data.status,
    category: data.category,
    price: data.price,
    image: data.image,
    features: Array.isArray(data.features) ? data.features : [],
    link: typeof data.link === "string" ? data.link : "",
  };
}

export function subscribeListings(callback: (listings: ListingRecord[]) => void) {
  const q = query(collection(db, "ilanlar"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(toListingRecord));
  });
}

export async function createListing(data: ListingInput) {
  await addDoc(collection(db, "ilanlar"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function updateListing(id: string, data: ListingInput) {
  await updateDoc(doc(db, "ilanlar", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteListing(id: string) {
  await deleteDoc(doc(db, "ilanlar", id));
}

export async function uploadListingImage(file: File) {
  const path = `ilanlar/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
