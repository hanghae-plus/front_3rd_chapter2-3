import { addComment as addCommentApi, updateComment as updateCommentApi } from '~/entities/comment/api/commentApi';
import { useCommentsStore } from '~/entities/comment/model/commentsStore';
import { Comment, CommentRequestDto } from '~/entities/comment/model/type';
import { addPost as addPostApi, updatePost as updatePostApi } from '~/entities/post/api/postApi';
import { usePostStore } from '~/entities/post/model/store';
import { Post, PostRequestDto } from '~/entities/post/model/types';

export const useModalAction = () => {
  const addNewPostAction = usePostStore.use.addNewPostAction();
  const updatePostAction = usePostStore.use.updatePostAction();
  const addNewComment = useCommentsStore.use.addComment();
  const updateCommentAction = useCommentsStore.use.updateCommentAction();

  const addPost = async (newPost: PostRequestDto) => {
    try {
      await addPostApi(newPost);

      addNewPostAction(newPost);
    } catch (error) {
      console.error('게시물 추가 오류:', error);
    }
  };

  // deleteCommentApi();

  // 게시물 업데이트
  const updatePost = async (selectedPost?: Post | null) => {
    try {
      if (!selectedPost || !selectedPost?.id) {
        throw new Error();
      }
      const data = await updatePostApi(selectedPost.id, selectedPost);
      updatePostAction(data);

      // setShowEditDisalog(false);
    } catch (error) {
      console.error('게시물 업데이트 오류:', error);
    }
  };

  // 댓글 추가
  const addComment = async (newComment: CommentRequestDto) => {
    try {
      const data = await addCommentApi(newComment);

      addNewComment(data.postId, data);
    } catch (error) {
      console.error('댓글 추가 오류:', error);
    }
  };

  // 댓글 업데이트
  const updateComment = async (selectedComment: Comment) => {
    try {
      if (!selectedComment || !selectedComment?.id || selectedComment?.body) {
        throw new Error();
      }
      const data = await updateCommentApi(selectedComment.id, selectedComment.body);
      updateCommentAction(data);
    } catch (error) {
      console.error('댓글 업데이트 오류:', error);
    }
  };

  return { addPost, updatePost, addComment, updateComment };
};
