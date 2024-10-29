import React from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Textarea,
  } from "../../../shared/ui"

  interface AddCommentDialogProps {
    showAddCommentDialog: boolean;
    setShowAddCommentDialog: (show: boolean) => void;
    newComment: { body: string };
    setNewComment: (comment: { body: string }) => void;
    addComment: () => void;
  }

const AddCommentDialog: React.FC<AddCommentDialogProps> = ({ showAddCommentDialog, setShowAddCommentDialog, newComment, setNewComment, addComment }) => {
    return (
        <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>새 댓글 추가</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                <Textarea
                placeholder="댓글 내용"
                value={newComment.body}
                onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
                />
                <Button onClick={addComment}>댓글 추가</Button>
            </div>
            </DialogContent>
        </Dialog>
    );
  };
  
  export default AddCommentDialog;