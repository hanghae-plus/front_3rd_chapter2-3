import { Post } from '@entities/comment/model/types'
import { Button } from '@shared/ui'
import { Edit2, MessageSquare, Trash2 } from 'lucide-react'
import { useCallback } from 'react'
import { postStore } from '@features/post/model/stores'
import { usePosts } from '@features/post/model/hooks'

export const PostActions = ({ post }: { post: Post }) => {
  const { deletePost } = usePosts()

  const { setSelectedPost, setShowEditDialog, setShowPostDetailDialog } = postStore()

  const openPostDetail = useCallback(
    (post: Post) => {
      setSelectedPost(post)
      setShowPostDetailDialog(true)
    },
    [setSelectedPost, setShowPostDetailDialog],
  )

  const handleDeletePost = useCallback(
    (id: number) => {
      deletePost(id)
    },
    [deletePost],
  )

  return (
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
      <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}
