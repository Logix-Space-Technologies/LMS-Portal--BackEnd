import React, { useEffect, useState } from 'react';
import '../../config/config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CollegeStaffViewAttendance = () => {
    const [clgStaffViewAttendance, setClgStaffViewAttendance] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [attendancePerPage] = useState(10); // Number of students per page

    const rangeSize = 5; // Number of pages to display in the pagination
    const lastPage = Math.ceil(clgStaffViewAttendance.length / attendancePerPage); // Calculate the total number of pages
    let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
    let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

    const apiUrl = global.config.urls.api.server + '/api/lms/colgstaffviewattendance';

    const navigate = useNavigate()

    const getData = () => {
        const data = { "sessionId": sessionStorage.getItem("viewattendanceid") };
        const axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": sessionStorage.getItem("clgstaffLogintoken"),
                "key": sessionStorage.getItem("clgstaffkey")
            },
        };
        axios.post(apiUrl, data, axiosConfig).then((response) => {
            if (response.data.data) {
                setClgStaffViewAttendance(response.data.data);
            } else {
                if (response.data.status === "Unauthorized User!!") {
                    sessionStorage.clear()
                    navigate("/clgStafflogin")
                } else {
                    if (!response.data.data) {
                        //no data found
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        });
    };

    // Logic for displaying current students
    const indexOfLastStudent = currentPage * attendancePerPage;
    const indexOfFirstStudent = indexOfLastStudent - attendancePerPage;
    const currentAttendances = clgStaffViewAttendance ? clgStaffViewAttendance.slice(indexOfFirstStudent, indexOfLastStudent) : [];


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(clgStaffViewAttendance.length / attendancePerPage);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * attendancePerPage) + index + 1;
    }

    useEffect(() => { getData() }, []);

    return (
        <div>
            <div className="flex justify-between items-center mt-8 ml-4 mb-4">
                <h2 className="text-lg font-bold">College Staff View Attendance</h2>
                <Link to="/clgstaffviewsession" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginRight: '20px' }}>Back</Link>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S/L
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Session Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Membership_no
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Student Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAttendances ? (currentAttendances.map((value, index) => {
                            const isPresent = value.attendence_status.toLowerCase() === 'present';
                            const buttonClassName = isPresent ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700';
                            return (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4 whitespace-nowrap">
                                        {calculateSerialNumber(index)}
                                    </td >
                                    <td className="p-4 whitespace-nowrap">
                                        {value.sessionName}
                                    </td >
                                    <td className="p-4 whitespace-nowrap">
                                        {value.date}
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                        {value.membership_no}
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                        {value.studName}
                                    </td>

                                    <td className={`p-4 whitespace-nowrap`}>
                                        <div className="w-max">
                                            <button className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none py-0.5 px-1 text-xs rounded-md ${buttonClassName}`} style={{ opacity: 1 }}>
                                                {isPresent ? 'Present' : 'Absent'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })) : (
                            <td colSpan="8" className="px-6 py-4">
                                No Attendance Record Found !!!
                            </td>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{indexOfFirstStudent + 1}</span> to <span className="font-medium">{indexOfLastStudent > clgStaffViewAttendance.length ? clgStaffViewAttendance.length : indexOfLastStudent}</span> of <span className="font-medium">{clgStaffViewAttendance.length}</span> results
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
    )
}

export default CollegeStaffViewAttendance