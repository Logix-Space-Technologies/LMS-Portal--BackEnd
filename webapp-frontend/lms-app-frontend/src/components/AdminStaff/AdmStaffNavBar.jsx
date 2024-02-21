import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdmStaffNavBar = () => {
    const logOut = () => {
        sessionStorage.removeItem("admstaffLogintoken")
        sessionStorage.removeItem("admstaffkey")
        sessionStorage.removeItem("admstaffId")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Admin Staff</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/addcollege">Add College</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/admstaffdashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/AdminStaffViewAllMaterial">View All Materials</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/AdminStaffChangePassword">Change Password</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/adminStaffAddmaterials">Add Materials</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/adminAddcurriculum">Add Curriculum</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/addcollegestaff">Add College Staff</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/adminaddbatch">Add Batch</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/adminaddsession">Add Session</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/adminAddtask">Add Task</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/adminAddtrainer">Add Trainer</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/AdminSendNotification">Send Notifications</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/AdminViewRefundRequests">View Refunds</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/AdminViewAllSession">View Session</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/AdminUpdateSession">Update Session</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/AdminSearchSessionDetails">Search Session</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Functionalities
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/adminviewallcollege">View All College</Link></li>
                                    <li><Link className="dropdown-item" to="/adminstaffviewsubmittedtask">View Submitted Task</Link></li>
                                    <li><Link className="dropdown-item" to="/adminSearchClg">Search Colleges</Link></li>
                                </ul>
                                
                            </li>
                            <li className="nav-item">
                                <Link to="/admstafflogin" onClick={logOut} className="dropdown-item">Log Out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default AdmStaffNavBar