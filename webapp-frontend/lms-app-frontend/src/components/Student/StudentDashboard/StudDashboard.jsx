import React from 'react'
import StudHeader from './StudHeader'
import StudSideBar from './StudSideBar'
import StudViewProfile from './StudViewProfile'
import StudentFooter from './StudentFooter'

const StudDashboard = () => {
  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
        <div className="content">
           <StudHeader/>
           <StudSideBar/>
           <StudViewProfile/>
           <br />
           <br />
           <br />
           <br />
           <StudentFooter/>
        </div>
        {/* Back To Top */}
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
    </div>
  )
}

export default StudDashboard