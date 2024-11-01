type Comments = {
  comments: CommentDetail[];
  total: number;
  skip: number;
  limit: number;
};

type CommentDetail = {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: CommentUser;
};

type CommentUser = {
  id: number;
  username: string;
  fullName: string;
};

type ReqAddCommentBody = Pick<CommentDetail, "body" | "postId"> & { userId: number };
