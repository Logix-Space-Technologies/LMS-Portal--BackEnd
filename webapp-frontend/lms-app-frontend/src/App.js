import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import AdminLogin from './components/Admin/AdminLogin';
import AdminStaffLogin from './components/AdminStaff/AdminStaffLogin';
import StudentLogin from './components/Student/StudentLogin';
import CollegeStaffLogin from './components/CollegeStaff/CollegeStaffLogin';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<AdminLogin/>}/>
            <Route path='/admdashboard' element={<AdminDashboard/>}/>
            <Route path='/admstafflogin' element={<AdminStaffLogin/>} />
            <Route path='/studentLogin' element={<StudentLogin/>} />
            <Route path='/clgStafflogin' element={<CollegeStaffLogin/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
