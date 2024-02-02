import React, { useEffect, useState } from 'react'
import '../../config/config'
import Navbar from './Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminViewAllCurriculum = () => {
    const [curriculumData, setCurriculumData] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/curriculumview"
    const navigate = useNavigate()

    const apiLink2 = global.config.urls.api.server + "/api/lms/deletecurriculum"

    const getData = () => {
        let data = { "batchId": sessionStorage.getItem("batchId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        }
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                setCurriculumData(response.data.data)
                console.log(response.data.data)
            }
        )
    }

    const handleClick = (id) => {
        let data = { "id": id }
        let axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        }

        axios.post(apiLink2, data, axiosConfig2).then(
            (response) => {
                console.log(data)
                console.log(axiosConfig2)
                if (response.data.status === "success") {
                    alert("Curriculum deleted!!")
                    // Reload the page after clicking OK in the alert
                    window.location.reload();
                } else {
                    alert(response.data.status)
                }
            }
        )
    }

    const UpdateClick = (id) => {
        let data = id
        sessionStorage.setItem("curriculumId", data)
        navigate("/AdminUpdateCurriculum")

    }

    useEffect(() => { getData() }, [])
    return (
        <div>
            <Navbar /><br />
            <strong>Admin View All Curriculum</strong>
            <br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Batch Name
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Batch Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Curriculum Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Curriculum Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Added Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Added By
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Updated By
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {curriculumData && curriculumData.length > 0 ? (
                            curriculumData.map((value, index) => {
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">
                                            {value.batchName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.batchId}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.curriculumTitle}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.curriculumDesc}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.addedDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.addedBy}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.updatedBy}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a target="_blank" href={value.curriculumFileLink} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View Curriculum</a>
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <button onClick={() => handleClick(value.id)} className="btn btn-danger">Delete</button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a onClick={() => { UpdateClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update Curriculum</a>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td colSpan="11" className="px-6 py-4 text-center">
                                    No Curriculum Found !!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
                        }

    export default AdminViewAllCurriculum
