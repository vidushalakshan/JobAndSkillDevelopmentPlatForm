import { Routes, Route } from 'react-router-dom'
import DashBoard from '../page/DashBoard'
import './App.css'
import Login from '../page/Login';
import routes from '../navigation/Routes';

function App() {

  return (
    <Routes>
    <Route path="/" element={<DashBoard />}>
      {routes.map((route) => (
        <Route key={route.path} path={route.path.slice(1)} element={route.element} />
      ))}
    </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Login />} />
      <Route path="/verify" element={<Login />} />
    </Routes>
      
  )
}

export default App;
