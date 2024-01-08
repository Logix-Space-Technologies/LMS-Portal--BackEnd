import React from 'react'
import AdminHeader from './AdminDashboard/AdminHeader'
import AdminSideBar from './AdminDashboard/AdminSideBar'
import AdminFooter from './AdminDashboard/AdminFooter'

const AddCollegeStaff = () => {
  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <div className="content">
        <AdminHeader />
        <AdminSideBar />
        <div className="container">
          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col col-12 col-sm-8 col-md-12 col-lg-8">
              <div className="card text-center shadow p-3 mb-5 bg-white rounded">
                <div>
                  <h2>Add College Staff</h2>
                </div>
                <div className="card-body ">
                  <form>
                    <div className="mb-3 text-start">
                      <label htmlFor="studEmail" className="form-label">Email</label>
                      <input
                        type="text"
                        name="studEmail"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                      />
                    </div>
                  </form>
                </div>                
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>

  )
}

export default AddCollegeStaff