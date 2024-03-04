import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import '../../config/config';

const AdminViewLog = () => {
    
    const [AdminLogData, setAdminLogData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [logsPerPage] = useState(10); // Number of logs per page

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
                setAdminLogData(response.data);
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
                {/* Pagination */}
                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                        Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstLog + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{indexOfLastLog > AdminLogData.length ? AdminLogData.length : indexOfLastLog}</span> of <span className="font-semibold text-gray-900 dark:text-white">{AdminLogData.length}</span> Entries
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
            </div>
        </div>
    );
};

export default AdminViewLog;
