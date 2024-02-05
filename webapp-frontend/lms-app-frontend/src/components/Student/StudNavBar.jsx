import React from 'react'
import { useNavigate } from 'react-router-dom';

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
                            <a className="nav-link active" aria-current="page" href="/studentViewTask">View Tasks</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/studentviewattendance">View Attendance</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/refundrequest">Refund Request</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/studviewcollege">View College Details</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/studviewNotifications">View Notifications</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/studViewUpcomingSession">View Upcoming Session Details</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/studSessionView">View All Session Details</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/studentviewbatchincharge">View Batch In-Charge</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/studdashboard">Student Dashboard</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Functionalities
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/studViewRefundReq">View Refund Request</a></li>
                                <li><a className="dropdown-item" href="/studentviewtransaction">View Transaction Details</a></li>
                                <li><a className="dropdown-item" href="/studMaterialView">View Materials</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a onClick={logOut} className="dropdown-item">Log Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default StudNavBar