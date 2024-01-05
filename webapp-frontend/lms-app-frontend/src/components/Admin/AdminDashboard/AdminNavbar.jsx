import React from 'react'
import AdminCountView from './AdminCountView'
import AdminTableView from './AdminTableView'
import AdminSideBar from './AdminSideBar'

const AdminNavbar = () => {
    return (
        <div className="container-xxl position-relative bg-white d-flex p-0">
            {/* Admin Side Bar start */}
            <AdminSideBar/>
            {/* Admin SideBar End */}
            <div className="content">
                    <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                        <a href="/admdashboard" className="navbar-brand d-flex d-lg-none me-4">
                            <h2 className="text-primary mb-0">
                                <img src="https://www.linkurcodes.com/images/logo.png" alt="" height="50px" width="180px" /></h2>
                        </a>
                        <div className="navbar-nav align-items-center ms-auto">
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <i className="fa fa-bell me-lg-2" />
                                    <span className="d-none d-lg-inline-flex">Notification</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                                    <a href="#" className="dropdown-item">
                                        <h6 className="fw-normal mb-0">Profile updated</h6>
                                        <small>15 minutes ago</small>
                                    </a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item">
                                        <h6 className="fw-normal mb-0">New user added</h6>
                                        <small>15 minutes ago</small>
                                    </a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item">
                                        <h6 className="fw-normal mb-0">Password changed</h6>
                                        <small>15 minutes ago</small>
                                    </a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item text-center">See all notifications</a>
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <img className="rounded-circle me-lg-2" src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-HD-Photo.png" alt style={{ width: 40, height: 40 }} />
                                    <span className="d-none d-lg-inline-flex">Admin</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                                    <a href="#" className="dropdown-item">Change Password</a>
                                    <a href="/" className="dropdown-item">Log Out</a>
                                </div>
                            </div>
                        </div>
                    </nav>
                    {/* /Count view */}
                    <AdminCountView/>
                    {/* Table View */}
                    <AdminTableView/>
                {/* Footer Start */}
                <div className="container-fluid pt-4 px-4">
                    <div className="bg-light rounded-top p-4">
                        <div className="row">
                            <div className="col-12 col-sm-6 text-center text-sm-start">
                                &copy; 2024 Link Ur Codes. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer End */}
            </div>
            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
        </div>
    )
}

export default AdminNavbar
