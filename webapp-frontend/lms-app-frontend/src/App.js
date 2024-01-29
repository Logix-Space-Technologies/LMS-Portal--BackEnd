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
import StudentChangePassword from './components/Student/StudentChangePassword';
import StudentViewAttendance from './components/Student/StudentViewAttendance';
import StudentViewCollege from './components/Student/StudentViewCollege';
import NotificationView from './components/Student/ViewNotifications';
import SessionView from './components/Student/ViewSessionDetails';
import MaterialView from './components/Student/ViewBatchMaterials';
import StudentViewRefundRequest from './components/Student/StudentViewRefundRequest';
import CollegeStaffViewBatch from './components/CollegeStaff/CollegeStaffViewAllBatches';
import CollegeStaffViewAllStudents from './components/CollegeStaff/CollegeStaffViewAllStudents'
import StudentBatchInCharge from './components/Student/StudentBatchInCharge';
import CollegeStaffChangePassword from './components/CollegeStaff/CollegeStaffChangePassword';
import CollegeStaffViewAttendance from './components/CollegeStaff/CollegeStaffViewAttendance';
import CollegeStaffSearchStudent from './components/CollegeStaff/CollegeStaffSearchStudent';
import AdminSearchCurriculum from './components/Admin/AdminSearchCurriculum';
import CollegeStaffSearchBatch from './components/CollegeStaff/CollegeStaffSearchBatch';
import AdminSearchTasks from './components/Admin/AdminSearchTasks';
import StudentViewTransaction from './components/Student/StudentViewTransaction';
import AdminSearchAdminStaff from './components/Admin/AdminSearchAdminStaff';
import CollegeStaffViewTask from './components/CollegeStaff/CollegeStaffViewTask';
import AdminViewAdStaffLog from './components/Admin/AdminViewAdStaffLog';
import StudentViewUpcomingSession from './components/Student/StudentViewUpcomingSession';
import CollegeStaffSearchTask from './components/CollegeStaff/CollegeStaffSearchTask';
import AdminChangePassword from './components/Admin/AdminChangePassword';
import Navbar from './components/Admin/Navbar';
import AdminViewAllClgStaff from './components/Admin/AdminViewAllClgStaff';
import AdminViewAllStud from './components/Admin/AdminViewAllStud';
import AdminViewAllTrainers from './components/Admin/AdminViewAllTrainers';
import StudNavBar from './components/Student/StudNavBar';




function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          {/* ADMIN */}
          {/* ================================================================================================================= */}
          <Route path='/' element={<AdminLogin />} />
          <Route path='/admdashboard' element={<AdminDashboard />} />
          <Route path='/admintableview' element={<AdminTableView />} />
          <Route path='/countview' element={<AdminCountView />} />
          <Route path='/adminsidebar' element={<AdminSideBar />} />
          <Route path='/adminheader' element={<AdminHeader />} />
          <Route path='/addcollegestaff' element={<AddCollegeStaff />} />
          <Route path='/addcollege' element={<AddCollege />} />
          <Route path='/addAdminStaff' element={<AddAdminStaff />} />
          <Route path='/adminsearchcurriculum' element={<AdminSearchCurriculum />} />
          <Route path='/adminsearchtask' element={<AdminSearchTasks />} />
          <Route path='/adminsearchadminstaff' element={<AdminSearchAdminStaff />} />
          <Route path='/adminviewadstafflog' element={<AdminViewAdStaffLog/>}/>
          <Route path='/adminchangepassword' element={<AdminChangePassword/>}/>
          <Route path='/adminnavbar' element={<Navbar/>}/>
          <Route path='/adminviewallclgstaff' element={<AdminViewAllClgStaff/>}/>
          <Route path='/adminviewallstudents' element={<AdminViewAllStud/>}/>
          <Route path='/adminviewalltrainers' element={<AdminViewAllTrainers/>}/>




          {/* ADMINSTAFF */}
          {/* ================================================================================================================= */}
          <Route path='/admstafflogin' element={<AdminStaffLogin />} />



          


          {/* COLLEGESTAFF */}
          {/* ================================================================================================================= */}
          <Route path='/clgStafflogin' element={<CollegeStaffLogin />} />
          <Route path='/collegeStaffDashboard' element={<CollegeStaffDashboard />} />
          <Route path='/collegeStaffHeader' element={<CollegeStaffHeader />} />
          <Route path='/studentverification' element={<CollegeStaffStudentVerify />} />
          <Route path='/collegeStaffViewBatch' element={<CollegeStaffViewBatch />} />
          <Route path='/collegeStaffViewAllStudents' element={<CollegeStaffViewAllStudents />} />
          <Route path='/clgstaffchangepassword' element={<CollegeStaffChangePassword />} />
          <Route path='/clgstaffviewattendance' element={<CollegeStaffViewAttendance />} />
          <Route path='/colgstaffsearchstudent' element={<CollegeStaffSearchStudent />} />
          <Route path='/colgstaffsearchbatch' element={<CollegeStaffSearchBatch />} />
          <Route path='/clgstaffviewtask' element={<CollegeStaffViewTask/>}/>
          <Route path='/clgStaffSearchTask' element={<CollegeStaffSearchTask/>}/>




          {/* STUDENT */}
          {/* ================================================================================================================= */}
          <Route path='/studentLogin' element={<StudentLogin />} />
          <Route path='/studentregistration' element={<StudentRegistration />} />
          <Route path='/studentupdateprofile' element={<StudentUpdateProfile />} />
          <Route path='/studentViewTask' element={<StudentViewTasks />} />
          <Route path='/studdashboard' element={<StudDashboard />} />
          <Route path='/refundrequest' element={<RefundRequestForm />} />
          <Route path='/studheader' element={<StudHeader />} />
          <Route path='/studprofile' element={<StudViewProfile />} />
          <Route path='/studsidebar' element={<StudSideBar />} />
          <Route path='/studfooter' element={<StudentFooter />} />
          <Route path='/studChangePassword' element={<StudentChangePassword />} />
          <Route path='/studentviewattendance' element={<StudentViewAttendance />} />
          <Route path='/studviewcollege' element={<StudentViewCollege />} />
          <Route path='/studviewNotifications' element={<NotificationView />} />
          <Route path='/studSessionView' element={<SessionView />} />
          <Route path='/studMaterialView' element={<MaterialView />} />
          <Route path='/studViewRefundReq' element={<StudentViewRefundRequest />} />
          <Route path="/studentviewbatchincharge" element={<StudentBatchInCharge />} />
          <Route path='/studentviewtransaction' element={<StudentViewTransaction />} />
          <Route path='/studViewUpcomingSession' element={<StudentViewUpcomingSession />} />
          <Route path='/studnavbar' element={<StudNavBar/>}/>




        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
