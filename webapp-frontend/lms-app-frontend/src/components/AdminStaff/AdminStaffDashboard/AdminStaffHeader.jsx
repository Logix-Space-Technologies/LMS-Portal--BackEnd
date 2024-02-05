import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../../config/config'
import axios from 'axios'

const AdminStaffHeader = () => {
    const [admStaffData, setAdmStaffData] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/profileViewByAdmStaff"

    const getData = () => {
        let data = { "id": sessionStorage.getItem("admstaffId") }
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admstaffLogintoken"),
                "key": sessionStorage.getItem("admstaffkey")
            }
        }
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setAdmStaffData(response.data.data)
                    console.log(response.data)
                } else {
                    navigate("/admstafflogin")
                    sessionStorage.removeItem("admstaffLogintoken")
                    sessionStorage.removeItem("admstaffkey")
                    sessionStorage.removeItem("admstaffId")
                }
            }
        )
    }

    const navigate = useNavigate()

    const logOut = () => {
        navigate("/admstafflogin")
        sessionStorage.removeItem("admstaffLogintoken")
        sessionStorage.removeItem("admstaffkey")
        sessionStorage.removeItem("admstaffId")
    }

    useEffect(() => { getData() }, [])
    return (
        <div>
            <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                <a href="/admdashboard" className="navbar-brand d-flex d-lg-none me-4">
                    <h2 className="text-primary mb-0">
                        <img src="https://www.linkurcodes.com/images/logo.png" alt="" height="50px" width="180px" />
                    </h2>
                </a>
                <div className="navbar-nav align-items-center ms-auto">
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <img className="rounded-circle me-lg-2" src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-HD-Photo.png" alt="" style={{ width: 40, height: 40 }} />
                            <span className="d-none d-lg-inline-flex">{admStaffData.AdStaffName}</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                            <a href="#" className="dropdown-item">Change Password</a>
                            <a onClick={logOut} className="dropdown-item">Log Out</a>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AdminStaffHeader