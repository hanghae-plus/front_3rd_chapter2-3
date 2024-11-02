import { Post } from '@entities/post/model/post.types'
import { filterStore } from '@features/post/model/stores'

export const Tags = ({ post }: { post: Post }) => {
  const { selectedTag, setSelectedTag } = filterStore()

  return (
    <div className="flex flex-wrap gap-1">
      {post.tags?.map((tag) => (
        <span
          key={tag}
          className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
            selectedTag === tag
              ? 'text-white bg-blue-500 hover:bg-blue-600'
              : 'text-blue-800 bg-blue-100 hover:bg-blue-200'
          }`}
          onClick={() => {
            setSelectedTag(tag)
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
