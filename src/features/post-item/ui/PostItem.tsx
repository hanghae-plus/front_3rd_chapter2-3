import { MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Post } from "../../../entities/post/model/types"
import { highlightText } from "../../../shared/lib/highlightText"
import { Button, TableCell, TableRow } from "../../../shared/ui"
import { useMutationPostDelete } from "../../post/api/useMutationPostDelete"
import { usePostParamsStore } from "../../post/model/postParamsStore"
import { usePostsStore } from "../../post/model/postStore"
import { PostEditButton } from "../../post-edit/ui/PostEditButton"
import { UserDetailButton } from "../../user-detail/ui/UserDetailButton"

interface Props {
  post: Post
}

export const PostItem = ({ post }: Props) => {
  const { openPostDetail } = usePostsStore()
  const { searchQuery, selectedTag, setSelectedTag, updateURL } = usePostParamsStore()

  const { mutate: deletePostMutate } = useMutationPostDelete()

  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchQuery)}</div>

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
        <UserDetailButton post={post} />
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

          <PostEditButton post={post} />
          <Button variant="ghost" size="sm" onClick={() => deletePostMutate(post.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
