import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { CommentList } from "../../../entities/comment/api/types";
import { fetchComments } from "../../../entities/comment/api/commentApi";
import { commentsAtom } from "../../../entities/comment/model/commentAtom";



const useComment = () => {
  const [, setComments] = useAtom(commentsAtom);

  // 댓글 데이터 패칭 Mutation
  const fetchCommentsMutation = useMutation<CommentList,Error,number>({
    mutationFn: (postId) => fetchComments(postId),
    onSuccess: (data, postId) => {
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    },
  });

  return{fetchCommentsMutation}
}
export default useComment;