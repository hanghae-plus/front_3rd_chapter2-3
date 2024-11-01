import { User } from "@/entities/user"

export type Comment = {
  id: number
  body: string
  postId: number
  likes: number
  // TODO: 같은 레이어(엔티티)의 슬라이스를 참조해도 되나?
  user: User
}
