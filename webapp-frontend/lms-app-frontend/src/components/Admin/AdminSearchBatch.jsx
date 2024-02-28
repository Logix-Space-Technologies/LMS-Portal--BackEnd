import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../../config/config';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';

const AdminSearchBatch = () => {

    const [inputField, setInputField] = useState({
        "batchQuery": ""
    });

    const [batches, setBatches] = useState([]);
    const [searchExecuted, setSearchExecuted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteId, setDeleteId] = useState(null);
    const [batchesPerPage] = useState(10); // Number of batches per page
    const [key, setKey] = useState('');

    const apiUrl = global.config.urls.api.server + '/api/lms/searchBatch';
    const deleteUrl = global.config.urls.api.server + '/api/lms/deleteBatch';

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setInputField({ ...inputField, [name]: value });
    };

    const searchBatches = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        setIsLoading(true);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };
        axios.post(apiUrl, inputField, axiosConfig)
            .then(response => {
                setBatches(response.data.data);
                
                setInputField({ batchQuery: "" })
                setIsLoading(false);
                setSearchExecuted(true);
            })
            .catch(error => {
                console.error("Search failed:", error);
                setIsLoading(false);
            });
    };

    const deleteBatch = (id) => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        axios.post(deleteUrl, { id }, axiosConfig)
            .then(() => {
                alert("Batch deleted successfully");
                searchBatches();
            })
            .catch(error => {
                alert(error)
            })
            .finally(() => setIsLoading(false));
    };

    const handleUpdateClick = (batchId) => {
        sessionStorage.setItem("batchId", batchId);
        navigate("/adminupdatebatch");
    };

    const handleClick = (id) => {
        setDeleteId(id);
    };

    const handleDeleteClick = () => {
        deleteBatch(deleteId);
    };

    const indexOfLastBatch = currentPage * batchesPerPage;
    const indexOfFirstBatch = indexOfLastBatch - batchesPerPage;
    const currentBatches = batches ? batches.slice(indexOfFirstBatch, indexOfLastBatch) : [];

    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);

    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />} <br />
            <div className="container py-5">
                <h1 className="mb-4 text-center">Admin Search Batches</h1>
                <div className="row mb-3">
                    <div className="col">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by batch name, college name, or description..."
                                value={inputField.batchQuery}
                                onChange={inputHandler}
                                name="batchQuery"
                            />
                        </div>
                        <br></br>
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <button onClick={searchBatches} className="btn btn-warning">Search</button>
                        </div>
                        <br />
                    </div>
                </div>
                {isLoading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (searchExecuted && batches ? (
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>S.No.</th>
                                    <th>College Name</th>
                                    <th>Batch Name</th>
                                    <th>Batch Description</th>
                                    <th>Registration Start Date</th>
                                    <th>Registration End Date</th>
                                    <th>Batch Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentBatches.map((batch, index) => {
                                    return <tr key={batch.id}>
                                        <td>{index + 1}</td>
                                        <td>{batch.collegeName}</td>
                                        <td>{batch.batchName}</td>
                                        <td>{batch.batchDesc}</td>
                                        <td>{batch.regStartDate}</td>
                                        <td>{batch.regEndDate}</td>
                                        <td>{batch.batchAmount}</td>
                                        <td>
                                            <button onClick={() => handleUpdateClick(batch.id)} className="btn btn-primary btn-sm me-2">Update</button>
                                            {key === "lmsapp" && (
                                                <button type="button" className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal" onClick={() => handleClick(batch.id)}>Delete</button>
                                            )}
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (searchExecuted && !batches ? (
                    <div className="alert alert-info" role="alert">
                        No batches found.
                    </div>
                ) : null))}
            </div>
            {currentBatches.length > 0 && (
                <div className="flex justify-center mt-8">
                    <nav>
                        <ul className="flex list-style-none">
                            {currentPage > 1 && (
                                <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                    Previous
                                </li>
                            )}
                            {Array.from({ length: Math.ceil(batches.length / batchesPerPage) }, (_, i) => (
                                <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    {i + 1}
                                </li>
                            ))}
                            {currentPage < Math.ceil(batches.length / batchesPerPage) && (
                                <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                    Next
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            )}
            <div className="modal fade" id="deleteConfirmationModal" tabIndex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteConfirmationModalLabel">Delete Confirmation</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this batch?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeleteClick}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSearchBatch;
