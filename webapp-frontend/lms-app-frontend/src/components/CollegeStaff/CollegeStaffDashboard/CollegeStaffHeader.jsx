import React from 'react'

const CollegeStaffHeader = () => {
  return (
    <div>
        <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                        <a href="/admdashboard" className="navbar-brand d-flex d-lg-none me-4">
                            <h2 className="text-primary mb-0">
                                <img src="https://www.linkurcodes.com/images/logo.png" alt="" height="50px" width="180px" /></h2>
                        </a>
                        <div className="navbar-nav align-items-center ms-auto">
                            {/* <div className="nav-item dropdown">
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
                            </div> */}
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <img className="rounded-circle me-lg-2" src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-HD-Photo.png" alt style={{ width: 40, height: 40 }} />
                                    <span className="d-none d-lg-inline-flex">College Staff</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                                    <a href="#" className="dropdown-item">Change Password</a>
                                    <a href="/clgStafflogin" className="dropdown-item">Log Out</a>
                                </div>
                            </div>
                        </div>
                    </nav>

    </div>
  )
}

export default CollegeStaffHeader