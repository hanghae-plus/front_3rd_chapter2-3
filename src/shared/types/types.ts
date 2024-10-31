// Post 관련 타입 정의
export interface Post {
  id: number
  title: string
  body: string
  tags: TagSlug[]
  reactions: Reactions
  views: number
  userId: number
  author: Author
}
export type PostId = Post["id"]

export type NewPost = Pick<Post, "title" | "body" | "userId">

export interface Tag {
  slug: string
  name: string
  url: string
}
export type TagSlug = Tag["slug"]

interface Reactions {
  likes: number
  dislikes: number
}

export interface Author {
  id: number
  username: string
  image: string
}

// Comment 관련 타입 정의
export interface PostComments {
  [postId: PostId]: Comment[]
}

export interface NewComment {
  body: Comment["body"]
  postId: Comment["postId"] | null
  userId: CommentUser["id"]
}

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: CommentUser
}
export type CommentId = Comment["id"]

interface CommentUser {
  id: number
  username: string
  fullName: string
}

// server request response 관련
interface PostsQueryParams {
  skip: number
  limit: number
  search: string
  sortBy: string
  sortOrder: string
  tag: string
}
export type FetchPostsProps = Pick<PostsQueryParams, "skip" | "limit">

// User 관련 타입 정의
export interface User {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: Hair
  ip: string
  address: Address
  macAddress: string
  university: string
  bank: Bank
  company: Company
  ein: string
  ssn: string
  userAgent: string
  crypto: Crypto
  role: string
}
export type UserId = User["id"]

interface Hair {
  color: string
  type: string
}

interface Address {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  coordinates: Coordinates
  country: string
}

interface Coordinates {
  lat: number
  lng: number
}

interface Bank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

interface Company {
  department: string
  name: string
  title: string
  address: Address2
}

interface Address2 {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  coordinates: Coordinates2
  country: string
}

interface Coordinates2 {
  lat: number
  lng: number
}

interface Crypto {
  coin: string
  wallet: string
  network: string
}
