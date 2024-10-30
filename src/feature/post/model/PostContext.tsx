import React, { createContext, useContext, useEffect, useState } from "react";
import { getPosts, getPostsByTag, getSearchPosts, getTags } from "../../../entities/post/api";
import { NewPost, Post, Tag } from "../../../entities/post/model/types.ts";
import { User } from "../../../entities/user/model/types.ts";
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
  fetchPosts: () => void;
  fetchPostsByTag: (tag: string) => void;
  fetchTags: () => void;
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
  searchPosts: () => void;
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

  const fetchPosts = async () => {
    setLoading(true);

    const response = await getPosts(queryParams.limit, queryParams.skip);

    if (response) {
      const { postsData, usersData } = response;

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    }

    setLoading(false);
  };

  const searchPosts = async () => {
    if (!queryParams.searchQuery) {
      await fetchPosts();
      return;
    }

    setLoading(true);

    const data = await getSearchPosts(queryParams.searchQuery);

    if (data) {
      setPosts(data.posts);
      setTotal(data.total);
    }

    setLoading(false);
  };

  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      await fetchPosts();
      return;
    }

    setLoading(true);

    const data = await getPostsByTag(tag);

    if (data) {
      const { postsData, usersData } = data;

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    }

    setLoading(false);
  };

  const fetchTags = async () => {
    const data = await getTags();
    if (data) setTags(data);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (queryParams.selectedTag) {
      fetchPostsByTag(queryParams.selectedTag);
    } else {
      fetchPosts();
    }
  }, [queryParams.skip, queryParams.limit, queryParams.sortBy, queryParams.sortOrder, queryParams.selectedTag]);

  return (
    <PostContext.Provider
      value={{
        posts,
        total,
        loading,
        tags,
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
        fetchPosts,
        fetchPostsByTag,
        fetchTags,
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
        searchPosts,
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
