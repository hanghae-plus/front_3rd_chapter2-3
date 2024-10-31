import PostFilters from '../features/post/ui/Filter/PostFilters';
import PostsManagerHeader from '../features/post/ui/PostsManagerHeader';
import PostTable from '../features/post/ui/Table/PostTable';

const NewPostsManagerPage = () => {
  return (
    <>
      <PostsManagerHeader />
      <PostFilters />
      <PostTable />
    </>
  )
}

export default NewPostsManagerPage
