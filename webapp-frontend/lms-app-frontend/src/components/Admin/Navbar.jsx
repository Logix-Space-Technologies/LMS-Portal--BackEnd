import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    
    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.clear()
        navigate('/');

    }

    const handleLogoutConfirm = () => {
        logout();
    };

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
                            <Link className="nav-link" to="/admdashboard">Admin Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/AdminSendNotification">Send notifications</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Add
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/addAdminStaff">Add Admin Staff</Link></li>
                                <li><Link className="dropdown-item" to="/addcollege">Add College</Link></li>
                                <li><Link className="dropdown-item" to="/addcollegestaff">Add College Staff</Link></li>
                                <li><Link className="dropdown-item" to="/adminaddbatch">Add Batch</Link></li>
                                <li><Link className="dropdown-item" to="/adminaddsession">Add Session</Link></li>
                                <li><Link className="dropdown-item" to="/adminAddtask">Add Task</Link></li>
                                <li><Link className="dropdown-item" to="/adminAddcurriculum">Add Curriculum</Link></li>
                                <li><Link className="dropdown-item" to="/adminAddtrainer">Add Trainers</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                View
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/adminviewallcollege">View All College</Link></li>
                                <li><Link className="dropdown-item" to="/adminviewalltrainers">View All Trainers</Link></li>
                                <li><Link className="dropdown-item" to="/adminviewCollegeStaffLog">View College Staff Log</Link></li>
                                <li><Link className="dropdown-item" to="/AdminViewRefundRequests">View Refund Requests</Link></li>
                                <li><Link className="dropdown-item" to="/AdminViewStudentLog">View student log</Link></li>
                                <li><Link className="dropdown-item" to="/AdminViewAllAdminStaff">View admin staffs</Link></li>
                                <li><Link className="dropdown-item" to="/adminViewlog">View Admin Logs</Link></li>
                                <li><Link className="dropdown-item" to="/adminViewSuccessfulrefunds">View Successful Refunds</Link></li>
                                <li><Link className="dropdown-item" to="/adminviewadstafflog">View AdStaffLog</Link></li>
                                <li><Link className="dropdown-item" to="/adminviewallclgstaff">View College Staff</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Search
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/adminsearchadminstaff">Search Admin Staff</Link></li>
                                <li><Link className="dropdown-item" to="/adminsearchcurriculum">Search Curriculum</Link></li>
                                <li><Link className="dropdown-item" to="/adminsearchtask">Search Tasks</Link></li>
                                <li><Link className="dropdown-item" to="/adminSearchClg">Search College</Link></li>
                                <li><Link className="dropdown-item" to="/adminSearchBatch">Search Batches</Link></li>
                                <li><Link className="dropdown-item" to="/adminSearchTrainers">Search Trainers</Link></li>
                                <li><Link className="dropdown-item" to="/adminsearchstudent">Search Student</Link></li>
                                <li><Link className="dropdown-item" to="/AdminSearchSessionDetails">Search session details</Link></li>
                                <li><Link className="dropdown-item" to="/AdminSearchCollegeStaff">Search college staffs</Link></li>
                                <li><Link className="dropdown-item" to="/adminstaffsearchmaterial">Search Material</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal">
                                Log Out
                            </Link>
                        </li>
                    </ul>
                </div>
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
            </div>
        </nav>
    )
}

export default Navbar