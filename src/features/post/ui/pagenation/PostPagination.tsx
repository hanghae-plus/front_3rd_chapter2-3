import { PostPageSize, PostNavigationButtons } from "@features/post/ui/pagenation"

interface Props {
  total: number
}

export const PostPagination: React.FC<Props> = ({ total }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-10">
        <PostPageSize />
      </div>
      <PostNavigationButtons total={total} />
    </div>
  )
}
