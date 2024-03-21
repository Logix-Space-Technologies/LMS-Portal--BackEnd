import React, { useState } from 'react'
import '../../config/config'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentChangePassword = () => {
    const [updateField, setUpdateField] = useState({
        "id": sessionStorage.getItem("studentId"),
        "studEmail": sessionStorage.getItem("studemail"),
        "oldPassword": "",
        "newPassword": ""
    });

    const [errors, setErrors] = useState({})

    const APIurl = global.config.urls.api.server + "/api/lms/studentChangePassword";
    const navigate = useNavigate();

    const updateHandler = (event) => {
        setErrors({})
        setUpdateField({ ...updateField, [event.target.name]: event.target.value });
    };

    const readNewValue = () => {
        const validationErrors = validateForm(updateField);
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken"),
                "key": sessionStorage.getItem("studentkey")
            }
        };

        if (Object.keys(validationErrors).length === 0) {
            axios.post(APIurl, updateField, axiosConfig).then(
                (Response) => {
                    if (Response.data.status === "success") {
                        alert("Password Changed Successfully");
                        navigate("/studentLogin");
                        sessionStorage.clear()
                    } else if (Response.data.status === "Validation failed" && Response.data.data.oldPassword) {
                        alert(Response.data.data.oldPassword);
                    } else if (Response.data.status === "Validation failed" && Response.data.data.newPassword) {
                        alert(Response.data.data.newPassword);
                    } else if (Response.data.status === "Old password and new password cannot be same.") {
                        alert(Response.data.status)
                    } else if (Response.data.status === "Unauthorized User!!") {
                        navigate("/studentLogin")
                        sessionStorage.clear()
                    } else {
                        alert(Response.data.status)
                    }

                });
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = (data) => {
        let errors = {};

        if (!data.oldPassword) {
            errors.oldPassword = 'Old password is required';
        }
        if (!data.newPassword.trim()) {
            errors.newPassword = 'New Password is required';
        } else if (data.newPassword.length < 8) {
            errors.newPassword = 'Password must be at least 8 characters';
        } else if (data.newPassword.length > 12) {
            errors.newPassword = 'Password should not exceed 12 characters';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,12}$/.test(data.newPassword)) {
            errors.newPassword = 'Password should include one uppercase letter, one lowercase letter, numbers and special characters';
        } else if (data.newPassword !== data.oldPassword) {
            errors.newPassword = 'Passwords do not match';
        }
        return errors;
    };
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
                                            {errors.oldPassword && <span style={{ color: 'red' }} className="error">{errors.oldPassword}</span>}
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">New Password :</label>
                                            <input onChange={updateHandler} type="password" className="form-control" name="newPassword" value={updateField.newPassword} />
                                            {errors.newPassword && <span style={{ color: 'red' }} className="error">{errors.newPassword}</span>}
                                        </div>
                                        <br></br>
                                        <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                            <Link onClick={readNewValue} className="btn btn-warning">Update</Link>
                                        </div>
                                        <br></br>
                                        <div className="mb-3">
                                            <Link className="btn btn-danger" to="/studdashboard">Back</Link>
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

export default StudentChangePassword