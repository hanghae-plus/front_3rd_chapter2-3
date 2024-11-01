type ResPostsList = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};

type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
};

type Reaction = {
  likes: number;
  dislikes: number;
};

type ReqAddPostBody = Pick<Post, "title" | "body" | "userId">;
