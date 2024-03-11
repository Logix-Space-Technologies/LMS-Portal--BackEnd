import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';
import '../../config/config';

const AdminViewAllBatch = () => {

    const [batchData, setBatchData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [batchesPerPage] = useState(10); // Number of batches per page
    const navigate = useNavigate();
    const [key, setKey] = useState('');
    const [deleteId, setDeleteId] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const apiUrl = global.config.urls.api.server + "/api/lms/adminviewbatch";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/deletebatch";

    const getData = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let data = { "collegeId": sessionStorage.getItem("clgId") }
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
                if (response.data.data) {
                    setBatchData(response.data.data);
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        {key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin")}
                        sessionStorage.clear()
                    } else {
                        if (!response.data.data) {
                            setBatchData([])
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            }
        );
    };

    const deleteClick = (id) => {
        setDeleteId(id);
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        let deletedata = { "id": deleteId };
        let axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        axios.post(apiUrl2, deletedata, axiosConfig2).then(
            (response) => {
                if (response.data.status === "Batch Deleted.") {
                    alert("Batch Deleted Successfully!!");
                    getData()
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/")
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status);
                    }
                }
            }
        );

        setShowConfirmation(false);
    };

    const viewAllCurr = (id) => {
        sessionStorage.setItem("currbatchId", id)
    }

    const UpdateClick = (id) => {
        let data = id;
        sessionStorage.setItem("batchId", data);
        navigate("/adminupdatebatch");
    };

    const batchClick = (id) => {
        let data = id;
        sessionStorage.setItem("viewbatchId", data);
    }

    // Logic for displaying current batches
    const indexOfLastBatch = currentPage * batchesPerPage;
    const indexOfFirstBatch = indexOfLastBatch - batchesPerPage;
    const currentBatches = batchData ? batchData.slice(indexOfFirstBatch, indexOfLastBatch) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Total pages
    let totalPages = []
    if (batchData && batchData.length > 0) {
        totalPages = Math.ceil(batchData.length / batchesPerPage);
    }

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * batchesPerPage) + index + 1;
    }

    // Integration of new pagination logic
    const startPage = currentPage > 2 ? currentPage - 2 : 1;
    const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;

    useEffect(() => { getData() }, []);

    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);

    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}<br />
            <div className="flex justify-between items-center mx-4 my-4">
                <button onClick={() => navigate(-1)} className="btn bg-gray-500 text-white px-4 py-2 rounded-md">Back</button>

                <strong>View All Batches</strong>

                <div></div>
            </div>
            <br />
            <br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    {/* Table headers */}
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">S/N</th>
                            <th scope="col" className="px-6 py-3">College Name</th>
                            <th scope="col" className="px-6 py-3">Batch Name</th>
                            <th scope="col" className="px-6 py-3">Reg Start Date</th>
                            <th scope="col" className="px-6 py-3">Reg End Date</th>
                            <th scope="col" className="px-6 py-3">Batch Description</th>
                            <th scope="col" className="px-6 py-3">Batch Amount</th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            {key === "lmsapp" && (
                                <th scope="col" className="px-6 py-3"></th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Table rows */}
                        {currentBatches.length > 0 ? currentBatches.map((value, index) => {
                            return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{calculateSerialNumber(index)}</td>
                                <td className="px-6 py-4">{value.collegeName}</td>
                                <td className="px-6 py-4">{value.batchName}</td>
                                <td className="px-6 py-4">{value.regStartDate}</td>
                                <td className="px-6 py-4">{value.regEndDate}</td>
                                <td className="px-6 py-4">{value.batchDesc}</td>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="https://www.svgrepo.com/show/389251/indian-rupee.svg" alt="rupee" style={{ marginLeft: '24px', height: '14px', verticalAlign: 'middle' }} />
                                    <td className="px-6 py-4">{value.batchAmount}</td>
                                </div>
                                <td className="px-6 py-4">
                                    <Link to="/AdminViewAllSession" onClick={() => { batchClick(value.id) }} style={{ whiteSpace: 'nowrap' }} className="font-medium text-blue-600 dark:text-blue-500">View Sessions</Link>
                                </td>
                                <td className="px-6 py-4">
                                    <Link to="/adminviewallstudents" onClick={() => { batchClick(value.id) }} style={{ whiteSpace: 'nowrap' }} className="font-medium text-blue-600 dark:text-blue-500">View Students</Link>
                                </td>
                                <td className="px-6 py-4">
                                    <Link to="/adminviewallcurriculum" style={{ whiteSpace: 'nowrap' }} onClick={() => viewAllCurr(value.id)} className="font-medium text-blue-600 dark:text-blue-500">View Curriculum</Link>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => { UpdateClick(value.id) }} className="btn btn-success">Update</button>
                                </td>
                                {key === "lmsapp" && (
                                    <td className="px-6 py-4">
                                        <button onClick={() => deleteClick(value.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                )}
                            </tr>
                        }) : (
                            <tr>
                                <td colSpan="13" className="px-6 py-4" style={{ textAlign: "center" }}>
                                    No Batches Found !!!
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
                            Showing <span className="font-medium">{indexOfFirstBatch + 1}</span> to <span className="font-medium">{indexOfLastBatch > batchData.length ? batchData.length : indexOfLastBatch}</span> of <span className="font-medium">{batchData.length}</span> results
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
            {/* Delete Confirmation */}
            {showConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold text-gray-800">Are you sure you want to delete this batch?</p>
                        <div className="flex justify-end mt-4">
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-4" onClick={confirmDelete}>Delete</button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full" onClick={() => setShowConfirmation(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminViewAllBatch;
