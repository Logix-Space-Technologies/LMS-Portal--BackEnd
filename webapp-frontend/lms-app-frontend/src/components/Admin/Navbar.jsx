import React from 'react'

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Admin</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/addAdminStaff">Add Admin Staff</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/addcollege">Add College</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/addcollegestaff">Add College Staff</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/adminchangepassword">Change Password</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/adminsearchadminstaff">Search Admin Staff</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/adminsearchcurriculum">Search Curriculum</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/adminsearchtask">Search Tasks</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/adminviewadstafflog">View AdStaffLog</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/adminviewallclgstaff">View College Staff</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admdashboard">Admin Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <a href="/" className="dropdown-item">Log Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar