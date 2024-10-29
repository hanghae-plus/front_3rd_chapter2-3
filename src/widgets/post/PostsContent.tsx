import { Edit2, MessageSquare, Search, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import {
  Button,
  CardContent,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../shared/ui"

import { TagName } from "../../entities/tag/model/type"
import { User } from "../../entities/user/model/type"
import { Comments } from "../../entities/comment/model/type"
import { Post } from "../../entities/post/model/type"
import HighlightText from "../ui/HighlightText"
import { Key } from "react"
import { TagSelect } from "../tag/TagSelect"

interface Props {
  searchQuery: string
  fetchPosts: () => void
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
  fetchPostsByTag: (tag: string) => Promise<void>
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

const PostsContent = ({
  searchQuery,
  fetchPosts,
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
  fetchPostsByTag,
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
  const PostAuthor = ({ author }: { author: Post["author"] }) => {
    // 사용자 모달 열기
    const openUserModal = async (user: User) => {
      try {
        const response = await fetch(`/api/users/${user.id}`)
        const userData = await response.json()
        setSelectedUser(userData)
        setShowUserModal(true)
      } catch (error) {
        console.error("사용자 정보 가져오기 오류:", error)
      }
    }
    return (
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => author && openUserModal(author)}>
        <img src={author?.image} alt={author?.username} className="w-8 h-8 rounded-full" />
        <span>{author?.username}</span>
      </div>
    )
  }
  const PostReaction = ({ reactions }: { reactions: Post["reactions"] }) => (
    <div className="flex items-center gap-2">
      <ThumbsUp className="w-4 h-4" />
      <span>{reactions?.likes || 0}</span>
      <ThumbsDown className="w-4 h-4" />
      <span>{reactions?.dislikes || 0}</span>
    </div>
  )
  const PostTableRow = ({ post }: { key: Key; post: Post }) => {
    // 댓글 가져오기
    const fetchComments = async (postId: number) => {
      if (comments?.[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
      try {
        const response = await fetch(`/api/comments/post/${postId}`)
        const data = await response.json()
        setComments((prev: Comments) => ({ ...prev, [postId]: data.comments }))
      } catch (error) {
        console.error("댓글 가져오기 오류:", error)
      }
    }

    // 게시물 상세 보기
    const openPostDetail = (post: Post) => {
      setSelectedPost(post)
      fetchComments(post.id)
      setShowPostDetailDialog(true)
    }
    // 게시물 삭제
    const deletePost = async (id: number) => {
      try {
        await fetch(`/api/posts/${id}`, {
          method: "DELETE",
        })
        setPosts(posts.filter((post) => post.id !== id))
      } catch (error) {
        console.error("게시물 삭제 오류:", error)
      }
    }

    return (
      <TableRow key={post.id}>
        <TableCell>{post.id}</TableCell>
        <TableCell>
          <div className="space-y-1">
            <div>
              <HighlightText text={post.title} highlight={searchQuery} />
            </div>
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag: TagName) => (
                <PostTag key={tag} tag={tag} selectedTag={selectedTag} />
              ))}
            </div>
          </div>
        </TableCell>
        <TableCell>
          <PostAuthor author={post.author} />
        </TableCell>
        <TableCell>
          <PostReaction reactions={post.reactions} />
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
              <MessageSquare className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedPost(post)
                setShowEditDialog(true)
              }}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    )
  }
  // 게시물 테이블 렌더링
  const PostTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post: Post) => (
          <PostTableRow key={post.id} post={post} />
        ))}
      </TableBody>
    </Table>
  )

  const PostTag = ({ tag, selectedTag }: { key: Key; tag: TagName; selectedTag: TagName }) => (
    <span
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
        selectedTag === tag ? "text-white bg-blue-500 hover:bg-blue-600" : "text-blue-800 bg-blue-100 hover:bg-blue-200"
      }`}
      onClick={() => {
        setSelectedTag(tag)
        updateURL()
      }}
    >
      {tag}
    </span>
  )
  const PostSearch = () => {
    const searchPosts = async () => {
      if (!searchQuery) {
        fetchPosts()
        return
      }
      setLoading(true)
      try {
        const response = await fetch(`/api/posts/search?q=${searchQuery}`)
        const data = await response.json()
        setPosts(data.posts)
        setTotal(data.total)
      } catch (error) {
        console.error("게시물 검색 오류:", error)
      }
      setLoading(false)
    }
    return (
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && searchPosts()}
          />
        </div>
      </div>
    )
  }

  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 컨트롤 */}
        <div className="flex gap-4">
          <PostSearch />
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
            <TagSelect />
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
        {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}

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

export default PostsContent
