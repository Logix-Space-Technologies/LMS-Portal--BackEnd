import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../config/config'
import Navbar from './Navbar'

const AdminViewAllSession = () => {
    const [sessionData, setSessionData] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/viewSessions"
    const apiUrlTwo = global.config.urls.api.server + "/api/lms/cancelSession"

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
                setSessionData(response.data.Sessions)
                console.log(response.data.Sessions)
            }
        )
    }

    const handleClick = (id) => {
        let data = { "id": id }
        let axiosConfigTwo = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        }
        axios.post(apiUrlTwo, data, axiosConfigTwo).then(
            (response) => {
                if (response.data.status === "success") {
                    // Reload the page after deleting trainer
                    window.location.reload();
                } else {
                    alert(response.data.status)
                }
            }
        )

    }

    useEffect(() => { getData() }, [])
    return (
        <div>
            <Navbar /><br />
            <strong>Admin View All Session</strong>
            <br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                BatchId
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Remarks
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Venue OR Link
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Trainer Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Attendence Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Added Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cancel Status
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessionData ? (sessionData.map(
                            (value, index) => {
                                return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{value.sessionName}</div>

                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        {value.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.batchId}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.time}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.type}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.remarks}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.venueORlink}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.trainerId}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.attendenceCode}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.addedDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.cancelStatus}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleClick(value.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline focus:outline-none">
                                            Cancel Session
                                        </button>
                                    </td>

                                    <td className="px-6 py-4">
                                        <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update Update</a>
                                    </td>
                                </tr>
                            }
                        )) : <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4">

                            </td>
                            <td className="px-6 py-4">
                                No Session Found !!
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

export default AdminViewAllSession