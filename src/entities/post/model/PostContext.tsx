import { createContext, useContext, useMemo } from "react";
import usePosts from "../lib/usePosts";

type PostContextValue = ReturnType<typeof usePosts>;
const PostContext = createContext<PostContextValue | null>(null);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const values = usePosts();
  const memoizedValues: PostContextValue = useMemo(() => values, [values]);

  return <PostContext.Provider value={memoizedValues}>{children}</PostContext.Provider>;
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within PostProvider");
  }
  return context;
};
