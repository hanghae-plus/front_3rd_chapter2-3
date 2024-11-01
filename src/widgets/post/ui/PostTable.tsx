import { ThumbsDown, ThumbsUp } from "lucide-react"
import { useState } from "react"
import { UpdatePostQueryParam } from "../../../entities/post"
import { Author, Post } from "../../../entities/post/model/types"
import { PostDeleteButton } from "../../../features/post"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TextHighlighter,
} from "../../../shared/ui"
import { UserModal } from "../../user"
import { PostDetailDialogButton } from "./PostDetailDialogButton"
import { PostEditDialogButton } from "./PostEditDialogButton"

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
                <AuthorCell author={post.author} />
              </TableCell>

              <TableCell>
                <ReactionCell reactions={post.reactions} />
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <PostDetailDialogButton
                    selectedPost={post}
                    search={searchQuery}
                  />
                  <PostEditDialogButton post={post} />
                  <PostDeleteButton postId={post.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
}

const AuthorCell = ({ author }: AuthorCellProps) => {
  const [showUserModal, setShowUserModal] = useState(false)

  const openUserModal = () => {
    setShowUserModal(true)
  }

  return (
    <>
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={openUserModal}
      >
        <img
          src={author?.image}
          alt={author?.username}
          className="w-8 h-8 rounded-full"
        />
        <span>{author?.username}</span>
      </div>

      {author?.id && (
        <UserModal
          open={showUserModal}
          onOpenChange={setShowUserModal}
          userId={author.id}
        />
      )}
    </>
  )
}

const ReactionCell = ({ reactions }: Pick<Post, "reactions">) => (
  <div className="flex items-center gap-2">
    <ThumbsUp className="w-4 h-4" />
    <span>{reactions?.likes || 0}</span>
    <ThumbsDown className="w-4 h-4" />
    <span>{reactions?.dislikes || 0}</span>
  </div>
)
