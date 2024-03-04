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

    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10); // Number of students per page

    const [updateField, setUpdateField] = useState([])

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
    const indexOfLastStudent = currentPage * tasksPerPage;
    const indexOfFirstStudent = indexOfLastStudent - tasksPerPage;
    const currentTasks = updateField ? updateField.slice(indexOfFirstStudent, indexOfLastStudent) : [];


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(updateField.length / tasksPerPage);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * tasksPerPage) + index + 1;
    }

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
                                                    <Link target="_blank" href={value.taskFileUpload} className="btn bg-blue-500 text-white px-4 py-2 shadow rounded-md hover:bg-blue-500">View Material</Link>
                                                </td>
                                                <td className="p-4 whitespace-nowrap">
                                                    {value.totalScore}
                                                </td>
                                                <td className="p-4 whitespace-nowrap">
                                                    {value.dueDate}
                                                </td>
                                            </tr>
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <div className="col-12 text-center">No Tasks Found!!</div>
                ))}
                <br></br>
                {currentTasks.length > 0 && (

                    <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-700 dark:text-gray-400">
                            Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstStudent + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{indexOfLastStudent > updateField.length ? updateField.length : indexOfLastStudent}</span> of <span className="font-semibold text-gray-900 dark:text-white">{updateField.length}</span> Entries
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                            {currentPage > 1 && (
                                <button onClick={() => paginate(currentPage - 1)} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    Prev
                                </button>
                            )}
                            {currentPage < totalPages && (
                                <button onClick={() => paginate(currentPage + 1)} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default CollegeStaffSearchTask