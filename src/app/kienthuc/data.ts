// src/app/kienthuc/data.ts

/* ========= TÀI LIỆU HỌC LUẬT ========= */

export type LawDoc = {
  id: string;
  level: "Đại học" | "THPT" | "Cơ bản";
  title: string;
  description: string;
  tag: string;
  format: "PDF" | "Slide" | "Note";
  url: string;
  source: string;
};

export const lawDocs: LawDoc[] = [
  {
    id: "luat-tre-em",
    level: "Cơ bản",
    title: "Luật Trẻ em 2016 (văn bản hợp nhất)",
    description:
      "Quy định toàn diện về quyền, bổn phận của trẻ em; trách nhiệm của gia đình, nhà trường và xã hội trong bảo vệ trẻ em khỏi bạo lực, xâm hại.",
    tag: "Luật Trẻ em",
    format: "PDF",
    url: "https://vanban.chinhphu.vn/default.aspx?docid=184566&pageid=27160",
    source: "Cổng thông tin điện tử Chính phủ",
  },
  {
    id: "luat-giao-duc",
    level: "Đại học",
    title: "Luật Giáo dục 2019",
    description:
      "Khung pháp lý về hệ thống giáo dục, quyền và nghĩa vụ của người học, nhà giáo; các quy định về kỷ luật, môi trường giáo dục an toàn, lành mạnh.",
    tag: "Luật Giáo dục",
    format: "PDF",
    url: "https://vanban.chinhphu.vn/default.aspx?docid=197310&pageid=27160",
    source: "Cổng thông tin điện tử Chính phủ",
  },
  {
    id: "nd-80-2017-blhd",
    level: "Đại học",
    title:
      "Nghị định 80/2017/NĐ-CP: Môi trường giáo dục an toàn, lành mạnh, thân thiện, phòng, chống bạo lực học đường",
    description:
      "Quy định rõ trách nhiệm của các cơ quan, nhà trường, gia đình trong việc phòng, chống bạo lực học đường và bảo đảm an ninh, an toàn trường học.",
    tag: "Bạo lực học đường",
    format: "PDF",
    url: "https://vanban.chinhphu.vn/default.aspx?docid=190430&pageid=27160",
    source: "Cổng thông tin điện tử Chính phủ",
  },
  {
    id: "tt-06-2019-quy-tac-ung-xu",
    level: "THPT",
    title:
      "Thông tư 06/2019/TT-BGDĐT: Quy tắc ứng xử trong cơ sở giáo dục mầm non, phổ thông, thường xuyên",
    description:
      "Đặt ra chuẩn mực ứng xử cho giáo viên, học sinh và phụ huynh; nhấn mạnh việc tôn trọng, không bạo hành, không xúc phạm danh dự nhân phẩm người học.",
    tag: "Quy tắc ứng xử",
    format: "PDF",
    url: "https://vanban.chinhphu.vn/?classid=1&docid=196910&pageid=27160",
    source: "Bộ Giáo dục & Đào tạo / Cổng CP",
  },
  {
    id: "tai-lieu-huong-dan-xu-ly-blhd",
    level: "Đại học",
    title:
      "Tài liệu hướng dẫn phòng ngừa, tiếp nhận, xử lý, báo cáo vụ việc học sinh bị bạo lực học đường",
    description:
      "Hướng dẫn chi tiết quy trình 4 bước khi có vụ việc bạo lực học đường: phát hiện – tiếp nhận – xử lý – báo cáo, kèm mẫu biểu theo QĐ 4641/QĐ-BGDĐT.",
    tag: "Hướng dẫn xử lý",
    format: "PDF",
    url: "https://igiaoduc.vn/content/uploads/elearning/3977_qd_bgddt-va-tai-lieu.pdf",
    source: "Bộ Giáo dục & Đào tạo / IGiaoduc",
  },
  {
    id: "cv-5812-2018-ke-hoach-phong-ngua",
    level: "Cơ bản",
    title:
      "Công văn 5812/BGDĐT-GDCTHSSV (2018) hướng dẫn xây dựng kế hoạch phòng ngừa bạo lực học đường",
    description:
      "Định hướng cho các cơ sở giáo dục xây dựng kế hoạch phòng ngừa, phát hiện sớm và phối hợp xử lý bạo lực học đường trong năm học.",
    tag: "Kế hoạch phòng ngừa",
    format: "Note",
    url: "https://thuvienphapluat.vn/cong-van/Giao-duc/Cong-van-5812-BGDDT-GDCTHSSV-2018-huong-dan-xay-dung-ke-hoach-phong-ngua-bao-luc-hoc-duong-444643.aspx",
    source: "Bộ Giáo dục & Đào tạo",
  },
];

/* ========= BÀI BÁO / NGHIÊN CỨU BLHD (TỪ LIO) ========= */

