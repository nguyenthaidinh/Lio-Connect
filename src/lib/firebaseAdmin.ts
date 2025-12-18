// src/lib/firebaseAdmin.ts
import "server-only"; // đảm bảo chỉ chạy ở server (Next.js)
import admin from "firebase-admin";

/**
 * YÊU CẦU ENV (KHÔNG public):
 *  - FIREBASE_PROJECT_ID
 *  - FIREBASE_CLIENT_EMAIL
 *  - FIREBASE_PRIVATE_KEY  (dán nguyên key, nhưng mọi \n phải được escape thành \\n trong .env)
 *
 * Trên Vercel/host: đặt PRIVATE_KEY trong ngoặc kép và thay dòng mới bằng \\n
 * Trong code dưới, chúng ta .replace(/\\n/g, "\n") để khôi phục đúng định dạng.
 */

function getCred() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    // Gợi ý định nghĩa nhanh để debug khi thiếu ENV
    throw new Error(
      "Missing Firebase Admin ENV. Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY"
    );
  }

  // Khôi phục xuống dòng thật từ \\n (Vercel/ENV)
  privateKey = privateKey.replace(/\\n/g, "\n");

  return admin.credential.cert({
    projectId,
    clientEmail,
    privateKey,
  });
}

// Tránh khởi tạo trùng
if (!admin.apps.length) {
  admin.initializeApp({
    credential: getCred(),
    // Bạn có thể thêm storageBucket, databaseURL nếu dùng:
    // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

// Export instance dùng cho các API routes / server actions
export { admin };
