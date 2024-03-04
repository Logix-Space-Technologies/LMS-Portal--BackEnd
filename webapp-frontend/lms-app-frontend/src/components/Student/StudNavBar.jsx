import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const StudNavBar = () => {
    const navigate = useNavigate()
    const logOut = () => {
        sessionStorage.clear()
        navigate("/studentLogin")
    }

    const handleLogoutConfirm = () => {
        logOut();
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Student</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/studentViewTask'>View Task</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/studviewcollege'>View College Details</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/studviewNotifications'>View Notifications</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/studViewUpcomingSession'>View Upcoming Session Details</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/studSessionView'>View All Session Details</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/studentviewbatchincharge'>View Batch In-Charge</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/studdashboard'>Student Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/studMaterialView">View Materials</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/studviewCommunityManager">View Community Manager</Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal">Log Out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
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
    )
}

export default StudNavBar