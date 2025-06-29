import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import ComponentsList from './Pages/ComponentsList/ComponentsList'

function App() {
  return (
      <Routes>
          <Route index element={<Home />} />
          <Route path="/components" element={<ComponentsList />} />
      </Routes>
  )
}

export default App
