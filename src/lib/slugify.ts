// src/lib/slugify.ts
/**
 * Tạo slug tiếng Việt: bỏ dấu, thường hóa, thay khoảng trắng -> "-"
 * VD: "Bạo lực học đường – Hậu quả" -> "bao-luc-hoc-duong-hau-qua"
 */
export function slugify_vi(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // bỏ ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
