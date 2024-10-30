import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/ui/table/Table"
import { highlightText } from "../../../shared/utils/highlightText"
import { Button } from "../../../shared/ui/button/Button"
import {
  postsAtom,
  searchQueryAtom,
  selectedPostAtom,
  selectedTagAtom,
  showEditDialogAtom,
  showPostDetailDialogAtom,
  showUserModalAtom,
} from "../model/postAtoms"
import { useAtom } from "jotai"
import { useUpdateURL } from "../../../shared/model/urlUtils"
import { userFetch } from "../../../entities/model/userFetch"
import { userAtom } from "../../../entities/model/atom"
import { commentFetch } from "../../comment/model/commentFetch"
import { commentsAtom } from "../../comment/model/commentAtom"
import { usePost } from "../model/usePost"

export const RenderPostTable = () => {
  const [user, setUser] = useAtom(userAtom)
  const [posts, setPosts] = useAtom(postsAtom)
  const [searchQuery] = useAtom(searchQueryAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)
  const [comments, setComments] = useAtom(commentsAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)

  const updateURL = useUpdateURL()

  const { addPost, updatePost, deletePost } = usePost()

  const handleTagClick = (tag) => {
    setSelectedTag(tag)
    updateURL()
  }

  const handleOpenUserModal = async (userId) => {
    try {
      const userData = await userFetch(userId)
      setUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 데이터를 가져오는 중 오류 발생:", error)
    }
  }

  const handleOpenPostDetail = async (post) => {
    setSelectedPost(post)
    try {
      const getComment = await commentFetch(post.id)
      setComments((prev) => ({ ...prev, [post.id]: getComment.comments }))
      setShowPostDetailDialog(true)
    } catch (error) {
      console.error("댓글을 가져오는 중 오류 발생:", error)
    }
  }

  const handleOpenPostUpdate = async (post) => {
    try {
      const updateResponse = await updatePost(post)
      setSelectedPost(updateResponse)
      setShowEditDialog(true)
    } catch (error) {
      console.error("게시글 업데이트 중 오류 발생:", error)
    }
  }

  const handleDeletePost = async (postId) => {
    try {
      const deleteResponse = await deletePost(postId)
      if (deleteResponse) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId))
        alert("삭제 완료")
      } else {
        alert("삭제 오류")
      }
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error)
      alert("삭제 중 오류 발생")
    }
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
                <div>{highlightText(post.title, searchQuery)}</div>
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => handleTagClick(tag)}
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
                onClick={() => handleOpenUserModal(post.author.id)} // user가 아니라 user.id로 변경
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
                <Button variant="ghost" size="sm" onClick={() => handleOpenPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleOpenPostUpdate(post)}>
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
  )
}