export type BlhdArticle = {
  id: string;
  title: string;
  url: string;
  source: string;
  category: "Vụ việc" | "Phân tích";
  year?: string;
  image?: string;
};

export const blhdArticles: BlhdArticle[] = [
  // ---- Nhóm VỤ VIỆC cụ thể ----
  {
    id: "nu-sinh-12-dam-11",
    category: "Vụ việc",
    title:
      "Nữ sinh lớp 12 đâm chết nữ sinh lớp 11: Bị phạt 18 năm tù chỉ vì mâu thuẫn nhỏ trên mạng xã hội",
    url: "https://tuoitre.vn/nu-sinh-lop-12-dam-chet-nu-sinh-lop-11-bi-phat-18-nam-tu-chi-vi-mau-thuan-nho-tren-mang-xa-hoi-20250721152159652.htm",
    source: "Tuổi Trẻ Online",
    year: "2025",
  },
  {
    id: "hoc-sinh-danh-ban-da-man",
    category: "Vụ việc",
    title:
      "Học sinh đánh bạn dã man, 'thầy cô khổ một, cha mẹ khổ cả đời', có cách nào trị bạo lực học đường",
    url: "https://tuoitre.vn/hoc-sinh-danh-ban-da-man-thay-co-kho-mot-cha-me-kho-ca-doi-cach-nao-tri-bao-luc-hoc-duong-20250413103858051.htm#isreadmore=1",
    source: "Tuổi Trẻ Online",
    year: "2025",
  },
  {
    id: "co-giao-danh-tre-phu-quoc",
    category: "Vụ việc",
    title: "Xác minh nghi vấn cô giáo đánh học sinh mầm non ở Phú Quốc",
    url: "https://tuoitre.vn/xac-minh-nghi-van-co-giao-danh-hoc-sinh-mam-non-o-phu-quoc-2025032219532505.htm#isreadmore=1",
    source: "Tuổi Trẻ Online",
    year: "2025",
  },
  {
    id: "nam-sinh-10-bi-danh-guc",
    category: "Vụ việc",
    title: "Nam sinh lớp 10 bị đánh gục ở sân trường, công an vào cuộc",
    url: "https://tuoitre.vn/nam-sinh-lop-10-bi-danh-guc-o-san-truong-cong-an-vao-cuoc-20241218190228466.htm#isreadmore=1",
    source: "Tuổi Trẻ Online",
    year: "2024",
  },
  {
    id: "nu-giao-vien-danh-nam-sinh-cap2",
    category: "Vụ việc",
    title:
      "Xác minh nữ giáo viên cùng nhóm người đánh tới tấp nam sinh cấp 2 ở Hà Nội",
    url: "https://vietnamnet.vn/xac-minh-nu-giao-vien-cung-nhom-nguoi-danh-toi-tap-nam-sinh-cap-2-o-ha-noi-2183420.html",
    source: "VietNamNet",
    year: "2024",
  },
  {
    id: "2-nu-sinh-8-danh-lot-do-ban-dak-lak",
    category: "Vụ việc",
    title:
      "Hai nữ sinh lớp 8 ở Đăk Lăk đánh và lột đồ của bạn nhận hình thức kỉ luật như thế nào?",
    url: "https://hoahoctro.tienphong.vn/hai-nu-sinh-lop-8-o-dak-lak-danh-va-lot-do-cua-ban-nhan-hinh-thuc-ky-luat-the-nao-post1618165.tpo",
    source: "Hoa Học Trò / Tiền Phong",
    year: "2024",
  },
  {
    id: "tuyen-truyen-phong-chong-blhd-hs-2025-2026",
    category: "Vụ việc",
    title:
      "Tuyên truyền phòng chống bạo lực học đường cho học sinh đầu năm học 2025 - 2026",
    url: "https://congan.cantho.gov.vn/hoat-dong-cua-luc-luong-cong-an/tuyen-truyen-phong-chong-bao-luc-hoc-duong-cho-hoc-sinh-dau-nam-hoc-2025-2026-3463.html",
    source: "Công an TP. Cần Thơ",
    year: "2025",
  },
  {
    id: "tphcm-hs-tieu-hoc-ky-nang-ung-pho",
    category: "Vụ việc",
    title:
      "TPHCM: Học sinh tiểu học nhận diện và trang bị kỹ năng ứng phó với bạo lực học đường",
    url: "https://www.sggp.org.vn/tphcm-hoc-sinh-tieu-hoc-nhan-dien-va-trang-bi-ky-nang-ung-pho-voi-bao-luc-hoc-duong-post788536.html",
    source: "Sài Gòn Giải Phóng",
    year: "2024",
  },
  {
    id: "nam-sinh-9-gay-tay",
    category: "Vụ việc",
    title: "Xác minh vụ nam sinh lớp 9 vô cớ bị đánh gãy tay",
    url: "https://doisongphapluat.com.vn/xac-minh-vu-nam-sinh-lop-9-vo-co-bi-danh-gay-tay-a550119.html",
    source: "Đời Sống & Pháp Luật",
    year: "2024",
  },
  {
    id: "co-giao-danh-gay-ngon-tay",
    category: "Vụ việc",
    title: "Xử lí nghiêm khắc cô giáo đánh gãy ngón tay học sinh",
    url: "https://vov.vn/xa-hoi/xu-ly-nghiem-khac-co-giao-danh-gay-ngon-tay-hoc-sinh-post1052159.vov",
    source: "VOV",
    year: "2024",
  },

  // ---- Nhóm PHÂN TÍCH / HƯỚNG DẪN ----
  {
    id: "vttu-hau-qua-khon-luong",
    category: "Phân tích",
    title: "Bạo lực học đường – hậu quả khôn lường với sức khỏe tinh thần",
    url: "https://vttu.edu.vn/bao-luc-hoc-duong/",
    source: "Trường ĐH Trưng Vương",
  },
  {
    id: "moh-nguyen-nhan-bien-phap",
    category: "Phân tích",
    title: "Bạo lực học đường: Nguyên nhân và biện pháp phòng tránh",
    url: "https://moh.gov.vn/web/phong-chong-tai-nan-thuong-tich/thong-tin-tuyen-truyen-dao-tao/-/asset_publisher/y1HBDqztr86t/content/bao-luc-hoc-uong-nguyen-nhan-va-bien-phap-phong-tranh",
    source: "Bộ Y tế",
  },
  {
    id: "pharmacity-suy-nghi-tieu-cuc",
    category: "Phân tích",
    title: "Bạo lực học đường có thể gây nên những suy nghĩ tiêu cực nào?",
    url: "https://www.pharmacity.vn/suy-nghi-tieu-cuc.htm",
    source: "Pharmacity",
  },
  {
    id: "ksbtdn-hau-qua-cach-phong-tranh",
    category: "Phân tích",
    title: "Bạo lực học đường: Hậu quả và cách phòng tránh",
    url: "https://ksbtdanang.vn/chuyen-mon/suc-khoe-moi-truong-y-te-truong-hoc/bao-luc-hoc-duong-hau-qua-va-cach-phong-tranh-859.html",
    source: "TT Kiểm soát bệnh tật Đà Nẵng",
  },
  {
    id: "nhitrunguong-ky-nang-phong-chong",
    category: "Phân tích",
    title:
      "Bạo lực học đường – Những kỹ năng cần thiết giúp trẻ phòng, chống",
    url: "https://benhviennhitrunguong.gov.vn/bao-luc-hoc-duong-nhung-ky-nang-can-thiet-giup-tre-phong-chong.html",
    source: "Bệnh viện Nhi Trung ương",
  },
  {
    id: "cand-bao-dong-do",
    category: "Phân tích",
    title: "Báo động đỏ bạo lực học đường",
    url: "https://cand.com.vn/Phong-su-Tieu-diem/Bao-dong-do-bao-luc-hoc-duong-i519106/",
    source: "Công an Nhân dân",
  },
  {
    id: "dienbientv-nhieu-clip-danh-ban",
    category: "Phân tích",
    title: "Nhiều clip học sinh đánh bạn: Lo ngại bạo lực học đường",
    url: "https://dienbientv.vn/tin-tuc-su-kien/giao-duc/201610/nhieu-clip-hoc-sinh-danh-ban-lo-ngai-bao-luc-hoc-duong-2455261/",
    source: "Điện Biên TV",
  },
  {
    id: "tienphong-xu-huong-lan-rong",
    category: "Phân tích",
    title: "Bạo lực học đường có xu hướng lan rộng, vì sao?",
    url: "https://tienphong.vn/bao-luc-hoc-duong-co-xu-huong-lan-rong-vi-sao-post1105181.tpo",
    source: "Tiền Phong",
  },
  {
    id: "tuoitrethudo-nhuc-nhoi-van-nan",
    category: "Phân tích",
    title: "Nhức nhối vấn nạn bạo lực học đường",
    url: "https://phapluat.tuoitrethudo.vn/nhuc-nhoi-van-nan-bao-luc-hoc-duong-57960.html",
    source: "Tuổi Trẻ Thủ Đô",
  },
  {
    id: "longchau-cac-hinh-thuc",
    category: "Phân tích",
    title: "Các hình thức bạo lực học đường mà trẻ có thể gặp phải",
    url: "https://nhathuoclongchau.com.vn/bai-viet/cac-hinh-thuc-bao-luc-hoc-duong-ma-tre-co-the-gap-phai.html",
    source: "Nhà thuốc Long Châu",
  },
];
