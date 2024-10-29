import { postApi } from "@/entities/post/api/postApi";
import { NewPost, Post } from "@/entities/post/model/types";
import { userApi } from "@/entities/user/api/userApi";
import { apiHandler } from "@/shared/api/apiHandler";
import { addItemInArray, filterByID, findById, updateByID } from "@/shared/lib/array";
import { create } from "zustand";

type PostsStates = {
  posts: Post[];
  loading: boolean;
  total: number;
  selectedPost: Post | null;
};

type PostActions = {
  initPosts: () => void;
  handleSelectPost: (post: Post) => void;
};

type PostApiActions = {
  addPost: (newPost: NewPost) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: number) => void;
  fetchPosts: (props?: { limit: number; skip: number }) => void;
  fetchPostsByTag: (tag: string) => void;
  searchPosts: (props: UseSearchPostsProps) => void;
};

type UseSearchPostsProps = {
  searchQuery: string;
  limit: number;
  skip: number;
};

type PostStore = PostsStates & PostActions & PostApiActions;

const usePostsStore = create<PostStore>()((set, get) => ({
  posts: [],
  selectedPost: null,
  loading: false,
  total: 0,

  handleSelectPost: (post) => {
    set({ selectedPost: post });
  },
  initPosts: () => {
    set({ posts: [], total: 0 });
  },
  addPost: async (newPost) => {
    const data = await apiHandler(
      () => postApi.addPost(newPost),
      (error) => console.error("게시물 추가 오류:", error),
    );
    if (!data) return;
    const users = await userApi.getUsers({ select: ["username", "image"] });
    const postWithUser: Post = {
      ...data,
      author: findById(users, data.userId),
      tags: [],
      reactions: { likes: 0, dislikes: 0 },
    };
    set((state) => ({ posts: addItemInArray(state.posts, postWithUser, "start") }));
  },
  fetchPosts: async (props) => {
    set({ loading: true });

    const result = await apiHandler(
      () => postApi.getPosts(props || { limit: 10, skip: 0 }),
      (error) => console.error("게시물 가져오기 오류:", error),
    );
    if (!result) return;
    const { posts, total } = result;
    const users = await userApi.getUsers({ select: ["username", "image"] });
    const postsWithUsers = posts.map((post) => ({
      ...post,
      author: findById(users, post.userId),
    }));
    set({ posts: postsWithUsers, total, loading: false });
  },
  updatePost: async (post) => {
    const updatedPost = await apiHandler(
      () => postApi.updatePost(post),
      (error) => console.error("게시물 업데이트 오류:", error),
    );
    if (!updatedPost) return;
    set((state) => ({ posts: updateByID(state.posts, updatedPost) }));
  },
  deletePost: async (id) => {
    await apiHandler(
      () => postApi.deletePost(id),
      (error) => console.error("게시물 삭제 오류:", error),
    );
    set((state) => ({ posts: filterByID(state.posts, id) }));
  },
  fetchPostsByTag: async (tag) => {
    set({ loading: true });
    const result = await apiHandler(
      () => postApi.fetchPostsByTag(tag),
      (error) => console.error("게시물 태그 가져오기 오류:", error),
    );
    if (!result) return;
    const { posts, total } = result;
    const users = await userApi.getUsers({ select: ["username", "image"] });
    const postsWithUsers = posts.map((post) => ({
      ...post,
      author: findById(users, post.userId),
    }));
    set({ posts: postsWithUsers, total, loading: false });
  },
  searchPosts: async ({ searchQuery, limit, skip }) => {
    if (!searchQuery) {
      get().fetchPosts({ limit, skip });
      return;
    }
    set({ loading: true });
    const result = await apiHandler(
      () => postApi.searchPosts(searchQuery),
      (error) => console.error("게시물 검색 오류:", error),
    );
    if (!result) return;
    const { posts, total } = result;
    const users = await userApi.getUsers({ select: ["username", "image"] });
    const postsWithUsers = posts.map((post) => ({
      ...post,
      author: findById(users, post.userId),
    }));
    set({ posts: postsWithUsers, total, loading: false });
  },
}));

export default usePostsStore;
