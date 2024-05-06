import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import '../../config/config';

const AdminViewAdStaffLog = () => {
    const [adStaffLog, setAdStaffLog] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [logsPerPage] = useState(10); // Number of logs per page
    const [isLoading, setIsLoading] = useState(true);
    const [key, setKey] = useState('');
    const [inputField, setInputField] = useState(
        {
            "SearchQuery": ""
        }
    )
    const navigate = useNavigate();
    const apiUrl = global.config.urls.api.server + "/api/lms/viewalladmstafflog";

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const apiUrl4 = global.config.urls.api.server + "/api/lms/searchAdminStaffLog";

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
                    setAdStaffLog(response.data.data)
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

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setIsLoading(true);
        const axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken")
            }
        };
        axios.post(apiUrl, {}, axiosConfig)
            .then((response) => {
                if (response.data) {
                    setAdStaffLog(response.data);
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/");
                        sessionStorage.clear();
                    } else {
                        setAdStaffLog([]);
                        if (response.data) {
                            alert(response.data.status);
                        }
                    }
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            })
            .finally(() => setIsLoading(false)); // Ensure isLoading is updated in every case
    };

    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = adStaffLog.slice(indexOfFirstLog, indexOfLastLog);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const rangeSize = 5; // Number of pages to display in the pagination
    const lastPage = Math.ceil(adStaffLog.length / logsPerPage); // Total number of pages
    let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1;
    let endPage = Math.min(startPage + rangeSize - 1, lastPage);

    // Calculate total pages
    const totalPages = Math.ceil(adStaffLog.length / logsPerPage);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * logsPerPage) + index + 1;
    };

    return (
        <div>
            <Navbar />
            <section className="bg-white dark:bg-dark py-20 lg:py-[120px]">
                <div className="container mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="flex justify-between items-center mx-4 my-4">
                                <div></div>

                                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>View Admin Staff Log</p>

                                <div></div>
                            </div>
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
                            </div> : (
                                <div className="max-w-full overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="text-center bg-primary">
                                                <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">S/N</th>
                                                <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">AdminStaff Name</th>
                                                <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">Action</th>
                                                <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">Date Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentLogs.map((value, index) => (
                                                <tr key={index}>
                                                    <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {calculateSerialNumber(index)}
                                                    </td>
                                                    <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.AdStaffName}
                                                    </td>
                                                    <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.Action}
                                                    </td>
                                                    <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.DateTime}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {!isLoading && (<div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-sm text-gray-700">
                                                    Showing <span className="font-medium">{indexOfFirstLog + 1}</span> to <span className="font-medium">{indexOfLastLog > adStaffLog.length ? adStaffLog.length : indexOfLastLog}</span> of <span className="font-medium">{adStaffLog.length}</span> results
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
                                    </div>)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminViewAdStaffLog;
