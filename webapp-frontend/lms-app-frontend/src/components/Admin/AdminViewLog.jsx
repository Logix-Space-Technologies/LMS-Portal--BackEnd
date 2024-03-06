import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import '../../config/config';
import { useNavigate } from 'react-router-dom';

const AdminViewLog = () => {

    const [AdminLogData, setAdminLogData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [logsPerPage] = useState(10); // Number of logs per page

    const navigate = useNavigate()

    const rangeSize = 5; // Number of pages to display in the pagination
    const lastPage = Math.ceil(AdminLogData.length / logsPerPage); // Calculate the total number of pages
    let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
    let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

    const apiUrl = global.config.urls.api.server + "/api/lms/viewAdminLog";

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
                    setAdminLogData(response.data);
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/")
                        sessionStorage.clear()
                    } else {
                        if (!response.data) {
                            setAdminLogData([])
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            }
        );
    };

    // Logic for displaying current logs
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = AdminLogData ? AdminLogData.slice(indexOfFirstLog, indexOfLastLog) : [];

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => { getData(); }, []);

    // Calculate total pages
    const totalPages = Math.ceil(AdminLogData.length / logsPerPage);

    return (
        <div>
            <Navbar />
            <br />
            <strong>Admin View Log</strong><br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">S/N</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                            <th scope="col" className="px-6 py-3">DateTime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLogs.length > 0 ? (
                            currentLogs.map((value, index) => {
                                // Calculate the serial number based on the current page and index
                                const serialNumber = (currentPage - 1) * logsPerPage + index + 1;
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">{serialNumber}</td>
                                        <td className="px-6 py-4">Admin</td>
                                        <td className="px-6 py-4">{value.Action}</td>
                                        <td className="px-6 py-4">{value.DateTime}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td colSpan="3" className="px-6 py-4 text-center">No Admin log Found !!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{indexOfFirstLog + 1}</span> to <span className="font-medium">{indexOfLastLog > AdminLogData.length ? AdminLogData.length : indexOfLastLog}</span> of <span className="font-medium">{AdminLogData.length}</span> results
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
    );
};

export default AdminViewLog;
