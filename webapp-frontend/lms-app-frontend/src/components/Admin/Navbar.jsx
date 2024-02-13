import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const logout = () => {
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
                <Link className="navbar-brand" to="#">Admin</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/addAdminStaff">Add Admin Staff</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addcollege">Add College</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addcollegestaff">Add College Staff</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminchangepassword">Change Password</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminsearchadminstaff">Search Admin Staff</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminsearchcurriculum">Search Curriculum</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminsearchtask">Search Tasks</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminaddbatch">Add Batch</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminviewadstafflog">View AdStaffLog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminaddsession">Add Session</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminviewallclgstaff">View College Staff</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admdashboard">Admin Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminSearchClg">Search College</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminSearchBatch">Search Batches</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminAddtask">Add Task</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminSearchTrainers">Search Trainers</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminAddcurriculum">Add Curriculum</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminAddtrainer">Add Trainers</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Functionalities
                            </Link>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/adminviewallcollege">View All College</a></li>
                                <li><a className="dropdown-item" href="/adminviewallstudents">View All Students</a></li>
                                <li><a className="dropdown-item" href="/adminviewalltrainers">View All Trainers</a></li>
                                <li><a className="dropdown-item" href="/adminviewallbatches">View All Batches</a></li>
                                <li><a className="dropdown-item" href="/AdminViewAllSession">View All Session</a></li>
                                <li><a className="dropdown-item" href="/adminsearchstudent">Search Student</a></li>
                                <li><a className="dropdown-item" href="/adminviewCollegeStaffLog">View College Staff Log</a></li>
                                <li><a className="dropdown-item" href="/AdminViewRefundRequests">View Refund Requests</a></li>
                                <li><a className="dropdown-item" href="/AdminViewStudentLog">View student log</a></li>
                                <li><a className="dropdown-item" href="/AdminSearchSessionDetails">Search session details</a></li>
                                <li><a className="dropdown-item" href="/AdminSearchCollegeStaff">Search college staffs</a></li>
                                <li><a className="dropdown-item" href="/AdminViewAllAdminStaff">View admin staffs</a></li>
                                <li><a className="dropdown-item" href="/AdminSendNotification">Send notifications</a></li>
                                <li><a className="dropdown-item" href="/UpdateTask">UpdateTask</a></li>
                                <li><Link className="dropdown-item" to="/adminviewallcollege">View All College</Link></li>
                                <li><Link className="dropdown-item" to="/adminviewallstudents">View All Students</Link></li>
                                <li><Link className="dropdown-item" to="/adminviewalltrainers">View All Trainers</Link></li>
                                <li><Link className="dropdown-item" to="/adminviewallbatches">View All Batches</Link></li>
                                <li><Link className="dropdown-item" to="/AdminViewAllSession">View All Session</Link></li>
                                <li><Link className="dropdown-item" to="/AdminViewAllTasks">View All Tasks</Link></li>
                                <li><Link className="dropdown-item" to="/adminsearchstudent">Search Student</Link></li>
                                <li><Link className="dropdown-item" to="/adminviewCollegeStaffLog">View College Staff Log</Link></li>
                                <li><Link className="dropdown-item" to="/AdminViewRefundRequests">View Refund Requests</Link></li>
                                <li><Link className="dropdown-item" to="/AdminViewStudentLog">View student log</Link></li>
                                <li><Link className="dropdown-item" to="/AdminSearchSessionDetails">Search session details</Link></li>
                                <li><Link className="dropdown-item" to="/AdminSearchCollegeStaff">Search college staffs</Link></li>
                                <li><Link className="dropdown-item" to="/AdminViewAllAdminStaff">View admin staffs</Link></li>
                                <li><Link className="dropdown-item" to="/AdminSendNotification">Send notifications</Link></li>
                                <li><Link className="dropdown-item" to="/adminViewlog">View Admin Logs</Link></li>
                                <li><Link className="dropdown-item" to="/adminViewSuccessfulrefunds">View Successful Refunds</Link></li>

                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="/" onClick={logout} className="dropdown-item">Log Out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar