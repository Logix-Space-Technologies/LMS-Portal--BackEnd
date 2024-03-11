import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
    const [currentPage, setCurrentPage] = useState(1);
    const [sessionsPerPage] = useState(10); // Number of sessions per page
    const navigate = useNavigate();
    const [updateField, setUpdateField] = useState([]);
    const [key, setKey] = useState('')

    const apiUrl = global.config.urls.api.server + "/api/lms/viewSessions";
    const apiUrlTwo = global.config.urls.api.server + "/api/lms/cancelSession";
    const deleteApiLink = global.config.urls.api.server + "/api/lms/deleteSessions";


    const getData = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
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
                    setSessionData(response.data.Sessions);
                } else {
                    if (response.data.status === "Unauthorized access!!") {
                        {key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin")}
                        sessionStorage.clear()
                    } else {
                        if (!response.data.Sessions) {
                            setSessionData([])
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            }
        );
    };

    const [cancelId, setCancelId] = useState(null);

    const cancelClick = (id) => {
        setCancelId(id)
    }

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
                    alert("Session Cancelled Successfully.")
                    getData()
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        {key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin")}
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status);
                    }
                }
            })
            .catch(error => {
                console.error("Error during API call:", error);
            });
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

    const sessionClick = (id) => {
        sessionStorage.setItem("viewtaskId", id)
        navigate("/AdminViewAllTasks")
    }

    // Logic for displaying current sessions
    const indexOfLastSession = currentPage * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const currentSessions = sessionData ? sessionData.slice(indexOfFirstSession, indexOfLastSession) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Total pages
    let totalPages = []
    if (sessionData && sessionData.length > 0) {
        totalPages = Math.ceil(sessionData.length / sessionsPerPage);
    }

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * sessionsPerPage) + index + 1;
    }

    // Integration of new pagination logic
    const startPage = currentPage > 2 ? currentPage - 2 : 1;
    const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;


    useEffect(() => { getData() }, []);

    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);

    const [deleteId, setDeleteId] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const deleteClick = (id) => {
        setDeleteId(id);
        setShowConfirmation(true);
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

        axios.post(deleteApiLink, { id: deleteId }, axiosConfig)
            .then(response => {
                if (response.data.status === "success") {
                    alert("Session Deleted!!")
                    setUpdateField(updateField.filter(session => session.id !== deleteId));
                    getData()
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/")
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status)
                    }
                }
            })
            .catch(error => {
                console.error("Error during API call:", error);
            });

        setShowConfirmation(false);
    };

    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
            <div className="flex justify-between items-center mx-4 my-4">
                <button onClick={() => navigate(-1)} className="btn bg-gray-500 text-white px-4 py-2 rounded-md">Back</button>

                <strong>View All Sessions</strong>

                <div></div>
            </div>
            <br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                        </tr>
                    </thead>
                    <tbody>
                        {currentSessions.length > 0 ? currentSessions.map((value, index) => {
                            return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{calculateSerialNumber(index)}</td>
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{value.sessionName}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">{value.date}</td>
                                <td className="px-6 py-4">{formatTime(value.time)}</td>
                                <td className="px-6 py-4">{value.type}</td>
                                <td className="px-6 py-4">{value.remarks}</td>
                                <td className="px-6 py-4">{value.venueORlink}</td>
                                <td className="px-6 py-4">{value.trainerName}</td>
                                <td className="px-6 py-4">{value.cancelStatus}</td>
                                <td className="px-6 py-4">
                                    {isSessionToday(value.date) && value.cancelStatus === "ACTIVE" && (
                                        <button onClick={() => handleShowQRCode(value.attendenceCode)} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                                            Show QR
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {value.cancelStatus === "ACTIVE" && (
                                        <button onClick={() => sessionClick(value.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline focus:outline-none">
                                            View Tasks
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {value.cancelStatus === "ACTIVE" && (
                                        <button onClick={() => cancelClick(value.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline focus:outline-none" data-bs-toggle="modal" data-bs-target="#cancelModal">
                                            Cancel Session
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {value.cancelStatus === "ACTIVE" && (
                                        <button onClick={() => { UpdateClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" type="button">
                                            Reschedule Session
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {key === "lmsapp" && value.cancelStatus === "ACTIVE" && (
                                        <button onClick={() => deleteClick(value.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" type="button">
                                            Delete Session
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
            </div>

            {/* Pagination */}
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
                            <button onClick={confirmDelete} className="btn btn-primary" style={{marginRight: '16px'}}>Confirm Delete</button>
                            <button onClick={() => setShowConfirmation(false)} className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancel Confirmation Modal */}
            <div className="row">
                <div className="modal fade" id="cancelModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to cancel this session?</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>This action cannot be undone.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No, cancel</button>
                                <button onClick={() => handleClick()} type="button" className="btn btn-danger" data-bs-dismiss="modal">Yes, I'm sure</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminViewAllSession;

