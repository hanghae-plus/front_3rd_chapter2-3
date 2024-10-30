import { HTMLAttributes, ReactNode } from "react"
import * as SelectPrimitive from "@radix-ui/react-select" // 가정: SelectPrimitive가 Radix UI를 통해 제공되는 경우

interface PostsResponseType {
  limit: number
  posts: PostType[]
  skip: number
  total: number
}

interface PostType {
  author?: UserType
  body: string
  id: number
  reactions: ReactionsType
  tags: []
  title: string
  userId: number
  views: number
}

interface ReactionsType {
  likes: number
  dislikes: number
}

//
interface UserType {
  id: number
  image: string
  username: string
}

interface AddressType {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
}

interface BankType {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

interface CompanyAddressType {
  address: string
  city: string
  postalCode: string
  state: string
}

interface CompanyType {
  department: string
  name: string
  title: string
  address: CompanyAddressType
}

interface CryptoType {
  coin: string
  wallet: string
  network: string
}

interface HairType {
  color: string
  type: string
}

interface SelectUserType {
  address: AddressType
  age: number
  bank: BankType
  birthDate: string // "YYYY-MM-DD" 형식의 문자열
  bloodGroup: string
  company: CompanyType
  crypto: CryptoType
  ein: string
  email: string
  eyeColor: string
  firstName: string
  gender: string
  hair: HairType
  height: number
  id: number
  image: string
  ip: string
  lastName: string
  macAddress: string
  maidenName: string
  password: string
  phone: string
  role: string
  ssn: string
  university: string
  userAgent: string
  username: string
  weight: number
}

//댓글
interface CommentsResponseType {
  [key: number]: CommentType[] // 주어진 데이터에서 '1'이 key로 사용된 것처럼 key를 숫자로 설정
}

interface CommentType {
  id: number
  body: string
  postId: number
  likes?: number
  user: UserType
}

interface NewCommentType {
  body: string
  postId: number | null
  userId: number
}

//tag
interface TagType {
  url: string
  slug: string
}

//컴포넌트
interface TableProps extends HTMLAttributes<HTMLTableElement> {
  className?: string
}

interface TableSectionProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  className?: string
}

interface TableHeaderCell extends HTMLAttributes<HTMLTableHeaderCellElement> {
  className?: string
}

interface TableDataCell extends HTMLAttributes<HTMLTableDataCellElement> {
  className?: string
}

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  className?: string
  type?: string
  placeholder: string
  value: number | string
}

interface DivProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: ReactNode
}

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  className?: string
  rows?: number
  placeholder: string
  value: string
}

interface SelectTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string
  children: ReactNode
}

interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  className?: string
  children: ReactNode
}

interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  position?: "popper" | "item-aligned" | undefined
}

export type {
  PostType,
  InputProps,
  TextareaProps,
  PostsResponseType,
  DivProps,
  CommentsResponseType,
  CommentType,
  UserType,
  TableProps,
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
  TableSectionProps,
  TableRowProps,
  TableHeaderCell,
  TableDataCell,
  SelectUserType,
  NewCommentType,
  TagType,
}
