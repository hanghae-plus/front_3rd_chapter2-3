import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchPostAdd, fetchPostDelete, fetchPosts, fetchPostsByTag, fetchPostUpdate, fetchSearchPosts } from "./api"
import { useSearchParams } from "react-router-dom"
import { TagSlug } from "@/shared/types"

// 게시물 가져오기
export const useQueryPosts = () => {
  const [searchParams] = useSearchParams()

  const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"))
  const skip = Math.max(0, parseInt(searchParams.get("skip") || "0"))

  const query = useQuery({
    queryKey: ["posts", { limit, skip }],
    queryFn: () => fetchPosts({ limit, skip }),
  })

  return query
}

// 검색된 게시물 가져오기
export const useQuerySearchPosts = () => {
  const [searchParams] = useSearchParams()

  const searchQuery = searchParams.get("q") || ""

  const query = useQuery({
    queryKey: ["searchPosts", searchQuery],
    queryFn: () => fetchSearchPosts(searchQuery),
  })

  return query
}

// 태그별 게시물 가져오기
export const useQueryPostsByTag = (tag: TagSlug) => {
  const [searchParams] = useSearchParams()

  const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"))
  const skip = Math.max(0, parseInt(searchParams.get("skip") || "0"))

  const query = useQuery({
    queryKey: ["postsByTag", tag],
    queryFn: () => (tag === "all" ? fetchPosts({ limit, skip }) : fetchPostsByTag(tag)),
  })

  return query
}

// 게시물 추가
export const useMutationPostAdd = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: fetchPostAdd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  return mutation
}

// 게시물 수정
export const useMutationPostUpdate = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: fetchPostUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  return mutation
}

// 게시물 삭제
export const useMutationPostDelete = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: fetchPostDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  return mutation
}
