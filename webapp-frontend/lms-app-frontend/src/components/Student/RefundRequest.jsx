import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../../config/config'
import { Link, useNavigate } from 'react-router-dom';

const RefundRequestForm = () => {
    const [inputField, setInputField] = useState({
        studId: "",
        reason: "",
        accountNo: null,
        IFSCCode: null,
        bankName: null,
        branchName: null,
        upiId: null
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate()

    const [showWaitingModal, setShowWaitingModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay

    const apiUrl = global.config.urls.api.server + "/api/lms/refundRequest";
    useEffect(() => {
        const studentIdFromSession = sessionStorage.getItem("studentId");
        if (studentIdFromSession) {
            setInputField({ ...inputField, studId: studentIdFromSession });
        }
    }, []);

    const closeWaitingModal = () => {
        setShowOverlay(false)
        setShowWaitingModal(false)
    }

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
                accountNo: inputField.accountNo,
                IFSCCode: inputField.IFSCCode,
                bankName: inputField.bankName,
                branchName: inputField.branchName,
                upiId: inputField.upiId
            };
            setShowWaitingModal(true)
            setShowOverlay(true)
            axios.post(apiUrl, data, axiosConfig).then(
                (response) => {
                    if (response.data.status === 'success') {
                        closeWaitingModal()
                        setInputField((prevInputField) => ({
                            ...prevInputField,
                            reason: "",
                        }));
                        setTimeout(() => {
                            alert('Refund request successfully sent');
                            navigate("/studentLogin")
                            sessionStorage.clear()
                        }, 500)
                    } else {
                        closeWaitingModal()
                        setInputField((prevInputField) => ({
                            ...prevInputField,
                            reason: "",
                        }));
                        if (response.data.status === "Unauthorized User!!") {
                            setTimeout(() => {
                                navigate("/studentLogin")
                                sessionStorage.clear()
                            }, 500)
                        } else if (response.data.status === "A refund request already exists for the student.") {
                            setTimeout(() => { alert("A refund request already exists for the student.") }, 500)
                        } else if (response.data.status === "No payment history found for the student.") {
                            setTimeout(() => { alert("No payment history found for the student.") }, 500)
                        } else if ("A refund request was recently cancelled. Please wait for one week before creating a new request.") {
                            setTimeout(() => {
                                alert("A refund request was recently cancelled. Please wait for one week before creating a new request.")
                                navigate(-1)
                            }, 500)
                        } else if (response.data.status === "Failed to create refund request.") {
                            setTimeout(() => { alert("Failed to create refund request.") }, 500)
                        }

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
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="flex-grow text-center">
                                                    <h1>Refund Request</h1>
                                                </div>
                                                <div>
                                                    <Link className="btn btn-danger" to="/studdashboard">Back</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row gy-3 gy-md-4 overflow-hidden">
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="reason" className="form-label">Reason<span className="text-danger">*</span></label>
                                        <textarea name="reason" onChange={handleChange} value={inputField.reason} id="reason" cols="30" rows="10" className="form-control"></textarea>
                                        {errors.reason && <div className="text-danger">{errors.reason}</div>}
                                    </div>
                                    <h1>Bank Details (Provide Bank Details OR UPI ID)</h1>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="accountNo" className="form-label">Account No.</label>
                                        <input onChange={handleChange} type="text" class="form-control" name="accountNo" value={inputField.accountNo} id="accountNo" />
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="IFSCCode" className="form-label">IFSC Code</label>
                                        <input onChange={handleChange} type="text" class="form-control" name="IFSCCode" value={inputField.IFSCCode} id="IFSCCode" />
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="bankName" className="form-label">Bank Name</label>
                                        <input onChange={handleChange} type="text" class="form-control" name="bankName" value={inputField.bankName} id="bankName" />
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="branchName" className="form-label">Branch</label>
                                        <input onChange={handleChange} type="text" class="form-control" name="branchName" value={inputField.branchName} id="branchName" />
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="upiId" className="form-label">UPI ID</label>
                                        <input onChange={handleChange} type="text" class="form-control" name="upiId" value={inputField.upiId} id="upiId" />
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
    );
};

export default RefundRequestForm;
