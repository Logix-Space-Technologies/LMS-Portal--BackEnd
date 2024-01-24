import axios from 'axios'
import React, { useEffect, useState } from 'react'

const StudentViewRefundRequest = () => {

    const [studentViewRefundReqData, setStudentViewRefundReqData] = useState([])
    const [loading, setLoading] = useState(true)

    const apiUrl = global.config.urls.api.server + "/api/lms/viewRefundStatus"
    const apiUrl1 = global.config.urls.api.server + "/api/lms/cancelRefundRequest"
    const apiUrl2 = global.config.urls.api.server + "/api/lms/"

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
        console.log(data)
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                if (response.data.status === "success") {
                    setStudentViewRefundReqData(response.data.data)
                    console.log(response.data)
                } else {
                    console.log(response.data.status)
                }
            })
            .catch(error => {
                console.error('Error fetching materials:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => { getData() }, [])

    return (
        <div>
            <div className="bg-light py-3 py-md-5">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
                            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                                <div className="row gy-3 gy-md-4 overflow-hidden">
                                    <div className="col-12">
                                        <h2 className="text-3xl font-semibold mb-4">Refund Request</h2>
                                    </div>
                                    {loading ? (
                                        <div className="col-12 text-center">
                                            <div class="text-center">
                                                <div class="spinner-border" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        studentViewRefundReqData.length === 0 ? (
                                            <div className="col-12 text-center">No Refund Requests Found!!</div>
                                        ) : (
                                            studentViewRefundReqData.map((value, index) => {
                                                return <div key={index} className="col-12">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h2 className="card-title">{value.studName}</h2>
                                                            <p className="card-text">Requested Date : {new Date(value.requestedDate).toLocaleDateString()}</p>
                                                            <p className="card-text">Reason : {value.reason}</p>
                                                            {value.approvalStatus === "Not Approved" && value.refundStatus === "Pending" && (
                                                                <>
                                                                    <p className="card-text">Refund Approval : {value.refundStatus}</p>
                                                                    <p className="card-text">Approval Status : {value.approvalStatus}</p>
                                                                    <p className="card-text">Your Refund Request has being sent...Please wait for the Approval.</p>
                                                                    <p className="card-text-centre">If you want to cancel your refund request... kindly click on <b>Cancel Request</b></p>
                                                                    <p className="card-text"><b>Thank You!!</b></p>
                                                                </>
                                                            )}
                                                            {value.approvalStatus === "Approved" && value.refundStatus === "Processed"  && (
                                                                <>
                                                                    <p className="card-text">Refund Approval : {value.refundStatus}</p>
                                                                    <p className="card-text">Approved Amount : {value.approvedAmnt}</p>
                                                                    <p className="card-text">Refund Initiated Date : {new Date(value.refundInitiatedDate).toLocaleDateString()}</p>
                                                                    <p className="card-text">Transaction No. : {value.transactionNo}</p>
                                                                    <p className="card-text">Approval Status : {value.approvalStatus}</p>
                                                                    <p className="card-text">Admin Remarks : {value.adminRemarks}</p>
                                                                    <p className="card-text">Did you receive the amount? : {value.AmountReceivedStatus}</p>
                                                                    <p className="card-text">Your Request has being successfully Processed!</p>
                                                                    <p className="card-text"><b>Thank You!!</b></p>
                                                                    <br></br>
                                                                    <div className="flex justify-between">
                                                                        <a href="#" className="btn bg-green-500 text-white px-6 py-3 rounded-md">
                                                                            Payment Received
                                                                        </a>
                                                                    </div>
                                                                </>
                                                            )}
                                                            <br></br>
                                                            <div className="flex justify-between">
                                                                <button className="btn bg-red-500 text-white px-6 py-3 rounded-md">Cancel Request</button>
                                                            </div>
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
        </div >
    )
}

export default StudentViewRefundRequest