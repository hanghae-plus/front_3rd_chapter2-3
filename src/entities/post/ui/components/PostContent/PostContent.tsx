interface PostContentProps {
  body: string
}

export const PostContent = ({ body }: PostContentProps) => {
  return (
    <div className="prose prose-sm max-w-none">
      {body}
    </div>
  )
}