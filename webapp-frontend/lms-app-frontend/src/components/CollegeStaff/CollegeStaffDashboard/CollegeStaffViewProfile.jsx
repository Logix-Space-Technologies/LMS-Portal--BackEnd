import React, { useEffect, useState } from 'react'
import '../../../config/config'
import axios from 'axios';

const CollegeStaffViewProfile = () => {
    const [colgStaffData, setColgStaffData] = useState({});
    const apiURL = global.config.urls.api.server + "/api/lms/profileViewByCollegeStaff";
    const getData = () => {
        let data = { "id": sessionStorage.getItem("clgStaffId"), "token": sessionStorage.getItem("clgstaffLogintoken") };
        console.log(data);
        axios.post(apiURL, data).then(
            (response) => {
                setColgStaffData(response.data.data);
                console.log(response.data.data);
            }
        )
    }
    useEffect(() => { getData() }, [])
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 mb-4 mb-sm-5">
                    <div className="card card-style1 border-0">
                        <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                            <div className="row align-items-center">
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <img src={colgStaffData.profilePic} alt="" />
                                </div>
                                <div className="col-lg-6 px-xl-10">
                                    <div className=" d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                        <h3 className="h2 text-black mb-0">{colgStaffData.collegeStaffName}</h3>
                                        <br></br>
                                    </div>
                                    <ul className="list-unstyled mb-1-9">
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">College ID: {colgStaffData.collegeId}</span></li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">College Name: {colgStaffData.collegeName}</span></li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Department: {colgStaffData.department}</span></li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Email: {colgStaffData.email}</span></li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Aadhar Number: {colgStaffData.aadharNo}</span></li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Address: {colgStaffData.clgStaffAddress}</span></li>
                                        <li className="display-28"><span className="display-26 text-secondary me-2 font-weight-600">Phone Number: {colgStaffData.phNo}</span></li>
                                    </ul>
                                    <ul className="social-icon-style1 list-unstyled mb-0 ps-0">
                                        <li><a href="#!"><i className="ti-twitter-alt" /></a></li>
                                        <li><a href="#!"><i className="ti-facebook" /></a></li>
                                        <li><a href="#!"><i className="ti-pinterest" /></a></li>
                                        <li><a href="#!"><i className="ti-instagram" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollegeStaffViewProfile