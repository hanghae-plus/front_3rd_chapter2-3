export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  userId: number;
  reactions: { likes: number; dislikes: number };
  views: number;
}

export interface PostWithUser extends Post {
  author: {
    id: number;
    username: string;
    image: string;
  };
}
