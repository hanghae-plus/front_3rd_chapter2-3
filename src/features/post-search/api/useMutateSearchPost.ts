import { useQuery } from "@tanstack/react-query"
import { searchPost } from "../../../entities/post/api"
import { usePostsStore } from "../../post/model/usePostsStore.ts"
import { useEffect } from "react"

interface Props {
  query: string
}

export const useMutateSearchPost = ({ query }: Props) => {
  const { setPosts, setTotal, setIsLoading } = usePostsStore.getState()

  const { isLoading } = useQuery(["post-search", query], () => searchPost(query), {
    onSuccess: (data) => {
      setPosts(data.posts)
      setTotal(data.total)
    },
    onSettled: () => setIsLoading(false),
  })

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading])
}
