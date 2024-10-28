import { useEffect, useState } from "react";
import { NewPost, Post, User } from "../../../temp/types.ts";
import {
  deleteExistingPost,
  getPosts,
  getPostsByTag,
  getSearchPosts,
  postNewPost,
  putExistingPost,
} from "../../../entities/post/api";

export const usePostTable = () => {
  const queryParams = new URLSearchParams(location.search);

  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(queryParams.get("search") || "");
  const [selectedTag, setSelectedTag] = useState<string>(queryParams.get("tag") || "");

  const [total, setTotal] = useState<number>(0);
  const [skip, setSkip] = useState<number>(parseInt(queryParams.get("skip") || "0"));
  const [limit, setLimit] = useState<number>(parseInt(queryParams.get("limit") || "10"));
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [sortBy, setSortBy] = useState<string>(queryParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState<string>(queryParams.get("sortOrder") || "asc");
  const [newPost, setNewPost] = useState<NewPost>({ title: "", body: "", userId: 1 });

  const fetchPosts = async () => {
    // setLoading(true);

    const response = await getPosts(limit, skip);

    if (response) {
      const { postsData, usersData } = response;

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      // setTotal(postsData.total);
    }

    // setLoading(false);
  };

  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      await fetchPosts();
      return;
    }

    // setLoading(true);

    const data = await getPostsByTag(tag);

    if (data) {
      const { postsData, usersData } = data;

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      // setTotal(postsData.total);
    }

    // setLoading(false);
  };

  // // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      await fetchPosts();
      return;
    }

    // setLoading(true);

    const data = await getSearchPosts(searchQuery);

    if (data) {
      setPosts(data.posts);
      setTotal(data.total);

      // setLoading(false);
    }
  };

  // 게시물 추가
  const addPost = async () => {
    const data = await postNewPost(newPost);

    if (data) {
      setPosts([data, ...posts]);
      // setShowAddDialog(false);
      setNewPost({ title: "", body: "", userId: 1 });
    }
  };

  // 게시물 업데이트
  const updatePost = async () => {
    if (selectedPost) {
      const data = await putExistingPost(selectedPost);

      if (data) {
        setPosts(posts.map((post) => (post.id === data.id ? data : post)));
        // setShowEditDialog(false);
      }
    }
  };

  // 게시물 삭제
  const deletePost = async (id: number) => {
    await deleteExistingPost(id);

    setPosts(posts.filter((post) => post?.id !== id));
  };

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag);
    } else {
      fetchPosts();
    }
    // updateURL();
    // , ,
  }, [skip, limit, selectedTag, sortBy, sortOrder]);

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    searchQuery,
    selectedTag,
  };
};
