import { Edit2, MessageSquare, Trash2 } from "lucide-react"
import { Post } from "../../../../entities/posts/model/Post"
import { Button } from "../../../../shared/ui"
import { useComment, usePost } from "../../../../shared/hooks"
import { useEffect, useState } from "react"
import { useFetchComments } from "../../../comments/api/commentsFeaturesApi"
import { useDeletePost } from "../../api/postFeatureApi"

interface PostTableEventsProps {
  post: Post
}

const PostTableEvents = ({ post }: PostTableEventsProps) => {
  const { posts, setPosts, setSelectedPost, setShowEditDialog, setShowPostDetailDialog } = usePost()

  const { setComments } = useComment()

  const [postDetail, setPostDetail] = useState<Post>({
    body: "",
    id: 0,
    reactions: {
      likes: 0,
      dislikes: 0,
    },
    tags: [],
    title: "",
    userId: 0,
    views: 0,
  })

  const { data: comments, error: postDeatilError, isLoading: isPostDetailLoading } = useFetchComments(postDetail.id)
  useEffect(() => {
    if (!comments?.message && comments && !isPostDetailLoading && !postDeatilError) {
      if (postDetail) {
        setShowPostDetailDialog(true)
        setSelectedPost(postDetail)
        setComments((prev) => ({ ...prev, [postDetail.id]: comments.comments }))
      }
    }
  }, [comments, isPostDetailLoading, postDeatilError, postDetail])

  function openPostDetail(post: Post) {
    setPostDetail(post)
  }

  function handleShowEditDialog(post: Post) {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  const { mutate: deletePost } = useDeletePost()
  function handleDeletePost(id: number) {
    deletePost(id, {
      onSuccess: () => {
        setPosts({
          ...posts,
          posts: posts.posts.filter((post) => post.id !== id),
        })
      },
      onError: (error) => {
        console.error("Failed to like comment:", error)
      },
    })
  }
  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
          <MessageSquare className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            handleShowEditDialog(post)
          }}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </>
  )
}

export default PostTableEvents
