import React, { useEffect, useState } from 'react'
import '../../config/config'
import axios from 'axios'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar'

const AdminViewAllCollege = () => {

    const [collegeData, setCollegeData] = useState([])
    const [key, setKey] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [collegesPerPage] = useState(10); // Number of colleges per page
    const [deleteCollege, setDeleteCollege] = useState({})

    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/viewallcolleges"

    const apiUrlTwo = global.config.urls.api.server + "/api/lms/deleteCollege"

    const getData = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        }
        axios.post(apiUrl, {}, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setCollegeData(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        {key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin")}
                        sessionStorage.clear()
                    } else {
                        if (!response.data.data) {
                            setCollegeData([])
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            }
        )
    }

    const handleClick = () => {
        let data = { "id": deleteCollege }
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
                    getData();
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/")
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    const UpdateClick = (id) => {
        let data = id
        sessionStorage.setItem("clgId", data)
    }

    const readValue = (id) => {
        setDeleteCollege(id)
    };

    // Logic for displaying current colleges
    const indexOfLastCollege = currentPage * collegesPerPage;
    const indexOfFirstCollege = indexOfLastCollege - collegesPerPage;
    const currentColleges = collegeData ? collegeData.slice(indexOfFirstCollege, indexOfLastCollege) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Total pages
    let totalPages = []
    if (collegeData && collegeData.length > 0) {
        totalPages = Math.ceil(collegeData.length / collegesPerPage);
    }

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * collegesPerPage) + index + 1;
    }

    // Integration of new pagination logic
    const startPage = currentPage > 2 ? currentPage - 2 : 1;
    const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;

    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);

    useEffect(() => { getData() }, [])

    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
            <br />
            <div className="flex justify-between items-center mx-4 my-4">

                <strong>View All Colleges</strong>

                <div></div>
            </div>
            <br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S/N
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                College Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Website
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone No:
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mobile No:
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            {key === 'lmsapp' && (
                                <th scope="col" className="px-6 py-3">

                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentColleges.map((value, index) => {
                            return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">
                                    {calculateSerialNumber(index)}
                                </td>
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={value.collegeImage} alt="" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{value.collegeName}</div>
                                        <div className="font-normal text-gray-500">{value.email}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {value.collegeCode}
                                </td>
                                <td className="px-6 py-4">
                                    {value.collegeAddress}
                                </td>
                                <td className="px-6 py-4">
                                    {value.website}
                                </td>
                                <td className="px-6 py-4">
                                    {value.collegePhNo}
                                </td>
                                <td className="px-6 py-4">
                                    {value.collegeMobileNumber}
                                </td>
                                <td className="px-6 py-4">
                                    <Link to="/adminviewallbatches" onClick={() => { UpdateClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View Batches</Link>
                                </td>
                                <td className="px-6 py-4">
                                    <Link to="/adminUpdateclg" onClick={() => { UpdateClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update College</Link>
                                </td>
                                {key === 'lmsapp' && (
                                    <td className="px-6 py-4">
                                        <Link onClick={() => { readValue(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete College</Link>
                                    </td>
                                )}
                            </tr>
                        })}

                        {currentColleges.length === 0 && (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td colSpan="8" className="px-6 py-4" style={{ textAlign: 'center' }}>
                                    No Colleges Found !!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to delete this college?</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>This action cannot be undone.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No, cancel</button>
                                <button onClick={() => { handleClick() }} type="button" className="btn btn-danger" data-bs-dismiss="modal">Yes, I'm sure</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{indexOfFirstCollege + 1}</span> to <span className="font-medium">{indexOfLastCollege > collegeData.length ? collegeData.length : indexOfLastCollege}</span> of <span className="font-medium">{collegeData.length}</span> results
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

        </div >

    )
}

export default AdminViewAllCollege
