import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../config/config'

const AdminStaffLogin = () => {
    const [inputField, setInputField] = useState(
        { Email: "", Password: "" }
    )

    const [errors, setErrors] = useState({});

    const apiUrl = global.config.urls.api.server + "/api/lms/AdminStaffLogin"
    const navigate=useNavigate()

    const inputHandler = (event) => {
        setErrors({}); // Clear previous errors
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        let newErrors = {};
        if (!inputField.Email.trim()) {
            newErrors.Email = "Email is required!";
        }
        if (!inputField.Password.trim()) {
            newErrors.Password = "Password is required!";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        axios.post(apiUrl, inputField).then(
            (Response) => {
                if (Response.data.status === "Success") {
                    let admstafftoken = Response.data.token
                    let admstaffkey = "lmsappadmstaff"
                    let Email = Response.data.data.Email;
                    let admstaffId = Response.data.data.id
                    let AdStaffName = Response.data.data.AdStaffName
                    sessionStorage.setItem("admstaffId",admstaffId)
                    sessionStorage.setItem("admstaffLogintoken", admstafftoken)
                    sessionStorage.setItem("Email", Email)
                    sessionStorage.setItem("admstaffkey", admstaffkey)
                    sessionStorage.setItem("AdStaffName", AdStaffName)
                    navigate("/admstaffdashboard")
                } else {
                    if (Response.data.status === "Validation failed" && Response.data.data.email) {
                        alert(Response.data.data.email)
                    } else {
                        if (Response.data.status === "Validation failed" && Response.data.data.password) {
                            alert(Response.data.data.password)
                        } else {
                            alert(Response.data.status)
                        }
                    }
                }
            }
        )

    }
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
                            <h2>Admin Staff Login</h2>
                        </div>
                        <div className="card-body ">
                                <div className="mb-3 text-start">
                                    <label htmlFor="" className="form-label">Email</label>
                                    <input type="text" name="Email" value={inputField.Email} onChange={inputHandler} className="form-control" />
                                    {errors.Email && <span style={{ color: 'red' }} className="error">{errors.Email}</span>}
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="" className="form-label">Password</label>
                                    <input type="password" name="Password" value={inputField.Password} onChange={inputHandler} className="form-control" />
                                    {errors.Password && <span style={{ color: 'red' }} className="error">{errors.Password}</span>}
                                </div>
                            <div className="mb-3">
                                <button type="button" onClick={readValue} className="btn btn-success btn-lg">Login</button>
                            </div>
                            <div>
                                <Link to='/clgStafflogin'>College Staff Login</Link>
                            </div>
                            <div>
                                <Link to='/'>Admin Login</Link>
                            </div>
                            <div>
                                <Link to='/studentLogin'>Student Login</Link>
                            </div>
                        </div>

                        <div className="card-footer text-muted">
                            &copy; 2024 Link Ur Codes. All rights reserved.
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminStaffLogin