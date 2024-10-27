import React from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Textarea,
  } from "../../../shared/ui"

interface EditCommentDialogProps {
    showEditCommentDialog: boolean;
    setShowEditCommentDialog: (show: boolean) => void;
    selectedComment: { body: string } | null;
    setSelectedComment: (comment: { body: string } | null) => void;
    updateComment: () => void;
}

const EditCommentDialog: React.FC<EditCommentDialogProps> = ({
    showEditCommentDialog,
    setShowEditCommentDialog,
    selectedComment,
    setSelectedComment,
    updateComment,
  }) => {
    return (
       <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
            />
            <Button onClick={updateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default EditCommentDialog;