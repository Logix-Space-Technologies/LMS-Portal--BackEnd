import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../config/config'
import StudNavBar from './StudNavBar'
import { useNavigate } from 'react-router-dom'

const StudentViewTransaction = () => {
    const [transactionData, setTransactionData] = useState([])
    const navigate = useNavigate()

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
                    setTransactionData(response.data.data)
                    console.log(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized User") {
                        navigate("/studentLogin")
                        sessionStorage.removeItem("studentkey");
                        sessionStorage.removeItem("studentId");
                        sessionStorage.removeItem("studemail");
                        sessionStorage.removeItem("studBatchId");
                        sessionStorage.removeItem("studLoginToken");
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    useEffect(() => { getData() }, [])
    return (
        <div>
            <StudNavBar />
            {/* ====== Table Section Starts */}
            <section className="bg-white dark:bg-dark py-20 lg:py-[120px]">
                <div className="container mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <h1>Student View Transaction Details</h1>
                            <br />
                            <div className="max-w-full overflow-x-auto">
                                <table className="w-full table-auto">
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
                                        {transactionData.map(
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
                                </table>
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