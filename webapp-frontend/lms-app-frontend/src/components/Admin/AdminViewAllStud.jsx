import React, { useEffect, useState } from 'react'
import '../../config/config'
import axios from 'axios'
import Navbar from './Navbar'

const AdminViewAllStud = () => {
    const [studData, setStudData] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/viewAllStudByAdmin"

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
                setStudData(response.data.data)
                console.log(response.data.data)
            }
        )
    }

    useEffect(() => { getData() }, [])
    return (
        <div>
            <Navbar/>
            <br />
            <strong>Admin View All Students</strong><br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Membership No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                College Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Batch Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Admission No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Roll No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Department
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Course
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Aadhar No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Valid Upto
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {studData ? (studData.map(
                            (value,index)=>{
                                return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={value.studProfilePic} alt="" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{value.studName}</div>
                                        <div className="font-normal text-gray-500">{value.studEmail}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {value.membership_no}
                                </td>
                                <td className="px-6 py-4">
                                    {value.collegeName}
                                </td>
                                <td className="px-6 py-4">
                                    {value.batchName}
                                </td>
                                <td className="px-6 py-4">
                                    {value.admNo}
                                </td>
                                <td className="px-6 py-4">
                                    {value.rollNo}
                                </td>
                                <td className="px-6 py-4">
                                    {value.studDept}
                                </td>
                                <td className="px-6 py-4">
                                    {value.course}
                                </td>
                                <td className="px-6 py-4">
                                    {value.aadharNo}
                                </td>
                                <td className="px-6 py-4">
                                    {value.studPhNo}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(value.validity).toLocaleDateString()}
                                </td>
                            </tr>
                            }
                        )) : <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4">
                                No Students Found !!
                            </td>
                            </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminViewAllStud