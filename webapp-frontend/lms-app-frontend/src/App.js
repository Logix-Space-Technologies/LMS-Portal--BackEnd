import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/Admin/AdminLogin';
import AdminStaffLogin from './components/AdminStaff/AdminStaffLogin';
import AdminCountView from './components/Admin/AdminDashboard/AdminCountView';
import AdminTableView from './components/Admin/AdminDashboard/AdminTableView';
import AdminSideBar from './components/Admin/AdminDashboard/AdminSideBar';
import StudentLogin from './components/Student/StudentLogin';
import CollegeStaffLogin from './components/CollegeStaff/CollegeStaffLogin';
import AdminHeader from './components/Admin/AdminDashboard/AdminHeader';
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<AdminLogin/>}/>
            <Route path='/admstafflogin' element={<AdminStaffLogin/>} />
            <Route path='/countview' element={<AdminCountView/>}/>
            <Route path='/admdashboard' element={<AdminDashboard/>}/>
            <Route path='/admintableview' element={<AdminTableView/>}/>
            <Route path='/adminsidebar' element={<AdminSideBar/>}/>
            <Route path='/studentLogin' element={<StudentLogin/>} />
            <Route path='/clgStafflogin' element={<CollegeStaffLogin/>} />
            <Route path='/adminheader' element={<AdminHeader/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
