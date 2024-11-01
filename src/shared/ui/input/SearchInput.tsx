import { DefaultProps } from "@shared/types"
import { Search } from "lucide-react"
import { Input } from ".."

interface PropsType extends DefaultProps {
  placeholder?: string
  initialValue?: string
  onChange: (v: string) => void
  onEnter?: () => void
}

export const SearchInput: React.FC<PropsType> = ({
  placeholder = "",
  initialValue = "",
  onChange,
  onEnter = () => null,
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-8"
        value={initialValue}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter()}
      />
    </div>
  )
}
