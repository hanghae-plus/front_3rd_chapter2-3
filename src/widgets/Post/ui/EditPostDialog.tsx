import React from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Input,
    Textarea,
  } from "../../../shared/ui"

interface EditPostDialogProps {
    showEditDialog: boolean;
    setShowEditDialog: (show: boolean) => void;
    selectedPost: { title: string; body: string } | null;
    setSelectedPost: (post: { title: string; body: string } | null) => void;
    updatePost: () => void;
}

const EditPostDialog: React.FC<EditPostDialogProps> = ({ showEditDialog, setShowEditDialog, selectedPost, setSelectedPost, updatePost }) => {
    return (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>게시물 수정</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                <Input
                placeholder="제목"
                value={selectedPost?.title || ""}
                onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
                />
                <Textarea
                rows={15}
                placeholder="내용"
                value={selectedPost?.body || ""}
                onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
                />
                <Button onClick={updatePost}>게시물 업데이트</Button>
            </div>
            </DialogContent>
        </Dialog>
    );
  };
  
  export default EditPostDialog;