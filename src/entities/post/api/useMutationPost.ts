import { createPostApi, deletePostApi, updatePostApi } from "./"
import { NewPost, Post } from "../model/type"
import { useMutation } from "@tanstack/react-query"

// 게시물 추가
export const useMutationCreatePost = () => {
  return useMutation<Post, Error, NewPost>({
    mutationFn: (newPost: NewPost) => createPostApi(newPost),
  })
}

// 게시물 업데이트
export const useMutationUpdatePost = () => {
  return useMutation<Post, Error, Post>({
    mutationFn: (targetPost: Post) => updatePostApi(targetPost),
  })
}

// 게시물 삭제
export const useMutationDeletePost = () => {
  return useMutation<number, Error, number>({
    mutationFn: (postId: number) => deletePostApi(postId),
  })
}
