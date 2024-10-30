import React, { createContext, useContext, useState } from "react";
import { NewPost, Post, Tag } from "../../../entities/post/model/types.ts";
import { useQueryParams } from "./useQueryParams.ts";

interface PostContextProps {
  posts: Post[];
  total: number;
  loading: boolean;
  tags: Tag[];
  selectedTag: string;
  selectedPost: Post | null;
  newPost: NewPost;
  showAddDialog: boolean;
  showEditDialog: boolean;
  skip: number;
  limit: number;
  searchQuery: string;
  sortBy: string;
  sortOrder: string;
  setLoading: (loading: boolean) => void;
  setTags: (tags: Tag[]) => void;
  setTotal: (total: number) => void;
  setPosts: (post: Post[]) => void;
  setSkip: (value: number) => void;
  setLimit: (value: number) => void;
  setSearchQuery: (value: string) => void;
  setSortBy: (value: string) => void;
  setSortOrder: (value: string) => void;
  setSelectedTag: (value: string) => void;
  setSelectedPost: (post: Post | null) => void;
  setNewPost: (post: NewPost) => void;
  setShowAddDialog: (value: boolean) => void;
  setShowEditDialog: (value: boolean) => void;
  showPostDetailDialog: boolean;
  setShowPostDetailDialog: (showPostDetailDialog: boolean) => void;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { queryParams, setQueryParams } = useQueryParams();

  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<NewPost>({ title: "", body: "", userId: 1 });
  const [loading, setLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [showPostDetailDialog, setShowPostDetailDialog] = useState<boolean>(false);

  return (
    <PostContext.Provider
      value={{
        posts,
        total,
        loading,
        setLoading,
        tags,
        setTags,
        selectedTag: queryParams.selectedTag,
        selectedPost,
        newPost,
        showAddDialog,
        showEditDialog,
        skip: queryParams.skip,
        limit: queryParams.limit,
        searchQuery: queryParams.searchQuery,
        sortBy: queryParams.sortBy,
        sortOrder: queryParams.sortOrder,
        showPostDetailDialog,
        setShowPostDetailDialog,
        setPosts,
        setSkip: (value) => setQueryParams({ skip: value }),
        setLimit: (value) => setQueryParams({ limit: value }),
        setSearchQuery: (value) => setQueryParams({ searchQuery: value }),
        setSortBy: (value) => setQueryParams({ sortBy: value }),
        setSortOrder: (value) => setQueryParams({ sortOrder: value }),
        setSelectedTag: (value) => setQueryParams({ selectedTag: value }),
        setSelectedPost,
        setNewPost,
        setShowAddDialog,
        setShowEditDialog,
        setTotal,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
