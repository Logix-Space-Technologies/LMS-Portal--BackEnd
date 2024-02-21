import React, { useEffect, useState } from 'react'
import '../../config/config'
import Navbar from './Navbar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const AdminViewAllTasks = () => {
    const [taskData, setTaskData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10); // Number of tasks per page


    const apiUrl = global.config.urls.api.server + "/api/lms/viewtasks"
    const deleteUrl = global.config.urls.api.server + '/api/lms/deleteTask'

    const navigate = useNavigate()


    const getData = () => {
        let data = { "sessionId": sessionStorage.getItem("viewtaskId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                setTaskData(response.data.data);
                console.log(response.data.data);
            }
        );
    };


    // Logic for displaying current tasks
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = taskData ? taskData.slice(indexOfFirstTask, indexOfLastTask) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

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

    useEffect(() => { getData() }, []);


    return (
        <div>
            <Navbar /><br />
            <div className="flex justify-between items-center mx-4 my-4">
                <button onClick={() => navigate(-1)} className="btn bg-gray-500 text-white px-4 py-2 rounded-md">Back</button>

                <strong>View All Tasks</strong>

                <div></div>
            </div>
            <br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Batch Name</th>
                            <th scope="col" className="px-6 py-3">Id</th>
                            <th scope="col" className="px-6 py-3">Task Title</th>
                            <th scope="col" className="px-6 py-3">Task Description</th>
                            <th scope="col" className="px-6 py-3">Task Type</th>
                            <th scope="col" className="px-6 py-3">Total Score</th>
                            <th scope="col" className="px-6 py-3">Due Date</th>
                            <th scope="col" className="px-6 py-3">Added Date</th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTasks.length > 0 ? (
                            currentTasks.map((value, index) => {
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">{value.batchName}</td>
                                        <td className="px-6 py-4">{value.id}</td>
                                        <td className="px-6 py-4">{value.taskTitle}</td>
                                        <td className="px-6 py-4">{value.taskDesc}</td>
                                        <td className="px-6 py-4">{value.taskType}</td>
                                        <td className="px-6 py-4">{value.totalScore}</td>
                                        <td className="px-6 py-4">{value.dueDate}</td>
                                        <td className="px-6 py-4">{value.addedDate}</td>
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
            {/* Pagination */}
            {currentTasks.length > 0 && (
                <div className="flex justify-center mt-8">
                    <nav>
                        <ul className="flex list-style-none">
                            {currentPage > 1 && (
                                <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                    Previous
                                </li>
                            )}
                            {Array.from({ length: Math.ceil(taskData.length / tasksPerPage) }, (_, i) => (
                                <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    {i + 1}
                                </li>
                            ))}
                            {currentPage < Math.ceil(taskData.length / tasksPerPage) && (
                                <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                    Next
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default AdminViewAllTasks;
