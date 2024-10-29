import { postApi } from "@/entities/post/api/postApi";
import { NewPost, Post } from "@/entities/post/model/types";
import { userApi } from "@/entities/user/api/userApi";
import { findById } from "@/shared/lib/array";
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

const handler = async <T>(fn: () => T, onError: (error: unknown) => void) => {
  try {
    return await fn();
  } catch (error) {
    onError(error);
    throw error;
  }
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
    const data = await handler(
      () => postApi.addPost(newPost),
      (error) => console.error("게시물 추가 오류:", error),
    );

    const users = await userApi.getUsers({ select: ["username", "image"] });
    const postWithUser: Post = {
      ...data,
      author: findById(users, data.userId),
      tags: [],
      reactions: { likes: 0, dislikes: 0 },
    };
    console.log(postWithUser);

    //FIXME: 실제로 추가하면 필드가 부족해서 오류가 남 / 테스트 자체는 통과함
    set((state) => ({ posts: [postWithUser, ...state.posts] }));
  },
  fetchPosts: async (props) => {
    set({ loading: true });

    const { posts, total } = await handler(
      () => postApi.getPosts(props || { limit: 10, skip: 0 }),
      (error) => console.error("게시물 가져오기 오류:", error),
    );

    const users = await userApi.getUsers({ select: ["username", "image"] });
    const postsWithUsers = posts.map((post) => ({
      ...post,
      author: findById(users, post.userId),
    }));

    set({ posts: postsWithUsers, total });
    set({ loading: false });
  },
  updatePost: async (post) => {
    set({ loading: true });
    const updatedPost = await handler(
      () => postApi.updatePost(post),
      (error) => console.error("게시물 업데이트 오류:", error),
    );
    set((state) => ({ posts: state.posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)) }));
    set({ loading: false });
  },
  deletePost: async (id) => {
    await handler(
      () => postApi.deletePost(id),
      (error) => console.error("게시물 삭제 오류:", error),
    );
    set((state) => ({ posts: state.posts.filter((p) => p.id !== id) }));
  },
  fetchPostsByTag: async (tag) => {
    set({ loading: true });
    const { posts, total } = await handler(
      () => postApi.fetchPostsByTag(tag),
      (error) => console.error("게시물 태그 가져오기 오류:", error),
    );
    const users = await userApi.getUsers({ select: ["username", "image"] });
    const postsWithUsers = posts.map((post) => ({
      ...post,
      author: findById(users, post.userId),
    }));
    set({ posts: postsWithUsers, total });
    set({ loading: false });
  },
  searchPosts: async ({ searchQuery, limit, skip }) => {
    if (!searchQuery) {
      get().fetchPosts({ limit, skip });
      return;
    }
    set({ loading: true });
    const { posts, total } = await handler(
      () => postApi.searchPosts(searchQuery),
      (error) => console.error("게시물 검색 오류:", error),
    );
    const users = await userApi.getUsers({ select: ["username", "image"] });
    const postsWithUsers = posts.map((post) => ({
      ...post,
      author: findById(users, post.userId),
    }));
    set({ posts: postsWithUsers, total });
    set({ loading: false });
  },
}));

export default usePostsStore;
