import { useFetchPosts } from "@/entities/post/api/hooks";
import { createContext, useContext } from "react";
import { useNavigator } from "../lib/useNavigator";

type PostContextType = ReturnType<typeof useFetchPosts>;

export const PostContext = createContext<PostContextType | null>(null);

type PostProviderProps = {
  children: React.ReactNode;
};

export const PostProvider = ({ children }: PostProviderProps) => {
  const { queries } = useNavigator();
  const values = useFetchPosts(queries);

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
