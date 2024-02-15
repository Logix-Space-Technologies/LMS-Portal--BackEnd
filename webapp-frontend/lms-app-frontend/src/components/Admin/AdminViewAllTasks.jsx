import React, { useEffect, useState } from 'react'
import '../../config/config'
import Navbar from './Navbar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const AdminViewAllTasks = () => {
    const [taskData, setTaskData] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/viewtasks"
    const deleteUrl = global.config.urls.api.server + '/api/lms/deleteTask'

    const navigate = useNavigate()

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
                setTaskData(response.data.data)
                console.log(response.data.data)
            }
        )
    }

    const deleteTask = (id) => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        axios.post(deleteUrl, { id }, axiosConfig)
            .then(() => {
                alert("Task deleted successfully");
                window.location.reload()
            })
            .catch(error => {
                console.error("Delete failed:", error);
            })
    };

    const handleUpdateClick = (taskId) => {
        // Store task ID in sessionStorage to use in the update page
        sessionStorage.setItem("taskId", taskId);
        // Navigate to the update task page
        navigate("/AdminUpdateTask");
    };


    useEffect(() => { getData() }, [])
    return (
        <div>
            <Navbar /><br />
            <strong>Admin View All Tasks</strong>
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
                                Task Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Task Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Task Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Score
                            </th><th scope="col" className="px-6 py-3">
                                Due Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Added Date
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
                        {taskData && taskData.length > 0 ? (
                            taskData.map((value, index) => {
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
                                            {value.taskTitle}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.taskDesc}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.taskType}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.totalScore}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.dueDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.addedDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link target="_blank" to={value.taskFileUpload} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View File</Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleUpdateClick(value.id)} className="btn btn-primary btn-sm me-2">Update</button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => deleteTask(value.id)} className="btn btn-danger btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td colSpan="11" className="px-6 py-4 text-center">
                                    No Tasks Found !!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminViewAllTasks