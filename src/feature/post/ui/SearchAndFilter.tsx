import {
  limitAtom,
  postsAtom,
  searchQueryAtom,
  selectedTagAtom,
  skipAtom,
  sortByAtom,
  sortOrderAtom,
  tagsAtom,
  totalAtom,
} from "../model/postAtoms"
import { useAtom } from "jotai"
import { tagFetch } from "../../../entities/model/tagFetch"
import { userFetchDetail } from "../../../entities/model/userFetch"
import { useUpdateURL } from "../../../shared/model/urlUtils"
import { useEffect, useState } from "react"
import { postFetch } from "../model/postFetch"
import { postFetchTags } from "../../../entities/model/postFetchTags"
import { useLocation } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui/select/Select"
import { SearchPost } from "./Search"
import { Post } from "../model/postType"
import { User } from "../../../entities/model/atom"

export const SearchAndFilter: React.FC = () => {
  const location = useLocation()
  const updateURL = useUpdateURL()
  // const queryParams = new URLSearchParams(location.search)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)
  const [, setPosts] = useAtom(postsAtom)
  const [, setSearchQuery] = useAtom(searchQueryAtom)

  const [, setLoading] = useState(false)
  const [, setTotal] = useAtom(totalAtom)
  const [tags, setTags] = useAtom(tagsAtom)
  const [, setSkip] = useAtom(skipAtom)
  const [, setLimit] = useAtom(limitAtom)
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)

  useEffect(() => {
    const fetchData = async () => {
      const tags = await postFetchTags()

      setTags(tags || [])
    }
    fetchData()
  }, [setTags])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  // 게시물과 사용자를 결합하는 함수
  const processPosts = (posts: Post[], users: User[]) => {
    return posts.map((post) => ({
      ...post,
      author: users.find((user) => user.id === post.userId),
    }))
  }

  const fetchPostsByTag = async (tag: string) => {
    setLoading(true)
    if (!tag || tag === "all") {
      await postFetch({ limit: 10, skip: 0 })
      setLoading(false)
      return
    }

    try {
      const postsData = await tagFetch(tag)
      const usersData = await userFetchDetail()

      const postsWithUsers = processPosts(postsData.posts, usersData.users)
      console.log("postsWithUsers", postsWithUsers)

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  return (
    <div className="flex gap-4">
      <SearchPost />
      <Select
        value={selectedTag}
        onValueChange={(value) => {
          setSelectedTag(value)
          fetchPostsByTag(value)
          updateURL()
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
