// src/app/games/duoi-hinh-bat-chu/level1.ts

export type CatchwordGroup = "violence" | "emotion" | "solution";

export interface PictureClue {
  codepoint: string;     // "1F35A"
  emoji: string;         // "🍚"
  imageUrl: string;      // "https://openmoji.org/data/color/svg/1F35A.svg"
  alt: string;           // "Bát cơm (Bát)"
}

export interface CatchwordQuestion {
  id: string;            // "L1-01"
  answer: string;        // "Bắt nạt"
  level: 1 | 2 | 3;
  group: CatchwordGroup;
  explanation: string;   // logic ghép chữ
  clues: PictureClue[];  // 2 hình gợi ý
}

// 🔹 LEVEL 1 – CÁC HÀNH VI BẠO LỰC (Dễ nhận biết)
export const catchwordLevel1: CatchwordQuestion[] = [
  {
    id: "L1-01",
    answer: "Bắt nạt",
    level: 1,
    group: "violence",
    explanation: "Bát + Lạc = Bắt Nạt",
    clues: [
      {
        codepoint: "1F35A",
        emoji: "🍚",
        imageUrl: "https://openmoji.org/data/color/svg/1F35A.svg",
        alt: "Bát cơm (Bát)",
      },
      {
        codepoint: "1F95C",
        emoji: "🥜",
        imageUrl: "https://openmoji.org/data/color/svg/1F95C.svg",
        alt: "Hạt lạc / đậu phộng (Lạc)",
      },
    ],
  },
  {
    id: "L1-02",
    answer: "Quấy rối",
    level: 1,
    group: "violence",
    explanation: "Khuấy + Rối = Quấy Rối",
    clues: [
      {
        codepoint: "2615",
        emoji: "☕",
        imageUrl: "https://openmoji.org/data/color/svg/2615.svg",
        alt: "Ly nước / cafe để khuấy (Khuấy)",
      },
      {
        codepoint: "1F9F6",
        emoji: "🧶",
        imageUrl: "https://openmoji.org/data/color/svg/1F9F6.svg",
        alt: "Cuộn len bị rối (Rối)",
      },
    ],
  },
  {
    id: "L1-03",
    answer: "Mỉa mai",
    level: 1,
    group: "violence",
    explanation: "Mía + Mai = Mỉa Mai",
    clues: [
      {
        codepoint: "1F96C",
        emoji: "🥬",
        imageUrl: "https://openmoji.org/data/color/svg/1F96C.svg",
        alt: "Cây rau lá / thân dài (Mía – ẩn dụ)",
      },
      {
        codepoint: "1F33C",
        emoji: "🌼",
        imageUrl: "https://openmoji.org/data/color/svg/1F33C.svg",
        alt: "Hoa vàng / hoa mai (Mai)",
      },
    ],
  },
  {
    id: "L1-04",
    answer: "Chửi bới",
    level: 1,
    group: "violence",
    explanation: "Chổi + Bới = Chửi Bới",
    clues: [
      {
        codepoint: "1F9F9",
        emoji: "🧹",
        imageUrl: "https://openmoji.org/data/color/svg/1F9F9.svg",
        alt: "Cái chổi (Chổi)",
      },
      {
        codepoint: "1F944",
        emoji: "🥄",
        imageUrl: "https://openmoji.org/data/color/svg/1F944.svg",
        alt: "Cái muỗng bới cơm (Bới)",
      },
    ],
  },
  {
    id: "L1-05",
    answer: "Hăm dọa",
    level: 1,
    group: "violence",
    explanation: "Hâm + Dạ = Hăm Dọa",
    clues: [
      {
        codepoint: "1F372",
        emoji: "🍲",
        imageUrl: "https://openmoji.org/data/color/svg/1F372.svg",
        alt: "Nồi canh đang hâm nóng (Hâm)",
      },
      {
        // có thể đổi sang E313 nếu Lio muốn đúng icon 'dạ dày' riêng của OpenMoji
        codepoint: "1FAC0",
        emoji: "🫀",
        imageUrl: "https://openmoji.org/data/color/svg/1FAC0.svg",
        alt: "Nội tạng / bên trong cơ thể (Dạ)",
      },
    ],
  },
  {
    id: "L1-06",
    answer: "Vu khống",
    level: 1,
    group: "violence",
    explanation: "Vú + Khổng (lồ) = Vu Khống",
    clues: [
      {
        codepoint: "1F37C",
        emoji: "🍼",
        imageUrl: "https://openmoji.org/data/color/svg/1F37C.svg",
        alt: "Bình sữa em bé (Vú)",
      },
      {
        codepoint: "1F479",
        emoji: "👹",
        imageUrl: "https://openmoji.org/data/color/svg/1F479.svg",
        alt: "Quái vật khổng lồ (Khổng/Khống)",
      },
    ],
  },
  {
    id: "L1-07",
    answer: "Chèn ép",
    level: 1,
    group: "violence",
    explanation: "Chèn (bánh xe) + Ép = Chèn Ép",
    clues: [
      {
        codepoint: "1F697",
        emoji: "🚗",
        imageUrl: "https://openmoji.org/data/color/svg/1F697.svg",
        alt: "Xe hơi / bánh xe bị chèn (Chèn)",
      },
      {
        codepoint: "1F5DC",
        emoji: "🗜",
        imageUrl: "https://openmoji.org/data/color/svg/1F5DC.svg",
        alt: "Cái kẹp / clamp dùng để ép (Ép)",
      },
    ],
  },
  {
    id: "L1-08",
    answer: "Sai vặt",
    level: 1,
    group: "violence",
    explanation: "Sai + Vợt = Sai Vặt",
    clues: [
      {
        codepoint: "274C",
        emoji: "❌",
        imageUrl: "https://openmoji.org/data/color/svg/274C.svg",
        alt: "Dấu sai (Sai)",
      },
      {
        codepoint: "1F3F8",
        emoji: "🏸",
        imageUrl: "https://openmoji.org/data/color/svg/1F3F8.svg",
        alt: "Cây vợt cầu lông (Vợt → Vặt)",
      },
    ],
  },
  {
    id: "L1-09",
    answer: "Cầm đầu",
    level: 1,
    group: "violence",
    explanation: "Cầm + Đầu = Cầm Đầu",
    clues: [
      {
        codepoint: "270B",
        emoji: "✋",
        imageUrl: "https://openmoji.org/data/color/svg/270B.svg",
        alt: "Bàn tay giơ lên / đang cầm (Cầm)",
      },
      {
        codepoint: "1F600",
        emoji: "😀",
        imageUrl: "https://openmoji.org/data/color/svg/1F600.svg",
        alt: "Khuôn mặt / cái đầu (Đầu)",
      },
    ],
  },
  {
    id: "L1-10",
    answer: "Xúi giục",
    level: 1,
    group: "violence",
    explanation: "Suối + Giỗ = Xúi Giục",
    clues: [
      {
        codepoint: "1F3DE",
        emoji: "🏞",
        imageUrl: "https://openmoji.org/data/color/svg/1F3DE.svg",
        alt: "Phong cảnh có sông / suối (Suối)",
      },
      {
        codepoint: "1F4C5",
        emoji: "📅",
        imageUrl: "https://openmoji.org/data/color/svg/1F4C5.svg",
        alt: "Tờ lịch – ngày giỗ (Giỗ)",
      },
    ],
  },
];
