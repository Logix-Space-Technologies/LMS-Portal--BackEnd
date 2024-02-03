import React from 'react'
import AdminStaffHeader from './AdminStaffHeader'
import AdminStaffSideBar from './AdminStaffSideBar'
import AdminStaffFooter from './AdminStaffFooter'
import AdmStaffViewProfile from './AdmStaffViewProfile'

const AdmStaffDashBoard = () => {
  return (
    <div>
        <div className="container-xxl position-relative bg-white d-flex p-0">
        <div className="content">
           <AdminStaffHeader/>
           <AdminStaffSideBar/>
           <AdmStaffViewProfile/>
           <br />
           <br />
           <br />
           <br />
           <AdminStaffFooter/>
        </div>
        {/* Back To Top */}
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
    </div>
    </div>
  )
}

export default AdmStaffDashBoard