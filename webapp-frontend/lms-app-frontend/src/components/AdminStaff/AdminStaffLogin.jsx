import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../config/config'

const AdminStaffLogin = () => {

    const [inputField, setInputField] = useState(
        {
            "Email": "",
            "Password": ""
        }
    )

    const [updateField, setUpdateField] = useState({
        Email: "",
        otp: ""
    })

    const [state, setState] = useState(false)

    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showWaitingModal, setShowWaitingModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay

    const [errors, setErrors] = useState({});

    const apiUrl = global.config.urls.api.server + "/api/lms/AdminStaffLogin"
    const apiUrl2 = global.config.urls.api.server + "/api/lms/emailverificationotpadmstaff"
    const apiUrl3 = global.config.urls.api.server + "/api/lms/emailverificationotpverify"
    const apiUrl4 = global.config.urls.api.server + "/api/lms/admstaffotpsend"
    const apiUrl5 = global.config.urls.api.server + "/api/lms/admstaffotpverification"

    const navigate = useNavigate()

    const inputHandler = (event) => {
        setErrors({}); // Clear previous errors
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const updateHandler = (event) => {
        setErrors({}); // Clear previous errors
        setUpdateField({ ...updateField, [event.target.name]: event.target.value });
    };

    // Function to close both modal and overlay
    const closeModal = () => {
        setShowModal(false);
        setShowOverlay(false);
        setErrors({})
        setUpdateField({
            otp: ""
        });
    };

    //Function To Close Forgot Password Modal And Overlay
    const closeWaitingModel = () => {
        setShowWaitingModal(false)
        setShowOverlay(false)
        setErrors({})
        setUpdateField({
            Email: "",
            otp: ""
        });
    }

    const forgotPassword = () => {
        setShowWaitingModal(true)
        setShowOverlay(true)
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
                    sessionStorage.setItem("admstaffId", admstaffId)
                    sessionStorage.setItem("admstaffLogintoken", admstafftoken)
                    sessionStorage.setItem("Email", Email)
                    sessionStorage.setItem("admstaffkey", admstaffkey)
                    sessionStorage.setItem("AdStaffName", AdStaffName)
                    navigate("/admstaffdashboard")
                } else if (Response.data.status === "Email Not Verified") {
                    let data = { "Email": inputField.Email }
                    axios.post(apiUrl2, data).then(
                        (Response) => {
                            if (Response.data.status === "OTP sent to email.") {
                                setShowModal(true)
                                setShowOverlay(true);
                            } else if (Response.data.status.sqlMessage) {
                                alert(Response.data.status.sqlMessage)
                                setShowModal(false)
                                setShowOverlay(false);
                            } else {
                                alert(Response.data.status)
                                setShowModal(false)
                                setShowOverlay(false);
                            }
                        }
                    )
                } else if (Response.data.status === "Validation failed" && Response.data.data.email) {
                    alert(Response.data.data.email)
                } else if (Response.data.status === "Validation failed" && Response.data.data.password) {
                    alert(Response.data.data.password)
                } else {
                    alert(Response.data.status)
                }
            }
        )
    }

    const otpVerify = () => {
        let newErrors = {};
        if (!inputField.Email) {
            newErrors.otp = "Email is required!";
        }
        if (!updateField.otp) {
            newErrors.otp = "OTP is required!";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        let data = { "Email": inputField.Email, "otp": updateField.otp }
        axios.post(apiUrl3, data).then(
            (response) => {
                if (response.data.status === "OTP verified successfully") {
                    setShowModal(false)
                    setShowOverlay(false); // Close the overlay
                    alert("Email Verified Successfully !!!\nPlease Login Again.")
                    setUpdateField({
                        Email: "",
                        otp: ""
                    });
                } else {
                    alert(response.data.status)
                    setShowModal(true)
                    setShowOverlay(true);
                }
            }
        )
    }

    const otpForgotPasswordSend = () => {
        let newErrors = {};
        if (!updateField.Email) {
            newErrors.forgotPassEmail = "Email is required!";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        let data = { "Email": updateField.Email }
        axios.post(apiUrl4, data).then(
            (response) => {
                if (response.data.status === "OTP sent to email.") {
                    setShowWaitingModal(true)
                    setShowOverlay(true);
                    setState(true)
                } else {
                    alert(response.data.status)
                    setShowModal(true)
                    setShowOverlay(true);
                }
            }
        )
    }

    const otpForgotPasswordVerify = () => {
        let newErrors = {};
        if (!updateField.Email) {
            newErrors.forgotpassotp = "Email is required!";
        }
        if (!updateField.otp) {
            newErrors.forgotpassotp = "OTP is required!";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        let data = { "Email": updateField.Email, "otp": updateField.otp }
        axios.post(apiUrl5, data).then(
            (response) => {
                if (response.data.status === "OTP verified successfully") {
                    setShowWaitingModal(false)
                    setShowOverlay(false); // Close the overlay
                    setState(false)
                    navigate("/adminstaffforgotpassword")
                    sessionStorage.setItem("admstaffemail", updateField.Email)
                    setUpdateField({
                        Email: "",
                        otp: ""
                    });
                    alert("OTP Verified Successfully !!!")
                } else {
                    alert(response.data.status)
                    setShowWaitingModal(false)
                    setShowOverlay(true);
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
                                <div style={{ display: 'flex', alignItems: 'right', justifyContent: 'flex-start' }}>
                                    <label for="" class="form-label" style={{ marginRight: '740px' }}>Password</label>
                                    <Link onClick={forgotPassword} style={{ textDecoration: 'underline', color: 'blue' }}>Forgot Password?</Link>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type={showPassword ? "text" : "password"} name="Password" value={inputField.Password} onChange={inputHandler} className="form-control" />
                                    <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                                        <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"} id="togglePassword"></i>
                                    </span>
                                </div>
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
            {showModal && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Verify Email</h1>
                                <button type="button" className="btn-close" onClick={closeModal} />
                            </div>
                            <div className="modal-body">
                                <p style={{ fontSize: "15px" }}>Your Email Is Not Verified. Enter OTP Send To Email For Verification.</p><br />
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">OTP:</label>
                                        <input type="text" name="otp" className="form-control" value={updateField.otp} onChange={updateHandler} />
                                        {errors.otp && <span style={{ color: 'red' }} className="error">{errors.otp}</span>}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                <button type="button" onClick={() => otpVerify()} className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showWaitingModal && (
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
                                            <label htmlFor="recipient-name" className="col-form-label">Email:</label>
                                            <input type="text" name="Email" className="form-control" value={updateField.Email} onChange={updateHandler} />
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

export default AdminStaffLogin