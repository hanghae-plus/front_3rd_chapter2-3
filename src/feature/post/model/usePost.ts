import { NewPost, Post, Tag } from "../../../entities/post/model/types.ts";
import { atom } from "jotai/index";
import { useAtom } from "jotai";
import { QueryParams } from "./useQueryParams.ts";
import { useEffect } from "react";

interface PostAtomState {
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

export const postsAtom = atom<Post[]>([]);
export const totalAtom = atom<number>(0);
export const selectedPostAtom = atom<Post | null>(null);
export const showAddDialogAtom = atom<boolean>(false);
export const showEditDialogAtom = atom<boolean>(false);
export const newPostAtom = atom<NewPost>({ title: "", body: "", userId: 1 });
export const loadingAtom = atom<boolean>(false);
export const tagsAtom = atom<Tag[]>([]);
export const showPostDetailDialogAtom = atom<boolean>(false);

export const queryParamsAtom = atom<QueryParams>({
  skip: 0,
  limit: 10,
  searchQuery: "",
  sortBy: "",
  sortOrder: "",
  selectedTag: "",
});

export const setQueryParamsAtom = atom(null, (get, set, newParams: Partial<QueryParams>) => {
  const currentParams = get(queryParamsAtom);
  const updatedParams = { ...currentParams, ...newParams };
  set(queryParamsAtom, updatedParams);
});

export const usePost = (): PostAtomState => {
  const [posts, setPosts] = useAtom(postsAtom);
  const [total, setTotal] = useAtom(totalAtom);
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom);
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom);
  const [newPost, setNewPost] = useAtom(newPostAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [tags, setTags] = useAtom(tagsAtom);
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom);

  const [queryParams, setQueryParams] = useAtom(queryParamsAtom);
  const [, updateQueryParams] = useAtom(setQueryParamsAtom);

  useEffect(() => {
    // sortBy나 sortOrder가 변경될 때마다 URL 동기화
    setQueryParams(queryParams);
  }, [queryParams.sortBy, queryParams.sortOrder]);

  return {
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
    setSkip: (value) => updateQueryParams({ skip: value }),
    setLimit: (value) => updateQueryParams({ limit: value }),
    setSearchQuery: (value) => updateQueryParams({ searchQuery: value }),
    setSortBy: (value) => updateQueryParams({ sortBy: value }),
    setSortOrder: (value) => updateQueryParams({ sortOrder: value }),
    setSelectedTag: (value) => updateQueryParams({ selectedTag: value }),
    setSelectedPost,
    setNewPost,
    setShowAddDialog,
    setShowEditDialog,
    setTotal,
  };
};
