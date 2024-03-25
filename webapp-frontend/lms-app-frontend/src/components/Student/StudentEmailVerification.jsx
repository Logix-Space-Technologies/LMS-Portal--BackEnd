import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const StudentEmailVerification = () => {
    let [inputField, setInputField] = useState({
        "studEmail": "",
        "password": "",
        "confirmpass": ""
    })

    const [errors, setErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/emailverifypwdchangestud"

    const inputHandler = (event) => {
        setErrors({}); // Clear previous errors
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        let newErrors = {};
        if (!inputField.password) {
            newErrors.password = "Password is required!";
        } else if (inputField.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (inputField.password.length > 12) {
            newErrors.password = 'Password should not exceed 12 characters';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,12}$/.test(inputField.password)) {
            newErrors.password = 'Password should include one uppercase letter, one lowercase letter, numbers and special characters';
        }
        if (!inputField.confirmpass) {
            newErrors.confirmpass = "Confirm Password is required!";
        }
        if (inputField.password !== inputField.confirmpass) {
            newErrors.confirmpass = "Password And Confirm Password does not match.";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        let data = {
            "studEmail": sessionStorage.getItem("studemail"),
            "password": inputField.password
        }

        axios.post(apiUrl, data).then(
            (Response) => {
                if (Response.data.status === "Password Changed Successfully!!!") {
                    alert("Email Verified And Password Updated.")
                    sessionStorage.clear()
                    navigate("/studentLogin")
                } else {
                    alert(Response.data.status)
                }
            }
        )

    }
    return (
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
                                            <h3 className="h2 text-black mb-0">Change Password</h3>
                                            <br></br>
                                        </div>
                                        <ul className="list-unstyled mb-1-9">
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Password :</label>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <input onChange={inputHandler} type={showPassword ? "text" : "password"} className="form-control" name="password" value={inputField.password} />
                                                    <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                                                        <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"} id="togglePassword"></i>
                                                    </span>
                                                </div>
                                                {errors.password && <span style={{ color: 'red' }} className="error">{errors.password}</span>}
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Confirm Password :</label>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <input onChange={inputHandler} type={showConfirmPassword ? "text" : "password"} className="form-control" name="confirmpass" value={inputField.confirmpass} />
                                                    <span className="input-group-text" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                        <i className={showConfirmPassword ? "bi bi-eye" : "bi bi-eye-slash"} id="toggleConfirmPassword"></i>
                                                    </span>
                                                </div>
                                                {errors.confirmpass && <span style={{ color: 'red' }} className="error">{errors.confirmpass}</span>}
                                            </div>
                                            <br></br>
                                            <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                <Link onClick={readValue} className="btn btn-warning">Update</Link>
                                            </div>
                                            <br></br>
                                            <div className="mb-3">
                                                <Link className="btn btn-danger" to="/studentLogin">Back</Link>
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
    )
}

export default StudentEmailVerification