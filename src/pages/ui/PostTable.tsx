import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../shared/ui/table/Table"
import HighlightText from "./HighlightText"
import { Button } from "../../shared/ui/button/Button"
import { deletePost } from "../api/deletePost"
import { openUserModal } from "../api/openUserModal"
import { fetchComments } from "../api/fetchComments"
import { usePost } from "../../features/post/model/usePost"
import { useComment } from "../../features/comment/model/useComment"
import { useTag } from "../../features/tags/model/useTag"
import { User } from "../../entities/user/model/types"
import { Post } from "../../entities/post/model/types"

interface Props {
  searchQuery: string
  updateURL: () => void
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>
  setShowUserModal: React.Dispatch<React.SetStateAction<boolean>>
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>
  setShowPostDetailDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const PostTable = ({
  searchQuery,
  updateURL,
  setSelectedUser,
  setShowUserModal,
  setShowEditDialog,
  setShowPostDetailDialog,
}: Props) => {
  const { posts, setPosts, setSelectedPost } = usePost()
  const { comments, setComments } = useComment()
  const { selectedTag, setSelectedTag } = useTag()

  // 게시물 상세 보기
  //? openPostDetail에서 useQuery 를 사용해 jotai에 업데이트를 하려고 할때 문제가 생김. 일단 이곳은 패치로 해놓을 예정
  //todo data가 있으면 useEffect에서 업데이트 하는 방식으로 가야할듯?
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments({ postId: post.id, comments, setComments })
    setShowPostDetailDialog(true)
  }

  return (
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
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag)
                        updateURL()
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
                onClick={() => openUserModal({ user: post.author as User, setSelectedUser, setShowUserModal })}
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
                <Button variant="ghost" size="sm" onClick={() => deletePost({ id: post.id, setPosts, posts })}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PostTable
