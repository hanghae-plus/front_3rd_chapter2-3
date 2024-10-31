import { Search } from "lucide-react"
import { Input } from "../../../shared/ui/input/Text"
import { limitAtom, postsAtom, searchQueryAtom, skipAtom } from "../model/postAtoms"
import { useAtom } from "jotai"
import { useState } from "react"
import { postFetch } from "../../../entities/model/postFetch"
import { postSearchApi } from "../../../entities/api/postSearchApi"

export const SearchPost: React.FC = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [, setPosts] = useAtom(postsAtom)
  const [, setTotal] = useState(0)
  const [, setLoading] = useState(false)
  const [limit] = useAtom(limitAtom)
  const [skip] = useAtom(skipAtom)

  // 게시물 검색
  const searchPosts = async () => {
    setLoading(true)

    try {
      let posts, total

      if (!searchQuery) {
        // 검색어가 없는 경우
        const result = await postFetch({ limit, skip })
        posts = result.posts
        total = result.total
      } else {
        // 검색어가 있는 경우

        const data = await postSearchApi(searchQuery)

        posts = data.posts
        total = data.total
      }

      setPosts(posts)
      setTotal(total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchPosts()
    }
  }

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}
