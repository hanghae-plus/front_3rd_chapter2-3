import { useMutation, useQuery } from "@tanstack/react-query"
import {
  fetchPosts,
  fetchTags,
  fetchSearchPosts,
  addPost,
  updatePost,
  deletePost,
  fetchPostsByTag,
  fetchSearchQueryPosts,
} from "../../../entities/posts/api/postEntitiesApi"
import { NewPost, Post, SelectedPost } from "../../../entities/posts/model/Post"

function useFetchPosts(limit: number, skip: number) {
  return useQuery({
    queryKey: ["posts", limit, skip],
    queryFn: () => fetchPosts(limit, skip),
  })
}

function useFetchSearchQueryPosts(searchQuery: string) {
  return useQuery({
    queryKey: ["searchQueryPosts", searchQuery],
    queryFn: () => fetchSearchQueryPosts(searchQuery),
  })
}

function useFetchTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => fetchTags(),
  })
}

function useFetchPostsByTag(tag: string) {
  return useQuery({
    queryKey: ["tags", tag],
    queryFn: () => fetchPostsByTag(tag),
  })
}

function useFetchSearchPosts() {
  return useQuery({
    queryKey: ["searchPosts"],
    queryFn: () => fetchSearchPosts(),
  })
}

function useAddPost() {
  return useMutation({
    mutationFn: (newPost: NewPost) => addPost(newPost),
  })
}

function useUpdatePost() {
  return useMutation<Post, Error, SelectedPost>({
    mutationFn: (selectedPost: SelectedPost) => updatePost(selectedPost),
  })
}

function useDeletePost() {
  return useMutation({
    mutationFn: (id: number) => deletePost(id),
  })
}

export {
  useFetchPosts,
  useFetchSearchQueryPosts,
  useFetchTags,
  useFetchPostsByTag,
  useFetchSearchPosts,
  useAddPost,
  useUpdatePost,
  useDeletePost,
}
