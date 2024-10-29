import React, { createContext, useContext, useState, ReactNode } from "react";
import { Post } from '../shared/types'


// Context 타입 정의
interface PostsContextType {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
  searchQuery: string;
  sortBy: string;
  sortOrder: string;
  loading: boolean;
  newPost: { title: string; body: string; userId: number };
  showAddDialog: boolean;
  setPosts: (posts: Post[]) => void;
  setTotal: (total: number) => void;
  setSkip: (skip: number) => void;
  setLimit: (limit: number) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: string) => void;
  setLoading: (loading: boolean) => void;
  setNewPost: (post: { title: string; body: string; userId: number }) => void;
  setShowAddDialog: (show: boolean) => void;
}

// Context 생성
const PostsContext = createContext<PostsContextType | undefined>(undefined);

// Context 제공자 컴포넌트 생성
export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [loading, setLoading] = useState<boolean>(false);
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  const [showAddDialog, setShowAddDialog] = useState(false)

  // value 객체에 필요한 상태와 메서드 포함
  const value: PostsContextType = {
    posts,
    total,
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    loading,
    newPost,
    showAddDialog,
    setPosts,
    setTotal,
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setLoading,
    setNewPost,
    setShowAddDialog,
  };

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
};

// Context 소비를 위한 커스텀 훅 생성
export const usePostsContext = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePostsContext must be used within a PostsProvider");
  }
  return context;
};