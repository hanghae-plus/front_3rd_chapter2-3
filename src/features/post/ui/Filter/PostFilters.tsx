import PostSearchBar from '../SearchBar/PostSearchBar';
import SortFilter from './SortFilter';
import SortOrderFilter from './SortOrderFilter';
import TagFilter from './TagFilter';

const PostFilters = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <PostSearchBar />
          <TagFilter />
          <SortFilter />
          <SortOrderFilter />
        </div>
      </div>
    </>
  )
}

export default PostFilters
