import { Trigger, SelectValue } from "@radix-ui/react-select"
import { SelectProps } from "@shared/types"
import { ChevronDown } from "lucide-react"

export const SelectTrigger: React.FC<SelectProps> = ({ placeholder, className }) => {
  return (
    <Trigger
      className={`
        flex items-center justify-between
        px-3 py-2 h-10 
        rounded-md border border-input bg-white text-sm ring-offset-background 
        placeholder:text-muted-foreground 
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
        disabled:cursor-not-allowed disabled:opacity-50 
        ${className}
        `}
    >
      <SelectValue placeholder={placeholder} />
      <ChevronDown className="h-4 w-4 opacity-50" />
    </Trigger>
  )
}
