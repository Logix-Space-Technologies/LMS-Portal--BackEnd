import React from 'react'
import StudHeader from './StudHeader'
import StudSideBar from './StudSideBar'
import StudViewProfile from './StudViewProfile'
import StudentFooter from './StudentFooter'
import { Link } from 'react-router-dom'
import StudNavBar from '../StudNavBar'

const StudDashboard = () => {
  return (
    <div>
      <StudNavBar />
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <div className="content">
          {/* <StudHeader/> */}

          {/* <StudSideBar/> */}
          <StudViewProfile />
          <br />
          <br />
          <br />
          <br />
          <StudentFooter />
        </div>
      </div>
    </div>
  )
}

export default StudDashboard