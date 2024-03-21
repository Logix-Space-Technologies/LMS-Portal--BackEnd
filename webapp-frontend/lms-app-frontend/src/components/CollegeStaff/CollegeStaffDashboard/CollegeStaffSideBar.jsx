import React from 'react'
import { Link } from 'react-router-dom'

const CollegeStaffSideBar = () => {
    return (
        <div className="sidebar pe-4 pb-3">
            <nav className="navbar bg-light navbar-light">
                <Link to="#" className="navbar-brand mx-4 mb-3">
                    <img src="https://www.linkurcodes.com/images/logo.png" alt="" height="50px" width="180px" />
                </Link>
                <div className="navbar-nav w-100">
                    <Link to="/collegeStaffDashboard" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2" />Dashboard</Link>
                    <div className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2" />Features</Link>
                        <div className="dropdown-menu bg-transparent border-0">
                            <Link to="/studentverification" className="dropdown-item">Student Verification</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default CollegeStaffSideBar