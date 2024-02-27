import React, { useState } from 'react'
import '../../config/config'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CollegeStaffChangePassword = () => {
    const [updateField, setUpdateField] = useState({
        "email": sessionStorage.getItem("clgStaffEmail"),
        "oldPassword": "",
        "newPassword": ""
    })

    const apiurl = global.config.urls.api.server + "/api/lms/collegeStaffChangePassword";
    const navigate = useNavigate();

    const updateHandler = (event) => {
        setUpdateField({ ...updateField, [event.target.name]: event.target.value });
    }

    const readNewValue = () => {
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("clgstaffLogintoken")
            }
        };

        axios.post(apiurl, updateField, axiosConfig).then(
            (response) => {
                if (updateField.oldPassword === updateField.newPassword) {
                    alert("Old password and New password cannot be same.")
                } else {
                    if (response.data.status === "success") {
                        alert("Password Changed Successfully");
                        navigate("/clgStafflogin");
                        sessionStorage.clear()
                    } else {
                        if (response.data.status === "Validation failed" && response.data.data.oldPassword) {
                            alert(response.data.data.oldPassword);
                        } else {
                            if (response.data.status === "Validation failed" && response.data.data.newPassword) {
                                alert(response.data.data.newPassword);
                            } else {
                                if (response.data.status === "Unauthorized User!!") {
                                    sessionStorage.clear()
                                    navigate("/clgStafflogin")
                                } else {
                                    alert(response.data.status)
                                }
                            }
                        }
                    }
                }
            }
        )
    }

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
                                    <div className=" d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                        <h3 className="h2 text-black mb-0">Change Password</h3>
                                        <br></br>
                                    </div>
                                    <ul className="list-unstyled mb-1-9">
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Old Password :</label>
                                            <input onChange={updateHandler} type="password" className="form-control" name="oldPassword" value={updateField.oldPassword} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">New Password :</label>
                                            <input onChange={updateHandler} type="password" className="form-control" name="newPassword" value={updateField.newPassword} />
                                        </div>
                                        <br></br>
                                        <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                            <button onClick={readNewValue} className="btn btn-warning">Update</button>
                                        </div>
                                        <br></br>
                                        <div class="mb-3">
                                            <Link class="btn btn-danger" to="/collegeStaffDashboard">Back</Link>
                                        </div>
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

export default CollegeStaffChangePassword