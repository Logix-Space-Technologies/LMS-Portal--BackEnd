import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdmStaffNavBar = () => {
    const navigate = useNavigate()
    const logOut = () => {
        navigate("/admstafflogin")
        sessionStorage.removeItem("admstaffLogintoken")
        sessionStorage.removeItem("admstaffkey")
        sessionStorage.removeItem("admstaffId")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Admin</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/addcollege">Add College</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/admstaffdashboard">Admin Staff Dashboard</a>
                            </li>
                                <a className="nav-link active" aria-current="page" href="/AdminStaffChangePassword">Change Password</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Functionalities
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">View All College</a></li>
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

export default AdmStaffNavBar