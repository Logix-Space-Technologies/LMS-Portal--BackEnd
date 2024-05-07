import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdmStaffNavBar = () => {

    const [admStaffData, setAdmStaffData] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/profileViewByAdmStaff"

    const getData = () => {
        let data = { "id": sessionStorage.getItem("admstaffId") }
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admstaffLogintoken"),
                "key": sessionStorage.getItem("admstaffkey")
            }
        }
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setAdmStaffData(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/admstafflogin")
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    const navigate = useNavigate()

    const logOut = () => {
        sessionStorage.clear()
        navigate('/admstafflogin');
    }

    const handleLogoutConfirm = () => {
        logOut();
    };

    useEffect(() => { getData() }, [])

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h2 className="text-primary mb-0">
                        <img src="https://www.linkurcodes.com/images/logo.png" alt="" height="50px" width="180px" />
                    </h2>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/admstaffdashboard" style={{ marginLeft: '20px' }}>Dashboard</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/AdminSendNotification">Send Notifications</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Add
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/addcollege">Add College</Link></li>
                                    <li><Link className="dropdown-item" to="/adminStaffAddmaterials">Add Materials</Link></li>
                                    <li><Link className="dropdown-item" to="/adminAddcurriculum">Add Curriculum</Link></li>
                                    <li><Link className="dropdown-item" to="/addcollegestaff">Add College Staff</Link></li>
                                    <li><Link className="dropdown-item" to="/adminaddbatch">Add Batch</Link></li>
                                    <li><Link className="dropdown-item" to="/adminaddsession">Add Session</Link></li>
                                    <li><Link className="dropdown-item" to="/adminAddtask">Add Task</Link></li>
                                    <li><Link className="dropdown-item" to="/adminAddtrainer">Add Trainer</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    View
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/adminviewallcollege">View All College</Link></li>
                                    <li><Link className="dropdown-item" to="/AdminViewRefundRequests">View Refund Requests</Link></li>
                                    <li><Link className="dropdown-item" to="/adminviewalltrainers">View All Trainers</Link></li>
                                    <li><Link className="dropdown-item" to="/AdminStaffViewAllMaterial">View All Materials</Link></li>
                                    <li><Link className="dropdown-item" to="/adminviewallclgstaff">View All College Staff</Link></li>
                                    <li><Link className="dropdown-item" to="/adminViewSuccessfulrefunds">View Successful Refunds</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Search
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/adminSearchClg">Search Colleges</Link></li>
                                    <li><Link className="dropdown-item" to="/adminSearchTrainers">Search Trainers</Link></li>
                                    <li><Link className="dropdown-item" to="/AdminSearchCollegeStaff">Search College Staff</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-nav align-items-center ms-auto">
                    <div className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <img className="rounded-circle me-lg-2" src="./person.svg" alt="" style={{ width: 40, height: 40 }} />
                            <span className="d-none d-lg-inline-flex">{admStaffData.AdStaffName}</span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                            <Link to="/AdminStaffChangePassword" className="dropdown-item">Change Password</Link>
                            <Link to="/" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#logoutConfirmationModal">
                                Log Out
                            </Link>
                        </div>

                    </div>
                </div>
            </nav >
            {/* Delete Confirmation Modal */}
            <div className="modal fade" id="logoutConfirmationModal" tabIndex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteConfirmationModalLabel">Logout Confirmation</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to Logout?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleLogoutConfirm}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdmStaffNavBar