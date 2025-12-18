// src/app/games/duoi-hinh-bat-chu/level2.ts

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

// 🔶 LEVEL 2 – CẢM XÚC & HẬU QUẢ
export const catchwordLevel2: CatchwordQuestion[] = [
  {
    id: "L2-11",
    answer: "Lo âu",
    level: 2,
    group: "emotion",
    explanation: "Lò + Âu = Lo Âu",
    clues: [
      {
        codepoint: "1F373",
        emoji: "🍳",
        imageUrl: "https://openmoji.org/data/color/svg/1F373.svg",
        alt: "Chảo / lò nướng (Lò)",
      },
      {
        codepoint: "1F54A",
        emoji: "🕊",
        imageUrl: "https://openmoji.org/data/color/svg/1F54A.svg",
        alt: "Chim bồ câu / chim âu (Âu)",
      },
    ],
  },

  {
    id: "L2-12",
    answer: "Đau khổ",
    level: 2,
    group: "emotion",
    explanation: "Đau + Khổ = Đau Khổ",
    clues: [
      {
        codepoint: "1F915",
        emoji: "🤕",
        imageUrl: "https://openmoji.org/data/color/svg/1F915.svg",
        alt: "Khuôn mặt bị thương (Đau)",
      },
      {
        codepoint: "1F952",
        emoji: "🥒",
        imageUrl: "https://openmoji.org/data/color/svg/1F952.svg",
        alt: "Khổ qua (Khổ)",
      },
    ],
  },

  {
    id: "L2-13",
    answer: "Xấu hổ",
    level: 2,
    group: "emotion",
    explanation: "Xấu + Hổ = Xấu Hổ",
    clues: [
      {
        codepoint: "1F648",
        emoji: "🙈",
        imageUrl: "https://openmoji.org/data/color/svg/1F648.svg",
        alt: "Khỉ che mắt – ngại / xấu (Xấu)",
      },
      {
        codepoint: "1F42F",
        emoji: "🐯",
        imageUrl: "https://openmoji.org/data/color/svg/1F42F.svg",
        alt: "Con hổ (Hổ)",
      },
    ],
  },

  {
    id: "L2-14",
    answer: "Đơn độc",
    level: 2,
    group: "emotion",
    explanation: "Đơn + Độc = Đơn Độc",
    clues: [
      {
        codepoint: "1F4C4",
        emoji: "📄",
        imageUrl: "https://openmoji.org/data/color/svg/1F4C4.svg",
        alt: "Tờ đơn (Đơn)",
      },
      {
        codepoint: "2620",
        emoji: "☠️",
        imageUrl: "https://openmoji.org/data/color/svg/2620.svg",
        alt: "Đầu lâu – chất độc (Độc)",
      },
    ],
  },

  {
    id: "L2-15",
    answer: "Trầm cảm",
    level: 2,
    group: "emotion",
    explanation: "Trầm + Cam = Trầm Cảm",
    clues: [
      {
        codepoint: "1FA94",
        emoji: "🪔",
        imageUrl: "https://openmoji.org/data/color/svg/1FA94.svg",
        alt: "Đèn dầu / hương trầm (Trầm)",
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
    id: "L2-16",
    answer: "Tuyệt vọng",
    level: 2,
    group: "emotion",
    explanation: "Tuyết/Nguyệt + Võng = Tuyệt Vọng",
    clues: [
      {
        codepoint: "1F319",
        emoji: "🌙",
        imageUrl: "https://openmoji.org/data/color/svg/1F319.svg",
        alt: "Mặt trăng (Nguyệt → Tuyệt)",
      },
      {
        codepoint: "1F3D6",
        emoji: "🏖",
        imageUrl: "https://openmoji.org/data/color/svg/1F3D6.svg",
        alt: "Ghế nằm bãi biển – giống cái võng (Võng)",
      },
    ],
  },

  {
    id: "L2-17",
    answer: "Sợ hãi",
    level: 2,
    group: "emotion",
    explanation: "Sọ + Hái = Sợ Hãi",
    clues: [
      {
        codepoint: "1F480",
        emoji: "💀",
        imageUrl: "https://openmoji.org/data/color/svg/1F480.svg",
        alt: "Đầu lâu (Sọ)",
      },
      {
        codepoint: "1F338",
        emoji: "🌸",
        imageUrl: "https://openmoji.org/data/color/svg/1F338.svg",
        alt: "Bông hoa được hái (Hái)",
      },
    ],
  },

  {
    id: "L2-18",
    answer: "Tức giận",
    level: 2,
    group: "emotion",
    explanation: "Tức + Giày (Giận) = Tức Giận",
    clues: [
      {
        codepoint: "1F621",
        emoji: "😡",
        imageUrl: "https://openmoji.org/data/color/svg/1F621.svg",
        alt: "Khuôn mặt tức giận (Tức)",
      },
      {
        codepoint: "1F45F",
        emoji: "👟",
        imageUrl: "https://openmoji.org/data/color/svg/1F45F.svg",
        alt: "Đôi giày (Giày → Giận, lái âm)",
      },
    ],
  },

  {
    id: "L2-19",
    answer: "Ám ảnh",
    level: 2,
    group: "emotion",
    explanation: "Am + Ảnh = Ám Ảnh",
    clues: [
      {
        codepoint: "26E9",
        emoji: "⛩",
        imageUrl: "https://openmoji.org/data/color/svg/26E9.svg",
        alt: "Miếu nhỏ / am (Am)",
      },
      {
        codepoint: "1F5BC",
        emoji: "🖼",
        imageUrl: "https://openmoji.org/data/color/svg/1F5BC.svg",
        alt: "Khung ảnh (Ảnh)",
      },
    ],
  },

  {
    id: "L2-20",
    answer: "Nạn nhân",
    level: 2,
    group: "emotion",
    explanation: "Na + Nhẫn = Nạn Nhân",
    clues: [
      {
        codepoint: "1F34F",
        emoji: "🍏",
        imageUrl: "https://openmoji.org/data/color/svg/1F34F.svg",
        alt: "Quả táo xanh (Na – lái âm)",
      },
      {
        codepoint: "1F48D",
        emoji: "💍",
        imageUrl: "https://openmoji.org/data/color/svg/1F48D.svg",
        alt: "Chiếc nhẫn (Nhẫn)",
      },
    ],
  },
];
