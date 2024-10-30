import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, getPostsByTag, getSearchPosts, getTags } from "../../../entities/post/api";
import { NewPost, Post, Tag } from "../../../entities/post/model/types.ts";
import { User } from "../../../entities/user/model/types.ts";

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
  addPost: () => void;
  updatePost: () => void;
  deletePost: (id: number) => void;
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
  updateURL: () => void;
  showPostDetailDialog: boolean;
  setShowPostDetailDialog: (showPostDetailDialog: boolean) => void;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [skip, setSkip] = useState<number>(parseInt(queryParams.get("skip") || "0"));
  const [limit, setLimit] = useState<number>(parseInt(queryParams.get("limit") || "10"));
  const [searchQuery, setSearchQuery] = useState<string>(queryParams.get("search") || "");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [sortBy, setSortBy] = useState<string>(queryParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState<string>(queryParams.get("sortOrder") || "asc");
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<NewPost>({ title: "", body: "", userId: 1 });
  const [loading, setLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>(queryParams.get("tag") || "");
  const [showPostDetailDialog, setShowPostDetailDialog] = useState<boolean>(false);

  const updateURL = () => {
    const params = new URLSearchParams();
    if (skip) params.set("skip", skip.toString());
    if (limit) params.set("limit", limit.toString());
    if (searchQuery) params.set("search", searchQuery);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);
    if (selectedTag) params.set("tag", selectedTag);
    navigate(`?${params.toString()}`);
  };

  const fetchPosts = async () => {
    setLoading(true);

    const response = await getPosts(limit, skip);

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
    if (!searchQuery) {
      await fetchPosts();
      return;
    }

    setLoading(true);

    const data = await getSearchPosts(searchQuery);

    if (data) {
      setPosts(data.posts);
      setTotal(data.total);

      setLoading(false);
    }
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

    if (data) {
      setTags(data);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSkip(parseInt(params.get("skip") || "0"));
    setLimit(parseInt(params.get("limit") || "10"));
    setSearchQuery(params.get("search") || "");
    setSortBy(params.get("sortBy") || "");
    setSortOrder(params.get("sortOrder") || "asc");
    setSelectedTag(params.get("tag") || "");
  }, [location.search]);

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag);
    } else {
      fetchPosts();
    }
    updateURL();
  }, [skip, limit, sortBy, sortOrder, selectedTag]);

  return (
    <PostContext.Provider
      value={{
        posts,
        total,
        loading,
        tags,
        selectedTag,
        selectedPost,
        newPost,
        showAddDialog,
        showEditDialog,
        skip,
        limit,
        searchQuery,
        sortBy,
        sortOrder,
        showPostDetailDialog,
        setShowPostDetailDialog,
        fetchPosts,
        fetchPostsByTag,
        fetchTags,
        setPosts,
        updatePost,
        deletePost,
        setSkip,
        setLimit,
        setSearchQuery,
        setSortBy,
        setSortOrder,
        setSelectedTag,
        setSelectedPost,
        setNewPost,
        setShowAddDialog,
        setShowEditDialog,
        searchPosts,
        updateURL,
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
