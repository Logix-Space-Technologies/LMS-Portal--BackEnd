import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../../config/config'

const StudViewProfile = () => {
    const [studData, setStudData] = useState([])
    const apiURL = global.config.urls.api.server + "/api/lms/studentViewProfile"

    const navigate = useNavigate()

    const logOut = () => {
        sessionStorage.clear()
    }

    const navRefund = () => {
        navigate("/refundrequest")
    }

    const getData = () => {
        let data = { "studId": sessionStorage.getItem("studentId") }
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken"),
                "key": sessionStorage.getItem("studentkey")
            }
        }
        axios.post(apiURL, data, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setStudData(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        logOut()
                        navigate("/studentLogin")
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
                            {studData.map(
                                (value, index) => {
                                    return <div className="row align-items-center">
                                        <div className="col-lg-6 mb-4 mb-lg-0">
                                            <img height="300px" src={value.studProfilePic} alt="" />
                                        </div>
                                        <div className="col-lg-6 px-xl-10">
                                            <div className=" d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                                <h3 className="h2 text-black mb-0">{value.studName}</h3>
                                                <br></br>
                                            </div>
                                            <ul className="list-unstyled mb-1-9">
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">College Name : {value.collegeName}</span></li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Batch ID : {value.batchId}</span></li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Membership No. : {value.membership_no}</span></li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Admission No. : {value.admNo}</span></li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Roll No. : {value.rollNo}</span></li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Aadhar Number : {value.aadharNo}</span></li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Department : {value.studDept}</span></li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Course : {value.course}</span></li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Phone Number : {value.studPhNo}</span></li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Email : {value.studEmail}</span></li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Profile Validity : {value.validity.split('-').reverse().join('/')}</span></li>

                                                <div className="flex justify-between items-center mb-3">
                                                    <div style={{ marginRight: '15px', marginBottom: '10px' }}>
                                                        <Link className="btn btn-success btn-lg" to='/studentupdateprofile' style={{ fontSize: '14px' }}>Edit Profile</Link> {/* Adjust fontSize as needed */}
                                                    </div>
                                                    <div style={{ marginRight: '15px', marginBottom: '10px' }}>
                                                        <Link className="btn btn-success btn-lg" to='/studentviewtransaction' style={{ fontSize: '14px' }}>View Transaction Details</Link> {/* Adjust fontSize as needed */}
                                                    </div>
                                                    <div style={{ marginBottom: '10px' }}>
                                                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                            Exit From Link Ur Codes
                                                        </button>
                                                    </div>
                                                </div>


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
            <div className="row">
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to apply for refund?</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>This action cannot be undone.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No, cancel</button>
                                <button onClick={navRefund} type="button" className="btn btn-danger" data-bs-dismiss="modal">Yes, I'm sure</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div >
    )
}

export default StudViewProfile