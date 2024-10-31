import { useQuery } from "@tanstack/react-query"
import { searchPost } from "../../../entities/post/api"
import { store } from "../../../entities/post/model/store.ts"
import { useEffect } from "react"

interface Props {
  query: string
}

export const useQuerySearchPost = ({ query }: Props) => {
  const { setPosts, setTotal, setIsLoading } = store.getState()

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
