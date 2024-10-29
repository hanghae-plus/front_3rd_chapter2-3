import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "../../../shared/ui"
import Comments from "../../../widgets/Comment/ui/Comments"
import { highlightText } from "../../../shared/model/HighlightText"

interface PostDetailDialogProps {
  showPostDetailDialog: boolean;
  setShowPostDetailDialog: (show: boolean) => void;
  selectedPost: { title: string; body: string; postId: number } | null;
  searchQuery: string;
  comments: { [key: number]: Array<{ body: string; postId: number }> };
  setNewComment: (comment: any) => void; // 적절한 타입으로 변경 필요
  setShowAddCommentDialog: (show: boolean) => void;
  deleteComment: (commentId: number) => void;
  likeComment: (commentId: number) => void;
  setSelectedComment: (comment: any) => void; // 적절한 타입으로 변경 필요
  setShowEditCommentDialog: (show: boolean) => void;
}


const PostDetailDialog: React.FC<PostDetailDialogProps> = ({
    showPostDetailDialog,
    setShowPostDetailDialog,
    selectedPost,
    searchQuery,
    comments,
    setNewComment,
    setShowAddCommentDialog,
    deleteComment,
    likeComment,
    setSelectedComment,
    setShowEditCommentDialog,
  }) => {

    return (
       <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body, searchQuery)}</p>

            <Comments
              comments={comments[selectedPost?.postId] || []}
              postId={selectedPost?.postId}
              searchQuery={searchQuery}
              onAddComment={() => {
                setNewComment((prev) => ({ ...prev, postId }))
                setShowAddCommentDialog(true)
              }}
              onEditComment={() => {
                setSelectedComment(comment)
                setShowEditCommentDialog(true)
              }}
              onDeleteComment={deleteComment}
              onLikeComment={likeComment}
            />
            
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default PostDetailDialog;