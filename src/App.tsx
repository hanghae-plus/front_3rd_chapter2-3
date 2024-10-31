import { BrowserRouter as Router } from 'react-router-dom';

import NewPostsManagerPage from './pages/NewPostsManagerPage.tsx';
import BaseLayout from './shared/ui/templates/BaseLayout.tsx';

const App = () => {
  return (
    <Router>
      <BaseLayout>
        {/* <PostsManagerPage /> */}
        <NewPostsManagerPage />
      </BaseLayout>
    </Router>
  )
}

export default App
