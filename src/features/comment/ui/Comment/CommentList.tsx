import { useEffect } from 'react';

import { Comment } from '../../../../entities';
import {
  useCommentStore,
} from '../../../../entities/comment/model/useCommentStore';
import {
  useCommentsByPost,
} from '../../../../entities/comment/queries/useCommentQuiries';
import CommentItem from './CommentItem';

interface CommentListProps {
  postId: number
}

const CommentList = ({ postId }: CommentListProps) => {
  const { data } = useCommentsByPost(postId)
  const { comments, setComments } = useCommentStore()
  console.log(postId, "postId")
  useEffect(() => {
    if (data) {
      setComments(data?.comments || [])
    }
  }, [data])

  if (!comments) return null

  return (
    <div className="space-y-1">
      {comments?.length && comments?.map((comment: Comment) => <CommentItem postId={postId} comment={comment} />)}
    </div>
  )
}

export default CommentList
