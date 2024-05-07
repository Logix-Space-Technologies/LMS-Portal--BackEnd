import React, { useEffect, useState } from 'react'
import '../../../config/config'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdmStaffViewProfile = () => {

    const [admStaffData, setAdmStaffData] = useState([])

    const navigate = useNavigate()

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
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/admstafflogin")
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    useEffect(() => { getData() }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 mb-4 mb-sm-5">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="card card-style1 --bs-primary-border-subtle border-5">
                        <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                            <div className="row align-items-center">
                                <div className="col-lg-6 px-xl-10">
                                    <div className="d-lg-flex justify-between align-items-center py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                        <div className="d-lg-inline-block">
                                            <h3 className="h2 text-black mb-0">{admStaffData.AdStaffName}</h3>
                                            <br></br>
                                        </div>
                                    </div>
                                    <ul className="list-unstyled mb-1-9">
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Address : {admStaffData.Address}</span></li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Phone No. : {admStaffData.PhNo}</span></li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Aadhar Number : {admStaffData.AadharNo}</span></li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Email : {admStaffData.Email}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdmStaffViewProfile