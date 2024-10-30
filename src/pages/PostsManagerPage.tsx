import { Edit2, MessageSquare, Plus, Search, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
} from '../shared/ui'
import { Post, User } from '@entities/model/types'
import { usePosts, useUrlSync } from '@features/post/model/hooks'
import { useTags } from '@features/tag/model/hooks'
import { filterStore, postStore } from '@features/post/model/stores'
import { userStore } from '@features/user/model/stores'
import { useUsers } from '@features/user/model/hooks'
import { useMemo } from 'react'
import { UserDetailDialog } from '@features/user/ui'
import { AddPostDialog, PostDetailDialog, UpdatePostDialog } from '@features/post/ui'
import { AddCommentDialog, UpdateCommentDialog } from '@features/comment/ui'
import { HighlightText } from '@widgets/ui'

const PostsManager = () => {
  const {
    sortBy,
    sortOrder,
    limit,
    skip,
    searchQuery,
    selectedTag,
    setSortBy,
    setSortOrder,
    setLimit,
    setSkip,
    setSearchQuery,
    setSelectedTag,
  } = filterStore()
  useUrlSync()

  const { setSelectedPost, setShowAddDialog, setShowEditDialog, setShowPostDetailDialog } = postStore()

  const { setSelectedUser, setShowUserModal } = userStore()

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user: User | undefined) => {
    if (!user) return
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error)
    }
  }

  const {
    posts: postsData,
    total,
    isLoading,
    deletePost,
  } = usePosts({
    limit,
    skip,
    tag: selectedTag,
    searchQuery,
  })

  const { users } = useUsers({ limit: 0, select: 'username,image' })

  const posts = useMemo(
    () =>
      postsData.map((post) => ({
        ...post,
        author: users.find((user) => user.id === post.userId),
      })),
    [postsData, users],
  )

  const { tags, isTagLoading } = useTags()

  const handleDeletePost = async (id: number) => {
    await deletePost(id)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>

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
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                setSelectedTag(value)
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
          {isLoading && isTagLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
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
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.id}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div>
                          <HighlightText text={post.title} highlight={searchQuery} />
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {post.tags?.map((tag) => (
                            <span
                              key={tag}
                              className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                                selectedTag === tag
                                  ? 'text-white bg-blue-500 hover:bg-blue-600'
                                  : 'text-blue-800 bg-blue-100 hover:bg-blue-200'
                              }`}
                              onClick={() => {
                                setSelectedTag(tag)
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => openUserModal(post.author)}
                      >
                        <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                        <span>{post.author?.username}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.reactions?.likes || 0}</span>
                        <ThumbsDown className="w-4 h-4" />
                        <span>{post.reactions?.dislikes || 0}</span>
                      </div>
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
                        <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

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

      <AddPostDialog />

      <UpdatePostDialog />

      <AddCommentDialog />

      <UpdateCommentDialog />

      <PostDetailDialog />

      <UserDetailDialog />
    </Card>
  )
}

export default PostsManager
