import PostTagsItem from "../../../entities/post/ui/PostTagsItem.tsx"
import { Post } from "../../../entities/post/model/types.ts"
import usePostQueryParams from "../../post/model/usePostURLParams.ts"

interface Props {
  tags: Post["tags"]
}

const PostTableTagCell = ({ tags }: Props) => {
  const { selectedTag, setParam } = usePostQueryParams()

  return (
    <div className="flex flex-wrap gap-1">
      <PostTagsItem tags={tags} onTagClick={(tag) => setParam("selectedTag", tag)} selectedTag={selectedTag} />
    </div>
  )
}

export default PostTableTagCell
