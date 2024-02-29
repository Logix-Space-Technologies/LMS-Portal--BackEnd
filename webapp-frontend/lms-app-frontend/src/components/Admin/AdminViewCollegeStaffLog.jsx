import React, { useEffect, useState } from 'react';
import '../../config/config';
import Navbar from './Navbar';
import axios from 'axios';

const AdminViewCollegeStaffLog = () => {
    
    const [collegeStaffLogData, setcollegeStaffLogData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [logsPerPage] = useState(10); // Number of logs per page

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
                setcollegeStaffLogData(response.data);
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

    return (
        <div>
            <Navbar />
            <br />
            <strong>Admin View College Staff Log</strong><br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">S/N</th>
                            <th scope="col" className="px-6 py-3">College Staff Name</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLogs.length > 0 ? (
                            currentLogs.map((value, index) => {
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">{index+1}</td>
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
                </table>
                {/* Pagination */}
                <div className="flex justify-center mt-8">
                    <nav>
                        <ul className="flex list-style-none">
                            {currentPage > 1 && (
                                <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                    Previous
                                </li>
                            )}
                            {Array.from({ length: Math.ceil(collegeStaffLogData.length / logsPerPage) }, (_, i) => (
                                <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    {i + 1}
                                </li>
                            ))}
                            {currentPage < Math.ceil(collegeStaffLogData.length / logsPerPage) && (
                                <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                    Next
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default AdminViewCollegeStaffLog;
