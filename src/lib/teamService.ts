import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

export type TeamMember = {
  id: string;
  adSoyad: string;
  unvan: string;
  aciklama: string;
  fotoUrl: string;
  createdAt: Timestamp | null;
};

export type TeamMemberInput = {
  adSoyad: string;
  unvan: string;
  aciklama: string;
  fotoUrl: string;
};

function toTeamMember(docSnap: QueryDocumentSnapshot<DocumentData>): TeamMember {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    adSoyad: data.adSoyad,
    unvan: data.unvan,
    aciklama: typeof data.aciklama === "string" ? data.aciklama : "",
    fotoUrl: data.fotoUrl,
    createdAt: data.createdAt ?? null,
  };
}

export function subscribeTeamMembers(callback: (members: TeamMember[]) => void) {
  const q = query(collection(db, "ekipUyeleri"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      callback(snapshot.docs.map(toTeamMember));
    },
    () => {
      callback([]);
    }
  );
}

export async function createTeamMember(data: TeamMemberInput) {
  await addDoc(collection(db, "ekipUyeleri"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function deleteTeamMember(id: string) {
  await deleteDoc(doc(db, "ekipUyeleri", id));
}

export async function uploadTeamPhoto(file: File) {
  const path = `ekip/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file, { contentType: file.type });
  return getDownloadURL(storageRef);
}
