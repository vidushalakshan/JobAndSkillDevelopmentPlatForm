import { Routes, Route } from 'react-router-dom';
import DashBoard from '../page/DashBoard';
import './App.css';
import Login from '../page/Login';
import SignUp from '../page/SignUp';
import EmailVerification from '../page/EmailVerify';
import routes from '../navigation/Routes';
import EmployeeDashboard from '../page/EmployeeDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path.slice(1)} element={route.element} />
        ))}
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify" element={<EmailVerification />} />
      <Route path='/employee' element={<EmployeeDashboard />} />
    </Routes>
  );
}

export default App;
