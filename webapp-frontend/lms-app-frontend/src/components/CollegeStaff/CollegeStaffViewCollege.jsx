import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../config/config'
import ClgStaffNavbar from './ClgStaffNavbar';
import { useNavigate } from 'react-router-dom'

const CollegeStaffViewCollege = () => {
    const [collegeData, setCollegeData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/viewClgStaffCollege"
    const getData = () => {
        let collegeStaffId = { "collegeStaffId": sessionStorage.getItem("clgStaffId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("clgstaffLogintoken"),
                "key": sessionStorage.getItem("clgstaffkey")
            }
        }
        axios.post(apiUrl, collegeStaffId, axiosConfig).then(
            (response) => {
                if (response.data.status === "success") {
                    setIsLoading(false)
                    setCollegeData(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/clgStafflogin")
                        sessionStorage.clear()
                    } else {
                        setIsLoading(false)
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    const taskScore = (id) => {
        sessionStorage.setItem("ViewAllperformancecollegeId", id)
        navigate("/clgStaffviewAllClgPerformance")
    }

    useEffect(() => { getData() }, [])

    return (
        <div>
            <ClgStaffNavbar />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-4 mb-sm-5">

                        <br></br>
                        <strong>View College Details</strong>
                        <br></br>
                        <br></br>
                        <br></br>
                        {isLoading ? <div className="flex justify-center items-center h-full">
                            <div className="text-center py-20">
                                <div>Loading...</div>
                            </div>
                        </div> : <div className="card card-style1 --bs-primary-border-subtle border-5">
                            <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                                {collegeData.map(
                                    (value, index) => {
                                        return <div className="row align-items-center">
                                            <div className="col-lg-6 mb-4 mb-lg-0">
                                                <img height="300px" src={value.collegeImage} alt="" />
                                            </div>
                                            <div className="col-lg-6 px-xl-10">
                                                <div className=" d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                                    <h3 className="h2 text-black mb-0">{value.collegeName}</h3>
                                                    <br></br>
                                                </div>
                                                <ul className="list-unstyled mb-1-9">
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">College Code : {value.collegeCode}</span></li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Address : {value.collegeAddress}</span></li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Website : {value.website}</span></li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Mobile Number : {value.collegeMobileNumber}</span></li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Phone Number : {value.collegePhNo}</span></li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Email : {value.email}</span></li>
                                                </ul>
                                                <button onClick={() => taskScore(value.id)} className="btn btn-primary" style={{ marginRight: '20px' }}>
                                                    View Performance
                                                </button>
                                            </div>
                                        </div>
                                    })}
                            </div>
                        </div>}
                    </div>
                </div>
            </div >
        </div>
    )
}

export default CollegeStaffViewCollege