import React from 'react'
import CollegeStaffHeader from './CollegeStaffHeader'
import CollegeStaffFooter from './CollegeStaffFooter'
import CollegeStaffViewProfile from './CollegeStaffViewProfile'
import CollegeStaffSideBar from './CollegeStaffSideBar'
import { Link } from 'react-router-dom'
import ClgStaffNavbar from '../ClgStaffNavbar';


const CollegeStaffDashboard = () => {
  return (
    <div>
      <ClgStaffNavbar />
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <div className="content">
          {/* <CollegeStaffHeader />
        <CollegeStaffSideBar /> */}
          <br />
          <h1 className="text-center" style={{fontWeight:'bold', fontSize:'20px'}}>Batch In-Charge Dashboard</h1>
          <CollegeStaffViewProfile />
          <br></br>
          <br />
          <br />
          <CollegeStaffFooter />
        </div>
      </div>
    </div>
  )
}

export default CollegeStaffDashboard