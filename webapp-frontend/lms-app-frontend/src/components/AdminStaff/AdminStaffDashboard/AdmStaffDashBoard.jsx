import React from 'react'
import AdminStaffHeader from './AdminStaffHeader'
import AdminStaffSideBar from './AdminStaffSideBar'
import AdminStaffFooter from './AdminStaffFooter'
import AdmStaffViewProfile from './AdmStaffViewProfile'
import { Link } from 'react-router-dom'

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
        <Link to="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></Link>
    </div>
    </div>
  )
}

export default AdmStaffDashBoard