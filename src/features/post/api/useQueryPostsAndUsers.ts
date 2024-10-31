import { useQuery } from "@tanstack/react-query"
import { usePostsStore } from "../model/usePostsStore.ts"
import { getPostsAndUsers, getPostsByTagAndUsers } from "../../../entities/post/api"
import { getPostsWithAuthors } from "../../../entities/post/model/getPostsWithAuthors.ts"
import { useEffect } from "react"

export const useQueryPostsAndUsers = (limit: number, skip: number, tag: string) => {
  const { setPosts, setTotal, setIsLoading } = usePostsStore.getState()

  const { isLoading, isFetching } = useQuery(
    ["get-posts-and-users", limit, skip, tag],
    () => (tag === "all" || !tag ? getPostsAndUsers(limit, skip) : getPostsByTagAndUsers(tag)),
    {
      onSuccess: (data) => {
        setPosts(getPostsWithAuthors(data.postsData.posts, data.usersData.users))
        setTotal(data.postsData.total)
      },
      onSettled: () => setIsLoading(false),
    },
  )

  useEffect(() => {
    setIsLoading(isLoading || isFetching)
  }, [isLoading, isFetching])
}
