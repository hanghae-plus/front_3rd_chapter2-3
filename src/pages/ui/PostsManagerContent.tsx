import { Search } from "lucide-react"
import { Post } from "../model/Post"
import { User } from "../model/User"
import { Comments } from "../model/Comment"
import { Tag } from "../model/Tag"
import { Input } from "../../shared/ui/input/Input"
import { CardContent } from "../../shared/ui/card/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shared/ui/select/Select"
import { fetchPostsByTag } from "../api/fetchPostsByTag"
import { searchPosts } from "../api/searchPosts"
import PostTable from "./PostTable"
import Pagination from "./Pagination"

interface Props {
  searchQuery: string
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  setTotal: React.Dispatch<React.SetStateAction<number>>
  posts: Post[]
  comments: Comments
  setComments: React.Dispatch<React.SetStateAction<Comments>>
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
  setShowPostDetailDialog: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>
  setShowUserModal: React.Dispatch<React.SetStateAction<boolean>>
  selectedTag: string
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>
  updateURL: () => void
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  tags: Tag[]
  sortBy: string
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  sortOrder: string
  setSortOrder: React.Dispatch<React.SetStateAction<string>>
  loading: boolean
  limit: number
  setLimit: React.Dispatch<React.SetStateAction<number>>
  skip: number
  setSkip: React.Dispatch<React.SetStateAction<number>>
  total: number
}

const PostsManagerContent = ({
  searchQuery,
  setLoading,
  setPosts,
  setTotal,
  posts,
  comments,
  setComments,
  setSelectedPost,
  setShowPostDetailDialog,
  setSelectedUser,
  setShowUserModal,
  selectedTag,
  setSelectedTag,
  updateURL,
  setShowEditDialog,
  setSearchQuery,
  tags,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  loading,
  limit,
  setLimit,
  skip,
  setSkip,
  total,
}: Props) => {
  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 컨트롤 */}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="게시물 검색..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && searchPosts({ searchQuery, setLoading, limit, skip, setPosts, setTotal })
                }
              />
            </div>
          </div>
          <Select
            value={selectedTag}
            onValueChange={(value) => {
              setSelectedTag(value)
              fetchPostsByTag({ tag: value, setLoading, limit, skip, setPosts, setTotal })
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

        {/* 게시물 테이블 */}
        {loading ? (
          <div className="flex justify-center p-4">로딩 중...</div>
        ) : (
          <PostTable
            posts={posts}
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            updateURL={updateURL}
            setSelectedUser={setSelectedUser}
            setShowUserModal={setShowUserModal}
            setSelectedPost={setSelectedPost}
            setShowEditDialog={setShowEditDialog}
            setPosts={setPosts}
            comments={comments}
            setComments={setComments}
            setShowPostDetailDialog={setShowPostDetailDialog}
          />
        )}

        <Pagination limit={limit} setLimit={setLimit} skip={skip} setSkip={setSkip} total={total} />
      </div>
    </CardContent>
  )
}

export default PostsManagerContent
