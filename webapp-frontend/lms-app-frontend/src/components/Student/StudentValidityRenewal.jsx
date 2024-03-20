import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../../config/config'

const StudentValidityRenewal = () => {

    const [inputField, setInputField] = useState([])

    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/studRenewalDataFetch";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/studValidityRenewal";

    const getData = () => {
        let data = { "studEmail": sessionStorage.getItem("studemail") }
        console.log(data)
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                console.log(response)
                if (response.data.data) {
                    setInputField(response.data.data)
                } else {
                    if (!response.data.data) {
                        alert("No Students Found!!")
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    const loadRazorpayScript = async () => {
        const script = document.createElement('script')
        script.src = "https://checkout.razorpay.com/v1/checkout.js"

        document.body.appendChild(script)

        script.onload = () => {
            //initialize razorpay
            const rzp = new window.Razorpay({
                key: 'rzp_test_ZqcybzHd1QkWg8',
                amount: inputField.batchAmount * 100,
                name: 'Logix Space Technologies Pvt Ltd',
                description: 'Link Ur Codes Payment',
                // image: <img src="https://www.linkurcodes.com/images/logo.png" alt="Company Logo" className="img-fluid" />,
                image: 'https://www.linkurcodes.com/images/logo.png',


                handler: function (response) {

                    const PaymentId = response.razorpay_payment_id


                    // Call Registration API and pass the details to the server
                    let data2 = {

                        "id": inputField.id,
                        "studEmail": inputField.studEmail,
                        "rpPaymentId": PaymentId,
                        "rpOrderId": orderId,
                        "rpAmount": inputField.batchAmount

                    };
                    let axiosConfig2 = {
                        headers: {
                            'content-type': 'application/json;charset=UTF-8',
                            "Access-Control-Allow-Origin": "*"
                        }
                    };
                    axios.post(apiUrl2, data2, axiosConfig2).then(
                        (response) => {
                            if (response.data.status === "success") {
                                alert("Validity Renewed Successfully !!!")
                                closeModal()
                            } else {
                                alert(response.data.status)
                            }
                        }
                    )
                }
            })
            function GFG_Fun() {
                return Math.random().toString(36).slice(2)
            }
            const orderId = GFG_Fun()
            rzp.open({
                order_id: orderId
            })
        }
    }

    const callRazorpay = () => {
        setShowModal(false)
        loadRazorpayScript()
    }

    const renewModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        sessionStorage.clear()
        navigate("/studentLogin")
    }

    const closeTab = () => {
        setShowModal(false)
    }

    useEffect(() => { getData() }, [])

    return (
        <div className="bg-light py-3 py-md-5">
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
                        <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                            <div className="row">
                                <div className="col-12">
                                    <div className="text-center mb-5">
                                        <Link to="#!">
                                            <img
                                                src="https://www.linkurcodes.com/images/logo.png"
                                                alt=""
                                                width="175"
                                                height="57" />
                                        </Link>
                                        <br />
                                        <br />
                                        <h3>Student Validity Renewal</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row gy-3 gy-md-4 overflow-hidden">
                                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label htmlFor="collegeName" className="form-label">
                                        College Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="collegeName"
                                        value={inputField.collegeName}
                                        id="collegeName" disabled />
                                </div>

                                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label htmlFor="batchName" className="form-label">
                                        Batch Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="batchName"
                                        value={inputField.batchName}
                                        id="batchName" disabled />
                                </div>
                                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label htmlFor="studName" className="form-label">
                                        Student Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="studName"
                                        value={inputField.studName}
                                        id="studName" disabled />
                                </div>
                                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label htmlFor="membership_no" className="form-label">
                                        Membership No. <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="membership_no"
                                        value={inputField.membership_no}
                                        id="membership_no" disabled />
                                </div>
                                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label htmlFor="admNo" className="form-label">
                                        Admission No <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="admNo"
                                        value={inputField.admNo}
                                        id="admNo" disabled />
                                </div>
                                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label htmlFor="rollNo" className="form-label">
                                        Roll No <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="rollNo"
                                        value={inputField.rollNo}
                                        id="rollNo" disabled />
                                </div>
                                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label htmlFor="studDept" className="form-label">
                                        Department <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="studDept"
                                        value={inputField.studDept}
                                        id="studDept" disabled />
                                </div>
                                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label htmlFor="course" className="form-label">
                                        Course <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="course"
                                        value={inputField.course}
                                        id="course" disabled />
                                </div>

                                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label htmlFor="studEmail" className="form-label">
                                        Email <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="studEmail"
                                        value={inputField.studEmail}
                                        id="studEmail" disabled />
                                </div>
                                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label htmlFor="studPhNo" className="form-label">
                                        Phone No <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required=""
                                        name="studPhNo"
                                        id="studPhNo"
                                        value={inputField.studPhNo}
                                        disabled />
                                </div>
                                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label htmlFor="studProfilePic" className="form-label">
                                        Profile Image <span className="text-danger">*</span>
                                    </label>
                                    <img src={inputField.studProfilePic} alt="Profile Pic" />
                                </div>
                                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label htmlFor="aadharNo" className="form-label">
                                        AadharNo <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="aadharNo"
                                        value={inputField.aadharNo}
                                        id="aadharNo" disabled />
                                </div>
                                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                    {inputField.batchAmount && (
                                        <button type="button" onClick={renewModal} className="btn btn-primary">Renew</button>
                                    )}
                                </div>
                            </div>
                            <div>
                                {showModal && (
                                    <div className="modal show d-block" tabIndex={-1}>
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Renew LinkUrCodes Validity</h1>
                                                    <button type="button" className="btn-close" onClick={closeTab} />
                                                </div>
                                                <div className="modal-body">
                                                    <form>
                                                        <div className="mb-3">
                                                            <label htmlFor="recipient-name" className="col-form-label">{inputField.studName}, Are you sure you want to Renew your LinkUrCodes Validity?</label>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>LogOut</button>
                                                    <button type="button" className="btn btn-primary" onClick={callRazorpay} >Renew Plan</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentValidityRenewal