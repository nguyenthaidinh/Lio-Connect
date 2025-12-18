// src/hooks/usePosts.ts
import { useEffect, useState } from "react";
import type { Post } from "@/types/discussion";
import { subscribeToPosts } from "@/services/discussionService";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToPosts((data) => {
      setPosts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { posts, loading };
}
