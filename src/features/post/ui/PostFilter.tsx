import { Selector } from "../../../shared/ui/Selector"
import { useTagsQuery } from "../../tag/model/tagStore"
import { useRouterQueries } from "../model/routerStore"

export const PostFilter = () => {
  const { sortBy, sortOrder, selectedTag, setSelectedTag, updateURL, setSortBy, setSortOrder } = useRouterQueries()
  const { data: tagsData } = useTagsQuery()
  return (
    <>
      <Selector
        value={selectedTag}
        onValueChange={setSelectedTag}
        placeHolder={"태그 선택"}
        hasDefault={true}
        defaultItem={{ key: "all", value: "all", text: "모든 태그" }}
        optionItems={tagsData?.tags.map((tag) => ({ value: tag.slug, text: tag.slug, key: tag.url })) || []}
      />
      <Selector
        value={sortBy}
        onValueChange={setSortBy}
        placeHolder={"정렬 기준"}
        optionItems={[
          { key: "none", value: "none", text: "없음" },
          { key: "id", value: "id", text: "ID" },
          { key: "title", value: "title", text: "제목" },
          { key: "reactions", value: "reactions", text: "반응" },
        ]}
      />
      <Selector
        value={sortOrder}
        onValueChange={setSortOrder}
        placeHolder={"정렬 순서"}
        optionItems={[
          { key: "asc", value: "asc", text: "오름차순" },
          { key: "desc", value: "desc", text: "내림차순" },
        ]}
      />
    </>
  )
}
