import React from 'react'
import { Link } from 'react-router-dom'

const AdminStaffSideBar = () => {
    return (
        <div>
            <div className="sidebar pe-4 pb-3">
                <nav className="navbar bg-light navbar-light">
                    <h2 className="text-primary mb-0">
                        <img src="https://www.linkurcodes.com/images/logo.png" alt="" height="50px" width="180px" />
                    </h2>
                    <div className="navbar-nav w-100">
                        <Link to="/collegeStaffDashboard" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2" />Dashboard</Link>
                        <div className="nav-item dropdown">
                            <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2" />Features</Link>
                            <div className="dropdown-menu bg-transparent border-0">
                                <Link to="/addcollege" className="dropdown-item">Add College</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default AdminStaffSideBar