export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    author?: { username: string; image: string };
    reactions?: { likes: number, dislikes: number };
    tags?: string[];
  }
  
  export interface Comment {
    id: number;
    body: string;
    postId: number;
    userId: number;
    likes: number;
    user: { username: string };
  }
  
  export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: number;
    address: { address: string, city: string, state: string };
    company: { name: string, title: string }
    image: string;
  }
  
  export interface Tag {
    url: string;
    slug: string;
  }
  