import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../config/config'

const StudentLogin = () => {
    const [inputField, setInputField] = useState({
        studEmail: "",
        password: ""
    });

    const apiUrl = global.config.urls.api.server + "/api/lms/studentLogin"
    // const navigate = useNavigate();

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        axios.post(apiUrl, inputField).then(
            (Response) => {
                if (Response.data.status === "success") {
                    let studtoken = Response.data.token;
                    sessionStorage.setItem("studLoginToken", studtoken);
                    alert(Response.data.status);
                    // You may navigate to the student dashboard or another page here
                    // Example: navigate('/student-dashboard');
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
                                </div>
                            </form>
                            <div className="mb-3">
                                <button type="button" onClick={readValue} className="btn btn-success btn-lg">Login</button>
                            </div>
                            <div className="mb-3">
                                <p className="lead ">Don't have an account? <a href="/register">Register here</a></p>
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

export default StudentLogin;