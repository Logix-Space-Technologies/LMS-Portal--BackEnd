import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdmStaffNavBar = () => {
    const navigate = useNavigate();
    const logOut = () => {
        sessionStorage.removeItem("admstaffLogintoken")
        sessionStorage.removeItem("admstaffkey")
        sessionStorage.removeItem("admstaffId")
        navigate('/admstafflogin');
    }
    const handleLogoutConfirm = () => {
        logOut();
    };
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
                                <Link className="nav-link active" aria-current="page" to="/AdminSearchSessionDetails">Search Session</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/adminSearchBatch">Search Batch</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/adminsearchtask">Search Tasks</Link>
                            </li>
                            <li>
                                <Link className="nav-link active" aria-current="page" to="/adminsearchcurriculum">Search Curriculum</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Functionalities
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/adminviewallcollege">View All College</Link></li>
                                    <li><Link className="dropdown-item" to="/adminstaffviewsubmittedtask">View Submitted Task</Link></li>
                                    <li><Link className="dropdown-item" to="/adminSearchClg">Search Colleges</Link></li>
                                    <li><Link className="dropdown-item" to="/adminviewalltrainers">View All Trainers</Link></li>
                                    <li><Link className="dropdown-item" to="/adminSearchTrainers">Search Trainers</Link></li>
                                    <li><Link className="dropdown-item" to="/adminviewallclgstaff">View All College Staff</Link></li>
                                    <li><Link className="dropdown-item" to="/AdminSearchCollegeStaff">Search College Staff</Link></li>
                                </ul>

                            </li>
                            <li className="nav-item">
                            <Link to="/" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal">
                                Log Out
                            </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
            {/* Delete Confirmation Modal */}
            <div className="modal fade" id="deleteConfirmationModal" tabIndex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
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