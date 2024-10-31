import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useAtom } from "jotai"
import { Search } from "lucide-react"
import { Input } from "@/shared/ui"
import { useQuerySearchPosts, postsAtom } from "@/entities/post"
import { errorAtom, loadingAtom } from "@/shared/model"

export const PostsSearch = () => {
  const { data, error, isLoading } = useQuerySearchPosts()
  const [params, setParams] = useSearchParams()
  const [searchText, setSearchText] = useState(params.get("q") || "")
  const [, setPosts] = useAtom(postsAtom)
  const [, setLoading] = useAtom(loadingAtom)
  const [, setError] = useAtom(errorAtom)

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  useEffect(() => {
    setError(error)
  }, [error, setError])

  useEffect(() => {
    if (params.get("q") && data) setPosts(data)
  }, [params, data, setPosts])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setParams({ q: searchText })
    }
  }

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}
