import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../config/config'
import StudNavBar from './StudNavBar'
import { useNavigate } from 'react-router-dom'

const StudentViewCollege = () => {
    const [collegeData, setCollegeData] = useState([])
    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/viewCollegeStudent"
    const getData = () => {
        let data = { "studId": sessionStorage.getItem("studentId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken"),
                "key": sessionStorage.getItem("studentkey")
            }
        }
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                if (response.data.status === "College Found") {
                    setCollegeData(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/studentLogin")
                        sessionStorage.removeItem("studentkey");
                        sessionStorage.removeItem("studentId");
                        sessionStorage.removeItem("studemail");
                        sessionStorage.removeItem("studBatchId");
                        sessionStorage.removeItem("studLoginToken");
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    useEffect(() => { getData() }, [])
    return (
        <div>
            <StudNavBar />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-4 mb-sm-5">
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="card card-style1 --bs-primary-border-subtle border-5">
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
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">College Name : {value.collegeName}</span></li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">College Code : {value.collegeCode}</span></li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Address : {value.collegeAddress}</span></li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Website : {value.website}</span></li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Mobile Number : {value.collegeMobileNumber}</span></li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Phone Number : {value.collegePhNo}</span></li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Email : {value.email}</span></li>
                                                </ul>
                                                <ul className="social-icon-style1 list-unstyled mb-0 ps-0">
                                                    <li><a href="#!"><i className="ti-twitter-alt" /></a></li>
                                                    <li><a href="#!"><i className="ti-facebook" /></a></li>
                                                    <li><a href="#!"><i className="ti-pinterest" /></a></li>
                                                    <li><a href="#!"><i className="ti-instagram" /></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default StudentViewCollege