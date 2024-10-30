import { ReactNode } from "react"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"

import HighlightText from "../../../shared/ui/HighlightText"
import Button from "../../../shared/ui/Button"
import Table from "../../../shared/ui/Table"

import { Post } from "../model/types"

interface FormProps {
  children: ReactNode
}

interface BodyItemProps {
  post: Post
  searchQuery: string
  selectedTag: string
  updateSelectedTag: (tag: string) => void
  updateSelectedPost: (post: Post) => void
  openPostDetail: (post: Post) => void
  openUserModal: (user: Post["author"]) => void
}

const PostTableForm = ({ children }: FormProps) => {
  return (
    <Table.Table>
      <Table.TableHeader>
        <Table.TableRow>
          <Table.TableHead className="w-[50px]">ID</Table.TableHead>
          <Table.TableHead>제목</Table.TableHead>
          <Table.TableHead className="w-[150px]">작성자</Table.TableHead>
          <Table.TableHead className="w-[150px]">반응</Table.TableHead>
          <Table.TableHead className="w-[150px]">작업</Table.TableHead>
        </Table.TableRow>
      </Table.TableHeader>
      <Table.TableBody>{children}</Table.TableBody>
    </Table.Table>
  )
}

const PostTableBodyItem = ({
  post,
  searchQuery,
  selectedTag,
  updateSelectedTag,
  updateSelectedPost,
  openPostDetail,
  openUserModal,
}: BodyItemProps) => {
  const { id, title, tags, author, reactions } = post
  const { username, image } = author
  const { likes, dislikes } = reactions

  const deletePost = (id: string) => {
    console.log(id)
  }

  return (
    <Table.TableRow key={id}>
      <Table.TableCell>{id}</Table.TableCell>
      <Table.TableCell>
        <div className="space-y-1">
          <div>
            <HighlightText text={title} highlight={searchQuery} />
          </div>

          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                  selectedTag === tag
                    ? "text-white bg-blue-500 hover:bg-blue-600"
                    : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                }`}
                onClick={() => updateSelectedTag(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Table.TableCell>
      <Table.TableCell>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author)}>
          <img src={image} alt={username} className="w-8 h-8 rounded-full" />
          <span>{username}</span>
        </div>
      </Table.TableCell>
      <Table.TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{likes || 0}</span>
          <ThumbsDown className="w-4 h-4" />
          <span>{dislikes || 0}</span>
        </div>
      </Table.TableCell>
      <Table.TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => updateSelectedPost(post)}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </Table.TableCell>
    </Table.TableRow>
  )
}

export default {
  PostTableForm,
  PostTableBodyItem,
}
