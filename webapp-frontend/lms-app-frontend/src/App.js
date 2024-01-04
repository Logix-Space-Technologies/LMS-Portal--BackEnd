import logo from './logo.svg';
import './App.css';
import AdminLogin from './components/Admin/AdminLogin';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminStaffLogin from './components/AdminStaff/AdminStaffLogin';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<AdminLogin/>}/>
            <Route path='/admdashboard' element={<AdminDashboard/>}/>
            <Route path='/admstafflogin' element={<AdminStaffLogin/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
