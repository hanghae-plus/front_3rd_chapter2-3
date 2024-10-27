import { Comment } from "@/pages/PostsManagerPage";
import { createContext, useContext, useState } from "react";
type SelectedCommentContextType = {
  selectedComment: Comment | null;
  handleSelectComment: (comment: Comment | null) => void;
};

const SelectedCommentContext = createContext<SelectedCommentContextType | null>(null);

type SelectedCommentProviderProps = {
  children: React.ReactNode;
};

export const SelectedCommentProvider = ({ children }: SelectedCommentProviderProps) => {
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  const handleSelectComment = (comment: Comment | null) => {
    setSelectedComment(comment);
  };

  return (
    <SelectedCommentContext.Provider value={{ selectedComment, handleSelectComment }}>
      {children}
    </SelectedCommentContext.Provider>
  );
};

export const useSelectedComment = () => {
  const context = useContext(SelectedCommentContext);
  if (!context) {
    throw new Error("useSelectedComment must be used within a SelectedCommentProvider");
  }
  return context;
};
