import React, { useEffect, useState } from 'react';
import '../../config/config';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const AdminViewAdStaffLog = () => {

    const [adStaffLog, setAdStaffLog] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [logsPerPage] = useState(10); // Number of logs per page

    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/viewalladmstafflog";

    const getData = () => {
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken")
            }
        };
        axios.post(apiUrl, {}, axiosConfig).then(
            (response) => {
                if (response.data) {
                    setAdStaffLog(response.data);
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/")
                        sessionStorage.clear()
                    } else {
                        if (!response.data) {
                            setAdStaffLog([]);
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
    const currentLogs = adStaffLog ? adStaffLog.slice(indexOfFirstLog, indexOfLastLog) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const rangeSize = 5; // Number of pages to display in the pagination
    const lastPage = Math.ceil(adStaffLog.length / logsPerPage); // Calculate the total number of pages
    let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
    let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

    // Calculate total pages
    const totalPages = Math.ceil(adStaffLog.length / logsPerPage);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * logsPerPage) + index + 1;
    }


    useEffect(() => { getData() }, []);

    return (
        <div>
            <Navbar />
            <div>
                {/* ====== Table Section Start */}
                <section className="bg-white dark:bg-dark py-20 lg:py-[120px]">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full px-4">
                                <h1>Admin Staff Log</h1>
                                <br />
                                <div className="max-w-full overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="text-center bg-primary">
                                                <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                    S/N
                                                </th>
                                                <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                    AdminStaff Name
                                                </th>
                                                <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                    Action
                                                </th>
                                                <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentLogs.map(
                                                (value, index) => {
                                                    return <tr key={index}>
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
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                    <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ====== Table Section End */}
            </div>
        </div>
    );
};

export default AdminViewAdStaffLog;
