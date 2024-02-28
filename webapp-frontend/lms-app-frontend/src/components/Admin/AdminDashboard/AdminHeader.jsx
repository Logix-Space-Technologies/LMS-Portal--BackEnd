import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        navigate('/');
    };
const handleLogoutConfirm = () => {
        logout();
    };

    return (
        <div>
            <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                <Link to="/admdashboard" className="navbar-brand d-flex d-lg-none me-4">
                    <h2 className="text-primary mb-0">
                        <img src="https://www.linkurcodes.com/images/logo.png" alt="" height="50px" width="180px" /></h2>
                </Link>
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
                        <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <img className="rounded-circle me-lg-2" src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-HD-Photo.png" alt style={{ width: 40, height: 40 }} />
                            <span className="d-none d-lg-inline-flex">Admin</span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                            <Link to="/adminchangepassword" className="dropdown-item">Change Password</Link>
                            <Link to="/" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal">
                                Log Out
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
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
    )
}

export default AdminHeader