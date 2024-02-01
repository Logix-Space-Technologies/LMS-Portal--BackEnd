import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Admin</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/addAdminStaff">Add Admin Staff</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/addcollege">Add College</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/addcollegestaff">Add College Staff</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminchangepassword">Change Password</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminsearchadminstaff">Search Admin Staff</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminsearchcurriculum">Search Curriculum</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminsearchtask">Search Tasks</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminaddbatch">Add Batch</a>
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
                        <li className="nav-item">
                            <a className="nav-link" href="/adminSearchClg">Search College</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Functionalities
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/adminviewallcollege">View All College</a></li>
                                <li><a className="dropdown-item" href="/adminviewallstudents">View All Students</a></li>
                                <li><a className="dropdown-item" href="/adminviewalltrainers">View All Trainers</a></li>
                                <li><a className="dropdown-item" href="/adminviewallbatches">View All Batches</a></li>
                                <li><a className="dropdown-item" href="/adminsearchstudent">Search Student</a></li>
                                <li><a className="dropdown-item" href="/adminviewCollegeStaffLog">View College Staff Log</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="dropdown-item">Log Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar