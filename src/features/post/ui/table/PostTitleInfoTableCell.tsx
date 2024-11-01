import { useSearchParams } from "@features/filter/hooks/useSearchParams"
import { searchParamsAtom } from "@features/filter/model"
import { highlightText } from "@shared/utils/highlightText"
import { TableCell } from "@shared/ui/table"
import { useAtomValue } from "jotai"

type PropsType = {
  title: string
  tags: string[]
}

export const PostTitleInfoTableCell: React.FC<PropsType> = ({ title, tags }) => {
  const { updateSearchParams } = useSearchParams()
  const { searchQuery, selectedTag } = useAtomValue(searchParamsAtom)

  return (
    <TableCell>
      <div className="space-y-1">
        <div>{highlightText(title, searchQuery)}</div>

        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span
              key={`${index}th-${tag}`}
              className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                selectedTag === tag ? 'text-white bg-blue-500 hover:bg-blue-600' : "text-blue-800 bg-blue-100 hover:bg-blue-200"
              }`}
              onClick={() => {
                updateSearchParams({ selectedTag: tag, skip: 0 })
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </TableCell>
  )
}
