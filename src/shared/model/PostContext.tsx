import { Post } from "@/entities/post/model/types";
import { createContext, useContext, useMemo, useState } from "react";

interface PostContextState {
  posts: Post[];
  total: number;
  loading: boolean;
}

interface PostContextActions {
  setPosts: (posts: Post[]) => void;
  setTotal: (total: number) => void;
  setLoading: (loading: boolean) => void;
}

type PostContextValue = PostContextState & PostContextActions;

const PostContext = createContext<PostContextValue | null>(null);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const value: PostContextValue = useMemo(
    () => ({
      // state
      posts,
      total,
      loading,
      // actions
      setPosts,
      setTotal,
      setLoading,
    }),
    [posts, total, loading, setPosts, setTotal, setLoading],
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within PostProvider");
  }
  return context;
};
