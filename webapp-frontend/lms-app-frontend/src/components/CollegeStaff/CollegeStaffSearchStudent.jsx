import React, { useState } from 'react'
import '../../config/config'
import axios from 'axios'
import ClgStaffNavbar from './ClgStaffNavbar'
import { useNavigate } from 'react-router-dom'

const CollegeStaffSearchStudent = () => {
    const [inputField, setInputField] = useState(
        {
            "collegeId": sessionStorage.getItem("clgStaffCollegeId"),
            "searchQuery": ""
        }
    )

    const navigate = useNavigate()

    const [updateField, setUpdateField] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [studentPerPage] = useState(10); // Number of students per page

    const rangeSize = 5; // Number of pages to display in the pagination
    const lastPage = Math.ceil(updateField.length / studentPerPage); // Calculate the total number of pages
    let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
    let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

    const [isLoading, setIsLoading] = useState(true)

    const apiLink = global.config.urls.api.server + "/api/lms/searchStudent"

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
                        "searchQuery": ""
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
    const indexOfLastStudent = currentPage * studentPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentPerPage;
    const currentStudents = updateField ? updateField.slice(indexOfFirstStudent, indexOfLastStudent) : [];


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(updateField.length / studentPerPage);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * studentPerPage) + index + 1;
    }

    return (
        <div>
            <ClgStaffNavbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <h1>Search Student</h1>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <input onChange={inputHandler} type="text" placeholder='Student Name/Course/Department/Roll No/Admission No' className="form-control" name="searchQuery" value={inputField.searchQuery} />
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
                ) : (currentStudents && currentStudents.length > 0 ? (
                    // start
                    <>
                        <strong style={{ paddingLeft: '30px' }}>Student Details</strong><br /><br /><br />
                        <div className="relative overflow-x shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">

                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            S/L
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Department
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Course
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Admission No.
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Roll No.
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Phone
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Aadhar No
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Batch Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Membership No.
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Expiry
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentStudents.map(
                                        (value, index) => {
                                            return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="p-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                            <img
                                                                className="w-18 h-14 flex-shrink-0 mr-2 sm:mr-3"
                                                                src={value.studProfilePic}
                                                                width="60px"
                                                                height="64px"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {calculateSerialNumber(index)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {value.studName}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {value.studDept}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {value.course}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {value.admNo}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {value.rollNo}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {value.studEmail}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {value.studPhNo}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {value.aadharNo}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {value.batchName}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {value.membership_no}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {value.validity}
                                                </td>
                                            </tr>
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{indexOfFirstStudent + 1}</span> to <span className="font-medium">{indexOfLastStudent > updateField.length ? updateField.length : indexOfLastStudent}</span> of <span className="font-medium">{updateField.length}</span> results
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
                    // end
                ) : (
                    <div className="col-12 text-center">No Students Found!!</div>
                ))}

                <br></br>
            </div>
        </div>
    )
}

export default CollegeStaffSearchStudent


