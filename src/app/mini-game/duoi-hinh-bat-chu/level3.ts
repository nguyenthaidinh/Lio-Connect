// src/app/games/duoi-hinh-bat-chu/level3.ts

export type CatchwordGroup = "violence" | "emotion" | "solution";

export interface PictureClue {
  codepoint: string;
  emoji: string;
  imageUrl: string;
  alt: string;
}

export interface CatchwordQuestion {
  id: string;
  answer: string;
  level: 1 | 2 | 3;
  group: CatchwordGroup;
  explanation: string;
  clues: PictureClue[];
}

// 🔷 LEVEL 3 – GIẢI PHÁP & PHÒNG CHỐNG (Tích cực)
export const catchwordLevel3: CatchwordQuestion[] = [
  {
    id: "L3-21",
    answer: "Chia sẻ",
    level: 3,
    group: "solution",
    explanation: "Chia + Sẻ = Chia Sẻ",
    clues: [
      {
        codepoint: "2797",
        emoji: "➗",
        imageUrl: "https://openmoji.org/data/color/svg/2797.svg",
        alt: "Dấu chia (Chia)",
      },
      {
        codepoint: "1F426",
        emoji: "🐦",
        imageUrl: "https://openmoji.org/data/color/svg/1F426.svg",
        alt: "Chim nhỏ / chim sẻ (Sẻ)",
      },
    ],
  },

  {
    id: "L3-22",
    answer: "Đồng cảm",
    level: 3,
    group: "solution",
    explanation: "Đồng + Cam = Đồng Cảm",
    clues: [
      {
        codepoint: "1F33E",
        emoji: "🌾",
        imageUrl: "https://openmoji.org/data/color/svg/1F33E.svg",
        alt: "Cánh đồng lúa / bó lúa (Đồng)",
      },
      {
        codepoint: "1F34A",
        emoji: "🍊",
        imageUrl: "https://openmoji.org/data/color/svg/1F34A.svg",
        alt: "Quả cam (Cam)",
      },
    ],
  },

  {
    id: "L3-23",
    answer: "Bảo vệ",
    level: 3,
    group: "solution",
    explanation: "Bão + Vệ = Bảo Vệ",
    clues: [
      {
        codepoint: "26C8",
        emoji: "⛈",
        imageUrl: "https://openmoji.org/data/color/svg/26C8.svg",
        alt: "Mây giông bão (Bão)",
      },
      {
        codepoint: "1F6E1",
        emoji: "🛡",
        imageUrl: "https://openmoji.org/data/color/svg/1F6E1.svg",
        alt: "Chiếc khiên / biểu tượng bảo vệ (Vệ)",
      },
    ],
  },

  {
    id: "L3-24",
    answer: "Lắng nghe",
    level: 3,
    group: "solution",
    explanation: "Lăng + Nghe = Lắng Nghe",
    clues: [
      {
        codepoint: "1F3DB",
        emoji: "🏛",
        imageUrl: "https://openmoji.org/data/color/svg/1F3DB.svg",
        alt: "Tòa nhà cổ / lăng tẩm (Lăng)",
      },
      {
        codepoint: "1F442",
        emoji: "👂",
        imageUrl: "https://openmoji.org/data/color/svg/1F442.svg",
        alt: "Cái tai (Nghe)",
      },
    ],
  },

  {
    id: "L3-25",
    answer: "Tố cáo",
    level: 3,
    group: "solution",
    explanation: "Tô + Cáo = Tố Cáo",
    clues: [
      {
        codepoint: "1F35C",
        emoji: "🍜",
        imageUrl: "https://openmoji.org/data/color/svg/1F35C.svg",
        alt: "Tô mì / tô thức ăn (Tô)",
      },
      {
        codepoint: "1F98A",
        emoji: "🦊",
        imageUrl: "https://openmoji.org/data/color/svg/1F98A.svg",
        alt: "Con cáo (Cáo)",
      },
    ],
  },

  {
    id: "L3-26",
    answer: "Tha thứ",
    level: 3,
    group: "solution",
    explanation: "Tha + Thư = Tha Thứ",
    clues: [
      {
        codepoint: "1F47B",
        emoji: "👻",
        imageUrl: "https://openmoji.org/data/color/svg/1F47B.svg",
        alt: "Bóng ma / thả trôi (Tha)",
      },
      {
        codepoint: "2709",
        emoji: "✉️",
        imageUrl: "https://openmoji.org/data/color/svg/2709.svg",
        alt: "Bức thư (Thư)",
      },
    ],
  },

  {
    id: "L3-27",
    answer: "Tôn trọng",
    level: 3,
    group: "solution",
    explanation: "Tôn + Trọng = Tôn Trọng",
    clues: [
      {
        codepoint: "1F412",
        emoji: "🐒",
        imageUrl: "https://openmoji.org/data/color/svg/1F412.svg",
        alt: "Khỉ – gợi Tôn Ngộ Không (Tôn)",
      },
      {
        codepoint: "2696",
        emoji: "⚖️",
        imageUrl: "https://openmoji.org/data/color/svg/2696.svg",
        alt: "Cán cân công lý / cân nặng (Trọng)",
      },
    ],
  },

  {
    id: "L3-28",
    answer: "Công bằng",
    level: 3,
    group: "solution",
    explanation: "Công + Bằng = Công Bằng",
    clues: [
      {
        codepoint: "1F99A",
        emoji: "🦚",
        imageUrl: "https://openmoji.org/data/color/svg/1F99A.svg",
        alt: "Con công (Công)",
      },
      {
        codepoint: "003D",
        emoji: "=",
        imageUrl: "https://openmoji.org/data/color/svg/003D.svg",
        alt: "Dấu bằng (Bằng)",
      },
    ],
  },

  {
    id: "L3-29",
    answer: "Kỷ luật",
    level: 3,
    group: "solution",
    explanation: "Kỳ + Luật = Kỷ Luật",
    clues: [
      {
        codepoint: "1F6A9",
        emoji: "🚩",
        imageUrl: "https://openmoji.org/data/color/svg/1F6A9.svg",
        alt: "Lá cờ (Kỳ)",
      },
      {
        codepoint: "1F4D8",
        emoji: "📘",
        imageUrl: "https://openmoji.org/data/color/svg/1F4D8.svg",
        alt: "Quyển sách / sách luật (Luật)",
      },
    ],
  },

  {
    id: "L3-30",
    answer: "Trách nhiệm",
    level: 3,
    group: "solution",
    explanation: "Chanh/Tranh + Nghiệm = Trách Nhiệm",
    clues: [
      {
        codepoint: "1F34B",
        emoji: "🍋",
        imageUrl: "https://openmoji.org/data/color/svg/1F34B.svg",
        alt: "Quả chanh (Chanh → Trách/Tranh, lái âm)",
      },
      {
        codepoint: "1F9EA",
        emoji: "🧪",
        imageUrl: "https://openmoji.org/data/color/svg/1F9EA.svg",
        alt: "Ống nghiệm (Nghiệm)",
      },
    ],
  },
];
