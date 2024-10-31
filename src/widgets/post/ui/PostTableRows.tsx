import {
  Edit2,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react"
import { Post } from "../../../entities/post/model/post"
import { highlightText } from "../../../shared/lib/highlightText"
import { TableBody, TableCell, TableRow } from "../../../shared/ui/Table"
import { Button } from "../../../shared/ui/Button"
import { User } from "../../../entities/user/model/user"
import { PostListParams } from "../../../features/post/model/type"

interface Props {
  posts: Post[]
  selectedTag: string
  searchQuery: string
  setSelectedTag: (tag: string) => void
  updateURL: (params: PostListParams) => void
  openUserModal: (user: User) => Promise<void>
  openPostDetail: (post: Post) => void
  setSelectedPost: (selectedPost: Post | null) => void
  setShowEditDialog: (show: boolean) => void
  deletePost: (id: number) => void
}

export const PostTableRows = ({
  posts,
  selectedTag,
  searchQuery,
  setSelectedTag,
  updateURL,
  openUserModal,
  openPostDetail,
  setSelectedPost,
  setShowEditDialog,
  deletePost,
}: Props) => {
  return (
    <TableBody>
      {posts.map((post) => (
        <TableRow className="postTableRow" key={post.id}>
          <TableCell className="postId">{post.id}</TableCell>
          <TableCell className="postTitle">
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
                    onClick={() => {
                      setSelectedTag(tag)
                      updateURL({selectedTag})
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </TableCell>
          <TableCell className="authorInfo">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => openUserModal(post.author)}
            >
              <img
                src={post.author?.image}
                alt={post.author?.username}
                className="w-8 h-8 rounded-full"
              />
              <span>{post.author?.username}</span>
            </div>
          </TableCell>
          <TableCell className="postReactions">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              <span>{post.reactions?.likes || 0}</span>
              <ThumbsDown className="w-4 h-4" />
              <span>{post.reactions?.dislikes || 0}</span>
            </div>
          </TableCell>
          <TableCell className="postTasks">
            <div className="flex items-center gap-2">
              <Button
                id="openPostDetailButton"
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deletePost(post.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
