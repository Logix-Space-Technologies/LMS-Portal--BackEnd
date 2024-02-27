import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../../config/config';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';
import { Link, useNavigate } from 'react-router-dom';

const AdminSearchSessionDetails = () => {
    const [inputField, setInputField] = useState({ "SessionSearchQuery": "" });
    const [updateField, setUpdateField] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [SessionPerPage] = useState(10); // Number of sessions per page
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const [key, setKey] = useState('')
    const navigate = useNavigate()

    // Assign the API links as searchApiLink and deleteApiLink
    const searchApiLink = global.config.urls.api.server + "/api/lms/searchSession";
    const deleteApiLink = global.config.urls.api.server + "/api/lms/deleteSessions";

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value });
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
            setUpdateField(response.data.data);
            setIsSearchPerformed(true);
            setIsLoading(false);
            setInputField({ "SessionSearchQuery": "" });
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
                } else {
                    console.error("Error deleting session:", response.data.status);
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

    // Total pages
    const pageNumbers = [];
    if (updateField && updateField.length > 0) {
        updateField.forEach((session, index) => {
            const pageNumber = index + 1;
            pageNumbers.push(pageNumber);
        });
    }

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
                            updateField ? (
                                <div>
                                    <strong>Session Details</strong>
                                    <br /><br />
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Table rows */}
                                                {currentSession.map((value,index) => (
                                                    <tr key={value.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="px-6 py-4">{index+1}</td>
                                                        <td className="px-6 py-4">{value.collegeName}</td>
                                                        <td className="px-6 py-4">{value.batchName}</td>
                                                        <td className="px-6 py-4">{value.sessionName}</td>
                                                        <td className="px-6 py-4">{value.date}</td>
                                                        <td className="px-6 py-4">{formatTime(value.time)}</td>
                                                        <td className="px-6 py-4">{value.type}</td>
                                                        <td className="px-6 py-4">{value.remarks}</td>
                                                        {!value.venueORlink.includes("meet.google.com") && (
                                                            <td className="px-6 py-4">{value.venueORlink}</td>
                                                        )}
                                                        {value.venueORlink.includes("meet.google.com") && (
                                                            <td className="px-6 py-4"><Link to={value.venueORlink} target='_blank' rel='noopener noreferrer' className="btn btn-primary mt-3" style={{ whiteSpace: "nowrap" }}>Meeting Link</Link></td>
                                                        )}
                                                        <td className="px-6 py-4">{value.trainerName}</td>
                                                        <td className="px-6 py-4">{value.attendenceCode}</td>
                                                        <td className="px-6 py-4">{value.cancelStatus}</td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            {key === "lmsapp" && (
                                                                <button onClick={() => handleDeleteClick(value.id)} className="btn btn-danger mt-3">Delete</button>
                                                            )}
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <button onClick={() => UpdateClick(value.id)} className="btn btn-primary mt-3">Update</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="col-12 text-center">No Sessions Found!</div>
                            )
                        )}

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
                )}
            </div>

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
        </div>
    );
};

export default AdminSearchSessionDetails;
