import React, { useEffect, useState } from 'react'
import '../../config/config'
import Navbar from './Navbar'
import axios from 'axios'

const AdminViewCollegeStaffLog = () => {
    const [collegeStaffLogData, setcollegeStaffLogData] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/viewClgStaffLog"

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
                setcollegeStaffLogData(response.data)
                console.log(response.data)
            }
        )
    }

    useEffect(() => { getData() }, [])
    return (
        <div>
            <Navbar />
            <br />
            <strong>Admin View College Staff Log</strong><br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                College Staff Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Collge Staff Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {collegeStaffLogData ? (collegeStaffLogData.map(
                            (value, index) => {
                                return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                        {value.collegeStaffName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.ClgStaffId}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.Action}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(value.DateTime).toLocaleDateString()}
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
                                No College Staff Log Found Found !!
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

                            </td>

                        </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminViewCollegeStaffLog