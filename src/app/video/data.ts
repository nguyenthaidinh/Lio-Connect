// src/app/video/data.ts

export type BlhdVideo = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: "Phóng sự" | "Pháp luật" | "Kỹ năng" | "Bài giảng" | "Talkshow" | "Khác";
  source: string;
  publishedAt?: string;
  duration?: string;
};

export const blhdVideos: BlhdVideo[] = [
  {
    id: "vl-phap-luat-1",
    title: "Bạo lực học đường - Quy định của pháp luật - Hiểu vấn đề để giải quyết",
    description:
      "Chương trình trao đổi về các quy định pháp luật liên quan đến hành vi bạo lực học đường và hướng xử lý.",
    youtubeId: "FZOEJHTXmCI",
    category: "Pháp luật",
    source: "Kênh phổ biến pháp luật",
  },
  {
    id: "vl-ky-nang-1",
    title: "KỸ NĂNG ỨNG PHÓ BẠO LỰC HỌC ĐƯỜNG",
    description:
      "Chương trình giao lưu giữa chuyên gia tâm lý, nhà báo và học sinh về cách nhận diện và ứng phó khi bị bạo lực học đường.",
    youtubeId: "ruuSfO_xC1I",
    category: "Kỹ năng",
    source: "Chương trình giao lưu / truyền hình",
  },
  {
    id: "vl-phong-su-1",
    title:
      "Chuyện Nóng: Khi vấn nạn bạo lực học đường có nguy cơ vượt quá văn hóa tôn sư trọng đạo",
    description:
      "Phóng sự phân tích những vụ việc bạo lực học đường gần đây và góc nhìn xã hội, nhà trường, phụ huynh.",
    youtubeId: "o6TSp3IaDUg",
    category: "Phóng sự",
    source: "VTV24",
  },
  {
    id: "vl-phap-luat-2",
    title: "Bạo lực học đường và những vấn đề pháp lý | VTC14",
    description:
      "Phân tích trách nhiệm pháp lý, các chế tài xử lý đối với hành vi bạo lực học đường từ góc nhìn luật pháp.",
    youtubeId: "WJXU_ntE73U",
    category: "Pháp luật",
    source: "VTC14",
  },
  {
    id: "vl-ky-nang-2",
    title: "Kỹ năng giúp Học sinh phòng chống Bạo lực học đường",
    description:
      "Chuyên gia tâm lý hướng dẫn các kỹ năng thực tế giúp học sinh tự bảo vệ mình trước bạo lực học đường.",
    youtubeId: "UywqUXb1RUE",
    category: "Kỹ năng",
    source: "BrainCare / Tâm lý học đường",
  },
  {
    id: "vl-phong-su-2",
    title: "Báo động bạo lực học đường",
    description:
      "Phóng sự ghi nhận liên tiếp các vụ bạo lực học đường, cảnh báo mức độ nghiêm trọng của vấn đề hiện nay.",
    youtubeId: "knWRzUoOXTo",
    category: "Phóng sự",
    source: "Chương trình thời sự / phóng sự",
  },
  {
    id: "vl-talkshow-1",
    title:
      "BẠO LỰC HỌC ĐƯỜNG - HIỂU ĐÚNG VÀ ỨNG XỬ PHÙ HỢP | PGS.TS Trần Thành Nam",
    description:
      "Talkshow với chuyên gia tâm lý giáo dục về bản chất bạo lực học đường và cách người lớn, nhà trường, học sinh ứng xử phù hợp.",
    youtubeId: "6dvwiqXVOWk",
    category: "Talkshow",
    source: "Viện Tâm lý Việt – Pháp",
  },
  {
    id: "vl-bai-giang-1",
    title: "5.8 Chủ đề: Phòng chống bạo lực học đường",
    description:
      "Bài học/tiết học giúp học sinh hiểu về bạo lực học đường, hậu quả và cách phòng tránh trong môi trường học đường.",
    youtubeId: "NT9c1fCXsLo",
    category: "Bài giảng",
    source: "Bài giảng giáo dục kỹ năng / GDCD",
  },
  {
    id: "vl-phong-chong-htv",
    title: "PHÒNG, CHỐNG BẠO LỰC HỌC ĐƯỜNG | HTV Tin tức",
    description:
      "Chương trình tin tức phân tích nguyên nhân và các biện pháp phòng, chống bạo lực học đường tại TP.HCM và nhiều địa phương.",
    youtubeId: "ghWzHs3L76o",
    category: "Phóng sự",
    source: "HTV Tin tức",
  },
  {
    id: "vl-luat-sieu-de",
    title: "CHỦ ĐỀ: BẠO LỰC HỌC ĐƯỜNG | LUẬT SIÊU DỄ",
    description:
      "Chương trình giải thích các quy định pháp luật về bạo lực học đường theo cách dễ hiểu, phù hợp với học sinh, phụ huynh.",
    youtubeId: "Sfpzzeru2pc",
    category: "Pháp luật",
    source: "Chương trình Luật Siêu Dễ",
  },
    {
    id: "vl-phong-su-3",
    title: "Bạo lực học đường - không thể dừng ở bản kiểm điểm",
    description:
      "Phóng sự VTV24 cảnh báo việc xử lý bạo lực học đường chỉ dừng ở bản kiểm điểm, không đủ sức răn đe.",
    youtubeId: "jhbtc0OqeDE",
    category: "Phóng sự",
    source: "VTV24",
  },
  {
    id: "vl-phong-su-4",
    title: "3 tuần, 3 học sinh tử vong do bạo lực học đường",
    description:
      "Góc nhìn VTV24 về chuỗi vụ việc nghiêm trọng liên quan đến bạo lực học đường trong thời gian ngắn.",
    youtubeId: "tEMme22eRT8",
    category: "Phóng sự",
    source: "VTV24",
  },
  {
    id: "vl-phong-su-5",
    title: "Bạo lực học đường - Phạt thế nào?",
    description:
      "Bản tin VTC14 phân tích các chế tài xử phạt với hành vi bạo lực học đường theo quy định hiện hành.",
    youtubeId: "X9DkHwiqMnU",
    category: "Phóng sự",
    source: "VTC14",
  },
  {
    id: "vl-phong-su-6",
    title: "Đẩy lùi bạo lực học đường bằng tình yêu thương",
    description:
      "Phóng sự nói về vai trò của gia đình và nhà trường trong việc xây dựng môi trường học đường không bạo lực.",
    youtubeId: "7Utdm6Wsa2U",
    category: "Phóng sự",
    source: "VTC14",
  },
  {
    id: "vl-phap-luat-3",
    title: "On Skills: Kỹ năng phòng chống bạo lực học đường",
    description:
      "Chương trình On Skills của VTVcab hướng dẫn kỹ năng phòng chống bạo lực học đường cho học sinh.",
    youtubeId: "_y7SDQNAkwE",
    category: "Kỹ năng",
    source: "ON Edu - VTVcab",
  },
  {
    id: "vl-phap-luat-4",
    title: "Nhận diện trẻ bị bạo lực học đường thế nào?",
    description:
      "Phóng sự VTC14 giúp phụ huynh, giáo viên nhận biết dấu hiệu trẻ bị bạo lực học đường.",
    youtubeId: "RqpOl5pAbI4",
    category: "Phóng sự",
    source: "VTC14",
  },
  {
    id: "vl-phap-luat-5",
    title: "Ứng xử của phụ huynh với bạo lực học đường",
    description:
      "Chương trình VTC14 trao đổi về cách phụ huynh nên phản ứng khi con em liên quan đến bạo lực học đường.",
    youtubeId: "aW5mUsifrok",
    category: "Pháp luật",
    source: "VTC14",
  },
  {
    id: "vl-phap-luat-6",
    title: "Nỗi sợ mang tên 'Bạo lực học đường' trên không gian mạng",
    description:
      "Phân tích nguy cơ bạo lực học đường trên mạng xã hội và tác động tới sức khỏe tinh thần của học sinh.",
    youtubeId: "Kl4SgPD50X4",
    category: "Phóng sự",
    source: "VTV24",
  },
];

export const featuredVideoId = "vl-phong-su-1";
