import { Comment } from "../comment"
import { UserData } from "../user/model/types"

// 게시물 기본 타입
export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: Reactions
  views: number
}

// 게시물 반응 타입
export interface Reactions {
  likes: number
  dislikes: number
}

// 게시물 목록 응답 타입
export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

// 게시물 생성 요청 타입
export interface CreatePostRequest {
  title: string
  body: string
  userId: number
}

// 게시물 수정 요청 타입
export interface UpdatePostRequest {
  id: number
  title: string
  body: string
}

// 게시물 상세 정보 타입 (사용자 정보 포함)
export interface PostWithUser extends Post {
  author: UserData
}

// 게시물 상세 정보 타입 (댓글 포함)
export interface PostWithComments extends PostWithUser {
  comments: Comment[]
}

// 게시물 태그 타입
export interface PostTag {
  slug: string
  url: string
}

// 게시물 검색 응답 타입
export interface PostSearchResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}
