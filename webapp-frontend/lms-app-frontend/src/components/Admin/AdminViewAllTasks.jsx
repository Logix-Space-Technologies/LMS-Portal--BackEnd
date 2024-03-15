import React, { useEffect, useState } from 'react'
import '../../config/config'
import Navbar from './Navbar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar'

const AdminViewAllTasks = () => {
    const [taskData, setTaskData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10); // Number of tasks per page
    const [key, setKey] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const apiUrl = global.config.urls.api.server + "/api/lms/viewtasks"
    const deleteUrl = global.config.urls.api.server + '/api/lms/deleteTask'

    const navigate = useNavigate()

    const getData = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let data = { "sessionId": sessionStorage.getItem("viewtaskId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setTaskData(response.data.data);
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        {key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin")}
                        sessionStorage.clear()
                    } else {
                        if (!response.data.data) {
                            setTaskData([])
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            }
        );
    };


    // Logic for displaying current tasks
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = taskData ? taskData.slice(indexOfFirstTask, indexOfLastTask) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Total pages
    let totalPages = []
    if (taskData && taskData.length > 0) {
        totalPages = Math.ceil(taskData.length / tasksPerPage);
    }

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * tasksPerPage) + index + 1;
    }

    // Integration of new pagination logic
    const startPage = currentPage > 2 ? currentPage - 2 : 1;
    const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;



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
            .then((response) => {
                if (response.data.status === "Task Deleted.") {
                    alert("Task deleted successfully");
                    getData()
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        {key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin")}
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status)
                    }
                }
            })
            .catch(error => {
                console.error("Delete failed:", error);
            })
    };

    const handleUpdateClick = (taskId) => {
        sessionStorage.setItem("taskId", taskId);
        navigate("/AdminUpdateTask");
    };

    const confirmDelete = () => {
        if (deleteId) {
            deleteTask(deleteId);
            setShowConfirmation(false);
        }
    };

    const handleDeleteClick = (taskId) => {
        setDeleteId(taskId);
        setShowConfirmation(true);
    };

    useEffect(() => { getData() }, []);

    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);

    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}<br />
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
                            <th scope="col" className="px-6 py-3">S/N</th>
                            <th scope="col" className="px-6 py-3">Batch Name</th>
                            <th scope="col" className="px-6 py-3">Task Title</th>
                            <th scope="col" className="px-6 py-3">Task Description</th>
                            <th scope="col" className="px-6 py-3">Task Type</th>
                            <th scope="col" className="px-6 py-3">Total Score</th>
                            <th scope="col" className="px-6 py-3">Due Date</th>
                            <th scope="col" className="px-6 py-3">Added Date</th>
                            <th scope="col" className="px-6 py-3">Updated Date</th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            {key === "lmsapp" && (
                                <th scope="col" className="px-6 py-3"></th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentTasks.length > 0 ? (
                            currentTasks.map((value, index) => {
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">{calculateSerialNumber(index)}</td>
                                        <td className="px-6 py-4">{value.batchName}</td>
                                        <td className="px-6 py-4">{value.taskTitle}</td>
                                        <td className="px-6 py-4">{value.taskDesc}</td>
                                        <td className="px-6 py-4">{value.taskType}</td>
                                        <td className="px-6 py-4">{value.totalScore}</td>
                                        <td className="px-6 py-4">{value.dueDate}</td>
                                        <td className="px-6 py-4">{value.addedDate}</td>
                                        {value.updatedDate !== null && (
                                            <td className="px-6 py-4">{value.updatedDate}</td>
                                        )}
                                        {value.updatedDate === null && (
                                            <td className="px-6 py-4">NIL</td>
                                        )}
                                        <td className="px-6 py-4">
                                            <Link target="_blank" to={value.taskFileUpload} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View File</Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleUpdateClick(value.id)} className="btn btn-primary btn-sm me-2">Update</button>
                                        </td>
                                        {key === "lmsapp" && (
                                            <td className="px-6 py-4">
                                                <button onClick={() => handleDeleteClick(value.id)} className="btn btn-danger btn-sm">Delete</button>
                                            </td>
                                        )}
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

            <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{indexOfFirstTask + 1}</span> to <span className="font-medium">{indexOfLastTask > taskData.length ? taskData.length : indexOfLastTask}</span> of <span className="font-medium">{taskData.length}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button onClick={() => currentPage > 1 && paginate(currentPage - 1)} className={`relative inline-flex items-center px-2 py-2 text-sm font-medium ${currentPage === 1 ? 'cursor-not-allowed text-gray-500' : 'text-gray-700 hover:bg-gray-50'} disabled:opacity-50`} disabled={currentPage === 1}>
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {/* Dynamically generate Link components for each page number */}
                            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                                <button key={startPage + index} onClick={() => paginate(startPage + index)} className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === startPage + index ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                                    {startPage + index}
                                </button>
                            ))}
                            <button onClick={() => currentPage < totalPages && paginate(currentPage + 1)} className={`relative inline-flex items-center px-2 py-2 text-sm font-medium ${currentPage === totalPages ? 'cursor-not-allowed text-gray-500' : 'text-gray-700 hover:bg-gray-50'} disabled:opacity-50`} disabled={currentPage === totalPages}>
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>



            {/* Delete Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="text-center mb-4">
                            <h2 className="text-xl font-semibold">Delete Confirmation</h2>
                        </div>
                        <div className="text-center mb-4">
                            Are you sure you want to delete this task?
                        </div>
                        <div className="flex justify-center">
                            <button onClick={confirmDelete} className="btn btn-primary" style={{marginRight:'16px'}}>Confirm Delete</button>
                            <button onClick={() => setShowConfirmation(false)} className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminViewAllTasks;
