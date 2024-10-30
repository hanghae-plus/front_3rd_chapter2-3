import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Comment } from "../../../entities/comment/api/types";
import { fetchComments } from "../../../entities/comment/api/commentApi";
import { commentAtom } from "../../../entities/comment/model/commentAtom";
import { Post } from "../../../entities/post/api/types";



const useCommentModal = () => {
  const [comments, setComments] = useAtom(commentAtom);

  // 댓글 데이터 패칭 Mutation
  const fetchCommentsMutation = useMutation<Comment[],Error,number>({
    mutationFn: (postId) => fetchComments(postId),
    onSuccess: (data, postId) => {
      setComments((prev) => ({ ...prev, [postId]: data }));
    },
  });
  
  // 사용자 모달 열기 함수
  const openCommentModal = (postId:Post['id']) => {
    fetchCommentsMutation.mutate(postId);
  };

  return{fetchCommentsMutation, openCommentModal}
}
export default useCommentModal;