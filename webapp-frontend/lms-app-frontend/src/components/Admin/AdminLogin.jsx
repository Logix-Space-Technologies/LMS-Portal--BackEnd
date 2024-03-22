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
            "username": "",
            "password": ""
        }
    )

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay

    const apiUrl = global.config.urls.api.server + "/api/lms/"
    const apiUrl2 = global.config.urls.api.server + "/api/lms/adminforgotpassword"
    const navigate = useNavigate()

    const inputHandler = (event) => {
        setErrors({}); // Clear previous errors
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const updateHandler = (event) => {
        setErrors({}); // Clear previous errors
        setUpdateField({ ...updateField, [event.target.name]: event.target.value })
    }

    const forgotPassword = () => {
        setShowModal(true)
        setShowOverlay(true)
    }

    const closeModal = () => {
        setErrors({})
        setShowModal(false);
        setShowOverlay(false)
        setUpdateField({
            "username": "",
            "password": ""
        });
    };

    const handleSubmit = () => {
        let newErrors = {};
        if (!updateField.username) {
            newErrors.username = "Username is required!";
        }
        if (!updateField.password) {
            newErrors.password = "Password is required!";
        } else if (updateField.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (updateField.password.length > 12) {
            newErrors.password = "Password should not exceed 12 characters";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,12}$/.test(updateField.password)) {
            newErrors.password = "Password should include one uppercase letter, one lowercase letter, numbers and special characters";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        let data = {
            "userName": updateField.username,
            "Password": updateField.password
        }

        axios.post(apiUrl2, data).then(
            (response) => {
                if (response.data.status === "success") {
                    closeModal()
                    alert("Password Reset Successful !!!\nPlease Login.")
                } else if (response.data.status === "Validation failed" && response.data.data.userName) {
                    alert(response.data.data.userName);
                    setShowModal(true)
                    setShowOverlay(true)
                } else if (response.data.status === "Validation failed" && response.data.data.newPassword) {
                    alert(response.data.data.newPassword);
                    setShowModal(true)
                    setShowOverlay(true)
                } else {
                    alert(response.data.status)
                }
            }
        )
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
                                <button type="button" className="btn-close" onClick={closeModal} />
                            </div>
                            <div className="modal-body">
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Username:</label>
                                        <input type="text" onChange={updateHandler} value={updateField.username} name="username" className="form-control" id="message-text" defaultValue={""} />
                                        {errors.username && <span style={{ color: 'red' }} className="error">{errors.username}</span>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Password:</label>
                                        <input type="password" onChange={updateHandler} value={updateField.password} name="password" className="form-control" id="message-text" defaultValue={""} />
                                        {errors.password && <span style={{ color: 'red' }} className="error">{errors.password}</span>}
                                    </div>
                                </>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
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