import axios from 'axios'
import React, { useState } from 'react'
import '../../config/config'
import ClgStaffNavbar from './ClgStaffNavbar'
import { useNavigate } from 'react-router-dom'

const CollegeStaffSearchBatch = () => {
    const [inputField, setInputField] = useState(
        {
            "collegeId": sessionStorage.getItem("clgStaffCollegeId"),
            "clgStaffBatchSearchQuery": ""
        }
    )

    const [currentPage, setCurrentPage] = useState(1);
    const [batchPerPage] = useState(10); // Number of students per page

    const [updateField, setUpdateField] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const apiLink = global.config.urls.api.server + "/api/lms/clgStaffSearchBatch"

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
                        "clgStaffBatchSearchQuery": ""
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
    const indexOfLastStudent = currentPage * batchPerPage;
    const indexOfFirstStudent = indexOfLastStudent - batchPerPage;
    const currentBatch = updateField ? updateField.slice(indexOfFirstStudent, indexOfLastStudent) : [];


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(updateField.length / batchPerPage);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * batchPerPage) + index + 1;
    }


    return (
        <div>
            <ClgStaffNavbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <h1>Search Batch</h1>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <input onChange={inputHandler} type="text" className="form-control" placeholder='Batch Name/Batch Description/College Name' name="clgStaffBatchSearchQuery" value={inputField.clgStaffBatchSearchQuery} />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <button onClick={readValue} className="btn btn-warning">Search</button><br /><br />
                            </div>
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <div className="col-12 text-center">
                        <p></p>
                    </div>
                ) : (currentBatch && currentBatch.length > 0 ? (
                    <>
                        <strong style={{ paddingLeft: '30px' }}>Batch Details</strong><br /><br /><br />
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            S/L
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            College Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Batch Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Batch Description
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Batch Amount
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Registration Start Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Registration End Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentBatch.map(
                                        (value, index) => {
                                            return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="px-6 py-4">
                                                    {calculateSerialNumber(index)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {value.collegeName}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {value.batchName}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {value.batchDesc}
                                                </td>
                                                <td className="px-6 py-4" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src="https://www.svgrepo.com/show/389251/indian-rupee.svg" alt="rupee" style={{ marginRight: '8px', height: '15px' }} />
                                                    {value.batchAmount}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {value.regStartDate}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {value.regEndDate}
                                                </td>
                                            </tr>
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <div className="col-12 text-center">No Batch Found!!</div>
                ))}
                <br></br>
                {currentBatch.length > 0 && (

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
        </div>
    );

}

export default CollegeStaffSearchBatch