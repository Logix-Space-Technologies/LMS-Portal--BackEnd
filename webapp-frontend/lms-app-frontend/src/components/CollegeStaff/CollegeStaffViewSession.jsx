import React, { useEffect, useState } from 'react'
import '../../config/config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CollegeStaffViewSession = () => {
    const [sessionData, setSessionData] = useState([])
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [sessionsPerPage] = useState(10); // Number of students per page

    const rangeSize = 5; // Number of pages to display in the pagination
    const lastPage = Math.ceil(sessionData.length / sessionsPerPage); // Calculate the total number of pages
    let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
    let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/ClgStaffViewSession";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/GenerateSessionWiseAttendancePdf";

    const getData = () => {
        const data = { "batchId": sessionStorage.getItem("clgstaffbatchId") };
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
                setSessionData(response.data.data);
                setLoading(false)
            } else {
                if (response.data.status === "Unauthorized access!!") {
                    sessionStorage.clear()
                    navigate("/clgStafflogin")
                } else {
                    if (!response.data.data) {
                        //No Data Found !!!
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        });
    };

    const attendancePdfGenerate = async (id) => {
        try {
            const data = { "sessionId": id }
            const axiosConfig2 = {
                headers: {
                    "Content-Type": "application/json",
                    "token": sessionStorage.getItem("clgstaffLogintoken"),
                    "key": sessionStorage.getItem("clgstaffkey")
                },
                responseType: 'blob', // Set responseType to 'blob' for PDF
            };

            const response = await axios.post(apiUrl2, data, axiosConfig2);

            if (response.data) {
                // Use window.open directly with response.data
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                window.open(URL.createObjectURL(pdfBlob), '_blank');
            } else {
                if (response.data.status === "Unauthorized User!!") {
                    sessionStorage.clear()
                    navigate("/clgStafflogin")
                } else {
                    if (!response.data) {
                        alert("No Data Found !!")
                    } else {
                        alert(response.data.status);
                    }
                }
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF.');
        }
    }

    function formatTime(timeString) {
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], options);
    }

    const viewsessionId = (attendanceid) => {
        sessionStorage.setItem("viewattendanceid", attendanceid)
    }

    useEffect(() => { getData() }, []);

    const isSessionPast = (sessionDate, sessionTime) => {
        // Split sessionDate and sessionTime strings
        const dateParts = sessionDate.split('/');
        const timeParts = sessionTime.split(':');

        // Parse date and time components
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Adjust month to be zero-indexed
        const year = parseInt(dateParts[2], 10);
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);

        // Create a Date object for the session's date and time
        const sessionDateTime = new Date(year, month, day, hours, minutes);

        // Get the current date and time
        const currentTime = new Date();

        // Return true if the session date-time is in the past
        return sessionDateTime < currentTime;
    };

    // Logic for displaying current students
    const indexOfLastSession = currentPage * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const currentSession = sessionData ? sessionData.slice(indexOfFirstSession, indexOfLastSession) : [];


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(sessionData.length / sessionsPerPage);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * sessionsPerPage) + index + 1;
    }


    return (
        <div>
            <div>
                <br />
                <br />
                <div className="flex justify-between items-center mt-8 ml-4 mb-4">
                    <h2 className="text-lg font-bold">College Staff View Session</h2>
                    <Link to="/collegeStaffViewBatch" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginRight: '20px' }}>Back</Link>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                    Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Remarks
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Venue Or Link
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentSession.length > 0 ? currentSession.map((value, index) => {
                                // Check if the session is in the past
                                const sessionIsPast = isSessionPast(value.date, value.time);
                                return (
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <td className="p-4 whitespace-nowrap">
                                            {calculateSerialNumber(index)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.sessionName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.date}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatTime(value.time)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.type}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.remarks}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.venueORlink}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.cancelStatus}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.cancelStatus === "ACTIVE" && (
                                                <button className="btn btn-primary" onClick={() => attendancePdfGenerate(value.id)} disabled={!sessionIsPast}>
                                                    Download Attendance List PDF
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.cancelStatus === "ACTIVE" && (
                                                <Link to="/clgstaffviewattendance" onClick={() => viewsessionId(value.id)} type="button" class="btn btn-primary">
                                                    View Attendance List
                                                </Link>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.cancelStatus === "ACTIVE" && (
                                                <Link to="/clgstaffviewtask" onClick={() => viewsessionId(value.id)} type="button" class="btn btn-primary">
                                                    View Tasks
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                );
                            }) : (<td colSpan="8" className="px-6 py-4" style={{ textAlign: "center" }}>
                                No Sessions Found !!!
                            </td>)}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{indexOfFirstSession + 1}</span> to <span className="font-medium">{indexOfLastSession > sessionData.length ? sessionData.length : indexOfLastSession}</span> of <span className="font-medium">{sessionData.length}</span> results
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
                <div>
                </div>
            </div>
        </div>
    )
}

export default CollegeStaffViewSession