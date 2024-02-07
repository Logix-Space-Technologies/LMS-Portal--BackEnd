import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const logout = () => {
        navigate("/")
        sessionStorage.removeItem("adminId")
        sessionStorage.removeItem("admkey")
        sessionStorage.removeItem("admtoken")
        sessionStorage.removeItem("userName")
        sessionStorage.removeItem("trainerId")
        sessionStorage.removeItem("curriculumId")
        sessionStorage.removeItem("clgStaffId")
        sessionStorage.removeItem("batchId")

    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Admin</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/addAdminStaff">Add Admin Staff</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/addcollege">Add College</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/addcollegestaff">Add College Staff</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminchangepassword">Change Password</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminsearchadminstaff">Search Admin Staff</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminsearchcurriculum">Search Curriculum</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminsearchtask">Search Tasks</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminaddbatch">Add Batch</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminviewadstafflog">View AdStaffLog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminaddsession">Add Session</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminviewallclgstaff">View College Staff</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/admdashboard">Admin Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminSearchClg">Search College</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminSearchBatch">Search Batches</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminAddtask">Add Task</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminSearchTrainers">Search Trainers</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminAddcurriculum">Add Curriculum</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminAddtrainer">Add Trainers</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Functionalities
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/adminviewallcollege">View All College</a></li>
                                <li><a className="dropdown-item" href="/adminviewallstudents">View All Students</a></li>
                                <li><a className="dropdown-item" href="/adminviewalltrainers">View All Trainers</a></li>
                                <li><a className="dropdown-item" href="/adminviewallbatches">View All Batches</a></li>
                                <li><a className="dropdown-item" href="/AdminViewAllSession">View All Session</a></li>
                                <li><a className="dropdown-item" href="/AdminViewAllTasks">View All Tasks</a></li>
                                <li><a className="dropdown-item" href="/adminsearchstudent">Search Student</a></li>
                                <li><a className="dropdown-item" href="/adminviewCollegeStaffLog">View College Staff Log</a></li>
                                <li><a className="dropdown-item" href="/AdminViewRefundRequests">View Refund Requests</a></li>
                                <li><a className="dropdown-item" href="/AdminViewStudentLog">View student log</a></li>
                                <li><a className="dropdown-item" href="/AdminSearchSessionDetails">Search session details</a></li>
                                <li><a className="dropdown-item" href="/AdminSearchCollegeStaff">Search college staffs</a></li>
                                <li><a className="dropdown-item" href="/AdminViewAllAdminStaff">View admin staffs</a></li>
                                <li><a className="dropdown-item" href="/AdminSendNotification">Send notifications</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a onClick={logout} className="dropdown-item">Log Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar