import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const StudNavBar = () => {
    const navigate = useNavigate()
    const logOut = () => {
        navigate("/studentLogin")
        sessionStorage.removeItem("studentkey");
        sessionStorage.removeItem("studentId");
        sessionStorage.removeItem("studemail");
        sessionStorage.removeItem("studBatchId");
        sessionStorage.removeItem("studLoginToken");
        sessionStorage.removeItem("subtaskId");
    }
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
                                <Link className="nav-link" to='/studentviewattendance'>View Attendance</Link>
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
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Functionalities
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/studViewRefundReq">View Refund Request</Link></li>
                                    <li><Link className="dropdown-item" to="/studMaterialView">View Materials</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <button onClick={logOut} className="btn btn-primary">Log Out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default StudNavBar