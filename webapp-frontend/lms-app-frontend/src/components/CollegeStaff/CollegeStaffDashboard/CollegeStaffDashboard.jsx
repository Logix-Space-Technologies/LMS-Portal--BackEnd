import React from 'react'
import CollegeStaffHeader from './CollegeStaffHeader'
import CollegeStaffFooter from './CollegeStaffFooter'
import CollegeStaffViewProfile from './CollegeStaffViewProfile'
import CollegeStaffSideBar from './CollegeStaffSideBar'
import { Link } from 'react-router-dom'


const CollegeStaffDashboard = () => {
  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <div className="content">
        <CollegeStaffHeader />
        <CollegeStaffSideBar />
        <CollegeStaffViewProfile />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <CollegeStaffFooter />
      </div>
      {/* Back to Top */}
      <Link to="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></Link>
    </div>
  )
}

export default CollegeStaffDashboard