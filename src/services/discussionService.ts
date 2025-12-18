import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  setDoc,
  type DocumentData,
} from "firebase/firestore";
import type { User } from "firebase/auth";

import { db } from "@/lib/firebase";
import type { Post } from "@/types/discussion";
import { uploadImagesToCloudinary } from "@/services/mediaService";


/** Hồ sơ user dùng chung (client) */
export interface UserProfile {
  displayName?: string;
  avatarUrl?: string;
  role?: "user" | "admin";
}

const POSTS_COL = "posts";

/* ============ Helper: map Firestore -> Post ============ */

function mapPost(docSnap: { id: string; data: () => DocumentData }): Post {
  const data = docSnap.data();

  return {
    id: docSnap.id,
    authorId: data.authorId,
    authorDisplayName: data.authorDisplayName,
    authorAvatarUrl: data.authorAvatarUrl ?? undefined,
    isAnonymous: data.isAnonymous ?? false,
    content: data.content ?? "",
    imageUrls: data.imageUrls ?? [],
    tags: data.tags ?? [],
    likeCount: data.likeCount ?? 0,
    commentCount: data.commentCount ?? 0,
    createdAt: data.createdAt?.toDate?.() ?? new Date(),
    updatedAt: data.updatedAt?.toDate?.(),
  };
}

/* ===================== POSTS ===================== */

/** Upload nhiều ảnh bài viết lên Cloudinary */
export async function uploadPostImages(
  userId: string,
  files: File[]
): Promise<string[]> {
  // Lưu theo folder blhd/posts/{uid} cho gọn
  return uploadImagesToCloudinary(files, `blhd/posts/${userId}`);
}
/** Tạo bài viết mới */
export async function createPost(params: {
  content: string;
  isAnonymous: boolean;
  user: User;
  profile: UserProfile | null;
  imageUrls?: string[];
  tags?: string[];
}) {
  const {
    content,
    isAnonymous,
    user,
    profile,
    imageUrls = [],
    tags = [],
  } = params;

  const trimmed = content.trim();
  if (!trimmed) return; // không lưu nếu rỗng

  await addDoc(collection(db, POSTS_COL), {
    authorId: user.uid,
    authorDisplayName:
      profile?.displayName ?? user.displayName ?? "Người dùng",
    authorAvatarUrl: profile?.avatarUrl ?? null,
    isAnonymous,
    content: trimmed,
    imageUrls,
    tags,
    likeCount: 0,
    commentCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: null,
  });
}

/** Lắng nghe realtime danh sách posts (bài mới trước) */
export function subscribeToPosts(
  callback: (posts: Post[]) => void
): () => void {
  const q = query(
    collection(db, POSTS_COL),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snap) => {
    const posts: Post[] = snap.docs.map((d) => mapPost(d));
    callback(posts);
  });
}

/* ===================== LIKE ===================== */

/** Like / bỏ like */
export async function toggleLike(postId: string, userId: string) {
  const likeRef = doc(db, POSTS_COL, postId, "likes", userId);
  const postRef = doc(db, POSTS_COL, postId);

  await runTransaction(db, async (tx) => {
    const likeSnap = await tx.get(likeRef);
    const postSnap = await tx.get(postRef);
    if (!postSnap.exists()) return;

    const delta = likeSnap.exists() ? -1 : 1;

    if (likeSnap.exists()) {
      tx.delete(likeRef);
    } else {
      tx.set(likeRef, {
        userId,
        createdAt: serverTimestamp(),
      });
    }

    tx.update(postRef, {
      likeCount: increment(delta),
    });
  });
}

/** Kiểm tra user đã like bài này chưa (dùng để tô màu icon) */
export async function hasUserLiked(
  postId: string,
  userId: string
): Promise<boolean> {
  const likeRef = doc(db, POSTS_COL, postId, "likes", userId);
  const snap = await getDoc(likeRef);
  return snap.exists();
}

/* ===================== COMMENTS ===================== */

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorDisplayName: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

/** Lắng nghe comment realtime của 1 post */
export function subscribeToComments(
  postId: string,
  callback: (comments: Comment[]) => void
): () => void {
  const q = query(
    collection(db, POSTS_COL, postId, "comments"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snap) => {
    const comments: Comment[] = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        postId,
        authorId: data.authorId,
        authorDisplayName: data.authorDisplayName,
        content: data.content,
        createdAt: data.createdAt?.toDate?.() ?? new Date(),
        updatedAt: data.updatedAt?.toDate?.(),
      };
    });
    callback(comments);
  });
}

/** Thêm comment mới + tăng commentCount */
export async function addComment(params: {
  postId: string;
  content: string;
  user: User;
  profile: UserProfile | null;
}) {
  const { postId, content, user, profile } = params;
  const trimmed = content.trim();
  if (!trimmed) return;

  const commentsCol = collection(db, POSTS_COL, postId, "comments");

  await runTransaction(db, async (tx) => {
    await addDoc(commentsCol, {
      authorId: user.uid,
      authorDisplayName:
        profile?.displayName ?? user.displayName ?? "Người dùng",
      content: trimmed,
      createdAt: serverTimestamp(),
      updatedAt: null,
    });

    const postRef = doc(db, POSTS_COL, postId);
    tx.update(postRef, {
      commentCount: increment(1),
    });
  });
}

/** Sửa nội dung comment */
export async function updateComment(
  postId: string,
  commentId: string,
  newContent: string
) {
  const trimmed = newContent.trim();
  if (!trimmed) return;
  const refDoc = doc(db, POSTS_COL, postId, "comments", commentId);
  await updateDoc(refDoc, {
    content: trimmed,
    updatedAt: serverTimestamp(),
  });
}

/** Xoá comment + giảm commentCount */
export async function deleteComment(postId: string, commentId: string) {
  const refDoc = doc(db, POSTS_COL, postId, "comments", commentId);
  const postRef = doc(db, POSTS_COL, postId);

  await runTransaction(db, async (tx) => {
    tx.delete(refDoc);
    tx.update(postRef, {
      commentCount: increment(-1),
    });
  });
}

/* ===================== BOOKMARKS ===================== */

export interface Bookmark {
  id: string; // chính là postId
  postId: string;
  savedAt: Date;
}

/** Lưu / bỏ lưu bài viết vào users/{uid}/bookmarks/{postId} */
export async function toggleBookmark(postId: string, userId: string) {
  const bookmarkRef = doc(db, "users", userId, "bookmarks", postId);
  const snap = await getDoc(bookmarkRef);

  if (snap.exists()) {
    await deleteDoc(bookmarkRef);
  } else {
    await setDoc(bookmarkRef, {
      postId,
      savedAt: serverTimestamp(),
    });
  }
}

/** Lấy danh sách bookmark của 1 user (dùng cho trang "Yêu thích") */
export async function getUserBookmarks(
  userId: string
): Promise<Bookmark[]> {
  const colRef = collection(db, "users", userId, "bookmarks");
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      postId: data.postId,
      savedAt: data.savedAt?.toDate?.() ?? new Date(),
    };
  });
}
