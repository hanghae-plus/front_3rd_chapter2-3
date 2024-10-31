import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Post } from "../../../entities/post/model/type"
import { highlightText } from "../../../shared"
import { openModals } from "../../../shared/lib/modal/openModals"
import { Button } from "../../../shared/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/ui/table"
import { useUsers } from "../../user/api/query"
import { useDeletePost, usePostsByTag } from "../api/query"

const PostingTable = () => {
  const {
    user,
    post: { openDetailDialog, openEditDialog },
  } = openModals
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "all")

  const { data: posts, isLoading } = usePostsByTag({ tag: selectedTag })
  const { data: users } = useUsers()
  const postsWithUsers = posts?.posts.map((post) => ({
    ...post,
    author: users?.users.find((user) => user.id === post.userId),
  }))
  const { mutate: deletePost } = useDeletePost()

  const openPostDetail = (post: Post) => {
    openDetailDialog(post)
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
        {postsWithUsers?.map((post) => (
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
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => user.openModal(post.author?.id || 0)}
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
                    openEditDialog(post)
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

export default PostingTable
