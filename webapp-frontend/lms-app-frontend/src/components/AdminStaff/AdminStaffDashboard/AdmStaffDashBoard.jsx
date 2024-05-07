import React from 'react'
import AdminStaffHeader from './AdminStaffHeader'
import AdminStaffSideBar from './AdminStaffSideBar'
import AdminStaffFooter from './AdminStaffFooter'
import AdmStaffViewProfile from './AdmStaffViewProfile'
import AdmStaffNavBar from '../AdmStaffNavBar'

const AdmStaffDashBoard = () => {
  return (
    <div>
      <AdmStaffNavBar/>
      <div className="container">
        <div className="content">
          {/* <AdminStaffHeader />
          <AdminStaffSideBar /> */}
          <AdmStaffViewProfile />
          <br />
          <br />
          <br />
          <br />
          <AdminStaffFooter />
        </div>
      </div>
    </div>
  )
}

export default AdmStaffDashBoard