import React from 'react'

const ClgStaffNavbar = () => {
  return (
    <div>
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">College Staff</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"> 
                            <a className="nav-link active" aria-current="page" href="/studentverification">Student Verification</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/colgstaffsearchbatch">College Staff Search Batch</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/colgstaffsearchstudent">College Staff Search Student</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/clgStaffSearchTask">College Staff Search Task</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/collegeStaffViewBatch">View All Batches</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/collegeStaffViewAllStudents">View All Students</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/clgstaffviewtask">View All Tasks</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/clgstaffviewattendance">View Attendance List</a>
                        </li>
                        <li className="nav-item">
                            <a href="/clgStafflogin" className="dropdown-item">Log Out</a> 
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    // navbar
  )
}

export default ClgStaffNavbar