import React from 'react'

const AdminSideBar = () => {
  return (
    <div className="sidebar pe-4 pb-3">
                <nav className="navbar bg-light navbar-light">
                    <a href="/admdashboard" className="navbar-brand mx-4 mb-3">
                        <img src="https://www.linkurcodes.com/images/logo.png" alt="" height="50px" width="180px" />
                    </a>
                    <div className="navbar-nav w-100">
                        <a href="/admdashboard" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2" />Dashboard</a>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2" />Features</a>
                            <div className="dropdown-menu bg-transparent border-0">
                                <a href="/addAdminStaff" className="dropdown-item">Add Admin Staff</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
  )
}

export default AdminSideBar
