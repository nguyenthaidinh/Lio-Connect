// src/schemas/article.ts
import { z } from "zod";

export const ArticleStatus = z.enum(["draft", "published", "archived"]);

export const ArticleCreateSchema = z.object({
  title: z.string().min(5).max(140),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string().min(30).max(220),
  content: z.string().default(""),
  coverUrl: z.string().url().optional().nullable(),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  status: ArticleStatus.default("draft"),
  featured: z.boolean().default(false),
  publishedAt: z.string().datetime().optional().nullable(),

  // ======= External-source support =======
  isExternal: z.boolean().default(false),
  sourceUrl: z.string().url().optional().nullable(),
  sourceName: z.string().optional().nullable(),
  sourcePublishedAt: z.string().datetime().optional().nullable(),
});

export const ArticleUpdateSchema = ArticleCreateSchema.partial();

export type ArticleCreateInput = z.infer<typeof ArticleCreateSchema>;
export type ArticleUpdateInput = z.infer<typeof ArticleUpdateSchema>;
