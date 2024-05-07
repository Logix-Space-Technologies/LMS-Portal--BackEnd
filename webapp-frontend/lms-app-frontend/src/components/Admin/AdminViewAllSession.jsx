import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';
import '../../config/config';

const QRCodeModal = ({ qrCodeAttendance, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-4">
                    <h2 className="text-xl font-semibold">Attendance QR Code</h2>
                </div>
                <div className="flex justify-center">
                    {/* Adjust size of QR code by setting width and height */}
                    <QRCodeCanvas value={qrCodeAttendance} size={500} />
                </div>
                <div className="flex justify-center mt-4">
                    <button onClick={onClose} className="btn btn-primary">Close</button>
                </div>
            </div>
        </div>
    );
};

const AdminViewAllSession = () => {
    const [sessionData, setSessionData] = useState([]);
    const [qrCodeAttendance, setQrCodeAttendance] = useState(null);
    const [showQRModal, setShowQRModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showWaitingModal, setShowWaitingModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay
    const [currentPage, setCurrentPage] = useState(1);
    const [sessionsPerPage] = useState(10); // Number of sessions per page
    const navigate = useNavigate();
    const [key, setKey] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [inputField, setInputField] = useState({ "SessionSearchQuery": "" });
    const [filterCriteria, setFilterCriteria] = useState(null);
    const BatchName = sessionStorage.getItem('viewsessionbatchName')

    const searchApiLink = global.config.urls.api.server + "/api/lms/searchSession";
    const apiUrl = global.config.urls.api.server + "/api/lms/viewSessions";
    const apiUrlTwo = global.config.urls.api.server + "/api/lms/cancelSession";
    const deleteApiLink = global.config.urls.api.server + "/api/lms/deleteSessions";
    const remainderApiLink = global.config.urls.api.server + "/api/lms/sendSessionRemainderEmail";

    const closeWaitingModal = () => {
        setShowOverlay(false)
        setShowWaitingModal(false)
    }

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        // Retrieve key and token from sessionStorage without providing the key
        let currentKey, token;
        Object.entries(sessionStorage).forEach(([key, value]) => {
            if (key.includes('key')) {
                currentKey = value;
            } else if (key.includes('token')) {
                token = value;
            }
        });

        // Update the state with the current key
        setKey(currentKey);
        setIsLoading(true);
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };
        const data = {
            "SessionSearchQuery": inputField.SessionSearchQuery,
            "collegeId": sessionStorage.getItem("clgId"),
            "batchId": sessionStorage.getItem("viewbatchId")
        }

        axios.post(searchApiLink, data, axiosConfig).then((response) => {
            if (response.data.status === "Search Item is required.") {
                setIsLoading(false)
                setTimeout(() => {
                    alert(response.data.status)
                    getData()
                }, 500)
            } else if (response.data.data) {
                setSessionData(response.data.data);
                setIsLoading(false);
                setInputField({ "SessionSearchQuery": "" });
            } else if (response.data.status === "Unauthorized User!!") {
                { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                sessionStorage.clear()
            } else if (!response.data.data) {
                setIsLoading(false);
                setInputField({ "SessionSearchQuery": "" });
                setTimeout(() => {
                    alert("No Sessions Found")
                    getData();
                }, 500)
            } else {
                alert(response.data.status)
            }
        });
    };

    const getData = () => {
        // Retrieve key and token from sessionStorage without providing the key
        let currentKey, token;
        Object.entries(sessionStorage).forEach(([key, value]) => {
            if (key.includes('key')) {
                currentKey = value;
            } else if (key.includes('token')) {
                token = value;
            }
        });

        // Update the state with the current key
        setKey(currentKey);
        let data = { "batchId": sessionStorage.getItem("viewbatchId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                if (response.data.Sessions) {
                    setIsLoading(false)
                    setSessionData(response.data.Sessions);
                } else {
                    if (response.data.status === "Unauthorized access!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear()
                    } else {
                        if (!response.data.Sessions) {
                            setIsLoading(false)
                            setSessionData([])
                        } else {
                            setIsLoading(false)
                            alert(response.data.status)
                        }
                    }
                }
            }
        );
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

    // Function to handle filter criteria change
    const handleFilterChange = (event) => {
        const selectedCriteria = parseInt(event.target.value);
        setFilterCriteria(selectedCriteria);
    };

    const viewsessionId = (attendanceid, sessionName) => {
        sessionStorage.setItem("viewattendanceid", attendanceid)
        sessionStorage.setItem("viewattendancesessionName", sessionName)
        navigate("/clgstaffviewattendance")
    }

    const taskScore = (id, sessionName) => {
        sessionStorage.setItem("ViewsessionperformanceSessionId", id)
        sessionStorage.setItem("ViewsessionperformanceSessionName", sessionName)
        navigate("/clgStaffviewSessionWisePerformance")
    }

    const [cancelId, setCancelId] = useState(null);

    const cancelClick = (id) => {
        setShowModal(true)
        setShowOverlay(true)
        setCancelId(id)
    }

    // Function to close both modal and overlay
    const closeModal = () => {
        setShowModal(false);
        setShowOverlay(false);
    };

    const handleClick = () => {
        // Retrieve key and token from sessionStorage without providing the key
        let currentKey, token;
        Object.entries(sessionStorage).forEach(([key, value]) => {
            if (key.includes('key')) {
                currentKey = value;
            } else if (key.includes('token')) {
                token = value;
            }
        });

        // Update the state with the current key
        setKey(currentKey);
        let cancelledby;
        if (currentKey === 'lmsapp') {
            cancelledby = 0
        } else {
            cancelledby = sessionStorage.getItem("admstaffId")
        }
        let data = { "id": cancelId, "cancelledby": cancelledby };
        let axiosConfigTwo = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };
        setShowWaitingModal(true)
        setShowOverlay(true)
        axios.post(apiUrlTwo, data, axiosConfigTwo).then(
            (response) => {
                if (response.data.status === "success") {
                    closeModal()
                    closeWaitingModal()
                    setTimeout(() => {
                        getData()
                    }, 500)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear()
                    } else {
                        closeModal()
                        closeWaitingModal()
                        setTimeout(() => {
                            alert(response.data.status);
                        }, 500)
                    }
                }
            })
    };

    const isSessionToday = (date) => {
        const today = new Date();
        const dateParts = date.split('/');
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1] - 1, 10);
        const year = parseInt(dateParts[2], 10);
        const sessionDate = new Date(year, month, day);
        return (
            today.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }) ===
            sessionDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })
        );
    };

    function formatTime(timeString) {
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], options);
    }

    const handleShowQRCode = (attendanceCode) => {
        setQrCodeAttendance(attendanceCode);
        setShowQRModal(true);
    };

    const handleCloseQRModal = () => {
        setShowQRModal(false);
    };

    const UpdateClick = (id) => {
        let data = id
        sessionStorage.setItem("sessionId", data)
        navigate("/AdminUpdateSession")
    }

    const sessionClick = (id, sessionName) => {
        sessionStorage.setItem("viewtaskId", id)
        sessionStorage.setItem("viewsessionName", sessionName)
        navigate("/AdminViewAllTasks")
    }

    // Logic for displaying current sessions
    const indexOfLastSession = currentPage * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const filteredSessions = filterSessionsByDate();
    const currentSessions = filteredSessions.slice(indexOfFirstSession, indexOfLastSession);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Total pages
    let totalPages = []
    // Calculate total pages based on filtered session data
    totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * sessionsPerPage) + index + 1;
    }

    // Integration of new pagination logic
    const startPage = currentPage > 2 ? currentPage - 2 : 1;
    const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;


    useEffect(() => { getData() }, []);

    const [deleteId, setDeleteId] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const deleteClick = (id) => {
        setDeleteId(id);
        setShowConfirmation(true);
    };

    const remainderClick = (batchId, sessionId) => {
        // Retrieve key and token from sessionStorage without providing the key
        let currentKey, token;
        Object.entries(sessionStorage).forEach(([key, value]) => {
            if (key.includes('key')) {
                currentKey = value;
            } else if (key.includes('token')) {
                token = value;
            }
        });

        // Update the state with the current key
        setKey(currentKey);
        let data = { "batchId": batchId, "id": sessionId }; // Assuming the API requires batchId
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };
        setShowWaitingModal(true)
        setShowOverlay(true)
        // Make the API call to send the reminder
        axios.post(remainderApiLink, data, axiosConfig).then(
            (response) => {
                if (response.data.status === "success") {
                    closeWaitingModal()
                    setTimeout(() => {
                        alert("Reminder Sent Successfully.");
                    }, 500)
                } else {
                    if (response.data.status === "Unauthorized access!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear();
                    } else {
                        closeWaitingModal()
                        setTimeout(() => {
                            alert(response.data.status);
                        }, 500)
                    }
                }
            }
        );
    };
    const canSendReminder = (sessionDate, sessionTime) => {
        const oneDay = 72 * 60 * 60 * 1000; // 1 day in milliseconds
        const currentDate = new Date();
        const [day, month, year] = sessionDate.split('/'); // Assuming date format is DD/MM/YYYY
        const [hours, minutes] = sessionTime.split(':'); // Assuming time format is HH:mm

        // Convert sessionDate and sessionTime into a Date object
        const sessionDateTime = new Date(year, month - 1, day, hours, minutes);

        // Check if session date/time is within next 24 hours and not in the past
        const timeDifference = sessionDateTime.getTime() - currentDate.getTime();
        const isFutureSession = timeDifference > 0;
        const isWithin72Hours = timeDifference <= oneDay;
        // console.log(isWithin72Hours)

        return isFutureSession && isWithin72Hours;
    };

    const isSessionInPast = (dateString, timeString) => {
        const now = new Date();

        const dateParts = dateString.split('/');
        const timeParts = timeString.split(':');
        // Assuming timeString is in HH:MM format; adjust if it includes seconds or is in 12-hour format

        // Convert session date and time from strings to a Date object
        const sessionDateTime = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1]);

        return sessionDateTime < now;
    };



    const confirmDelete = () => {
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        setShowConfirmation(false);
        setShowWaitingModal(true)
        setShowOverlay(true)
        axios.post(deleteApiLink, { id: deleteId }, axiosConfig).then(response => {
            if (response.data.status === "success") {
                closeWaitingModal()
                setTimeout(() => {
                    alert("Session Deleted!!")
                    setSessionData(sessionData.filter(session => session.id !== deleteId));
                    getData()
                }, 500)
            } else {
                if (response.data.status === "Unauthorized User!!") {
                    navigate("/")
                    sessionStorage.clear()
                } else {
                    closeWaitingModal()
                    setTimeout(() => {
                        alert(response.data.status)
                    }, 500)
                }
            }
        })
    };

    function isSpecialDomain(venueLink) {
        const domains = ["meet.google.com", "zoom.us", "youtube.com", "vimeo.com", "teams.microsoft.com"];
        return domains.some(domain => venueLink.includes(domain));
    }

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

    return (
        <div>
            {key === 'lmsappadmstaff' ? <AdmStaffNavBar /> : <Navbar />}
            <div className="flex justify-between items-center mx-4 my-4">
                <button onClick={() => navigate(-1)} className="btn bg-gray-500 text-white px-4 py-2 rounded-md">Back</button>
                <strong>View All Sessions {`( Batch Name - ${BatchName} )`}</strong>
                <div></div>
            </div>
            <div className="row">
                <div className="col col-12">
                    <div className="row g-3">
                        <div className="col col-md-6 mx-auto"> {/* Center-align the search bar */}
                            <div className="input-group mb-3"> {/* Use an input group */}
                                <input onChange={inputHandler} type="text" className="form-control" name="SessionSearchQuery" value={inputField.SessionSearchQuery} placeholder='Session Name/Trainer Name' />
                                <button onClick={readValue} className="btn btn-warning ms-2">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
            {isLoading ? <div className="flex justify-center items-center h-full">
                <div className="text-center py-20">
                    <div>Loading...</div>
                </div>
            </div> : (<div className="relative overflow-x shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">S/N</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Time</th>
                            <th scope="col" className="px-6 py-3">Type</th>
                            <th scope="col" className="px-6 py-3">Remarks</th>
                            <th scope="col" className="px-6 py-3">Venue OR Link</th>
                            <th scope="col" className="px-6 py-3">Trainer Name</th>
                            <th scope="col" className="px-6 py-3">Cancel Status</th>
                            <th scope="col" className="px-6 py-3">Attendence Code</th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSessions.length > 0 ? currentSessions.map((value, index) => {
                            // Check if the session is in the past
                            const sessionIsPast = isSessionPast(value.date, value.time);

                            return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{calculateSerialNumber(index)}</td>
                                <td className="px-6 py-4" style={{ fontWeight: 'bold' }}>{value.sessionName}</td>
                                <td className="px-6 py-4">{value.date}</td>
                                <td className="px-6 py-4">{formatTime(value.time)}</td>
                                <td className="px-6 py-4">{value.type}</td>
                                <td className="px-6 py-4">{value.remarks ? (value.remarks) : <p>NIL</p>}</td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-gray-600">
                                        {isSpecialDomain(value.venueORlink) ? (
                                            <Link to={value.venueORlink} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline' }}>{value.venueORlink}</Link>
                                        ) : (
                                            value.venueORlink
                                        )}
                                    </p>
                                </td>
                                <td className="px-6 py-4">{value.trainerName}</td>
                                <td className="px-6 py-4">{value.cancelStatus}</td>
                                <td className="px-6 py-4">
                                    {isSessionToday(value.date) && value.cancelStatus === "ACTIVE" && (
                                        <button onClick={() => handleShowQRCode(value.attendenceCode)} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                                            Show QR
                                        </button>
                                    )}
                                    {!isSessionToday(value.date) && value.cancelStatus === "ACTIVE" && (
                                        <p>Not Available</p>
                                    )}
                                    {!isSessionToday(value.date) && value.cancelStatus !== "ACTIVE" && (
                                        <p>Not Available</p>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {value.cancelStatus === "ACTIVE" && sessionIsPast === true && (
                                        <button onClick={() => viewsessionId(value.id, value.sessionName)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline focus:outline-none">
                                            View Attendance List
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {value.cancelStatus === "ACTIVE" && isSessionInPast(value.date, value.time) && (
                                        <button onClick={() => sessionClick(value.id, value.sessionName)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline focus:outline-none">
                                            View Tasks
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {isSessionInPast(value.date, value.time) && value.cancelStatus === "ACTIVE" && (
                                        <button onClick={() => taskScore(value.id, value.sessionName)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline focus:outline-none" style={{ marginRight: '20px' }}>
                                            View Performance
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {!isSessionInPast(value.date, value.time) && value.cancelStatus === "ACTIVE" && (
                                        <button onClick={() => cancelClick(value.id)} type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline focus:outline-none">
                                            Cancel Session
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {!isSessionInPast(value.date, value.time) && value.cancelStatus === "ACTIVE" && (
                                        <button onClick={() => { UpdateClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" type="button">
                                            Reschedule Session
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {key === "lmsapp" && !isSessionInPast(value.date, value.time) && value.cancelStatus === "ACTIVE" && (
                                        <button onClick={() => deleteClick(value.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" type="button">
                                            Delete Session
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {value.cancelStatus === "ACTIVE" && canSendReminder(value.date, value.time) && (
                                        <button onClick={() => remainderClick(value.batchId, value.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" type="button">
                                            Send Remainder
                                        </button>
                                    )}
                                </td>
                            </tr>
                        }) : (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td colSpan="15" className="px-6 py-4" style={{ textAlign: "center" }}>
                                    No Sessions Found !!!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>)}


            {/* Pagination */}
            {!isLoading && currentSessions.length > 0 && (
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
            )}


            {/* QR Code Modal */}
            {showQRModal && qrCodeAttendance && (
                <QRCodeModal qrCodeAttendance={qrCodeAttendance} onClose={handleCloseQRModal} />
            )}

            {/* Delete Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="text-center mb-4">
                            <h2 className="text-xl font-semibold">Delete Confirmation</h2>
                        </div>
                        <div className="text-center mb-4">
                            Are you sure you want to delete this session?
                        </div>
                        <div className="flex justify-center">
                            <button onClick={confirmDelete} className="btn btn-primary" style={{ marginRight: '16px' }}>Confirm Delete</button>
                            <button onClick={() => setShowConfirmation(false)} className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancel Confirmation Modal */}
            {showModal && (
                <div className="row">
                    <div className="modal show d-block" tabIndex={-1}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to cancel this session?</h5>
                                    <button type="button" className="btn-close" onClick={() => closeModal()}></button>
                                </div>
                                <div className="modal-body">
                                    <p>This action cannot be undone.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => closeModal()}>No, cancel</button>
                                    <button onClick={() => handleClick()} type="button" className="btn btn-danger" >Yes, I'm sure</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showWaitingModal && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
                            </div>
                            <div className="modal-body">
                                <>
                                    <div className="mb-3">
                                        <p>Processing Request. Do Not Refresh.</p>
                                    </div>
                                </>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showOverlay && (
                <div
                    className="modal-backdrop fade show"
                    onClick={() => {
                        setShowModal(false);
                        setShowOverlay(false);
                    }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 1040, // Ensure this is below your modal's z-index
                    }}
                ></div>
            )}
        </div>
    );
};

export default AdminViewAllSession;

