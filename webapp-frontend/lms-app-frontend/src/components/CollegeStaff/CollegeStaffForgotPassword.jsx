import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CollegeStaffForgotPassword = () => {
    const [updateField, setUpdateField] = useState({
        "Email": sessionStorage.getItem("clgstaffemail"),
        "Password": "",
        "ConfirmPassword": ""
    })

    const [errors, setErrors] = useState({})

    const [showPassword, setShowPassword] = useState(false);
    const [showWaitingModal, setShowWaitingModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const apiurl = global.config.urls.api.server + "/api/lms/clgstaffforgotpassword";

    const navigate = useNavigate();

    const updateHandler = (event) => {
        setErrors({})
        setUpdateField({ ...updateField, [event.target.name]: event.target.value });
    }

    const backFunc = () => {
        sessionStorage.clear()
        setUpdateField({
            "Email": "",
            "Password": "",
            "ConfirmPassword": ""
        })
        setTimeout(() => {
            navigate("/clgStafflogin");
        }, 500)
    }


    const readNewValue = () => {
        const validationErrors = validateForm(updateField);
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*"
            }
        };
        let data = {
            "email": updateField.Email,
            "password": updateField.Password
        }
        setShowWaitingModal(true)
        setShowOverlay(true)
        if (Object.keys(validationErrors).length === 0) {
            axios.post(apiurl, data, axiosConfig).then(
                (response) => {
                    if (response.data.status === "success") {
                        setShowWaitingModal(false)
                        setShowOverlay(false)
                        setTimeout(() => {
                            alert("Password Changed Successfully\nKindly Login.");
                            navigate("/clgStafflogin");
                            setUpdateField({
                                "Email": "",
                                "Password": "",
                                "ConfirmPassword": ""
                            })
                            sessionStorage.clear()
                        }, 1000)
                    } else if (response.data.status === "Validation failed" && response.data.data.Email) {
                        alert(response.data.data.Email);
                    } else if (response.data.status === "Validation failed" && response.data.data.Password) {
                        alert(response.data.data.Password);
                    } else {
                        setShowWaitingModal(false)
                        setShowOverlay(false)
                        setTimeout(() => {
                            alert(response.data.status)
                        }, 1000)
                    }

                }
            )
        } else {
            setShowWaitingModal(false)
            setShowOverlay(false)
            setErrors(validationErrors);
        }
    }

    const validateForm = (data) => {
        let errors = {};

        if (!data.ConfirmPassword) {
            errors.ConfirmPassword = 'Confirm Password is required';
        }
        if (!data.Password.trim()) {
            errors.Password = 'Password is required';
        } else if (data.Password.length < 8) {
            errors.Password = 'Password must be at least 8 characters';
        } else if (data.Password.length > 12) {
            errors.Password = 'Password should not exceed 12 characters';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,12}$/.test(data.Password)) {
            errors.Password = 'Password should include one uppercase letter, one lowercase letter, numbers and special characters';
        } else if (data.Password !== data.ConfirmPassword) {
            errors.ConfirmPassword = 'Password And Confirm Password Does Not Match';
        }
        return errors;
    };
    return (
        <div>
            <div>
                <div>
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
                                                    <h3 className="h2 text-black mb-0">Reset Password</h3>
                                                    <br></br>
                                                </div>
                                                <ul className="list-unstyled mb-1-9">
                                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <label htmlFor="" className="form-label">Password :</label>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <input onChange={updateHandler} type={showPassword ? "text" : "password"} className="form-control" name="Password" value={updateField.Password} />
                                                            <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                                                                <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"} id="togglePassword"></i>
                                                            </span>
                                                        </div>
                                                        {errors.Password && <span style={{ color: 'red' }} className="error">{errors.Password}</span>}
                                                    </div>
                                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                        <label htmlFor="" className="form-label">Confirm Password :</label>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <input onChange={updateHandler} type={showConfirmPassword ? "text" : "password"} className="form-control" name="ConfirmPassword" value={updateField.ConfirmPassword} />
                                                            <span className="input-group-text" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                                <i className={showConfirmPassword ? "bi bi-eye" : "bi bi-eye-slash"} id="toggleConfirmPassword"></i>
                                                            </span>
                                                        </div>
                                                        {errors.ConfirmPassword && <span style={{ color: 'red' }} className="error">{errors.ConfirmPassword}</span>}
                                                    </div>
                                                    <br></br>
                                                    <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                        <button onClick={readNewValue} className="btn btn-warning">Update</button>
                                                    </div>
                                                    <br></br>
                                                    <div className="mb-3">
                                                        <button className="btn btn-danger" onClick={() => backFunc()}>Back</button>
                                                    </div>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
                {showWaitingModal && (
                    <div className="modal show d-block" tabIndex={-1}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
                                </div>
                                <div className="modal-body">
                                    <>
                                        <div className="mb-3">
                                            <p>Processing Request. Do Not Refresh.</p>
                                        </div>
                                    </>
                                </div>
                                <div className="modal-footer">
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showOverlay && (
                    <div
                        className="modal-backdrop fade show"
                        onClick={() => {
                            setShowWaitingModal(false);
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
        </div>
    )
}

export default CollegeStaffForgotPassword