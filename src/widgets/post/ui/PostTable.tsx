import { Edit2, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react"
import { useState } from "react"
import { UpdatePostQueryParam } from "../../../entities/post"
import { Author, Post } from "../../../entities/post/model/types"
import { UserDTO } from "../../../entities/user/model/types"
import { PostDeleteButton } from "../../../features/post"
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TextHighlighter,
} from "../../../shared/ui"
import { UserModal } from "../../user"
import { PostDetailDialog } from "./PostDetailDialog"
import { PostEditDialog } from "./PostEditDialog"

type Props = {
  posts: Post[]

  searchQuery: string
  selectedTag: string
  updateQueryParam: UpdatePostQueryParam
}

export const PostTable = ({
  posts,
  searchQuery,
  selectedTag,
  updateQueryParam,
}: Props) => {
  const [selectedUserId, setSelectedUserId] = useState<UserDTO["id"]>()
  const [showUserModal, setShowUserModal] = useState(false)

  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const openUserModal = (user: Author) => {
    setSelectedUserId(user.id)
    setShowUserModal(true)
  }

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  const handleTagClick = (tag: string) => {
    updateQueryParam({ tag })
  }

  return (
    <>
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
                <PostTitle
                  title={post.title}
                  searchQuery={searchQuery}
                  tags={post.tags}
                  onTagClick={handleTagClick}
                  selectedTag={selectedTag}
                />
              </TableCell>

              <TableCell>
                <AuthorCell
                  author={post.author}
                  onClick={() => post.author && openUserModal(post.author)}
                />
              </TableCell>

              <TableCell>
                <ReactionCell reactions={post.reactions} />
              </TableCell>

              <TableCell>
                <ActionButtons
                  post={post}
                  onOpenDetail={openPostDetail}
                  onEdit={() => {
                    setSelectedPost(post)
                    setShowEditDialog(true)
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PostEditDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />

      <PostDetailDialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
        search={searchQuery}
        selectedPost={selectedPost}
      />

      {selectedUserId && (
        <UserModal
          open={showUserModal}
          onOpenChange={setShowUserModal}
          userId={selectedUserId}
        />
      )}
    </>
  )
}

type PostTitleProps = Pick<Post, "title" | "tags"> & {
  searchQuery: string
  onTagClick: (tag: string) => void
  selectedTag: string
}

const PostTitle = ({
  title,
  searchQuery,
  tags,
  onTagClick,
  selectedTag,
}: PostTitleProps) => (
  <div className="space-y-1">
    <TextHighlighter text={title} highlight={searchQuery} />
    <div className="flex flex-wrap gap-1">
      {tags?.map((tag) => (
        <span
          key={tag}
          className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
            selectedTag === tag
              ? "text-white bg-blue-500 hover:bg-blue-600"
              : "text-blue-800 bg-blue-100 hover:bg-blue-200"
          }`}
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
)

type AuthorCellProps = {
  author: Author | undefined
  onClick: VoidFunction
}

const AuthorCell = ({ author, onClick }: AuthorCellProps) => (
  <div className="flex items-center space-x-2 cursor-pointer" onClick={onClick}>
    <img
      src={author?.image}
      alt={author?.username}
      className="w-8 h-8 rounded-full"
    />
    <span>{author?.username}</span>
  </div>
)

const ReactionCell = ({ reactions }: Pick<Post, "reactions">) => (
  <div className="flex items-center gap-2">
    <ThumbsUp className="w-4 h-4" />
    <span>{reactions?.likes || 0}</span>
    <ThumbsDown className="w-4 h-4" />
    <span>{reactions?.dislikes || 0}</span>
  </div>
)

type ActionButtonsProps = {
  post: Post
  onOpenDetail: (post: Post) => void
  onEdit: VoidFunction
}

const ActionButtons = ({ post, onOpenDetail, onEdit }: ActionButtonsProps) => (
  <div className="flex items-center gap-2">
    <Button variant="ghost" size="sm" onClick={() => onOpenDetail(post)}>
      <MessageSquare className="w-4 h-4" />
    </Button>

    <Button variant="ghost" size="sm" onClick={onEdit}>
      <Edit2 className="w-4 h-4" />
    </Button>

    <PostDeleteButton postId={post.id} />
  </div>
)
