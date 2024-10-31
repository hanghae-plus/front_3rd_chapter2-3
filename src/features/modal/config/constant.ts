import { HighlightText } from '~/shared/ui/HighlightText';

import { ModalAddComment } from '../ui/ModalAddComment';
import { ModalAddPostContent } from '../ui/ModalAddPost';
import { ModalUpdateComment } from '../ui/ModalUpdateComment';
import { ModalUpdatePost } from '../ui/ModalUpdatePost';

export const MODAL_INFOS = {
  addPost: {
    title: '새 게시물 추가',
    content: ModalAddPostContent,
  },
  updatePost: {
    title: '게시물 수정',
    content: ModalUpdatePost,
  },
  addComment: {
    title: '새 댓글 추가',
    content: ModalAddComment,
  },
  updateComment: {
    title: '댓글 수정',
    content: ModalUpdateComment,
  },
  postDetail: {
    title: ({ text, highlight }: { text?: string; highlight: string | null }) => {
      HighlightText({ text, highlight });
    },
  },
};
