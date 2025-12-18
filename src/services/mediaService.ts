// src/services/mediaService.ts

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

if (!CLOUD_NAME || !UPLOAD_PRESET) {
  // chỉ để debug nếu quên env
  console.warn(
    "[Cloudinary] Thiếu CLOUD_NAME hoặc UPLOAD_PRESET. Kiểm tra .env.local"
  );
}

/**
 * Upload 1 file ảnh lên Cloudinary, trả về secure_url
 */
async function uploadSingleImage(file: File, folder?: string): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary chưa cấu hình env");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  // có thể override folder nếu muốn
  if (folder) {
    formData.append("folder", folder);
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const res = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    console.error("[Cloudinary] Upload error:", await res.text());
    throw new Error("Upload ảnh thất bại, vui lòng thử lại.");
  }

  const data = await res.json();
  return data.secure_url as string;
}

/**
 * Upload nhiều ảnh (dùng cho post, game, v.v.)
 */
export async function uploadImagesToCloudinary(
  files: File[],
  folder?: string
): Promise<string[]> {
  if (!files.length) return [];
  const urls: string[] = [];

  for (const file of files) {
    const url = await uploadSingleImage(file, folder);
    urls.push(url);
  }

  return urls;
}
