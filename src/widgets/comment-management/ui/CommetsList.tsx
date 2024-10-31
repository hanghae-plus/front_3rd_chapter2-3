// widgets/comment-management/ui/CommentsList.tsx
import { FC, useState } from 'react';
import { Edit2, MessageSquare, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/button/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog/Dialog';
import { Textarea } from '@/shared/ui/textarea/Textarea';

type Comment = {
  id: number;
  body: string;
  postId: number;
  userId: number;
  user: {
    id: number;
    username: string;
    image?: string;
  };
};

type CommentActionsProps = {
  comment: Comment;
};

const CommentActions: FC<CommentActionsProps> = ({ comment }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.body);

  const handleEdit = async () => {
    try {
      console.log('Edit comment:', { id: comment.id, body: editedComment });
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to edit comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      console.log('Delete comment:', comment.id);
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => setIsEditDialogOpen(true)}>
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDelete}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              placeholder="댓글을 입력하세요"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                취소
              </Button>
              <Button onClick={handleEdit}>수정</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

type CommentsListWidgetProps = {
  postId: number;
  comments: Comment[];
};

export const CommentsListWidget: FC<CommentsListWidgetProps> = ({
  postId,
  comments,
}) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      // API 호출 구현
      console.log('Add comment:', { postId, body: newComment });
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">댓글</h3>
        <span className="text-sm text-muted-foreground">
          {comments.length}개의 댓글
        </span>
      </div>

      {/* 새 댓글 입력 */}
      <div className="flex gap-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          className="flex-1"
          rows={2}
        />
        <Button 
          onClick={handleAddComment}
          className="self-end"
          disabled={!newComment.trim()}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          작성
        </Button>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-2">
        {comments.map((comment) => (
          <div 
            key={comment.id} 
            className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{comment.user.username}</span>
              </div>
              <p className="text-sm text-muted-foreground">{comment.body}</p>
            </div>
            <CommentActions comment={comment} />
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            첫 번째 댓글을 작성해보세요!
          </div>
        )}
      </div>
    </div>
  );
};