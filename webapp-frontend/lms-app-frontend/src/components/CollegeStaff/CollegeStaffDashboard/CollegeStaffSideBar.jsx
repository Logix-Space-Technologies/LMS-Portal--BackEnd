import React from 'react'

const CollegeStaffSideBar = () => {
  return (
    <div className="sidebar pe-4 pb-3">
                <nav className="navbar bg-light navbar-light">
                    <a href="/collegeStaffDashboard" className="navbar-brand mx-4 mb-3">
                        <img src="https://www.linkurcodes.com/images/logo.png" alt="" height="50px" width="180px" />
                    </a>
                    <div className="navbar-nav w-100">
                        <a href="/collegeStaffDashboard" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2" />Dashboard</a>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2" />Features</a>
                            <div className="dropdown-menu bg-transparent border-0"> 
                                <a href="#" className="dropdown-item">Add Batch</a>
                                <a href="#" className="dropdown-item">View Batch</a>
                                <a href="#" className="dropdown-item">Search Batch</a>
                                <a href="#" className="dropdown-item">Update Batch</a>
                                <a href="#" className="dropdown-item">Delete Batch</a>
                                <a href="#" className="dropdown-item">Add Task</a>
                                <a href="#" className="dropdown-item">View Task</a>
                                <a href="#" className="dropdown-item">Search Task</a>
                                <a href="#" className="dropdown-item">Update Task</a>
                                <a href="#" className="dropdown-item">Delete Task</a>
                                <a href="#" className="dropdown-item">View All Student</a>
                                <a href="#" className="dropdown-item">Search Student</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
  )
}

export default CollegeStaffSideBar