//Stage One Template Push
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdmStaffNavBar = () => {

    const navigate = useNavigate();

    const logOut = () => {
        navigate('/admstafflogin');
        sessionStorage.clear()
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
                                <Link className="nav-link active" aria-current="page" to="/admstaffdashboard">Dashboard</Link>
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
                                    Search
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/AdminSearchSessionDetails">Search Session</Link></li>
                                    <li><Link className="dropdown-item" to="/adminSearchBatch">Search Batch</Link></li>
                                    <li><Link className="dropdown-item" to="/adminsearchtask">Search Tasks</Link></li>
                                    <li><Link className="dropdown-item" to="/adminsearchcurriculum">Search Curriculum</Link></li>
                                    <li><Link className="dropdown-item" to="/adminSearchClg">Search Colleges</Link></li>
                                    <li><Link className="dropdown-item" to="/adminSearchTrainers">Search Trainers</Link></li>
                                    <li><Link className="dropdown-item" to="/AdminSearchCollegeStaff">Search College Staff</Link></li>
                                    <li><Link className="dropdown-item" to="/adminStaffSearchSubmittedTask">Search Submitted Task</Link></li>
                                    <li><Link className="dropdown-item" to="/adminstaffsearchmaterial">Search Material</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    View
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/adminviewallcollege">View All College</Link></li>
                                    <li><Link className="dropdown-item" to="/adminstaffviewsubmittedtask">View Submitted Task</Link></li>
                                    <li><Link className="dropdown-item" to="/AdminViewRefundRequests">View Refunds</Link></li>
                                    <li><Link className="dropdown-item" to="/adminviewalltrainers">View All Trainers</Link></li>
                                    <li><Link className="dropdown-item" to="/AdminStaffViewAllMaterial">View All Materials</Link></li>
                                    <li><Link className="dropdown-item" to="/adminviewallclgstaff">View All College Staff</Link></li>


                                </ul>
                            </li>
                            <li className="nav-item">
                                <button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#logoutConfirmationModal">
                                    Log Out
                                </button>
                            </li>
                        </ul>
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