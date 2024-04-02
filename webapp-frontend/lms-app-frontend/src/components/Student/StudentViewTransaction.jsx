import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../config/config'
import { Link, useNavigate } from 'react-router-dom'

const StudentViewTransaction = () => {
    const [transactionData, setTransactionData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const rangeSize = 5; // Number of pages to display in the pagination
    const lastPage = Math.ceil(transactionData.length / transactionsPerPage); // Calculate the total number of pages
    let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
    let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

    const apiUrl = global.config.urls.api.server + "/api/lms/studentViewTransaction"

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
                    setLoading(false)
                    setTransactionData(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized User") {
                        navigate("/studentLogin")
                        sessionStorage.clear()
                    } else {
                        setLoading(false)
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    // Logic for displaying current logs
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactionData ? transactionData.slice(indexOfFirstTransaction, indexOfLastTransaction) : [];

    // Calculate total pages
    const totalPages = Math.ceil(transactionData.length / transactionsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    useEffect(() => { getData() }, [])
    return (
        <div>
            {/* ====== Table Section Starts */}
            <section className="bg-white dark:bg-dark py-20 lg:py-[120px]">
                <div className="container mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <h1>Student View Transaction Details</h1>
                                </div>
                                <div>
                                    <Link className="btn btn-danger" to="/studdashboard">Back</Link>
                                </div>
                            </div>
                            <div className="max-w-full overflow-x-auto">
                                {loading ? <div>Loading...</div> : <table className="w-full table-auto">
                                    <thead>
                                        <tr className="text-center bg-primary">
                                            <th className="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Date Of Payment
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Amount
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Payment ID
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentTransactions.map(
                                            (value, index) => {
                                                return <tr>
                                                    <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.paymentDate}
                                                    </td>
                                                    <td className="text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.rpAmount}
                                                    </td>
                                                    <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.rpPaymentId}
                                                    </td>
                                                </tr>
                                            }
                                        )}
                                    </tbody>
                                </table>}
                                {!loading && currentTransactions.length > 0 && (
                                    <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
                                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                      <div>
                                        <p className="text-sm text-gray-700">
                                          Showing <span className="font-medium">{indexOfFirstTransaction + 1}</span> to <span className="font-medium">{indexOfLastTransaction > transactionData.length ? transactionData.length : indexOfLastTransaction}</span> of <span className="font-medium">{transactionData.length}</span> results
                                        </p>
                                      </div>
                                      <div>
                                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                          <button onClick={() => currentPage > 1 && paginate(currentPage - 1)} className={`relative inline-flex items-center px-2 py-2 text-sm font-medium ${currentPage === 1 ? 'cursor-not-allowed text-gray-500' : 'text-gray-700 hover:bg-gray-50'} disabled:opacity-50`} disabled={currentPage === 1}>
                                            <span className="sr-only">Previous</span>
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                            </svg>
                                          </button>
                                          {/* Dynamically generate Link components for each page number */}
                                          {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                                            <button key={startPage + index} onClick={() => paginate(startPage + index)} className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === startPage + index ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                                              {startPage + index}
                                            </button>
                                          ))}
                                          <button onClick={() => currentPage < totalPages && paginate(currentPage + 1)} className={`relative inline-flex items-center px-2 py-2 text-sm font-medium ${currentPage === totalPages ? 'cursor-not-allowed text-gray-500' : 'text-gray-700 hover:bg-gray-50'} disabled:opacity-50`} disabled={currentPage === totalPages}>
                                            <span className="sr-only">Next</span>
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                            </svg>
                                          </button>
                                        </nav>
                                      </div>
                                    </div>
                                  </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ====== Table Section End */}

        </div>
    )
}

export default StudentViewTransaction