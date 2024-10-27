import { Post } from "@/pages/PostsManagerPage";
import { highlightText } from "@/shared/lib/utils";
import { Dialog } from "@/shared/ui";
import React from "react";

type ModalPostDetailProps = {
  showPostDetailDialog: boolean;
  setShowPostDetailDialog: (open: boolean) => void;
  selectedPost: Post | null;
  searchQuery: string;
  renderComments: (postId: number) => React.ReactNode;
};

const ModalPostDetail = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  searchQuery,
  renderComments,
}: ModalPostDetailProps) => {
  return (
    <Dialog.Container open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <Dialog.Content className="max-w-3xl">
        <Dialog.Header>
          <Dialog.Title>{highlightText(selectedPost?.title, searchQuery)}</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          {renderComments(selectedPost?.id || 0)}
        </div>
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalPostDetail;
