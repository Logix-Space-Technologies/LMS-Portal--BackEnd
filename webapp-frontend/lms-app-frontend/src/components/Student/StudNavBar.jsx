import React from 'react'

const StudNavBar = () => {
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
                            <a className="nav-link active" aria-current="page" href="/studentViewTask">View Task</a>
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
                            <a className="nav-link" href="/studSessionView">View Upcoming Session Details</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminviewadstafflog">View AdStaffLog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminviewallclgstaff">View College Staff</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/admdashboard">Admin Dashboard</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Functionalities
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/adminviewallstudents">View All Students</a></li>
                                <li><a className="dropdown-item" href="/adminviewalltrainers">View All Trainers</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="/studentLogin" className="dropdown-item">Log Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default StudNavBar