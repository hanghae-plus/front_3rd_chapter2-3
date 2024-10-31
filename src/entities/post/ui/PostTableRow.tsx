import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Button, TableCell, TableRow } from "../../../shared/ui"
import { Post } from "../model/types"
import { HighlightedText } from "../../../shared/ui/HighlightedText"
import { usePostMutations, usePosts } from "../../../features/post/model/postStore"
import { useDialog } from "../../../features/post/model/dialogStore"
import { useRouterQueries } from "../../../features/post/model/routerStore"

export const PostTableRow: React.FC<{
  post: Post
  openUserModal: (userId: number) => void
}> = ({ post, openUserModal }) => {
  const { searchQuery, selectedTag, setSelectedTag } = useRouterQueries()
  const { setShowPostUpdateDialog, setShowPostDetailDialog } = useDialog()
  const { deletePost } = usePostMutations()
  const { setSelectedPost } = usePosts()

  // 게시물 상세 보기
  const handlePostDetailDialogOpen = () => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  // 게시물 수정 모달 보기
  const handlePostUpdateDialogOpen = () => {
    setSelectedPost(post)
    setShowPostUpdateDialog(true)
  }

  // 게시물 삭제
  const handlePostDelete = () => {
    deletePost.mutate(post.id)
  }

  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>
            <HighlightedText text={post.title} highlight={searchQuery} />
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
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author.id)}>
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
          <Button variant="ghost" size="sm" onClick={handlePostDetailDialogOpen}>
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handlePostUpdateDialogOpen}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handlePostDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
