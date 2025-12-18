// src/lib/firestore.ts
import "server-only";
import  { admin } from "@/lib/firebaseAdmin";

export const db = admin.firestore();
export const now = () => admin.firestore.Timestamp.now();

export const col = {
  articles: () => db.collection("articles"),
  categories: () => db.collection("categories"),
  users: () => db.collection("users"),
};
