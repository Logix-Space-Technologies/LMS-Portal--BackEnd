import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

const AdminViewLog = () => {

    const [AdminLogData, setAdminLogData] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/viewAdminLog"

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
                setAdminLogData(response.data)
                console.log(response.data)
            }
        )
    }

    useEffect(() => { getData() }, [])

    return (
        <div>
            <Navbar />
            <br />
            <strong>Admin View Log</strong><br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {/* <th scope="col" className="px-6 py-3">
                                Id
                            </th> */}
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                            <th scope="col" className="px-6 py-3">
                                DateTime
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {AdminLogData ? (AdminLogData.map(
                            (value, index) => {
                                return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    {/* <td className="px-6 py-4">
                                        {value.AdmStaffId}
                                    </td> */}
                                    <td className="px-6 py-4">
                                        Admin
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
                                No Admin log Found !!
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

export default AdminViewLog