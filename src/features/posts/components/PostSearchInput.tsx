import { Input } from "../../../shared/ui"

interface PostSearchInputProps {
  searchQuery: string
  setSearchQuery: (value: string) => void
  searchPosts: () => void
}

const PostSearchInput = ({ searchQuery, setSearchQuery, searchPosts }: PostSearchInputProps) => {
  return (
    <Input
      placeholder="Search posts..."
      className="pl-8"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && searchPosts()}
    />
  )
}

export default PostSearchInput
