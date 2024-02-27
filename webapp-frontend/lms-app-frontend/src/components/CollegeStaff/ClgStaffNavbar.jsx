import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ClgStaffNavbar = () => {

    const logOut = () => {
        sessionStorage.clear()
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Batch InCharge</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/studentverification">Student Verification</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/colgstaffsearchbatch">Search Batch</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/colgstaffsearchstudent">Search Student</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/clgStaffSearchTask">Search Task</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/collegeStaffViewBatch">View All Batches</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/collegeStaffDashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/clgStafflogin" onClick={logOut} className="dropdown-item" style={{ textAlignLast: "end" }}>Log Out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default ClgStaffNavbar