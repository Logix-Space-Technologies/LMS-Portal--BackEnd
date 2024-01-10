import React from 'react'
import AdminHeader from './AdminHeader'
import AdminSideBar from './AdminSideBar'
import AdminCountView from './AdminCountView'
import AdminTableView from './AdminTableView'
import AdminFooter from './AdminFooter'

const AdminDashboard = () => {
  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">

            <div className="content">
                <AdminHeader />
                {/* Admin Side Bar start */}
                <AdminSideBar />
                {/* Admin SideBar End */}
                {/* /Count view */}
                <AdminCountView/>
                {/* Table View */}
                <AdminTableView />
                {/* Footer Start */}
                <AdminFooter />
                {/* Footer End */}
            </div>
            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
        </div>
  )
}

export default AdminDashboard