import { SelectRoot } from "./SelectRoot"
import { SelectTrigger } from "./SelectTrigger"
import { SelectContent } from "./SelectContent"
import { SelectItem } from "./SelectItem"
import { SelectGroup } from "./SelectGroup"
import { SelectValue } from "./SelectValue"

export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
  Group: SelectGroup,
  Value: SelectValue,
})
