import { Routes, Route } from 'react-router-dom'
import DashBoard from '../page/DashBoard'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="*" element={<DashBoard />} />
    </Routes>
      
  )
}

export default App
