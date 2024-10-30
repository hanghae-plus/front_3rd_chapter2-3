import { Button } from '../../../shared/ui/Button/Button';
import { Plus } from 'lucide-react';
import { useAtom } from 'jotai';
import { newCommentAtom, showAddCommentDialogAtom } from '../../../entities/comment/model/commentAtom.js';
import CommentForm from '../../comment/ui/CommentForm';
import CommentList from '../../comment/ui/CommentList';
import { highlightText } from '../../../shared/utils';

const PostDetail = ({ post, comments }) => {
  const [newComment, setNewComment] = useAtom(newCommentAtom);
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{highlightText(post.title, newComment.body)}</h2>
      <p>{highlightText(post.body, newComment.body)}</p>
      <CommentList comments={comments} searchQuery={newComment.body} />
      <Button
        size="sm"
        onClick={() => {
          setNewComment((prev) => ({ ...prev, postId: post.id }));
          setShowAddCommentDialog(true);
        }}
      >
        <Plus className="w-3 h-3 mr-1" />
        댓글 추가
      </Button>
    </div>
  );
};

export default PostDetail;