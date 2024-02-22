import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../config/config'
import Navbar from './Navbar';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';

const AdminSearchTasks = () => {
    const [inputField, setInputField] = useState({
        taskQuery: ""
    });
    const [tasks, setTasks] = useState([]);
    const [searchExecuted, setSearchExecuted] = useState(false); // New state variable
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10); // Number of tasks per page


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
                setTasks(response.data.data);
                setInputField({ taskQuery: "" })
                setIsLoading(false);
                setSearchExecuted(true); // Set the flag to indicate search executed
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
            .then(() => {
                alert("Task deleted successfully");
                searchTasks(); // Refresh the list after deletion
            })
            .catch(error => {
                console.error("Delete failed:", error);
            })
            .finally(() => setIsLoading(false));
    };

    const handleUpdateClick = (taskId) => {
        // Store task ID in sessionStorage to use in the update page
        sessionStorage.setItem("taskId", taskId);
        // Navigate to the update task page
        navigate("/AdminUpdateTask");
    };

    // Logic for displaying current tasks
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks ? tasks.slice(indexOfFirstTask, indexOfLastTask) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

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
                            <button className="btn btn-outline-secondary" type="button" onClick={searchTasks}>Search</button>
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
                                    <th>Batch Name</th>
                                    <th>Session Name</th>
                                    <th>ID</th>
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
                                {tasks.map(task => (
                                    <tr key={task.id}>
                                        <td>{task.batchName}</td>
                                        <td>{task.sessionName}</td>
                                        <td>{task.id}</td>
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
                                                <button onClick={() => deleteTask(task.id)} className="btn btn-danger btn-sm">Delete</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (searchExecuted && !tasks ? ( // Check if search executed but no tasks found
                    <div className="alert alert-info" role="alert">
                        No tasks found.
                    </div>
                ) : null))}
            </div>
            {/* Pagination */}
            {currentTasks.length > 0 && (
                <div className="flex justify-center mt-8">
                    <nav>
                        <ul className="flex list-style-none">
                            {currentPage > 1 && (
                                <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                    Previous
                                </li>
                            )}
                            {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (_, i) => (
                                <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    {i + 1}
                                </li>
                            ))}
                            {currentPage < Math.ceil(tasks.length / tasksPerPage) && (
                                <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                    Next
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default AdminSearchTasks;