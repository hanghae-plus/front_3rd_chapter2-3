import { Button, TableCell, TableRow } from "../../../shared/ui"
import { highlightText } from "../../../shared/lib/highlightText.tsx"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Post } from "../../../entities/post/model/types.ts"
import { usePostParams } from "../model/usePostParams.ts"
import { usePostDialog } from "../model/usePostDialog.ts"
import { useComments } from "../../comment/model/useComment.ts"
import { User } from "../../../entities/user/model/types.ts"
import { useUserModal } from "../../user/model/useUserModal.ts"
import { fetchUserDetailApi } from "../../../entities/user/api"
import { usePostSearch } from "../model/usePostSearch.ts"
import { useDeletePostMutation } from "../api/mutations.ts"
import { useQueryClient } from "@tanstack/react-query"

interface Props {
  post: Post
}

export default function PostItem({ post }: Props) {
  const queryClient = useQueryClient()

  const { selectedTag, setSelectedTag, updateURL } = usePostParams()
  const { searchText } = usePostSearch()
  const { setSelectedPost, setShowPostDetailDialog, setShowEditDialog } = usePostDialog()
  const { mutate: deletePost } = useDeletePostMutation()
  const { setShowUserModal, setSelectedUser } = useUserModal()
  const { fetchComments } = useComments()

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
    fetchComments(post.id)
  }

  const openEditDialog = (post: Post) => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  const openUserModal = async (user: User) => {
    const userDetailData = await queryClient.fetchQuery({
      queryKey: ["user", user.id],
      queryFn: () => fetchUserDetailApi(user.id),
    })

    setSelectedUser(userDetailData)
    setShowUserModal(true)
  }

  return (
    <TableRow>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchText)}</div>

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
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author)}>
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
          <Button variant="ghost" size="sm" onClick={() => openEditDialog(post)}>
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
