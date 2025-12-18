// src/types/discussion.ts
export interface Post {
  id: string;
  authorId: string;
  authorDisplayName: string;
  authorAvatarUrl?: string;
  isAnonymous: boolean;
  content: string;
  imageUrls?: string[];
  tags?: string[];
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  updatedAt?: Date;
}
