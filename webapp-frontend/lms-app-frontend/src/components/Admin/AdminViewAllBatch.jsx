import React, { useEffect, useState } from 'react'
import '../../config/config'
import axios from 'axios'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

const AdminViewAllBatch = () => {
    const [batchData, setbatchData] = useState([])
    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/viewAllBatches"

    const getData = () => {
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        }
        axios.post(apiUrl, {}, axiosConfig).then(
            (response) => {
                setbatchData(response.data.data)
                console.log(response.data.data)
            }
        )
    }

    const UpdateClick = (id) => {
        let data = id
        sessionStorage.setItem("batchId", data)
        navigate("/adminviewallcurriculum")

    }

    useEffect(() => { getData() }, [])
    return (
        <div>
            <Navbar />
            <br />
            <strong>Admin View All Batches</strong><br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Batch Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                College Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Batch Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Reg Start Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Reg End Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Batch Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Batch Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Added Date
                            </th>
                            <th scope="col" className="px-6 py-3">          
                            </th>                           
                            <th scope="col" className="px-6 py-3">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {batchData ? (batchData.map(
                            (value, index) => {
                                return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                        {value.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.collegeName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.batchName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(value.regStartDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(value.regEndDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.batchDesc}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.batchAmount}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(value.addedDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => { UpdateClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            View Curriculum
                                        </button>
                                    </td>

                                </tr>
                            }
                        )) : <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4">

                            </td>
                            <td className="px-6 py-4">

                            </td>
                            <td className="px-6 py-4">

                            </td>
                            <td className="px-6 py-4">

                            </td>
                            <td className="px-6 py-4">

                            </td>
                            <td className="px-6 py-4">
                                No Batches Found !!
                            </td>
                            <td className="px-6 py-4">

                            </td>
                            <td className="px-6 py-4">

                            </td>
                            <td className="px-6 py-4">

                            </td>
                            
                        </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminViewAllBatch