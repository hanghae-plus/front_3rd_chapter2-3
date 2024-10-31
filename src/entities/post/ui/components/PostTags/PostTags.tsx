interface PostTagsProps {
  tags: string[]
}

export const PostTags = ({ tags }: PostTagsProps) => {
  return (
    <div className="flex flex-wrap gap-1">
      {tags?.map((tag) => (
        <span
          key={tag}
          className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  )

}