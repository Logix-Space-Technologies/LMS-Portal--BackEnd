import React from 'react'

const StudentViewRefundRequest = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-3xl bg-white shadow-lg rounded-md p-8">
                <h2 className="text-3xl font-semibold mb-4">Refund Request</h2>
                <p className="text-gray-500 mb-2">{/* Display studName here */}</p>
                <p className="text-gray-700 mb-2">
                    <strong>Requested Date:</strong> {/* Display requestedDate here */}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Reason:</strong> {/* Display reason here */}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Approved Amount:</strong> {/* Display approvedAmnt here */}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Refund Initiated Date:</strong> {/* Display refundInitiatedDate here */}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Approval Status:</strong> {/* Display approvalStatus here */}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Refund Status:</strong> {/* Display refundStatus here */}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Transaction No:</strong> {/* Display transactionNo here */}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Amount Received Status:</strong> {/* Display AmountReceivedStatus here */}
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>Admin Remarks:</strong> {/* Display adminRemarks here */}
                </p>
                <div className="flex justify-between">
                    <a target="_blank" href="" className="btn bg-green-500 text-white px-6 py-3 rounded-md">
                        Payment Received
                    </a>
                    <button className="btn bg-red-500 text-white px-6 py-3 rounded-md">Cancel Request</button>
                </div>
            </div>
        </div>




    )
}

export default StudentViewRefundRequest