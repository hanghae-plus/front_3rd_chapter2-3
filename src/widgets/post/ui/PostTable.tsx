import { Edit2, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react"
import { useState } from "react"
import { UpdateQueryParam } from "../../../entities/post"
import { Author, Post } from "../../../entities/post/model/types"
import { userApi } from "../../../entities/user/api/userApi"
import { UserDTO } from "../../../entities/user/model/types"
import { PostDeleteButton } from "../../../features/post"
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TextHighlighter,
} from "../../../shared/ui"
import { UserModal } from "../../user"
import { PostDetailDialog } from "./PostDetailDialog"
import { PostEditDialog } from "./PostEditDialog"

type Props = {
  posts: Post[]

  searchQuery: string
  selectedTag: string
  updateQueryParam: UpdateQueryParam
}

export const PostTable = ({
  posts,
  searchQuery,
  selectedTag,
  updateQueryParam,
}: Props) => {
  const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  // 사용자 모달 열기
  const openUserModal = async (user: Author) => {
    const userData = await userApi.fetchUser(user.id)
    if (userData) {
      setSelectedUser(userData)
      setShowUserModal(true)
    }
  }

  // 게시물 상세 보기
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const [showEditDialog, setShowEditDialog] = useState(false)

  return (
    <>
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
                    <TextHighlighter
                      text={post.title}
                      highlight={searchQuery}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                          selectedTag === tag
                            ? "text-white bg-blue-500 hover:bg-blue-600"
                            : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                        }`}
                        onClick={() => {
                          updateQueryParam({ tag })
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
                  onClick={() => post.author && openUserModal(post.author)}
                >
                  <img
                    src={post.author?.image}
                    alt={post.author?.username}
                    className="w-8 h-8 rounded-full"
                  />
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openPostDetail(post)}
                  >
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

                  <PostDeleteButton postId={post.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
        search={searchQuery}
        selectedPost={selectedPost}
      />

      {/* 사용자 모달 */}
      {selectedUser && (
        <UserModal
          open={showUserModal}
          onOpenChange={setShowUserModal}
          selectedUser={selectedUser}
        />
      )}
    </>
  )
}
