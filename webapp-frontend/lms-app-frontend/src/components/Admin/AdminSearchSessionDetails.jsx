import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../../config/config';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';
import { QRCodeCanvas } from 'qrcode.react';
import { Link, useNavigate } from 'react-router-dom';

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

const AdminSearchSessionDetails = () => {

    const [inputField, setInputField] = useState({ "SessionSearchQuery": "" });
    const [updateField, setUpdateField] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [qrCodeAttendance, setQrCodeAttendance] = useState(null);
    const [showQRModal, setShowQRModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay
    const [currentPage, setCurrentPage] = useState(1);
    const [SessionPerPage] = useState(10); // Number of sessions per page
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const [key, setKey] = useState('')
    const navigate = useNavigate()
    const [cancelId, setCancelId] = useState(null);


    // Assign the API links as searchApiLink and deleteApiLink
    const searchApiLink = global.config.urls.api.server + "/api/lms/searchSession";
    const deleteApiLink = global.config.urls.api.server + "/api/lms/deleteSessions";
    const apiUrlTwo = global.config.urls.api.server + "/api/lms/cancelSession";

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const cancelClick = (id) => {
        setCancelId(id)
        setShowModal(true)
        setShowOverlay(true)
    }

    // Function to close both modal and overlay
    const closeModal = () => {
        setShowModal(false);
        setShowOverlay(false);
    };

    const handleClick = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let data = { "id": cancelId };
        let axiosConfigTwo = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };
        axios.post(apiUrlTwo, data, axiosConfigTwo).then(
            (response) => {
                if (response.data.status === "success") {
                    closeModal()
                    setUpdateField(updateField.filter(session => session.id !== cancelId));
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status);
                    }
                }
            })
    };

    const readValue = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        setIsLoading(true);
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };

        axios.post(searchApiLink, inputField, axiosConfig).then((response) => {
            if (response.data.data) {
                setUpdateField(response.data.data);
                setIsSearchPerformed(true);
                setIsLoading(false);
                setInputField({ "SessionSearchQuery": "" });
            } else if (response.data.status === "Unauthorized User!!") {
                { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                sessionStorage.clear()
            } else if (!response.data.data) {
                setUpdateField([]);
                setIsSearchPerformed(true);
                setIsLoading(false);
                setInputField({ "SessionSearchQuery": "" });
            } else {
                alert(response.data.status)
            }
        });
    };

    const deleteSession = (sessionId) => {
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };

        axios.post(deleteApiLink, { id: sessionId }, axiosConfig)
            .then(response => {
                if (response.data.status === "success") {
                    setUpdateField(updateField.filter(session => session.id !== sessionId));
                } else if (response.data.status === "Unauthorized User!!") {
                    navigate("/")
                    sessionStorage.clear()
                } else {
                    alert(response.data.status)
                }
            })
            .catch(error => {
                console.error("Error during API call:", error);
            });
    };

    // Logic for displaying current sessions
    const indexOfLastSession = currentPage * SessionPerPage;
    const indexOfFirstSession = indexOfLastSession - SessionPerPage;
    const currentSession = updateField ? updateField.slice(indexOfFirstSession, indexOfLastSession) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * SessionPerPage) + index + 1;
    }

    // Total pages
    let totalPages = []
    if (updateField && updateField.length > 0) {
        totalPages = Math.ceil(updateField.length / SessionPerPage);
    }

    // Integration of new pagination logic
    const startPage = currentPage > 2 ? currentPage - 2 : 1;
    const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;

    function formatTime(timeString) {
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], options);
    }

    const UpdateClick = (id) => {
        let data = id
        sessionStorage.setItem("sessionId", data)
        navigate("/AdminUpdateSession")
    }

    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);

    // Delete confirmation modal
    const [deleteId, setDeleteId] = useState(null);

    const handleDeleteClick = (sessionId) => {
        setDeleteId(sessionId);
    };

    const handleDeleteConfirm = () => {
        deleteSession(deleteId);
        setDeleteId(null);
    };

    const handleDeleteCancel = () => {
        setDeleteId(null);
    };

    function isSpecialDomain(venueLink) {
        const domains = ["meet.google.com", "zoom.us", "youtube.com", "vimeo.com"];
        return domains.some(domain => venueLink.includes(domain));
    }

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

    const handleShowQRCode = (attendanceCode) => {
        setQrCodeAttendance(attendanceCode);
        setShowQRModal(true);
    };

    const handleCloseQRModal = () => {
        setShowQRModal(false);
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

    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
            <div className="container">
                <div className="row">
                    <div className="col col-12">
                        <div className="row g-3">
                            <div className="col col-12 text-center">
                                <h1>Search Session</h1>
                            </div>
                            <div className="col col-md-6 mx-auto"> {/* Center-align the search bar */}
                                <div className="input-group mb-3"> {/* Use an input group */}
                                    <input onChange={inputHandler} type="text" className="form-control" name="SessionSearchQuery" value={inputField.SessionSearchQuery} placeholder='Batch Name/College Name/Trainer Name' />
                                    <button onClick={readValue} className="btn btn-warning ms-2">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isSearchPerformed && (
                    <div className="row g-3 mt-3">
                        {isLoading ? (
                            <div className="col-12 text-center"><p>Loading...</p></div>
                        ) : (
                            currentSession.length > 0 ? (
                                <div>
                                    <strong>Session Details</strong>
                                    <br /><br />
                                    <div className="relative overflow-x shadow-md sm:rounded-lg">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            {/* Table headers */}
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">S/N</th>
                                                    <th scope="col" className="px-6 py-3">College</th>
                                                    <th scope="col" className="px-6 py-3">Batch</th>
                                                    <th scope="col" className="px-6 py-3">Session Name</th>
                                                    <th scope="col" className="px-6 py-3">Date</th>
                                                    <th scope="col" className="px-6 py-3">Time</th>
                                                    <th scope="col" className="px-6 py-3">Type</th>
                                                    <th scope="col" className="px-6 py-3">Remarks</th>
                                                    <th scope="col" className="px-6 py-3">Venue/Link</th>
                                                    <th scope="col" className="px-6 py-3">Trainer Name</th>
                                                    <th scope="col" className="px-6 py-3">Attendance Code</th>
                                                    <th scope="col" className="px-6 py-3">Cancel Status</th>
                                                    <th scope="col" className="px-6 py-3"></th>
                                                    <th scope="col" className="px-6 py-3"></th>
                                                    <th scope="col" className="px-6 py-3"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Table rows */}
                                                {currentSession.map((value, index) => {
                                                    return <tr key={value.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="px-6 py-4">{calculateSerialNumber(index)}</td>
                                                        <td className="px-6 py-4">{value.collegeName}</td>
                                                        <td className="px-6 py-4">{value.batchName}</td>
                                                        <td className="px-6 py-4">{value.sessionName}</td>
                                                        <td className="px-6 py-4">{value.date}</td>
                                                        <td className="px-6 py-4">{formatTime(value.time)}</td>
                                                        <td className="px-6 py-4">{value.type}</td>
                                                        <td className="px-6 py-4">{value.remarks}</td>
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
                                                        <td className="px-6 py-4">{value.cancelStatus}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {key === "lmsapp" && !isSessionInPast(value.date, value.time) && value.cancelStatus === "ACTIVE" && (
                                                                <button onClick={() => handleDeleteClick(value.id)} className="btn btn-danger mt-3">Delete</button>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {key === "lmsapp" && !isSessionInPast(value.date, value.time) && value.cancelStatus === "ACTIVE" && (
                                                                <button onClick={() => UpdateClick(value.id)} className="btn btn-primary mt-3">Reschedule</button>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {!isSessionInPast(value.date, value.time) && value.cancelStatus === "ACTIVE" && (
                                                                <button type="button" onClick={() => cancelClick(value.id)} className="btn btn-danger mt-3">
                                                                    Cancel Session
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="col-12 text-center">No Sessions Found!</div>
                            )
                        )}
                    </div>
                )}
                {currentSession.length > 0 && (
                    <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{indexOfFirstSession + 1}</span> to <span className="font-medium">{indexOfLastSession > updateField.length ? updateField.length : indexOfLastSession}</span> of <span className="font-medium">{updateField.length}</span> results
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
                )}
            </div>
            {/* QR Code Modal */}
            {showQRModal && qrCodeAttendance && (
                <QRCodeModal qrCodeAttendance={qrCodeAttendance} onClose={handleCloseQRModal} />
            )}
            {/* Delete Confirmation Modal */}
            <div className={`modal ${deleteId !== null ? 'show' : ''}`} style={{ display: deleteId !== null ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete Confirmation</h5>
                            <button type="button" className="btn-close" onClick={handleDeleteCancel}></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this session?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleDeleteCancel}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
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

export default AdminSearchSessionDetails;
