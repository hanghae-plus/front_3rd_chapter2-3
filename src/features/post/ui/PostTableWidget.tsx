import { ThumbsUp, ThumbsDown, MessageSquare, Edit2, Trash2 } from "lucide-react"
import { useMemo } from "react"
import { PostType } from "../../../entities/Post/model/types"
import usePost from "../../../entities/Post/model/usePost"
import { usePostDialog } from "../../../entities/Post/model/usePostDialog"
import { useUser } from "../../../entities/User/model/useUser"
import { highlightText } from "../../../shared/lib"
import { useQueryParams } from "../../../shared/model/useQueryParams"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Button, Table } from "../../../shared/ui"

const PostTableWidget = () => {
  const { searchQuery, selectedTag, setSelectedTag, updateURL } = useQueryParams()
  const { setShowEditDialog, setShowPostDetailDialog } = usePostDialog()
  const { setSelectedPost, postList, deletePost } = usePost()
  const { userList, openUserDialog } = useUser({})

  const onEditDialog = (post: PostType) => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  const handelSelectedTag = (tag: string) => {
    setSelectedTag(tag)
    updateURL()
  }

  const posts = useMemo(
    () =>
      postList.map((post) => ({
        ...post,
        author: userList.find(({ id }) => id === post.userId),
      })),
    [postList, userList],
  )

  const openPostDetail = (post: PostType) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  const handleDeletePost = (id: number) => {
    deletePost(id)
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
        {posts?.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, searchQuery)}</div>

                <div className="flex flex-wrap gap-1">
                  {post?.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => handelSelectedTag(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserDialog(post.userId)}>
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
                    onEditDialog(post)
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
  )
}

export default PostTableWidget
