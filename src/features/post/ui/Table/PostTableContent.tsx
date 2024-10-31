import {
  Edit2,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from 'lucide-react';

import { Post } from '../../../../entities';
import { usePostStore } from '../../../../entities/post/model/usePostStore';
import useDialogStore from '../../../../shared/lib/dialog/model/useDialogStore';
import { highlightText } from '../../../../shared/lib/utils/highlightText';
import Button from '../../../../shared/ui/atoms/Button/ui/Button';
import { TableCell } from '../../../../shared/ui/organisms/Table/ui/TableCell';
import { TableRow } from '../../../../shared/ui/organisms/Table/ui/TableRow';
import { useSearchStore } from '../../../postSearch/model/useSearchStore';
import { usePostsWithUsersQuery } from '../../hooks/usePostsWithUsersQuery';
import { usePostTable } from '../../hooks/usePostTable';

interface PostTableContentProps {
  post: Post
}
const PostTableContent = ({ post: currentPost }: PostTableContentProps) => {
  usePostsWithUsersQuery()
  const { search, tag: selectedTag, setTag } = useSearchStore()
  const { openDialog } = useDialogStore()
  const { setSelectedPost } = usePostStore()
  const { mutate: deleteMutate } = usePostTable({ currentPost: currentPost! })

  return (
    <TableRow key={currentPost.id}>
      <TableCell>{currentPost.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(currentPost.title, search)}</div>

          <div className="flex flex-wrap gap-1">
            {currentPost?.tags?.map((tag) => (
              <span
                key={tag}
                className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                  selectedTag === tag
                    ? "text-white bg-blue-500 hover:bg-blue-600"
                    : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                }`}
                onClick={() => {
                  setTag(tag)
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
          onClick={() => openDialog("userInfo", { userId: currentPost?.userId })}
        >
          <img src={currentPost.author?.image} alt={currentPost.author?.username} className="w-8 h-8 rounded-full" />
          <span>{currentPost.author?.username}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{currentPost?.reactions?.likes || 0}</span>
          <ThumbsDown className="w-4 h-4" />
          <span>{currentPost?.reactions?.dislikes || 0}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => openDialog("postDetail", { post: currentPost, postId: currentPost.id })}
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedPost(currentPost)
              openDialog("editPost", { post: currentPost })
            }}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => deleteMutate(currentPost.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default PostTableContent
