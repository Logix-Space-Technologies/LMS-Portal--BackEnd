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
import AdminAddBatch from './components/Admin/AdminAddBatch';
import AdminViewAllBatch from './components/Admin/AdminViewAllBatch';
import AdminSearchStudent from './components/Admin/AdminSearchStudent';
import AdminViewCollegeStaffLog from './components/Admin/AdminViewCollegeStaffLog';
import AdminAddSession from './components/Admin/AdminAddSession';
import AdminSearchCollege from './components/Admin/AdminSearchCollege';
import AdminUpdateTrainer from './components/Admin/AdminUpdateTrainer';
import AdminViewAllCollege from './components/Admin/AdminViewAllCollege';
import AdminViewAllCurriculum from './components/Admin/AdminViewAllCurriculum';
import AdminViewRefundRequests from './components/Admin/AdminViewRefundRequests';
import AdminUpdateCollegeStaff from './components/Admin/AdminUpdateCollegeStaff';
import AdminUpdateCurriculum from './components/Admin/AdminUpdateCurriculum';
import AdminSearchBatch from './components/Admin/AdminSearchBatch';
import AdminViewStudentLog from './components/Admin/AdminViewStudentLog';
import ClgStaffNavbar from './components/CollegeStaff/ClgStaffNavbar';
import AdminAddTask from './components/Admin/AdminAddTask';
import AdminSearchSessionDetails from './components/Admin/AdminSearchSessionDetails';
import AdminViewAllSession from './components/Admin/AdminViewAllSession';
import AdminSearchCollegeStaff from './components/Admin/AdminSearchCollegeStaff';
import AdminViewAllAdminStaff from './components/Admin/AdminViewAllAdmStaff';
import AdmStaffNavBar from './components/AdminStaff/AdmStaffNavBar';
import AdminSendNotification from './components/Admin/AdminSendNotifications';
import AdminUpdateTask from './components/Admin/AdminUpdateTask';
import AdminStaffFooter from './components/AdminStaff/AdminStaffDashboard/AdminStaffFooter';
import AdminStaffSideBar from './components/AdminStaff/AdminStaffDashboard/AdminStaffSideBar';
import AdminStaffHeader from './components/AdminStaff/AdminStaffDashboard/AdminStaffHeader';
import AdmStaffDashBoard from './components/AdminStaff/AdminStaffDashboard/AdmStaffDashBoard';
import AdmStaffViewProfile from './components/AdminStaff/AdminStaffDashboard/AdmStaffViewProfile';
import AdminViewAllTasks from './components/Admin/AdminViewAllTasks';
import AdminSearchTrainer from './components/Admin/AdminSearchTrainer';
import StudentUpdateSubmittedTask from './components/Student/StudentUpdateSubmittedTask';
import AdminUpdateBatch from './components/Admin/AdminUpdateBatch';
import AdminUpdateAdminStaff from './components/Admin/AdminUpdateAdminStaff';
import AdminStaffChangePassword from './components/AdminStaff/AdminStaffChangePassword';
import AdminStaffViewAllMaterial from './components/AdminStaff/AdminStaffViewAllMaterial';
import AdminStaffUpdateMaterial from './components/AdminStaff/AdminStaffUpdateMaterial';
import AdminAddCurriculum from './components/Admin/AdminAddCurriculum';
import AdminAddTrainer from './components/Admin/AdminAddTrainer';
import AdminStaffViewSubmittedTask from './components/AdminStaff/AdminStaffViewSubmittedTask';
import AdminViewLog from './components/Admin/AdminViewLog';
import AdminViewSuccessfulRefunds from './components/Admin/AdminViewSuccessfulRefunds';
import AdminUpdateCollege from './components/Admin/AdminUpdateCollege';
import StudentViewOneTask from './components/Student/StudentViewOneTask';
import AdminUpdateSession from './components/Admin/AdminUpdateSession';
import AdminStaffAddMaterials from './components/AdminStaff/AdminStaffAddMaterials';
import CollegeStaffViewSession from './components/CollegeStaff/CollegeStaffViewSession';
import StudentViewCommunityManager from './components/Student/StudentViewCommunityManager';
import CollegeStaffViewNotifications from './components/CollegeStaff/CollegeStaffViewNotifications';
import CollegeStaffViewCollege from './components/CollegeStaff/CollegeStaffViewCollege';





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
          <Route path='/adminaddbatch' element={<AdminAddBatch/>}/>
          <Route path='/adminviewallbatches' element={<AdminViewAllBatch/>}/>
          <Route path='/adminsearchstudent' element={<AdminSearchStudent/>}/>
          <Route path='/adminviewCollegeStaffLog' element={<AdminViewCollegeStaffLog/>}/>
          <Route path='/adminaddsession' element={<AdminAddSession/>}/>
          <Route path='/adminSearchClg' element={<AdminSearchCollege/>}/>
          <Route path='/AdminUpdateTrainer' element={<AdminUpdateTrainer/>}/>
          <Route path='/adminviewallcollege' element={<AdminViewAllCollege/>}/>
          <Route path='/adminviewallcurriculum' element={<AdminViewAllCurriculum/>}/>
          <Route path='/AdminViewRefundRequests' element={<AdminViewRefundRequests/>}/>
          <Route path='/adminupdatecollegestaff' element={<AdminUpdateCollegeStaff/>}/>
          <Route path='/AdminUpdateCurriculum' element={<AdminUpdateCurriculum/>}/>
          <Route path='/adminSearchBatch' element={<AdminSearchBatch/>}/>
          <Route path='/AdminViewStudentLog' element={<AdminViewStudentLog/>}/>
          <Route path='/adminAddtask' element={<AdminAddTask/>}/>
          <Route path='/AdminSearchSessionDetails' element={<AdminSearchSessionDetails/>}/>
          <Route path='/AdminViewAllSession' element={<AdminViewAllSession/>}/>
          <Route path='/AdminSearchCollegeStaff' element={<AdminSearchCollegeStaff/>}/>
          <Route path='/AdminViewAllAdminStaff' element={<AdminViewAllAdminStaff/>}/>
          <Route path='/AdminSendNotification' element={<AdminSendNotification/>}/>
          <Route path='/AdminUpdateTask' element={<AdminUpdateTask/>}/>
          <Route path='/AdminViewAllTasks' element={<AdminViewAllTasks/>}/>
          <Route path='/adminSearchTrainers' element={<AdminSearchTrainer/>}/>
          <Route path='/adminupdatebatch' element={<AdminUpdateBatch/>}/>
          <Route path='/adminupdateadminstaff' element={<AdminUpdateAdminStaff/>}/>
          <Route path='/adminAddcurriculum' element={<AdminAddCurriculum/>}/>
          <Route path='/adminAddtrainer' element={<AdminAddTrainer/>}/>
          <Route path='/adminViewlog' element={<AdminViewLog/>}/>
          <Route path='/adminViewSuccessfulrefunds' element={<AdminViewSuccessfulRefunds/>}/>
          <Route path='/adminUpdateclg' element={<AdminUpdateCollege/>}/>
          <Route path='/AdminUpdateSession' element={<AdminUpdateSession/>}/>







          {/* ADMINSTAFF */}
          {/* ================================================================================================================= */}
          <Route path='/admstafflogin' element={<AdminStaffLogin />} />
          <Route path='/admstaffnavbar' element={<AdmStaffNavBar/>}/>
          <Route path='/admstafffooter' element={<AdminStaffFooter/>}/>
          <Route path='/admstaffsidebar' element={<AdminStaffSideBar/>}/>
          <Route path='/admstaffheader' element={<AdminStaffHeader/>}/>
          <Route path='/admstaffdashboard' element={<AdmStaffDashBoard/>}/>
          <Route path='/admstaffviewprofile' element={<AdmStaffViewProfile/>}/>
          <Route path='/AdminStaffChangePassword' element={<AdminStaffChangePassword/>}/>
          <Route path='/AdminStaffViewAllMaterial' element={<AdminStaffViewAllMaterial/>}/>
          <Route path='/AdminStaffUpdateMaterial' element={<AdminStaffUpdateMaterial/>}/>
          <Route path='/adminstaffviewsubmittedtask' element={<AdminStaffViewSubmittedTask/>}/>
          <Route path='/adminStaffAddmaterials' element={<AdminStaffAddMaterials/>}/>
          





          


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
          <Route path='/clgstaffnavbar' element={<ClgStaffNavbar/>}/>
          <Route path='/clgstaffviewsession' element={<CollegeStaffViewSession/>}/>
          <Route path='/clgstaffviewNotifications' element={<CollegeStaffViewNotifications/>}/>
          <Route path='/CollegeStaffViewCollege' element={<CollegeStaffViewCollege/>}/>





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
          <Route path='/studupdatesubtask' element={<StudentUpdateSubmittedTask/>}/>
          <Route path='/studviewtasksessionwise' element={<StudentViewOneTask/>}/>
          <Route path='/studviewCommunityManager' element={<StudentViewCommunityManager/>}/>




        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
