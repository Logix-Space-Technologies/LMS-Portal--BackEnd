import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../config/config';

const CollegeStaffLogin = () => {
    const [inputField, setInputField] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const apiUrl = global.config.urls.api.server + "/api/lms/clgStaffLogin";
    const navigate = useNavigate();

    const inputHandler = (event) => {
        setErrors({}); // Clear previous errors
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        let newErrors = {};
        if (!inputField.email.trim()) {
            newErrors.email = "Email is required!";
        }
        if (!inputField.password.trim()) {
            newErrors.password = "Password is required!";
        } 
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        axios.post(apiUrl, inputField).then(
            (response) => {
                if (response.data.status === "Success") {

                    let clgstafftoken = response.data.token;
                    let clgStaffId = response.data.data.id;
                    let clgStaffCollegeId = response.data.data.collegeId;
                    let clgStaffEmail = response.data.data.email;
                    let clgstaffkey = "lmsappclgstaff";
                    sessionStorage.setItem("clgstaffLogintoken", clgstafftoken);
                    sessionStorage.setItem("clgStaffEmail", clgStaffEmail);
                    sessionStorage.setItem("clgStaffId", clgStaffId);
                    sessionStorage.setItem("clgstaffkey", clgstaffkey);
                    sessionStorage.setItem("clgStaffCollegeId", clgStaffCollegeId)
                    navigate("/collegeStaffViewBatch")

                } else {
                    if (response.data.status === "Validation failed" && response.data.data.email) {
                        alert(response.data.data.email);
                    } else {
                        if (response.data.status === "Validation failed" && response.data.data.password) {
                            alert(response.data.data.password);
                        } else {
                            alert(response.data.status);
                        }
                    }
                }
            }
        );
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col col-12 col-sm-8 col-md-12 col-lg-8">
                    <div className="text-center mb-4">
                        <img src="https://www.linkurcodes.com/images/logo.png" alt="Company Logo" className="img-fluid" />
                    </div>
                    <br></br>
                    <div className="card text-center shadow p-3 mb-5 bg-white rounded">
                        <div className="card-header bg-info-subtle mb-3">
                            <h2>College-Staff Login</h2>
                        </div>
                        <div className="card-body ">
                            <form>
                                <div className="mb-3 text-start">
                                    <label htmlFor="" className="form-label">Email</label>
                                    <input type="text" name="email" value={inputField.email} onChange={inputHandler} className="form-control" />
                                    {errors.email && <span style={{ color: 'red' }} className="error">{errors.email}</span>}
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="" className="form-label">Password</label>
                                    <input type="password" name="password" value={inputField.password} onChange={inputHandler} className="form-control" />
                                    {errors.password && <span style={{ color: 'red' }} className="error">{errors.password}</span>}
                                </div>
                            </form>
                            <div className="mb-3">
                                <button type="button" onClick={readValue} className="btn btn-success btn-lg">Login</button>
                            </div>
                            <div>
                                <Link to='/studentLogin'>Student Login</Link>
                            </div>
                            <div>
                                <Link to='/admstafflogin'>Admin Staff Login</Link>
                            </div>
                            <div>
                                <Link to='/'>Admin Login</Link>
                            </div>
                        </div>
                        <div className="card-footer text-muted">
                            &copy; 2024 Link Ur Codes. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegeStaffLogin;
