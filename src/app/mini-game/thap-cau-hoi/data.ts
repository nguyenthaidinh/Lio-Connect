// app/mini-game/thap-cau-hoi/data.ts
export type TowerQuestion = {
  id: string;
  level: number; // bậc trong tháp
  question: string;
  options: string[];
  correctIndex: number;
};

export const towerQuestions: TowerQuestion[] = [
  {
    id: "t1",
    level: 1,
    question: "Bạo lực học đường thường xảy ra ở đâu nhiều nhất?",
    options: [
      "Trong khuôn viên trường, lớp học",
      "Chỉ ở ngoài cổng trường",
      "Chỉ trên mạng xã hội",
      "Không xảy ra trong thực tế",
    ],
    correctIndex: 0,
  },
  {
    id: "t2",
    level: 2,
    question: "Hành vi nào sau đây là bạo lực tinh thần?",
    options: [
      "Đẩy bạn ngã",
      "Đập sách vở của bạn",
      "Lăng mạ, chửi bới, xúc phạm danh dự",
      "Giữ chỗ ngồi giúp bạn",
    ],
    correctIndex: 2,
  },
  {
    id: "t3",
    level: 3,
    question: "Khi bị bắt nạt, điều nào sau đây NÊN làm?",
    options: [
      "Giấu kín, không nói với ai",
      "Trao đổi với người lớn, giáo viên hoặc người mà bạn tin tưởng",
      "Trả đũa bằng cách đánh lại",
      "Tự rời khỏi trường ngay lập tức",
    ],
    correctIndex: 1,
  },
  // thêm level tuỳ ý…
];
