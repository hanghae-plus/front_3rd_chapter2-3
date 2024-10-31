import {
  Comment,
  Post,
} from '../../../../entities';

export type DialogType = "addPost" | "editPost" | "addComment" | "editComment" | "postDetail" | "userInfo"

export interface DialogProps {
  addPost: Record<string, never>
  editPost: { post?: Post }
  addComment: { postId?: number }
  editComment: { comment: Comment }
  postDetail: { post?: Post }
  userInfo: { userId?: number }
}

export interface DialogPropsRequired {
  addPost: Record<string, never>
  editPost: { post: Post }
  addComment: { postId: number }
  editComment: { comment: Comment }
  postDetail: { post: Post; postId: number }
  userInfo: { userId?: number }
}
