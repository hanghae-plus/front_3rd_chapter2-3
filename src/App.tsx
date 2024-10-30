import ReactQueryProvider from "./app/providers/reactQuery.tsx"
import RouterProvider from "./app/providers/router.tsx"

const App = () => {
  return (
    <ReactQueryProvider>
      <RouterProvider />
    </ReactQueryProvider>
  )
}

export default App
