import { Search } from "lucide-react";

export const ContentSearch: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        {children}
      </div>
    </div>
  );
};