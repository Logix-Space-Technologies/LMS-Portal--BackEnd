import axios from 'axios';
import React, { useState } from 'react';
import '../../config/config'
import { Link, useNavigate } from 'react-router-dom';

const StudentLogin = () => {
    const [inputField, setInputField] = useState({
        studEmail: "",
        password: "",
        type: 'web'
    });

    const [updateField, setUpdateField] = useState({
        otp: ""
    })

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay

    const apiUrl = global.config.urls.api.server + "/api/lms/studentLogin"
    const apiUrl2 = global.config.urls.api.server + "/api/lms/studemailverifyotpsend"
    const apiUrl3 = global.config.urls.api.server + "/api/lms/studemailverificationotpverify"
    const navigate = useNavigate()

    const inputHandler = (event) => {
        setErrors({}); // Clear previous errors
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const updateHandler = (event) => {
        setErrors({}); // Clear previous errors
        setUpdateField({ ...updateField, [event.target.name]: event.target.value });
    };

    // Function to close both modal and overlay
    const closeModal = () => {
        setShowModal(false);
        setShowOverlay(false);
        setErrors({})
        setInputField({
            otp: ""
        });
    };

    const readValue = () => {
        let newErrors = {};
        if (!inputField.studEmail.trim()) {
            newErrors.studEmail = "Email is required!";
        }
        if (!inputField.password.trim()) {
            newErrors.password = "Password is required!";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        axios.post(apiUrl, inputField).then(
            (Response) => {
                if (Response.data.status === "Success" && Response.data.data.refundReqStatus !== "Refund Request Active") {
                    let studtoken = Response.data.token;
                    let studId = Response.data.data.id;
                    let studemail = Response.data.data.studEmail;
                    let batchId = Response.data.data.batchId;
                    let key = "lmsappstud"
                    sessionStorage.setItem("studentkey", key);
                    sessionStorage.setItem("studentId", studId);
                    sessionStorage.setItem("studemail", studemail);
                    sessionStorage.setItem("studBatchId", batchId);
                    sessionStorage.setItem("studLoginToken", studtoken);


                    navigate("/studdashboard")


                } else if (Response.data.status === "Success" && Response.data.data.refundReqStatus === "Refund Request Active") {
                    let studtoken = Response.data.token;
                    let studId = Response.data.data.id;
                    let studemail = Response.data.data.studEmail;
                    let batchId = Response.data.data.batchId;
                    let refundreqstatus = Response.data.data.refundReqStatus;
                    let key = "lmsappstud"
                    sessionStorage.setItem("studentkey", key);
                    sessionStorage.setItem("studentId", studId);
                    sessionStorage.setItem("studemail", studemail);
                    sessionStorage.setItem("studBatchId", batchId);
                    sessionStorage.setItem("studLoginToken", studtoken);
                    sessionStorage.setItem("refundreqstatus", refundreqstatus);

                    navigate("/studViewRefundReq")
                } else if (Response.data.status === "Email Not Verified" && inputField.password === "0") {
                    let data = { "studEmail": inputField.studEmail }
                    axios.post(apiUrl2, data).then(
                        (Response) => {
                            if (Response.data.status === "OTP sent to email.") {
                                alert("Please Change Your Password.\nOTP Send To Email For Verification!!")
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
                } else if (Response.data.status === "Account expired. Please Renew Your Plan") {
                    alert("Account expired. Please Renew Your Plan")
                    let studemail = inputField.studEmail
                    sessionStorage.setItem("studemail", studemail);
                    navigate("/studValidityRenewal")
                } else {
                    if (Response.data.status === "Validation failed" && Response.data.data.email) {
                        alert(Response.data.data.email)
                    } else {
                        if (Response.data.status === "Validation failed" && Response.data.data.password) {
                            alert(Response.data.data.password)
                        } else {
                            if (Response.data.status === "Student does not Exist.") {
                                alert(Response.data.status)
                            } else {
                                alert(Response.data.status)
                            }
                        }

                    }
                }
            }
        );
    };

    const otpVerify = () => {
        let newErrors = {};
        if (!inputField.studEmail) {
            newErrors.otp = "Email is required!";
        }
        if (!updateField.otp) {
            newErrors.otp = "OTP is required!";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        let data = { "studEmail": inputField.studEmail, "otp": updateField.otp }
        axios.post(apiUrl3, data).then(
            (response) => {
                if (response.data.status === "OTP Verified Successfully!!!") {
                    let studemail = inputField.studEmail
                    sessionStorage.setItem("studemail", studemail);
                    navigate("/studEmailVerification")
                    setShowModal(false)
                    setShowOverlay(false); // Close the overlay
                } else {
                    alert(response.data.status)
                    setShowModal(true)
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
                            <h2>Student Login</h2>
                        </div>
                        <div className="card-body ">
                            <form>
                                <div className="mb-3 text-start">
                                    <label htmlFor="studEmail" className="form-label">Email</label>
                                    <input
                                        type="text"
                                        name="studEmail"
                                        value={inputField.studEmail}
                                        onChange={inputHandler}
                                        className="form-control"
                                    />
                                    {errors.studEmail && <span style={{ color: 'red' }} className="error">{errors.studEmail}</span>}
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={inputField.password}
                                        onChange={inputHandler}
                                        className="form-control"
                                    />
                                    {errors.password && <span style={{ color: 'red' }} className="error">{errors.password}</span>}
                                </div>
                            </form>
                            <div className="mb-3">
                                <button type="button" onClick={readValue} className="btn btn-success btn-lg">Login</button>
                            </div>
                            <div className="mb-3">
                                <p className="lead ">Don't have an account? <Link to="/studentregistration">Register here</Link></p>
                            </div>
                            <div className="mb-3">
                                <Link to='/'>Admin Login</Link>
                            </div>
                            <div className="mb-3">
                                <Link to='/admstafflogin'>Admin Staff Login</Link>
                            </div>
                            <div className="mb-3">
                                <Link to='/clgStafflogin'>College Staff Login</Link>
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
    );
};

export default StudentLogin;