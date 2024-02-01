import React, { useEffect, useState } from 'react'
import '../../config/config'
import axios from 'axios'
import Navbar from './Navbar'

const AdminViewAllCollege = () => {
    const [collegeData, setCollegeData] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/viewallcolleges"

    const apiUrlTwo = global.config.urls.api.server + "/api/lms/deleteCollege"

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
                setCollegeData(response.data.data)
                console.log(response.data.data)
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
                if (response.data.status === "College deleted.") {
                    // Reload the page after deleting college
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
            <strong>Admin View All College</strong>
            <br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                        <th scope="col" className="px-6 py-3">
                                
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                College Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                College Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Website
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone No:
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mobile No:
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {collegeData ? (collegeData.map(
                            (value, index) => {
                                return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className="w-10 h-10 rounded-full" src={value.collegeImage} alt="" />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{value.collegeName}</div>
                                            <div className="font-normal text-gray-500">{value.email}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        {value.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.collegeCode}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.collegeAddress}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.website}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.collegePhNo}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.collegeMobileNumber}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a onClick={() => { handleClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete College</a>
                                    </td>
                                </tr>
                            }
                        )) : <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4">

                            </td>
                            <td className="px-6 py-4">
                                No Colleges Found !!
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

export default AdminViewAllCollege