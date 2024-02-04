import axios from 'axios';
import React, { useState, useEffect } from 'react';
import StudNavBar from './StudNavBar';
import '../../config/config'
import { useNavigate } from 'react-router-dom';

const RefundRequestForm = () => {
    const [inputField, setInputField] = useState({
        studId: '',
        reason: '',
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/refundRequest";
    useEffect(() => {
        const studentIdFromSession = sessionStorage.getItem("studentId");
        if (studentIdFromSession) {
            setInputField({ ...inputField, studId: studentIdFromSession });
        }
    }, []);

    const handleChange = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const validationErrors = validateForm(inputField);
        if (Object.keys(validationErrors).length === 0) {
            let axiosConfig = {
                headers: {
                    "content-type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "token": sessionStorage.getItem("studLoginToken"),
                    "key": sessionStorage.getItem("studentkey")
                }
            };
            let data = {
                studId: inputField.studId,
                reason: inputField.reason,
            };
            axios.post(apiUrl, data, axiosConfig).then(
                (response) => {
                    if (response.data.status === 'success') {
                        alert('Refund request successfully created');
                        setInputField((prevInputField) => ({
                            ...prevInputField,
                            reason: "",
                        }));
                    } else {

                        if (response.data.status === "A refund request already exists for the student.") {
                            alert("A refund request already exists for the student.");
                        } else if (response.data.status === "No payment history found for the student.") {
                            alert("No payment history found for the student.");
                        } else if (response.data.status === "Failed to create refund request.") {
                            alert("Failed to create refund request.");
                        } else if (response.data.status === "Unauthorized User!!") {
                            navigate("/studentLogin")
                            sessionStorage.removeItem("studentkey");
                            sessionStorage.removeItem("studentId");
                            sessionStorage.removeItem("studemail");
                            sessionStorage.removeItem("studBatchId");
                            sessionStorage.removeItem("studLoginToken");
                        }
                        setInputField((prevInputField) => ({
                            ...prevInputField,
                            reason: "",
                        }));
                    }
                }).catch((error) => {
                    alert('An error occurred while processing your request.');
                    if (error.code === 'ECONNABORTED') {
                        alert('Request timed out');
                    } else if (error.code === 'ENOTFOUND') {
                        alert('API endpoint not found');
                    }
                });
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = (data) => {
        let errors = {};

        if (!data.reason.trim()) {
            errors.reason = 'Reason is required';
        }

        return errors;
    };

    return (
        <div>
            <StudNavBar />
            <div className="bg-light py-3 py-md-5">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
                            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="text-center mb-5">
                                            <a href="#!">
                                                <img src="https://www.linkurcodes.com/images/logo.png" alt="" width="175" height="57" />
                                            </a><br /><br />
                                            <h3>Refund request</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="row gy-3 gy-md-4 overflow-hidden">
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="studId" className="form-label">Student id<span className="text-danger">*</span></label>
                                        <input onChange={handleChange} type="text" className="form-control" name="studId" value={inputField.studId} id="studId" readOnly />
                                    </div>

                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="reason" className="form-label">Reason <span className="text-danger">*</span></label>
                                        <input onChange={handleChange} type="text" className="form-control" name="reason" value={inputField.reason} id="reason" />
                                        {errors.reason && <div className="text-danger">{errors.reason}</div>}
                                    </div>

                                    <div className="col-12">
                                        <div className="d-grid">
                                            <button onClick={handleSubmit} className="btn btn-primary btn-lg" type="submit">Submit</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <hr className="mt-5 mb-4 border-secondary-subtle" />
                                        <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center">
                                            &copy; 2024 Link Ur Codes. All rights reserved.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefundRequestForm;
