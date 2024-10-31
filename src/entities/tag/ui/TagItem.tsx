import { Key } from "react"
import { SelectItem } from "../../../shared/ui"
import { Tag } from "../model/type"

export const TagItem = ({ tag }: { key: Key; tag: Tag }) => <SelectItem value={tag.slug}>{tag.slug}</SelectItem>
