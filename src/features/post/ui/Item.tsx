import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Post, usePost } from "../../../entities/post/model/post"
import { Button, makeHighlightText } from "../../../shared/ui"
import { TableCell, TableRow } from "../../../shared/ui/table"
import { useSearchQuery } from "../../../entities/post/model/searchQuery"
import { useSelectedTag } from "../../../entities/post/model/tag"
import { updateURL } from "../../../app/lib/params"
import { User, useUser } from "../../../entities/user/model"
import { useComments } from "../../../entities/comments/model"
import { useQuerygGetComments as useQueryGetComments } from "../../comments/api/getComments"
import { useEffect } from "react"
import { useQueryDeletePost } from "../api/deletePost"

interface Props {
  post: Post
}

const PostItem: React.FC<Props> = ({ post }: Props) => {
  // entities
  const { searchQuery } = useSearchQuery()
  const { selectedTag, setSelectedTag } = useSelectedTag()
  const { setSelectedUser, setShowUserModal } = useUser()
  const { setSelectedPost, setShowPostDetailDialog, setShowEditDialog } = usePost()
  const { setComments } = useComments()

  // tanstack
  const { data: comments } = useQueryGetComments(post.id)
  useEffect(() => {
    setComments(comments)
  }, [comments])
  const { mutate: deletePost } = useQueryDeletePost()

  // handler
  const handleOpenUserModal = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  const handleOpenPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  const handleDeletePost = async (postId: number) => {
    deletePost(postId)
  }

  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{makeHighlightText(post.title, searchQuery)}</div>

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
          onClick={() => handleOpenUserModal(post.author as User)}
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
  )
}

export default PostItem
