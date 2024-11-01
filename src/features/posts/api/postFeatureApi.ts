import { useMutation, useQuery } from "@tanstack/react-query"
import {
  fetchPosts,
  fetchTags,
  addPost,
  updatePost,
  deletePost,
  fetchPostsByTag,
  fetchSearchQueryPosts,
} from "../../../entities/posts/api/postEntitiesApi"
import { NewPost, Post, SelectedPost } from "../../../entities/posts/model/Post"

const useFetchPosts = (limit: number, skip: number) => {
  return useQuery({
    queryKey: ["posts", limit, skip],
    queryFn: () => fetchPosts(limit, skip),
    staleTime: 0,
    gcTime: 600000,
    enabled: true,
  })
}

const useFetchSearchQueryPosts = (searchQuery: string) => {
  return useQuery({
    queryKey: ["searchQueryPosts", searchQuery],
    queryFn: () => fetchSearchQueryPosts(searchQuery),
    staleTime: 0,
    gcTime: 600000,
    enabled: true,
  })
}

const useFetchTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => fetchTags(),
    staleTime: 0,
    gcTime: 600000,
    enabled: true,
  })
}

const useFetchPostsByTag = (tag: string) => {
  return useQuery({
    queryKey: ["tags", tag],
    queryFn: () => fetchPostsByTag(tag),
    staleTime: 0,
    gcTime: 600000,
    enabled: true,
  })
}

const useAddPost = () => {
  return useMutation({
    mutationFn: (newPost: NewPost) => addPost(newPost),
  })
}

const useUpdatePost = () => {
  return useMutation<Post, Error, SelectedPost>({
    mutationFn: (selectedPost: SelectedPost) => updatePost(selectedPost),
  })
}

const useDeletePost = () => {
  return useMutation({
    mutationFn: (id: number) => deletePost(id),
  })
}

export {
  useFetchPosts,
  useFetchSearchQueryPosts,
  useFetchTags,
  useFetchPostsByTag,
  useAddPost,
  useUpdatePost,
  useDeletePost,
}
