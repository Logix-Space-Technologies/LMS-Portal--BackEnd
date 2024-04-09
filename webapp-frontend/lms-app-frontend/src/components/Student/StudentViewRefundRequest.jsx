import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StudNavBar from './StudNavBar'
import '../../config/config'

const StudentViewRefundRequest = () => {

    const [studentViewRefundReqData, setStudentViewRefundReqData] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    let currentRefundStatus = sessionStorage.getItem("refundreqstatus")
    const [showWaitingModal, setShowWaitingModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay

    const apiUrl = global.config.urls.api.server + "/api/lms/viewRefundStatus"
    const apiUrl1 = global.config.urls.api.server + "/api/lms/cancelRefundRequest"
    const apiUrl2 = global.config.urls.api.server + "/api/lms/refundamntrcvdstatus"

    const closeWaitingModal = () => {
        setShowOverlay(false)
        setShowWaitingModal(false)
    }

    const getData = () => {
        let data = { "studId": sessionStorage.getItem("studentId") }
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken"),
                "key": sessionStorage.getItem("studentkey")
            }
        }
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setStudentViewRefundReqData(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/studentLogin")
                        sessionStorage.clear()
                    } else {
                        if (response.data.status === "No refund requests found.") {
                            setStudentViewRefundReqData([])
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching materials:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const cancelClick = (refundId) => {
        let data1 = { "refundId": refundId }
        setShowWaitingModal(true)
        setShowOverlay(true)
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken"),
                "key": sessionStorage.getItem("studentkey")
            }
        }
        axios.post(apiUrl1, data1, axiosConfig).then(
            (response) => {
                if (response.data.status === "success") {
                    closeWaitingModal()
                    setTimeout(() => {
                        alert("Your Refund Request Has Being Successfully Cancelled!!")
                        navigate("/studentLogin")
                        sessionStorage.clear()
                    }, 500)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/studentLogin")
                        sessionStorage.clear()
                    } else {
                        closeWaitingModal()
                        setTimeout(() => { alert(response.data.status) }, 500)
                    }
                }
            }
        )
    }

    const amountClick = (studId) => {
        let data2 = { "studId": studId }
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken"),
                "key": sessionStorage.getItem("studentkey")
            }
        }
        axios.post(apiUrl2, data2, axiosConfig).then(
            (response) => {
                if (response.data.status === "success") {
                    alert("Amount Received Status Updated Successfully.")
                    window.location.reload();
                } else {
                    if (response.data.status === 'Unauthorized User!!') {
                        navigate("/studentLogin")
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    const handleClick = () => {
        sessionStorage.clear()
    }

    // Convert a date string from 'DD/MM/YYYY' to a JavaScript Date object
    const parseDateString = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(year, month - 1, day);
    };

    useEffect(() => { getData() }, [])

    return (
        <div>
            {currentRefundStatus !== "Refund Request Active" ? <StudNavBar /> : null}
            <div className="bg-light py-3 py-md-5">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
                            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                                <div className="row gy-3 gy-md-4 overflow-hidden">
                                    <div className="flex justify-between items-center mt-8 ml-4 mb-4">
                                        <h2 className="text-lg font-bold">Student View Refund Request</h2>
                                        {currentRefundStatus === "Refund Request Active" ? <Link to="/studentLogin" onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginRight: '20px' }}>Log Out</Link> : null}
                                    </div>
                                    {loading ? (
                                        <div className="col-12 text-center">
                                            <div className="text-center">
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        studentViewRefundReqData.length === 0 ? (
                                            <div className="col-12 text-center">No Refund Requests Found!!</div>
                                        ) : (
                                            studentViewRefundReqData.map((value, index) => {
                                                const requestedDate = parseDateString(value.requestedDate)
                                                const currentDate = new Date()

                                                const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

                                                const differenceInDays = Math.abs((currentDate - requestedDate) / oneDayInMilliseconds);

                                                const isGreaterThanFiveDays = differenceInDays > 5;

                                                return <div key={index} className="col-12">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h2 className="card-title">{value.studName}</h2>
                                                            <p className="card-text">Requested Date : {value.requestedDate}</p>
                                                            <p className="card-text">Reason : {value.reason}</p>
                                                            {value.approvalStatus === "Not Approved" && value.refundStatus === "Pending" && value.AmountReceivedStatus === "Not Received" && (
                                                                <>
                                                                    <p className="card-text">Refund Approval : {value.refundStatus}</p>
                                                                    <p className="card-text">Approval Status : {value.approvalStatus}</p>
                                                                    <br />
                                                                    <p className="card-text">Your Refund Request has being sent...Please wait for the Approval.</p>
                                                                    {isGreaterThanFiveDays === false && (
                                                                        <p className="card-text-centre">If you want to cancel your refund request... kindly click on <b>Cancel Request</b> within <b>5 days</b> from your <b>requested date</b>.</p>
                                                                    )}
                                                                    <br />
                                                                    <p className="card-text"><b>Thank You!!</b></p>
                                                                    <br></br>
                                                                    <div className="flex justify-between">
                                                                        {isGreaterThanFiveDays === false && <button onClick={() => cancelClick(value.refundId)} className="btn bg-red-500 text-white px-6 py-3 rounded-md">Cancel Request</button>}
                                                                    </div>
                                                                </>
                                                            )}
                                                            {value.approvalStatus === "Approved" && value.refundStatus === "Processed" && value.AmountReceivedStatus === "Not Received" && (
                                                                <>
                                                                    <p className="card-text">Refund Approval : {value.refundStatus}</p>
                                                                    <p className="card-text">Approved Amount : {value.approvedAmnt}</p>
                                                                    <p className="card-text">Refund Initiated Date : {value.refundInitiatedDate}</p>
                                                                    <p className="card-text">Transaction No. : {value.transactionNo}</p>
                                                                    <p className="card-text">Approval Status : {value.approvalStatus}</p>
                                                                    <p className="card-text">Admin Remarks : {value.adminRemarks}</p>
                                                                    <p className="card-text">Did you receive the amount? : {value.AmountReceivedStatus}</p>
                                                                    <br />
                                                                    <p className="card-text">Your Request has being successfully Processed!</p>
                                                                    <p className="card-text"><b>Thank You!!</b></p>
                                                                    <br></br>
                                                                    <div className="flex justify-between">
                                                                        <a href="#" onClick={() => amountClick(value.studId)} className="btn bg-green-500 text-white px-6 py-3 rounded-md">
                                                                            Payment Received
                                                                        </a>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {value.AmountReceivedStatus === "Received" && (
                                                                <>
                                                                    <p className="card-text">Refund Approval : {value.refundStatus}</p>
                                                                    <p className="card-text">Approved Amount : {value.approvedAmnt}</p>
                                                                    <p className="card-text">Refund Initiated Date : {value.refundInitiatedDate}</p>
                                                                    <p className="card-text">Transaction No. : {value.transactionNo}</p>
                                                                    <p className="card-text">Approval Status : {value.approvalStatus}</p>
                                                                    <p className="card-text">Admin Remarks : {value.adminRemarks}</p>
                                                                    <p className="card-text">Did you receive the amount? : {value.AmountReceivedStatus}</p>
                                                                    <br />
                                                                    <p className="card-text">Refund Amount Successfully Received By {value.studName}!</p>
                                                                    <p className="card-text"><b>Thank You!!</b></p>
                                                                </>
                                                            )}

                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        )
                                    )}
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
        </div >
    )
}

export default StudentViewRefundRequest