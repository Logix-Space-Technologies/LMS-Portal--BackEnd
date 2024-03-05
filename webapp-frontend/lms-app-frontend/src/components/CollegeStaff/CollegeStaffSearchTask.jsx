import axios from 'axios'
import React, { useState } from 'react'
import ClgStaffNavbar from './ClgStaffNavbar'
import '../../config/config'
import { Link, useNavigate } from 'react-router-dom'

const CollegeStaffSearchTask = () => {

    const [inputField, setInputField] = useState(
        {
            "collegeId": sessionStorage.getItem("clgStaffCollegeId"),
            "taskQuery": ""
        }
    )

    const [updateField, setUpdateField] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10); // Number of students per page


    const rangeSize = 5; // Number of pages to display in the pagination
    const lastPage = Math.ceil(updateField.length / tasksPerPage); // Calculate the total number of pages
    let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
    let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range


    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const apiLink = global.config.urls.api.server + "/api/lms/collegeStaffSearchTasks"

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("clgstaffLogintoken"),
                "key": sessionStorage.getItem("clgstaffkey")
            }
        };
        axios.post(apiLink, inputField, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setUpdateField(response.data.data)
                    setIsLoading(false)
                    setInputField({
                        "collegeId": sessionStorage.getItem("clgStaffCollegeId"),
                        "taskQuery": ""
                    })
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        sessionStorage.clear()
                        navigate("/clgStafflogin")
                    } else {
                        if (!response.data.data) {
                            setUpdateField([]); // Ensure the updateField is set to an empty array
                            setIsLoading(false);
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            }
        )
    }

    // Logic for displaying current students
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = updateField ? updateField.slice(indexOfFirstTask, indexOfLastTask) : [];


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(updateField.length / tasksPerPage);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * tasksPerPage) + index + 1;
    }

    // Convert a date string from 'DD/MM/YYYY' to a JavaScript Date object
    const parseDateString = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(year, month - 1, day);
    };

    return (
        <div>
            <ClgStaffNavbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <h1>Search Task</h1>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <input onChange={inputHandler} type="text" placeholder='Task Name/Task Description/Task Type/Batch Name' className="form-control" name="taskQuery" value={inputField.taskQuery} />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <button onClick={readValue} className="btn btn-warning">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <div className="col-12 text-center">
                        <p></p>
                    </div>
                ) : (updateField && updateField.length > 0 ? (
                    <>
                        <header className="px-5 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-2xl text-gray-800">List of Tasks</h2>
                        </header>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            S/L
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Batch Name
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
                                            Task Material
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total Score
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Due Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTasks.map(
                                        (value, index) => {
                                            // Convert dueDate and subDate to Date objects for comparison
                                            const dueDateObj = parseDateString(value.dueDate);
                                            const DateObj = new Date();

                                            // Determine if the task was submitted late
                                            const isLateSubmission = DateObj > dueDateObj;
                                            return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="p-4 whitespace-nowrap">
                                                    {calculateSerialNumber(index)}
                                                </td>
                                                <td className="p-4 whitespace-nowrap">
                                                    {value.batchName}
                                                </td>
                                                <td className="p-4 whitespace-nowrap">
                                                    {value.taskTitle}
                                                </td>
                                                <td className="p-4 whitespace-nowrap">
                                                    {value.taskDesc}
                                                </td>
                                                <td className="p-4 whitespace-nowrap">
                                                    {value.taskType}
                                                </td>
                                                <td className="p-4 whitespace-nowrap">
                                                    <Link target="_blank" to={value.taskFileUpload} className="btn bg-blue-500 text-white px-4 py-2 shadow rounded-md hover:bg-blue-500">View Material</Link>
                                                </td>
                                                <td className="p-4 whitespace-nowrap">
                                                    {value.totalScore}
                                                </td>
                                                <td className="p-8 whitespace-nowrap" style={{ display: 'flex', alignItems: 'center' }}>
                                                    {value.dueDate}
                                                    {isLateSubmission && (
                                                        <img src="https://www.svgrepo.com/show/451892/task-past-due.svg" alt="Late Submission" style={{ width: '20px', marginLeft: '10px' }} />
                                                    )}
                                                </td>
                                            </tr>
                                        })}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{indexOfFirstTask + 1}</span> to <span className="font-medium">{indexOfLastTask > updateField.length ? updateField.length : indexOfLastTask}</span> of <span className="font-medium">{updateField.length}</span> results
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
                    </>
                ) : (
                    <div className="col-12 text-center">No Tasks Found!!</div>
                ))}
                <br></br>
            </div>
        </div >
    )
}

export default CollegeStaffSearchTask