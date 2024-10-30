import { Tag } from "../../../entities/tag/model/types"
import { Selector } from "../../../widgets/ui/Selector"

export const PostFilter: React.FC<{
  selectedTag: string
  setSelectedTag: (tag: string) => void
  getTaggedPosts: (tag: string) => void
  updateURL: () => void
  tags: Tag[]
  sortBy: string | undefined
  setSortBy: (value: string) => void
  sortOrder: string | undefined
  setSortOrder: (value: string) => void
}> = ({ selectedTag, setSelectedTag, getTaggedPosts, updateURL, tags, sortBy, setSortBy, sortOrder, setSortOrder }) => {
  return (
    <>
      <Selector
        value={selectedTag}
        onValueChange={(value) => {
          setSelectedTag(value)
          getTaggedPosts(value)
          updateURL()
        }}
        placeHolder={"태그 선택"}
        hasDefault={true}
        defaultItem={{ value: "all", text: "모든 태그" }}
        optionItems={tags.map((tag) => ({ value: tag.slug, text: tag.slug, key: tag.url }))}
      />
      <Selector
        value={sortBy}
        onValueChange={setSortBy}
        placeHolder={"정렬 기준"}
        optionItems={[
          { value: "none", text: "없음" },
          { value: "id", text: "ID" },
          { value: "title", text: "제목" },
          { value: "reactions", text: "반응" },
        ]}
      />
      <Selector
        value={sortOrder}
        onValueChange={setSortOrder}
        placeHolder={"정렬 순서"}
        optionItems={[
          { value: "asc", text: "오름차순" },
          { value: "desc", text: "내림차순" },
        ]}
      />
    </>
  )
}
