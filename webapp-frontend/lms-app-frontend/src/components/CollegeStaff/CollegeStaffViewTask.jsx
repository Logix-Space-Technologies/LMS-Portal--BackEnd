import React, { useEffect, useState } from 'react'
import '../../config/config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CollegeStaffViewTask = () => {
    const [taskData, setTaskData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10); // Number of students per page

    const rangeSize = 5; // Number of pages to display in the pagination
    const lastPage = Math.ceil(taskData.length / tasksPerPage); // Calculate the total number of pages
    let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
    let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

    const apiurl = global.config.urls.api.server + "/api/lms/clgstaffviewtask"

    const navigate = useNavigate()

    const getData = () => {
        let data = { "sessionId": sessionStorage.getItem("viewattendanceid") }
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("clgstaffLogintoken"),
                "key": sessionStorage.getItem("clgstaffkey")
            }
        }
        axios.post(apiurl, data, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setTaskData(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        sessionStorage.clear()
                        navigate("/clgStafflogin")
                    } else {
                        if (!response.data.data) {
                            //No Data Found
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
    const currentTasks = taskData ? taskData.slice(indexOfFirstTask, indexOfLastTask) : [];


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(taskData.length / tasksPerPage);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * tasksPerPage) + index + 1;
    }


    useEffect(() => { getData() }, [])

    return (
        <div>
            {/* ====== Table Section Start */}
            <section className="bg-gray-100 dark:bg-dark py-20 lg:py-[120px]">
                <div className="container mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="flex justify-between items-center mt-8 ml-4 mb-4">
                                <h2 className="text-lg font-bold">College Staff View Tasks</h2>
                                <Link to="/clgstaffviewsession" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginRight: '20px' }}>Back</Link>
                            </div>
                            <br />
                            <div className="max-w-full overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="text-center bg-primary">
                                            <th className="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                S/L
                                            </th>
                                            <th className="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Session Name
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Title
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Description
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Task Type
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Total Score
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Due Date
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentTasks.length > 0 ? currentTasks.map(
                                            (value, index) => {
                                                return <tr key={index}>
                                                    <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {calculateSerialNumber(index)}
                                                    </td>
                                                    <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.sessionName}
                                                    </td>
                                                    <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.taskTitle}
                                                    </td>
                                                    <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.taskDesc}
                                                    </td>
                                                    <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.taskType}
                                                    </td>
                                                    <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.totalScore}
                                                    </td>
                                                    {value.dueDate === "Past Due Date" && (
                                                        <>
                                                            <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                                {value.dueDate}
                                                            </td>
                                                            <td class="text-dark border-b border-r border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                                <a target='_blank' href={value.taskFileUpload} class="inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium">
                                                                    View Material
                                                                </a>
                                                            </td>
                                                        </>
                                                    )}
                                                    {value.dueDate !== "Past Due Date" && (
                                                        <>
                                                            <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                                {value.dueDate}
                                                            </td>
                                                            <td class="text-dark border-b border-r border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                                <a target='_blank' href={value.taskFileUpload} class="inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium">
                                                                    View Material
                                                                </a>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            }
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                    No Tasks Found !!!
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className="flex items-center justify-between bg-[#C4E1E2] px-6 py-4 sm:px-6">
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ====== Table Section End */}
        </div>
    )
}

export default CollegeStaffViewTask