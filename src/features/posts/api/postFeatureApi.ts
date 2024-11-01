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

const useFetchPosts = (limit: number, skip: number) => {
  return useQuery({
    queryKey: ["posts", limit, skip],
    queryFn: () => fetchPosts(limit, skip),
  })
}

const useFetchSearchQueryPosts = (searchQuery: string) => {
  return useQuery({
    queryKey: ["searchQueryPosts", searchQuery],
    queryFn: () => fetchSearchQueryPosts(searchQuery),
  })
}

const useFetchTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => fetchTags(),
  })
}

const useFetchPostsByTag = (tag: string) => {
  return useQuery({
    queryKey: ["tags", tag],
    queryFn: () => fetchPostsByTag(tag),
  })
}

const useFetchSearchPosts = () => {
  return useQuery({
    queryKey: ["searchPosts"],
    queryFn: () => fetchSearchPosts(),
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
  useFetchSearchPosts,
  useAddPost,
  useUpdatePost,
  useDeletePost,
}
