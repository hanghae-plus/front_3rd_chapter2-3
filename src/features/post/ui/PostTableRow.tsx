import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Button, TableCell, TableRow } from "../../../shared/ui"
import { HighlightText } from "../../../shared/ui/HighlightText"
import { Dialog_e, useDialogStore } from "../../../shared/model/useDialogStore"
import { usePostStore } from "../model/usePostStore"
import { Post_i } from "../../../entities/post/model/types"
import { usePostFilter } from "../model/usePostFilter"
import { useDeletePostMutation } from "../api/useDeletePostMutation"
import { useFetchCommentMutation } from "../../comment/api/useFetchCommentMutation"
import { useCommentStore } from "../../comment/model/useCommentStore"

interface PostTableRowProps_i {
  post: Post_i
}

export const PostTableRow = ({ post }: PostTableRowProps_i) => {
  const { searchQuery, selectedTag, setSelectedTag, updatePostFilter } = usePostFilter({})

  const dialogStore = useDialogStore()
  const [deletePost, setSelectedPost] = usePostStore((state) => [state.deletePost, state.setSelectedPost])
  const setComments = useCommentStore((state) => state.setComments)

  const deletePostMutation = useDeletePostMutation()
  const fetchCommentMutation = useFetchCommentMutation()

  const handleOpenPostDetail = (post: Post_i) => {
    setSelectedPost(post)

    fetchCommentMutation.mutate(post.id, {
      onSuccess: (data) => {
        setComments(post.id, data)
        dialogStore.openDialog(Dialog_e.PostDetails)
      },
    })
  }

  const handleDeletePost = () => {
    deletePostMutation.mutate({ id: post.id })

    deletePost(post.id)
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
                  updatePostFilter({ tag })
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
          onClick={() => dialogStore.openDialog(Dialog_e.User, { user: post.author! })}
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
              dialogStore.openDialog(Dialog_e.PostEdit)
            }}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDeletePost}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
