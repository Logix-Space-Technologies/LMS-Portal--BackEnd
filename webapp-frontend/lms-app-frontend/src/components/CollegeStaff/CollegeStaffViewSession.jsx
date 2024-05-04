import React, { useEffect, useState } from 'react'
import '../../config/config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ClgStaffNavbar from './ClgStaffNavbar';

const CollegeStaffViewSession = () => {

    const [inputField, setInputField] = useState(
        {
            "batchId": sessionStorage.getItem("clgstaffbatchId"),
            "clgStaffSearchSessionQuery": ""
        }
    )

    const [sessionData, setSessionData] = useState([])
    const [loading, setLoading] = useState(true);
    const [filterCriteria, setFilterCriteria] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [sessionsPerPage] = useState(10); // Number of students per page

    const rangeSize = 5; // Number of pages to display in the pagination
    const lastPage = Math.ceil(sessionData.length / sessionsPerPage); // Calculate the total number of pages
    let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
    let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/ClgStaffViewSession";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/clgStaffSearchSession";

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setInputField({ ...inputField, [name]: value });
    };

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
                        setLoading(false)
                        setSessionData([])
                    } else {
                        setLoading(false)
                        alert(response.data.status)
                    }
                }
            }
        });
    };

    const searchSession = () => {
        setLoading(true);
        const axiosConfig3 = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("clgstaffLogintoken"),
                "key": sessionStorage.getItem("clgstaffkey")
            }
        };
        const data = {
            "clgStaffSearchSessionQuery": inputField.clgStaffSearchSessionQuery,
            "batchId": sessionStorage.getItem("clgstaffbatchId")
        }
        axios.post(apiUrl2, data, axiosConfig3).then((response) => {
            if (response.data.data) {
                setSessionData(response.data.data);
                setInputField({ "clgStaffSearchSessionQuery": "" })
                setLoading(false);
            } else if (response.data.status === "Unauthorized User!!") {
                sessionStorage.clear()
                navigate("/clgStafflogin")
            } else if (!response.data.data) {
                setLoading(false);
                setInputField({ "clgStaffSearchSessionQuery": "" })
                setTimeout(() => {
                    getData();
                    alert("No Session Found !!")
                }, 500)
            } else {
                alert(response.data.status)
                setInputField({ "clgStaffSearchSessionQuery": "" })
                setLoading(false);
            }
        })
    };

    // Function to filter sessions based on date criteria
    const filterSessionsByDate = () => {
        if (!filterCriteria) {
            return sessionData; // If no filter is selected, return all sessions
        }

        // Calculate date range based on filter criteria
        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setMonth(startDate.getMonth() - filterCriteria);

        // Convert session dates to Date objects for comparison
        const filteredSessions = sessionData.filter(session => {
            const sessionDateParts = session.date.split('/');
            const sessionDate = new Date(`${sessionDateParts[1]}/${sessionDateParts[0]}/${sessionDateParts[2]}`);
            return sessionDate >= startDate && sessionDate <= currentDate;
        });

        return filteredSessions;
    };

    const taskScore = (id, sessionName) => {
        sessionStorage.setItem("ViewsessionperformanceSessionId", id)
        sessionStorage.setItem("ViewsessionperformanceSessionName", sessionName)
        navigate("/clgStaffviewSessionWisePerformance")
    }

    function formatTime(timeString) {
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], options);
    }

    const viewsessionId = (attendanceid) => {
        sessionStorage.setItem("viewattendanceid", attendanceid)
        navigate("/clgstaffviewattendance")
    }

    const downloadAttendancePDF = (attendanceid) => {
        sessionStorage.setItem("downloadattendanceid", attendanceid)
        navigate("/clgstaffdownloadsessionattendancelist")
    }

    const viewtasksessionId = (attendanceid, sessionName) => {
        sessionStorage.setItem("viewattendanceid", attendanceid)
        sessionStorage.setItem("viewsessionName", sessionName)
        navigate("/clgstaffviewtask")
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

    // Function to handle filter criteria change
    const handleFilterChange = (event) => {
        const selectedCriteria = parseInt(event.target.value);
        setFilterCriteria(selectedCriteria);
    };

    // Logic for displaying current students
    const indexOfLastSession = currentPage * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const filteredSessions = filterSessionsByDate();
    const currentSession = filteredSessions.slice(indexOfFirstSession, indexOfLastSession);


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages based on filtered session data
    const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * sessionsPerPage) + index + 1;
    }

    function isSpecialDomain(venueLink) {
        const domains = ["meet.google.com", "zoom.us", "youtube.com", "vimeo.com", "teams.microsoft.com"];
        return domains.some(domain => venueLink.includes(domain));
    }

    return (
        <div>
            <div>
                <ClgStaffNavbar />
                <br />
                <br />
                <div className="flex justify-between items-center mt-8 ml-4 mb-4">
                    <h2 className="text-lg font-bold">View All Session</h2>
                    <Link to="/collegeStaffViewBatch" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginRight: '20px' }}>Back</Link>
                </div>
                <br /><br />
                <div className="row">
                    <div className="col">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Session name, Type, or Trainer Name..."
                                value={inputField.clgStaffSearchSessionQuery}
                                onChange={inputHandler}
                                name="clgStaffSearchSessionQuery"
                            />
                        </div>
                        <br></br>
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <button onClick={searchSession} className="btn btn-warning">Search</button>
                        </div>
                        <br />
                    </div>
                </div>
                <br />
                {loading ? <div className="col-12 text-center">Loading...</div> : <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                                    Trainer Name
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
                                            {value.remarks ? (value.remarks) : <p>NIL</p>}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.trainerName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {isSpecialDomain(value.venueORlink) ? (
                                                <Link to={value.venueORlink} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline' }}>{value.venueORlink}</Link>
                                            ) : (
                                                value.venueORlink
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.cancelStatus}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.cancelStatus === "ACTIVE" && (
                                                <button className="btn btn-primary" onClick={() => downloadAttendancePDF(value.id)} disabled={!sessionIsPast}>
                                                    Download Attendance List PDF
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.cancelStatus === "ACTIVE" && (
                                                <button onClick={() => viewsessionId(value.id)} type="button" class="btn btn-primary" disabled={!sessionIsPast}>
                                                    View Attendance List
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.cancelStatus === "ACTIVE" && (
                                                <button onClick={() => viewtasksessionId(value.id, value.sessionName)} type="button" class="btn btn-primary" disabled={!sessionIsPast}>
                                                    View Tasks
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => taskScore(value.id, value.sessionName)} className="btn btn-primary" style={{ marginRight: '20px' }} disabled={!sessionIsPast}>
                                                View Performance
                                            </button>
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
                                <div className="flex items-center">
                                    <label htmlFor="filterCriteria" className="mr-2" style={{ whiteSpace: 'nowrap' }}>Filter by Date:</label>
                                    <select style={{ marginRight: '20px' }} id="filterCriteria" className="form-select" value={filterCriteria || ''} onChange={handleFilterChange}>
                                        <option value="">Select Filter</option>
                                        <option value="1">Within 1 month</option>
                                        <option value="2">Within 2 months</option>
                                        <option value="3">Within 3 months</option>
                                        <option value="4">Within 4 months</option>
                                        <option value="5">Within 5 months</option>
                                    </select>
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
                </div>}
                <div>
                </div>
            </div>
        </div>
    )
}

export default CollegeStaffViewSession