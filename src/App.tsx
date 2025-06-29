import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './Pages/Home/Home'
import ComponentsList from './Pages/ComponentsList/ComponentsList'
import Contacts from './Pages/Contacts/Contacts'

function App() {
  const location = useLocation()
  const currentPage = location.pathname.split('/')[1] || 'home'

  return (
    <div className="app" data-page={currentPage}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/components" element={<ComponentsList />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </div>
  )
}

export default App
