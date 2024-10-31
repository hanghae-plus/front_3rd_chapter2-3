import { useSearchParams } from "@features/filter/hooks/useSearchParams"
import { SelectRoot } from "@shared/ui/select/SelectRoot"
import { pageValue } from "../../config/pageValue"

export const PostPageSize = () => {
  const { searchParams, updateSearchParams } = useSearchParams()
  const { limit } = searchParams

  return (
    <div className="flex items-center gap-2">
      <span>표시</span>
      <SelectRoot
        items={pageValue.options.size}
        value={limit.toString()}
        onValueChange={(v) => updateSearchParams({ limit: Number(v) })}
        placeholder={pageValue.initial.size}
      />
      <span>항목</span>
    </div>
  )
}
