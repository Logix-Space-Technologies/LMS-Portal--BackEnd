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

    const [updateField, setUpdateField] = useState(
        []
    )

    const [currentPage, setCurrentPage] = useState(1);
    const [studentPerPage] = useState(10); // Number of students per page

    const [isLoading, setIsLoading] = useState(true)

    const apiLink = global.config.urls.api.server + "/api/lms/searchStudent"

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        console.log(inputField)
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
                            // no data found
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
                                <h1>Search Student</h1>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">Student Name/Course/Department/Roll No/Admission No</label>
                                <input onChange={inputHandler} type="text" className="form-control" name="searchQuery" value={inputField.searchQuery} />
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
                ) : (updateField ? (
                    // start
                    <>
                        <strong style={{ paddingLeft: '30px' }}>Student Details</strong><br /><br /><br />
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                    <th scope="col" className="px-6 py-3">
                                            
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
                                        (value, index) => (
                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                    // end
                ) : (
                    <div className="col-12 text-center">No Students Found!!</div>
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
        </div>

    )
}

export default CollegeStaffSearchStudent


