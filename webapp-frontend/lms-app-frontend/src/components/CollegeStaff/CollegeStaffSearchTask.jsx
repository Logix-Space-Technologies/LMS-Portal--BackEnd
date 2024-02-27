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
                            //no data found
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

    // Total pages
    const pageNumbers = [];
    if (updateField && updateField.length > 0) {
        updateField.forEach((student, index) => {
            const pageNumber = index + 1;
            pageNumbers.push(pageNumber);
        });
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
                ) : (updateField ? (
                    <>
                        <header className="px-5 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-2xl text-gray-800">List of Tasks</h2>
                        </header>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
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
                <div className="flex justify-center mt-8">
                    <nav>
                        <ul className="flex list-style-none">
                            {currentPage > 1 && (
                                <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                    Previous
                                </li>
                            )}
                            {pageNumbers.map(number => (
                                <li key={number} onClick={() => paginate(number)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    {number}
                                </li>
                            ))}
                            {currentPage < pageNumbers.length && (
                                <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                    Next
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </div >
    )
}

export default CollegeStaffSearchTask