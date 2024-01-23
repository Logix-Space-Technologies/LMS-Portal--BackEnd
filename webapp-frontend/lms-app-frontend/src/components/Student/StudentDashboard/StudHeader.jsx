import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../../config/config'

const StudHeader = () => {
    const [studData, setStudData] = useState([])

    const [sessionData, setSessionData] = useState([])

    const apiUrl2 = global.config.urls.api.server + "/api/lms/studentViewNextSessionDate"

    const apiURL = global.config.urls.api.server + "/api/lms/studentViewProfile"

    const getData = () => {
        let data = { "studId": sessionStorage.getItem("studentId") }
        console.log(data)
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken")
            }
        }
        axios.post(apiURL, data, axiosConfig).then(
            (response) => {
                setStudData(response.data.data)
                console.log(response.data.data)
            }
        )
    }


    const getData2 = () =>{
        let data2 = { "studId": sessionStorage.getItem("studentId"), "batchId": sessionStorage.getItem("studBatchId")}

        let axiosConfig2 = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken")
            }
        }
        axios.post(apiUrl2, data2, axiosConfig2).then(
            (response)=>{
                setSessionData(response.data.data)
            }
        )
    }

    const logOut =()=>{
        sessionStorage.removeItem("studentkey");
        sessionStorage.removeItem("studentId");
        sessionStorage.removeItem("studemail");
        sessionStorage.removeItem("studBatchId");
        sessionStorage.removeItem("studLoginToken");
    }

    useEffect(() => { getData() }, [])
    useEffect(() => {getData2() }, [])
    return (
        <div>

            <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                <a href="/admdashboard" className="navbar-brand d-flex d-lg-none me-4">
                    <h2 className="text-primary mb-0">
                        <img src="https://www.linkurcodes.com/images/logo.png" alt="" height="50px" width="180px" /></h2>
                </a>
                {sessionData.map(
                    (value,index)=>{
                        return <div className="session-name">
                        <p>Next Session: {new Date(value.date).toLocaleDateString()},{value.time}</p>
                        
                    </div>
                    }
                )}
                
                <div className="navbar-nav align-items-center ms-auto">
                    {/* <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <i className="fa fa-bell me-lg-2" />
                                    <span className="d-none d-lg-inline-flex">Notification</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                                    <a href="#" className="dropdown-item">
                                        <h6 className="fw-normal mb-0">Profile updated</h6>
                                        <small>15 minutes ago</small>
                                    </a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item">
                                        <h6 className="fw-normal mb-0">New user added</h6>
                                        <small>15 minutes ago</small>
                                    </a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item">
                                        <h6 className="fw-normal mb-0">Password changed</h6>
                                        <small>15 minutes ago</small>
                                    </a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item text-center">See all notifications</a>
                                </div>
                            </div> */}
                    <div className="nav-item dropdown">
                        {studData.map((value, index) => {
                            return <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                <img className="rounded-circle me-lg-2" src={value.studProfilePic} alt style={{ width: 40, height: 40 }} />
                                <span className="d-none d-lg-inline-flex">{value.studName}</span>
                            </a>
                        })}
                        <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                            <a href="/studChangePassword" className="dropdown-item">Change Password</a>
                            <a onClick={logOut} href="/studentLogin" className="dropdown-item">Log Out</a>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default StudHeader
