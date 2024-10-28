import { Comment } from "@/entities/comment/model/types";
import { createContext, useContext, useMemo, useState } from "react";

interface CommentContextState {
  comments: { [key: number]: Comment[] };
  loading: boolean;
  handleSetComments: (
    comments: { [key: number]: Comment[] } | ((prev: { [key: number]: Comment[] }) => { [key: number]: Comment[] }),
  ) => void;
}

interface CommentContextActions {
  setComments: (comments: { [key: number]: Comment[] }) => void;
  setLoading: (loading: boolean) => void;
}

type CommentContextValue = CommentContextState & CommentContextActions;

const CommentContext = createContext<CommentContextValue | null>(null);

export const CommentProvider = ({ children }: { children: React.ReactNode }) => {
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [loading, setLoading] = useState(false);

  const handleSetComments = (
    comments: { [key: number]: Comment[] } | ((prev: { [key: number]: Comment[] }) => { [key: number]: Comment[] }),
  ) => {
    if (typeof comments === "function") {
      setComments((prev) => comments(prev));
    } else {
      setComments(comments);
    }
  };

  const value: CommentContextValue = useMemo(
    () => ({
      // state
      comments,
      loading,
      // actions
      setComments,
      setLoading,
      handleSetComments,
    }),
    [comments, loading, setComments, setLoading, handleSetComments],
  );

  return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
};

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useCommentContext must be used within CommentProvider");
  }
  return context;
};
