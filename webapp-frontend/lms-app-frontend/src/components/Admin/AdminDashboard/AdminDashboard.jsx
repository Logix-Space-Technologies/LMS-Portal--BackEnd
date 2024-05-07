import React from 'react'
import AdminHeader from './AdminHeader'
import AdminSideBar from './AdminSideBar'
import AdminCountView from './AdminCountView'
import AdminTableView from './AdminTableView'
import AdminFooter from './AdminFooter'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'

const AdminDashboard = () => {
  return (
    <div>
      <Navbar/>
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <div className="content">
          {/* <AdminHeader /> */}
          {/* Admin Side Bar start */}
          {/* <AdminSideBar /> */}
          {/* Admin SideBar End */}
          {/* /Count view */}
          <br />
          <h1 className="text-center" style={{fontWeight:'bold', fontSize:'20px'}}>Admin Dashboard</h1>
          <AdminCountView />
          {/* Table View */}
          <AdminTableView />
          {/* Footer Start */}
          <AdminFooter />
          {/* Footer End */}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard