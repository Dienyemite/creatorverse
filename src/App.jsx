import { useRoutes } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators'
import AddCreator from './pages/AddCreator'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'

function App() {
  const element = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/creator/add', element: <AddCreator /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/creator/:id/edit', element: <EditCreator /> },
  ])

  return element
}

export default App
