import { Post } from "@/pages/PostsManagerPage";
import { createContext, useContext, useState } from "react";

type SelectedPostContextType = {
  selectedPost: Post | null;
  handleSelectPost: (post: Post | null) => void;
};

const SelectedPostContext = createContext<SelectedPostContextType | null>(null);

type SelectedPostProviderProps = {
  children: React.ReactNode;
};

export const SelectedPostProvider = ({ children }: SelectedPostProviderProps) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleSelectPost = (post: Post | null) => {
    setSelectedPost(post);
  };

  return (
    <SelectedPostContext.Provider value={{ selectedPost, handleSelectPost }}>{children}</SelectedPostContext.Provider>
  );
};

export const useSelectedPost = () => {
  const context = useContext(SelectedPostContext);
  if (!context) {
    throw new Error("useSelectedPost must be used within a SelectedPostProvider");
  }
  return context;
};
