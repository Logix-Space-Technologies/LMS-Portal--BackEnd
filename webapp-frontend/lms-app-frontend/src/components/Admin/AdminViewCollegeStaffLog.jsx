import React, { useEffect, useState } from 'react';
import '../../config/config';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminViewCollegeStaffLog = () => {

    const [collegeStaffLogData, setcollegeStaffLogData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [logsPerPage] = useState(10); // Number of logs per page
    const [isLoading, setIsLoading] = useState(true);
    const [key, setKey] = useState('');
    const [inputField, setInputField] = useState(
        {
            "SearchQuery": ""
        }
    )

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const apiUrl4 = global.config.urls.api.server + "/api/lms/searchCollegeStaffLog";

    const readSearchValue = () => {
        setIsLoading(true)
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let axiosConfig3 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        }
        axios.post(apiUrl4, inputField, axiosConfig3).then(
            (response) => {
                if (response.data.status === "Search Item is required.") {
                    setIsLoading(false)
                    setTimeout(() => {
                        alert(response.data.status)
                        getData()
                    }, 500)
                } else if (response.data.data) {
                    setcollegeStaffLogData(response.data.data)
                    setInputField(
                        {
                            "SearchQuery": ""
                        }
                    )
                    setIsLoading(false)
                } else if (response.data.status === "Unauthorized User!!") {
                    { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                    sessionStorage.clear()
                } else if (!response.data.data) {
                    setIsLoading(false)
                    setInputField(
                        {
                            "SearchQuery": ""
                        }
                    )
                    setTimeout(() => {
                        getData()
                        alert("No Log Found !!")
                    }, 500)
                } else {
                    setIsLoading(false)
                    setInputField(
                        {
                            "SearchQuery": ""
                        }
                    )
                    alert(response.data.status)
                }
            }
        )
    }

    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/viewClgStaffLog";

    const getData = () => {
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        axios.post(apiUrl, {}, axiosConfig).then(
            (response) => {
                if (response.data) {
                    setIsLoading(false)
                    setcollegeStaffLogData(response.data);
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/")
                        sessionStorage.clear()
                    } else {
                        if (!response.data) {
                            setIsLoading(false)
                            setcollegeStaffLogData([])
                        } else {
                            setIsLoading(false)
                            alert(response.data.status)
                        }
                    }
                }
            }
        );
    };

    useEffect(() => { getData() }, []);

    // Logic for displaying current logs
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = collegeStaffLogData ? collegeStaffLogData.slice(indexOfFirstLog, indexOfLastLog) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Total pages
    let totalPages = []
    if (collegeStaffLogData && collegeStaffLogData.length > 0) {
        totalPages = Math.ceil(collegeStaffLogData.length / logsPerPage);
    }

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * logsPerPage) + index + 1;
    }

    // Integration of new pagination logic
    const startPage = currentPage > 2 ? currentPage - 2 : 1;
    const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;

    return (
        <div>
            <Navbar />
            <br />
            <strong>Admin View College Staff Log</strong><br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="row">
                    <div className="col">
                        <div className="input-group">
                            <input onChange={inputHandler} type="text" className="form-control" name="SearchQuery" value={inputField.SearchQuery} placeholder='Action' />
                        </div>
                        <br></br>
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <button onClick={readSearchValue} className="btn btn-warning">Search</button>
                        </div>
                        <br />
                    </div>
                </div>
                {isLoading ? <div className="flex justify-center items-center h-full">
                    <div className="text-center py-20">
                        <div>Loading...</div>
                    </div>
                </div> : (<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">S/N</th>
                            <th scope="col" className="px-6 py-3">College Name</th>
                            <th scope="col" className="px-6 py-3">College Staff Name</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                            <th scope="col" className="px-6 py-3">Date Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLogs.length > 0 ? (
                            currentLogs.map((value, index) => {
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">{calculateSerialNumber(index)}</td>
                                        <td className="px-6 py-4">{value.collegeName}</td>
                                        <td className="px-6 py-4">{value.collegeStaffName}</td>
                                        <td className="px-6 py-4">{value.Action}</td>
                                        <td className="px-6 py-4">{value.DateTime}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td colSpan="5" className="px-6 py-4 text-center">
                                    No College Staff Log Found !!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>)}

                {/* Pagination */}
                {!isLoading && currentLogs.length > 0 && (
                    <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{indexOfFirstLog + 1}</span> to <span className="font-medium">{indexOfLastLog > collegeStaffLogData.length ? collegeStaffLogData.length : indexOfLastLog}</span> of <span className="font-medium">{collegeStaffLogData.length}</span> results
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
                )}
            </div>
        </div>
    );
};

export default AdminViewCollegeStaffLog;
