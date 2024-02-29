import React, { useEffect, useState } from 'react';
import '../../config/config';
import axios from 'axios';
import Navbar from './Navbar';

const AdminViewAdStaffLog = () => {
    
    const [adStaffLog, setAdStaffLog] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [logsPerPage] = useState(10); // Number of logs per page

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
                setAdStaffLog(response.data);
            }
        );
    };

    // Logic for displaying current logs
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = adStaffLog ? adStaffLog.slice(indexOfFirstLog, indexOfLastLog) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

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
                                                            {index+1}
                                                        </td>
                                                        <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                            {value.AdStaffName}
                                                        </td>
                                                        <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                            {value.Action}
                                                        </td>
                                                        <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                            {new Date(value.DateTime).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-center mt-8">
                                    <nav>
                                        <ul className="flex list-style-none">
                                            {currentPage > 1 && (
                                                <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                                    Previous
                                                </li>
                                            )}
                                            {Array.from({ length: Math.ceil(adStaffLog.length / logsPerPage) }, (_, i) => (
                                                <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                                    {i + 1}
                                                </li>
                                            ))}
                                            {currentPage < Math.ceil(adStaffLog.length / logsPerPage) && (
                                                <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                                    Next
                                                </li>
                                            )}
                                        </ul>
                                    </nav>
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
