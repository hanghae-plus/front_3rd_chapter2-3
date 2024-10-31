import CommentHeader from './CommentHeader';
import CommentList from './CommentList';

interface CommentProps {
  postId: number
}

const Comment = ({ postId }: CommentProps) => {
  return (
    <>
      <CommentHeader postId={postId} />
      <CommentList postId={postId} />
    </>
  )
}

export default Comment
