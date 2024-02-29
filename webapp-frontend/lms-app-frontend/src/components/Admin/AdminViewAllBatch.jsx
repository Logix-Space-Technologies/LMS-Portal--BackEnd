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
                setBatchData(response.data.data);
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
                    alert(response.data.status);
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
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{value.collegeName}</td>
                                <td className="px-6 py-4">{value.batchName}</td>
                                <td className="px-6 py-4">{new Date(value.regStartDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{new Date(value.regEndDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{value.batchDesc}</td>
                                <td className="px-6 py-4">{value.batchAmount}</td>
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
            {currentBatches.length > 0 && (
                <div className="flex justify-center mt-8">
                    <nav>
                        <ul className="flex list-style-none">
                            {currentPage > 1 && (
                                <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">Previous</li>
                            )}
                            {Array.from({ length: Math.ceil(batchData.length / batchesPerPage) }, (_, i) => (
                                <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>{i + 1}</li>
                            ))}
                            {currentPage < Math.ceil(batchData.length / batchesPerPage) && (
                                <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">Next</li>
                            )}
                        </ul>
                    </nav>
                </div>
            )}
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
