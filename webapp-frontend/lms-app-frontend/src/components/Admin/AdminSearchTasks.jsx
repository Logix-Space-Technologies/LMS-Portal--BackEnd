import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../config/config'
import Navbar from './Navbar';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';

const AdminSearchTasks = () => {

    const [inputField, setInputField] = useState({
        "taskQuery": ""
    });

    const [tasks, setTasks] = useState([]);
    const [searchExecuted, setSearchExecuted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteId, setDeleteId] = useState(null);
    const [tasksPerPage] = useState(10); // Number of tasks per page
    const [key, setKey] = useState('');

    const apiUrl = global.config.urls.api.server + '/api/lms/searchTasks'
    const deleteUrl = global.config.urls.api.server + '/api/lms/deleteTask'

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setInputField({ ...inputField, [name]: value });
    };

    const searchTasks = () => {
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
                if (response.data.data) {
                    setTasks(response.data.data);
                    setInputField({ taskQuery: "" })
                    setIsLoading(false);
                    setSearchExecuted(true);
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear()
                    } else {
                        if (!response.data.data) {
                            setTasks([]);
                            setInputField({ taskQuery: "" })
                            setIsLoading(false);
                            setSearchExecuted(true);
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            })
            .catch(error => {
                console.error("Search failed:", error);
                setIsLoading(false);
            });
    };

    const deleteTask = (id) => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        axios.post(deleteUrl, { id }, axiosConfig)
            .then((response) => {
                if (response.data.status === "Task Deleted.") {
                    alert("Task deleted successfully");
                    // Remove the deleted Trainer from updateField state
                    setTasks(tasks.filter(task => task.id !== deleteId))
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
                alert(error);
            })
            .finally(() => setIsLoading(false));
    };

    const handleUpdateClick = (taskId) => {
        sessionStorage.setItem("taskId", taskId);
        navigate("/AdminUpdateTask");
    };

    const handleClick = (id) => {
        setDeleteId(id);
    };

    const handleDeleteClick = () => {
        deleteTask(deleteId);
    };

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks ? tasks.slice(indexOfFirstTask, indexOfLastTask) : [];

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * tasksPerPage) + index + 1;
    }

    let totalPages = []
    if (tasks && tasks.length > 0) {
        totalPages = Math.ceil(tasks.length / tasksPerPage);
    }

    // Integration of new pagination logic
    const startPage = currentPage > 2 ? currentPage - 2 : 1;
    const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;


    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);

    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />} <br />
            <div className="container py-5">
                <h1 className="mb-4 text-center">Admin Search Tasks</h1>
                <div className="row mb-3">
                    <div className="col">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by title, description, or type..."
                                value={inputField.taskQuery}
                                onChange={inputHandler}
                                name="taskQuery"
                            />
                        </div>
                        <br></br>
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <button onClick={searchTasks} className="btn btn-warning">Search</button>
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
                ) : (searchExecuted && tasks ? (
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>S/N</th>
                                    <th>Batch Name</th>
                                    <th>Session Name</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Type</th>
                                    <th>Due Date</th>
                                    <th>Total Score</th>
                                    <th>File Link</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTasks.map((task, index) => {
                                    return <tr key={task.id}>
                                        <td>{calculateSerialNumber(index)}</td>
                                        <td>{task.batchName}</td>
                                        <td>{task.sessionName}</td>
                                        <td>{task.taskTitle}</td>
                                        <td>{task.taskDesc}</td>
                                        <td>{task.taskType}</td>
                                        <td>{task.dueDate}</td>
                                        <td>{task.totalScore}</td>
                                        <td>
                                            <Link target="_blank" to={task.taskFileUpload} className="btn bg-blue-500 text-white btn-sm me-2">View File</Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handleUpdateClick(task.id)} className="btn btn-primary btn-sm me-2">Update</button>
                                            {key === "lmsapp" && (
                                                <button type="button" className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteTaskConfirmationModal" onClick={() => handleClick(task.id)}>Delete</button>
                                            )}
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (searchExecuted && !tasks ? (
                    <div className="alert alert-info" role="alert">
                        No tasks found.
                    </div>
                ) : null))}
            </div>
            {currentTasks.length > 0 && (
                <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstTask + 1}</span> to <span className="font-medium">{indexOfLastTask > tasks.length ? tasks.length : indexOfLastTask}</span> of <span className="font-medium">{tasks.length}</span> results
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
            <div className="modal fade" id="deleteTaskConfirmationModal" tabIndex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteConfirmationModalLabel">Delete Confirmation</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this task?
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

export default AdminSearchTasks;
