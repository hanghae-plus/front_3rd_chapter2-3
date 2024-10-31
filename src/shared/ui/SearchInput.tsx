import { Search } from "lucide-react";
import { Input } from "./Input";

interface Props {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ value, placeholder, onChange, onKeyPress }: Props) => {
  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder={placeholder} className="pl-8" value={value} onChange={onChange} onKeyPress={onKeyPress} />
      </div>
    </div>
  );
};
