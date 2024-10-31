import { Select, SelectTrigger } from "@radix-ui/react-select"
import { SearchAndFilter } from "../../feature/post/ui/SearchAndFilter"
import { CardContent } from "../../shared/ui/card/Card"
import { useAtom } from "jotai"
import {
  limitAtom,
  postsAtom,
  selectedTagAtom,
  skipAtom,
  sortByAtom,
  sortOrderAtom,
  totalAtom,
} from "../../feature/post/model/postAtoms"
import { SelectContent, SelectItem, SelectValue } from "../../shared/ui/select/Select"
import { Button } from "../../shared/ui/button/Button"
import { RenderPostTable } from "../../feature/post/ui/RenderPostTable"
import { loadingAtom } from "../model/atom"
import { useEffect } from "react"
import { postFetch } from "../model/postFetch"
import { useUpdateURL } from "../../shared/model/urlUtils"
import { Post, UserData } from "../model/types"

export const PostContent = () => {
  const [total, setTotal] = useAtom(totalAtom)
  const [skip, setSkip] = useAtom(skipAtom)
  const [limit, setLimit] = useAtom(limitAtom)
  const [loading, setLoading] = useAtom(loadingAtom)
  const [selectedTag] = useAtom(selectedTagAtom)
  const [, setPosts] = useAtom(postsAtom)
  const [sortBy] = useAtom(sortByAtom)
  const [sortOrder] = useAtom(sortOrderAtom)
  const updateURL = useUpdateURL()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      if (selectedTag) {
        await fetchPostsByTag(selectedTag)
      } else {
        const { posts, total, error } = await postFetch({ limit, skip })

        if (!error) {
          setPosts(posts)
          setTotal(total)
        } else {
          console.error("게시물 가져오기 오류:", error)
        }
      }

      setLoading(false)
    }

    fetchData()
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      setLoading(true)
      postFetch({ limit, skip })

      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData: { posts: Post[] } = await postsResponse.json()
      const usersData: { users: UserData[] } = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 컨트롤 */}
        <SearchAndFilter />

        {/* 게시물 테이블 */}
        {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <RenderPostTable />}

        {/* 페이지네이션 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>표시</span>
            <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
              </SelectContent>
            </Select>
            <span>항목</span>
          </div>
          <div className="flex gap-2">
            <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
              이전
            </Button>
            <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
              다음
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  )
}
