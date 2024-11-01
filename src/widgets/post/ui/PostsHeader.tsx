import { AddPostButton } from "@features/post/ui/add/AddPostButton"

export const PostsHeader: React.FC = () => {
  return (
    <div className="flex flex-col space-y-1.5 p-6">
      <div className="flex items-center justify-between text-2xl font-semibold leading-none tracking-tight">
        <span>게시물 관리자</span>
        <AddPostButton />
      </div>
    </div>
  )
}
