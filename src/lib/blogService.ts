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

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  createdAt: Timestamp | null;
};

export type BlogPostInput = {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
};

function toBlogPost(docSnap: QueryDocumentSnapshot<DocumentData>): BlogPost {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    coverImage: data.coverImage,
    createdAt: data.createdAt ?? null,
  };
}

export function subscribeBlogPosts(callback: (posts: BlogPost[]) => void) {
  const q = query(collection(db, "blogYazilari"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(toBlogPost));
  });
}

export async function createBlogPost(data: BlogPostInput) {
  await addDoc(collection(db, "blogYazilari"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function deleteBlogPost(id: string) {
  await deleteDoc(doc(db, "blogYazilari", id));
}

export async function uploadBlogImage(file: File) {
  const path = `blog/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
