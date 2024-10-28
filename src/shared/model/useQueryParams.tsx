// import { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// type QueryParams = {
//   skip: number;
//   limit: number;
//   searchQuery: string;
//   sortBy: string;
//   sortOrder: string;
//   selectedTag: string;
// };

// const useQueryParams = (): [QueryParams, (params: Partial<QueryParams>) => void] => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
  
//     // 상태 관리
//     const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"));
//     const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"));
//     const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "");
//     const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "");
//     const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc");
//     const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "");
  
//     // 쿼리 파라미터 업데이트 함수
//     const updateQueryParams = (params: Partial<QueryParams>) => {
//       const newParams = new URLSearchParams(location.search);
  
//       if (params.skip !== undefined) newParams.set("skip", params.skip.toString());
//       if (params.limit !== undefined) newParams.set("limit", params.limit.toString());
//       if (params.searchQuery !== undefined) newParams.set("search", params.searchQuery);
//       if (params.sortBy !== undefined) newParams.set("sortBy", params.sortBy);
//       if (params.sortOrder !== undefined) newParams.set("sortOrder", params.sortOrder);
//       if (params.selectedTag !== undefined) newParams.set("tag", params.selectedTag);
  
//       navigate(`?${newParams.toString()}`);
//     };
  
//     // URL 변경 시 상태 업데이트
//   useEffect(() => {
//     const params = new URLSearchParams(location.search)
//     setSkip(parseInt(params.get("skip") || "0"))
//     setLimit(parseInt(params.get("limit") || "10"))
//     setSearchQuery(params.get("search") || "")
//     setSortBy(params.get("sortBy") || "")
//     setSortOrder(params.get("sortOrder") || "asc")
//     setSelectedTag(params.get("tag") || "")
//   }, [location.search])
  
//     // 쿼리 파라미터 상태 반환
//     return [
//       { skip, limit, searchQuery, sortBy, sortOrder, selectedTag },
//       updateQueryParams,
//     ];
//   };
  
//   export default useQueryParams;