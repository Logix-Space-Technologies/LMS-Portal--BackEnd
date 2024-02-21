import React, { useEffect, useState } from 'react';
import '../../config/config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CollegeStaffViewAttendance = () => {
    const [clgStaffViewAttendance, setClgStaffViewAttendance] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [attendancePerPage] = useState(10); // Number of students per page

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

    // Total pages
    const pageNumbers = [];
    if (clgStaffViewAttendance && clgStaffViewAttendance.length > 0) {
        clgStaffViewAttendance.forEach((student, index) => {
            const pageNumber = index + 1;
            pageNumbers.push(pageNumber);
        });
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

                            console.log('attendence_status:', value.attendence_status);
                            return (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
        </div>
    )
}

export default CollegeStaffViewAttendance