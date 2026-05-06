import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from '../page/Login';
import SignUp from '../page/SignUp';
import EmailVerification from '../page/EmailVerify';
import Home from '../page/Home';
import AdminDashboard from '../page/AdminDashboard';
import MyJobsPage from '../page/MyJobsPage';
import MainLayout from '../page/MainLayout';
import JobSearch from '../page/JobSearch';
import UserProfile from '../page/UserProfile';
import CoursesPage from '../page/CoursesPage';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobSearch />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>
      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify" element={<EmailVerification />} />
      
      <Route path='/admin' element={<AdminDashboard />} />
      <Route path='/my-jobs' element={<MyJobsPage />} />
    </Routes>
  );
}

export default App;
