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
                                                <input onChange={inputHandler} type="password" className="form-control" name="password" value={inputField.password} />
                                                {errors.password && <span style={{ color: 'red' }} className="error">{errors.password}</span>}
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Confirm Password :</label>
                                                <input onChange={inputHandler} type="password" className="form-control" name="confirmpass" value={inputField.confirmpass} />
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