import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';

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
                setSessionData(response.data.Sessions);
            }
        );
    };

    const handleClick = (id) => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let data = { "id": id };
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
                    window.location.reload();
                } else {
                    alert(response.data.status);
                }
            }
        );
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
                    alert("Session Deleted!!")
                    setUpdateField(updateField.filter(session => session.id !== sessionId));
                    window.location.reload()
                } else {
                    console.error("Error deleting session:", response.data.status);
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

    useEffect(() => { getData() }, []);

    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);

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
                        {currentSessions.length > 0 ? currentSessions.map((value, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                                        <button onClick={() => handleClick(value.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline focus:outline-none">
                                            Cancel Session
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {value.cancelStatus === "ACTIVE" && (
                                        <button onClick={() => { UpdateClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" type="button">
                                            Update Session
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {key === "lmsapp" && value.cancelStatus === "ACTIVE" && (
                                        <button onClick={() => deleteSession(value.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" type="button">
                                            Delete Session
                                        </button>
                                    )}
                                </td>
                            </tr>
                        )) : (
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
            {currentSessions.length > 0 && (
                <div className="flex justify-center mt-8">
                    <nav>
                        <ul className="flex list-style-none">
                            {currentPage > 1 && (
                                <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                    Previous
                                </li>
                            )}
                            {Array.from({ length: Math.ceil(sessionData.length / sessionsPerPage) }, (_, i) => (
                                <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    {i + 1}
                                </li>
                            ))}
                            {currentPage < Math.ceil(sessionData.length / sessionsPerPage) && (
                                <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                    Next
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            )}


            {/* QR Code Modal */}
            {showQRModal && qrCodeAttendance && (
                <QRCodeModal qrCodeAttendance={qrCodeAttendance} onClose={handleCloseQRModal} />
            )}
        </div>
    );
};

export default AdminViewAllSession;
