import { useFetchPosts } from "@/entities/post/lib/useFetchPosts";
import { Post } from "@/entities/post/model/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigator } from "../lib/useNavigator";

type PostContextType = ReturnType<typeof useFetchPosts> & {
  handleSetPosts: (posts: Post[]) => void;
};

export const PostContext = createContext<PostContextType | null>(null);

type PostProviderProps = {
  children: React.ReactNode;
};

export const PostProvider = ({ children }: PostProviderProps) => {
  const { queries } = useNavigator();
  const values = useFetchPosts(queries);
  const [posts, setPosts] = useState<Post[]>([]);

  const handleSetPosts = (posts: Post[]) => {
    setPosts(posts);
  };

  useEffect(() => {
    setPosts(values.posts);
  }, [values.posts]);

  return <PostContext.Provider value={{ ...values, posts, handleSetPosts }}>{children}</PostContext.Provider>;
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
