import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../config/config'

const AdminLogin = () => {

    const [inputField, setInputField] = useState(
        {
            "userName": "",
            "Password": ""
        }
    )

    const [updateField, setUpdateField] = useState(
        {
            "userName": "",
            "otp": ""
        }
    )

    const [state, setState] = useState(false)

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay

    const apiUrl = global.config.urls.api.server + "/api/lms/"
    const apiUrl4 = global.config.urls.api.server + "/api/lms/adminForgotPasswordOTPSend"
    const apiUrl5 = global.config.urls.api.server + "/api/lms/adminForgotPasswordVerifyOTP"
    const navigate = useNavigate()

    const inputHandler = (event) => {
        setErrors({}); // Clear previous errors
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const updateHandler = (event) => {
        setErrors({}); // Clear previous errors
        setUpdateField({ ...updateField, [event.target.name]: event.target.value })
    }

    //Function To Close Forgot Password Modal And Overlay
    const closeWaitingModel = () => {
        setShowModal(false)
        setShowOverlay(false)
        setState(false)
        setErrors({})
        setUpdateField({
            "userName": "",
            "otp": ""
        });
    }

    const forgotPassword = () => {
        setShowModal(true)
        setShowOverlay(true)
    }


    const readValue = () => {
        let newErrors = {};
        if (!inputField.userName.trim()) {
            newErrors.userName = "Username is required!";
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
                    let admtoken = Response.data.token
                    let admkey = "lmsapp"
                    let userName = Response.data.data.userName;
                    let adminId = 0
                    sessionStorage.setItem("adminId", adminId)
                    sessionStorage.setItem("admkey", admkey)
                    sessionStorage.setItem("admtoken", admtoken)
                    sessionStorage.setItem("userName", userName)
                    navigate("/admdashboard")
                }
                else {
                    if (Response.data.status === "Validation failed" && Response.data.data.username) {
                        alert(Response.data.data.username)
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

    const otpForgotPasswordSend = () => {
        let newErrors = {};
        if (!updateField.userName) {
            newErrors.forgotPassEmail = "Email is required!";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        let data = { "userName": updateField.userName }
        axios.post(apiUrl4, data).then(
            (response) => {
                if (response.data.status === "OTP sent to email.") {
                    setShowModal(true)
                    setShowOverlay(true);
                    setState(true)
                } else {
                    alert(response.data.status)
                    setUpdateField({ "userName": "" })
                    setShowModal(true)
                    setShowOverlay(true);
                }
            }
        )
    }

    const otpForgotPasswordVerify = () => {
        let newErrors = {};
        if (!updateField.userName) {
            newErrors.forgotpassotp = "Email is required!";
        }
        if (!updateField.otp) {
            newErrors.forgotpassotp = "OTP is required!";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        let data = { "userName": updateField.userName, "otp": updateField.otp }
        axios.post(apiUrl5, data).then(
            (response) => {
                if (response.data.status === "OTP verified successfully") {
                    setShowModal(false)
                    setShowOverlay(false); // Close the overlay
                    setState(false)
                    navigate("/adminForgotPassword")
                    sessionStorage.setItem("adminEmail", updateField.userName)
                    setUpdateField({
                        "userName": "",
                        "otp": ""
                    });
                } else {
                    alert(response.data.status)
                    setShowModal(true)
                    setShowOverlay(true);
                }
            }
        )
    }

    return (
        <div class="container">
            <div class="row justify-content-center align-items-center min-vh-100">
                <div class="col col-12 col-sm-8 col-md-12 col-lg-8">
                    <div class="text-center mb-4">
                        <img src="https://www.linkurcodes.com/images/logo.png" alt="Company Logo" class="img-fluid" />
                    </div>
                    <br></br>
                    <div class="card text-center shadow p-3 mb-5 bg-white rounded">
                        <div class="card-header bg-info-subtle mb-3">
                            <h2>Admin Login</h2>
                        </div>
                        <div class="card-body ">
                            <form>
                                <div class="mb-3 text-start">
                                    <label for="" class="form-label">Username</label>
                                    <input type="text" name="userName" value={inputField.userName} onChange={inputHandler} class="form-control" />
                                    {errors.userName && <span style={{ color: 'red' }} className="error">{errors.userName}</span>}
                                </div>
                                <div class="mb-3 text-start">
                                    <div style={{ display: 'flex', alignItems: 'right', justifyContent: 'flex-start' }}>
                                        <label for="" class="form-label" style={{ marginRight: '740px' }}>Password</label>
                                        <Link onClick={forgotPassword} style={{ textDecoration: 'underline', color: 'blue' }}>Forgot Password?</Link>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input type={showPassword ? "text" : "password"} name="Password" value={inputField.Password} onChange={inputHandler} class="form-control" />
                                        <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                                            <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"} id="togglePassword"></i>
                                        </span>
                                    </div>
                                    {errors.Password && <span style={{ color: 'red' }} className="error">{errors.Password}</span>}
                                </div>
                            </form>
                            <div class="mb-3">
                                <button type="button" onClick={readValue} class="btn btn-success btn-lg">Login</button>
                            </div><br />
                            <div>
                                <Link to='/admstafflogin'>Admin Staff Login</Link>
                            </div>
                            <div>
                                <Link to='/clgStafflogin'>College Staff Login</Link>
                            </div>
                            <div>
                                <Link to='/studentLogin'>Student Login</Link>
                            </div>
                        </div>

                        <div class="card-footer text-muted">
                            &copy; 2024 Link Ur Codes. All rights reserved.
                        </div>

                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Reset Password</h1>
                                <button type="button" className="btn-close" onClick={closeWaitingModel} />
                            </div>
                            <div className="modal-body">
                                {state === true && (
                                    <div>
                                        <p style={{ fontSize: "15px" }}>Enter OTP Send To Email For Verification.</p><br />
                                    </div>
                                )}
                                <form>
                                    {state === false && (
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">Username:</label>
                                            <input type="text" name="userName" className="form-control" value={updateField.userName} onChange={updateHandler} />
                                            {errors.forgotPassEmail && <span style={{ color: 'red' }} className="error">{errors.forgotPassEmail}</span>}
                                        </div>
                                    )}
                                    {state === true && (
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">OTP:</label>
                                            <input type="text" name="otp" className="form-control" value={updateField.otp} onChange={updateHandler} />
                                            {errors.otp && <span style={{ color: 'red' }} className="error">{errors.otp}</span>}
                                        </div>
                                    )}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeWaitingModel}>Close</button>
                                {state === false && (
                                    <button type="button" onClick={() => otpForgotPasswordSend()} className="btn btn-primary">Submit</button>
                                )}
                                {state === true && (
                                    <button type="button" onClick={() => otpForgotPasswordVerify()} className="btn btn-primary">Submit</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showOverlay && (
                <div
                    className="modal-backdrop fade show"
                    onClick={() => {
                        setShowModal(false);
                        setShowOverlay(false);
                    }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 1040, // Ensure this is below your modal's z-index
                    }}
                ></div>
            )}
        </div>
    )
}

export default AdminLogin