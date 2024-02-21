import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../../../config/config'
import { Link, useNavigate } from 'react-router-dom';

const CollegeStaffHeader = () => {
    const [colgStaffData, setColgStaffData] = useState({});

    const apiURL = global.config.urls.api.server + "/api/lms/profileViewByCollegeStaff";

    const navigate = useNavigate()

    const getData = () => {
        let data = { "id": sessionStorage.getItem("clgStaffId") };
        console.log(data)
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("clgstaffLogintoken"),
                "key": sessionStorage.getItem("clgstaffkey")
            }
        }
        axios.post(apiURL, data, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setColgStaffData(response.data.data);
                } else {
                    if (response.data.status === "Unauthorized Access !!!") {
                        logOut()
                        navigate("/clgStafflogin")
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    const logOut = () => {
        sessionStorage.clear()
    }

    useEffect(() => { getData() }, [])
    return (
        <div>
            <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                <Link to="/admdashboard" className="navbar-brand d-flex d-lg-none me-4">
                    <h2 className="text-primary mb-0">
                        <img src="https://www.linkurcodes.com/images/logo.png" alt="" height="50px" width="180px" /></h2>
                </Link>
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
                        <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <img className="rounded-circle me-lg-2" src={colgStaffData.profilePic} alt style={{ width: 40, height: 40 }} />
                            <span className="d-none d-lg-inline-flex">{colgStaffData.collegeStaffName}</span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                            <Link to="/clgstaffchangepassword" className="dropdown-item">Change Password</Link>
                            <Link to="/clgStafflogin" onClick={logOut} className="dropdown-item">Log Out</Link>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default CollegeStaffHeader