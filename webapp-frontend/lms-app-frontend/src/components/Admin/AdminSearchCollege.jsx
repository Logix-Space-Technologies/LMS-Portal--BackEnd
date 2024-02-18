import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import '../../config/config'
import { useNavigate } from 'react-router-dom'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar'

const AdminSearchCollege = () => {

    const [inputField, setInputField] = useState(
        {
            "collegeSearchQuery": ""
        }
    )

    const [updateField, setUpdateField] = useState([])

    const [key, setKey] = useState('');

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(1); // Number of students per page

    const apiUrl = global.config.urls.api.server + "/api/lms/searchCollege"

    const apiUrlTwo = global.config.urls.api.server + "/api/lms/deleteCollege"

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        console.log(inputField)
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        }
        console.log(currentKey)
        axios.post(apiUrl, inputField, axiosConfig).then(
            (response) => {
                setUpdateField(response.data.data)
                setIsLoading(false)
                console.log(response.data)
                setInputField(
                    {
                        "collegeSearchQuery": ""
                    }
                )
            }
        )
    }

    const handleClick = (id) => {
        let data = { "id": id }
        let axiosConfigTwo = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        }
        axios.post(apiUrlTwo, data, axiosConfigTwo).then(
            (response) => {
                if (response.data.status === "College deleted.") {
                    alert("College Deleted Successfully!!!")
                    // Reload the page after deleting college
                    window.location.reload();
                } else {
                    alert(response.data.status)
                }
            }
        )
    }

    const UpdateClick = (id) => {
        let data = id
        sessionStorage.setItem("clgId", data)
        navigate("/adminUpdateclg")
    }

    // Logic for displaying current students
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentColleges = updateField ? updateField.slice(indexOfFirstStudent, indexOfLastStudent) : [];


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

    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);

    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}<br />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <h1>Search College</h1>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">College Name/College Address/Website/Email/College Contact Number</label>
                                <input onChange={inputHandler} type="text" className="form-control" name="collegeSearchQuery" value={inputField.collegeSearchQuery} />
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
                    //start
                    <div>
                        <br />
                        <strong>List of Colleges</strong>
                        <br /><br />
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                {/* Table headers */}
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3">College Name</th>
                                        <th scope="col" className="px-6 py-3">College Address</th>
                                        <th scope="col" className="px-6 py-3">Website</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">College Phone No.</th>
                                        <th scope="col" className="px-6 py-3">College Mobile No.</th>
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Table rows */}
                                    {/* Table rows */}
                                    {currentColleges.map((value, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                        <img
                                                            className="rounded mx-auto d-block"
                                                            src={value.collegeImage}
                                                            width="150px"
                                                            height="140px"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{value.collegeName}</td> {/* Corrected closing tag */}
                                            <td className="px-6 py-4">{value.collegeAddress}</td>
                                            <td className="px-6 py-4">{value.website}</td>
                                            <td className="px-6 py-4">{value.email}</td>
                                            <td className="px-6 py-4">{value.collegePhNo}</td>
                                            <td className="px-6 py-4">{value.collegeMobileNumber}</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <button onClick={() => { UpdateClick(value.id) }} className="btn btn-success p-3 font-medium text-white-600 hover:text-blue-500 shadow-lg">Update</button>
                                            </td>
                                            {key === 'lmsapp' && (
                                                <td className="p-4 whitespace-nowrap">
                                                    <button onClick={() => { handleClick(value.id) }} className="btn btn-danger p-3 font-medium text-white-600 hover:text-blue-500 shadow-lg">Delete</button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    //end

                ) : (
                    <div className="col-12 text-center">No Colleges Found!!</div>
                ))}
            </div>
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
        </div >
    )
}

export default AdminSearchCollege