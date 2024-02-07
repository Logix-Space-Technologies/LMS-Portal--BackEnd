import React, { useEffect, useState } from 'react'
import AdmStaffNavBar from './AdmStaffNavBar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const AdminStaffViewSubmittedTask = () => {
    
    const navigate = useNavigate()

    const [taskData, setTaskData] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/adSfViewSubmittedTask"

    const getData = () => {
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admstaffLogintoken"),
                "key": sessionStorage.getItem("admstaffkey")
            }
        }
        axios.post(apiUrl, {}, axiosConfig).then(
            (response) => {
                setTaskData(response.data.data)
                console.log(response.data)
            }
        )
    }

    const handleClick = (id) => {
        let data = id;
        console.log(data)
        sessionStorage.setItem("evaluateTaskId", data);
        navigate("/adminstaffevaluatetask")
    }

    useEffect(() => { getData() }, [])


    return (
        <div>
            <AdmStaffNavBar />
            <br />
            <strong>Admin Staff View Submitted Tasks</strong><br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                College Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Batch Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Membership No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Student Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Task Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Due Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Git Link
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Remarks
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Submitted Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Evaluated Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Late Submission Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Evaluator Remarks
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Score
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskData ? (taskData.map(
                            (value, index) => {
                                return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                    <td className="px-6 py-4">
                                        {value.collegeName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.batchName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.membership_no}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.studName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.taskTitle}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.dueDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={value.gitLink} target="_blank" rel="noopener noreferrer">
                                            {value.gitLink}
                                        </Link>
                                    </td>

                                    <td className="px-6 py-4">
                                        {value.remarks}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.subDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.evalDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.lateSubDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.evaluatorRemarks}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.score}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link onClick={() => { handleClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Evaluate Task</Link>
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
                                No Students Found !!
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

                        </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminStaffViewSubmittedTask