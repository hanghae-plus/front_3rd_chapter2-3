import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../shared/ui/table/Table"
import { User } from "../model/User"
import HighlightText from "./HighlightText"
import { Button } from "../../shared/ui/button/Button"
import { deletePost } from "../api/deletePost"
import { Post } from "../model/Post"
import { openUserModal } from "../api/openUserModal"
import { fetchComments } from "../api/fetchComments"
import { Comments } from "../model/Comment"

interface Props {
  posts: Post[]
  searchQuery: string
  selectedTag: string
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>
  updateURL: () => void
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>
  setShowUserModal: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  comments: Comments
  setComments: React.Dispatch<React.SetStateAction<Comments>>
  setShowPostDetailDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const PostTable = ({
  posts,
  searchQuery,
  selectedTag,
  setSelectedTag,
  updateURL,
  setSelectedUser,
  setShowUserModal,
  setSelectedPost,
  setShowEditDialog,
  setPosts,
  comments,
  setComments,
  setShowPostDetailDialog,
}: Props) => {
  // 게시물 상세 보기
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
