import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { Users } from "../../users/model/User"
import { useAtom } from "jotai"
import {
  postsAtom,
  selectedPostAtom,
  newPostAtom,
  tagsAtom,
  totalAtom,
  loadingAtom,
  limitAtom,
  skipAtom,
  showAddDialogAtom,
} from "../../../features/posts/model/postAtoms"
import { Posts } from "../model/Post"
// 게시물 데이터 가져오기
export const useFetchPosts = () => {
  const [, setPosts] = useAtom(postsAtom)
  const [, setLoading] = useAtom(loadingAtom)
  const [, setTotal] = useAtom(totalAtom)
  const [limit] = useAtom(limitAtom)
  const [skip] = useAtom(skipAtom)

  return useQuery({
    queryKey: ["posts", limit, skip],
    queryFn: async () => {
      setLoading(true)
      const postsResponse = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      const postsData: Posts = await postsResponse.json()

      const usersResponse = await fetch("/api/users?limit=0&select=username,image")
      const usersData: Users[] = (await usersResponse.json()).users

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.find((user) => user.id === post.userId),
      }))

      setPosts({
        limit: postsData.limit,
        skip: postsData.skip,
        total: postsData.total,
        posts: postsWithUsers,
      })
      setTotal(postsData.total)
      setLoading(false)
      return postsWithUsers
    },
  })
}

// 태그 데이터 가져오기
export const useFetchTags = () => {
  const [, setTags] = useAtom(tagsAtom)

  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await fetch("/api/posts/tags")
      const data = await response.json()
      setTags(data)
      return data
    },
  })
}

// 게시물 추가
export const useAddPost = () => {
  const queryClient = useQueryClient()
  const [newPost, setNewPost] = useAtom(newPostAtom)
  const [, setPosts] = useAtom(postsAtom)
  const [, setShowAddDialog] = useAtom(showAddDialogAtom)

  return useMutation<void, Error, void>(
    async () => {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      return response.json()
    },
    {
      onSuccess: (data: any) => {
        // 'data' 타입 설정
        queryClient.invalidateQueries(["posts"]) // queryKey를 배열로 전달
        setPosts((prev) => ({
          ...prev,
          posts: [data, ...prev.posts],
        }))
        setShowAddDialog(false)
        setNewPost({ title: "", body: "", userId: 1 })
      },
    },
  )
}

// 게시물 업데이트
export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  const [selectedPost] = useAtom(selectedPostAtom)

  return useMutation(
    async () => {
      const response = await fetch(`/api/posts/${selectedPost?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      })
      return await response.json()
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("posts")
      },
    },
  )
}

// 게시물 삭제
export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (id: number) => {
      await fetch(`/api/posts/${id}`, { method: "DELETE" })
      return id
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts")
      },
    },
  )
}
