import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../../shared/ui"

interface SortByWidgetProps {
  sortBy: string;
  setSortBy: (value: string) => void;
}

const SortByWidget: React.FC<SortByWidgetProps> = ({ sortBy, setSortBy }) => {
    return (
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
    );
  };
  
  export default SortByWidget;