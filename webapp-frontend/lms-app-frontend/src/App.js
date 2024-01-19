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
import StudentRegistration from './components/Student/StudentRegistration';
import AddCollegeStaff from './components/Admin/AddCollegeStaff';
import CollegeStaffHeader from './components/CollegeStaff/CollegeStaffDashboard/CollegeStaffHeader';
import CollegeStaffDashboard from './components/CollegeStaff/CollegeStaffDashboard/CollegeStaffDashboard';
import AddCollege from './components/Admin/AddCollege';
import CollegeStaffStudentVerify from './components/CollegeStaff/CollegeStaffStudentVerify';
import StudentUpdateProfile from './components/Student/StudentUpdateProfile';
import AddAdminStaff from './components/Admin/AddAdminStaff';
import StudentViewTasks from './components/Student/StudentViewTasks';
import StudDashboard from './components/Student/StudentDashboard/StudDashboard';
import RefundRequestForm from './components/Student/RefundRequest'; 
import StudHeader from './components/Student/StudentDashboard/StudHeader';
import StudViewProfile from './components/Student/StudentDashboard/StudViewProfile';
import StudSideBar from './components/Student/StudentDashboard/StudSideBar';
import StudentFooter from './components/Student/StudentDashboard/StudentFooter';
import StudentViewAttendance from './components/Student/StudentViewAttendance';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AdminLogin />} />
          <Route path='/admstafflogin' element={<AdminStaffLogin />} />
          <Route path='/countview' element={<AdminCountView />} />
          <Route path='/admdashboard' element={<AdminDashboard />} />
          <Route path='/admintableview' element={<AdminTableView />} />
          <Route path='/adminsidebar' element={<AdminSideBar />} />
          <Route path='/studentLogin' element={<StudentLogin />} />
          <Route path='/clgStafflogin' element={<CollegeStaffLogin />} />
          <Route path='/adminheader' element={<AdminHeader />} />
          <Route path='/studentregistration' element={<StudentRegistration />} />
          <Route path='/addcollegestaff' element={<AddCollegeStaff />} />
          <Route path='/collegeStaffDashboard' element={<CollegeStaffDashboard />} />
          <Route path='/collegeStaffHeader' element={<CollegeStaffHeader />} />
          <Route path='/addcollege' element={<AddCollege />} />
          <Route path='/studentverification' element={<CollegeStaffStudentVerify/>}/>
          <Route path='/studentupdateprofile' element={<StudentUpdateProfile />} />         
          <Route path='/addAdminStaff' element={<AddAdminStaff/>}/>
          <Route path='/studentViewTask' element={<StudentViewTasks />} />
          <Route path='/studdashboard' element={<StudDashboard/>} />
          <Route path='/refundrequest' element={<RefundRequestForm />} />
          <Route path='/studheader' element={<StudHeader/>}/>
          <Route path='/studprofile' element={<StudViewProfile/>} />
          <Route path='/studsidebar' element={<StudSideBar/>} />
          <Route path='/studfooter' element={<StudentFooter/>} />
          <Route path='/studentviewattendance' element={<StudentViewAttendance/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
