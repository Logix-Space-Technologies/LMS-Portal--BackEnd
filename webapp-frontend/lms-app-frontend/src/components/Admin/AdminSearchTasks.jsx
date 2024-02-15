import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../config/config'
import Navbar from './Navbar';

const AdminSearchTasks = () => {
    const [inputField, setInputField] = useState({
        taskQuery: ""
    });
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const apiUrl = global.config.urls.api.server + '/api/lms/searchTasks'
    const deleteUrl = global.config.urls.api.server + '/api/lms/deleteTask'

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setInputField({ ...inputField, [name]: value });
    };

    const searchTasks = () => {
        setIsLoading(true);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        axios.post(apiUrl, inputField, axiosConfig)
            .then(response => {
                setTasks(response.data.data);
                setIsLoading(false);
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

    const handleUpdateClick = (task) => {
        // Store task ID in sessionStorage to use in the update page
        sessionStorage.setItem("taskId", task.id);
        // Navigate to the update task page
        navigate("/AdminUpdateTask");
    };

    return (
        <div>
            <Navbar />
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
                ) : tasks.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(task => (
                                    <tr key={task.id}>
                                        <td>{task.id}</td>
                                        <td>{task.taskTitle}</td>
                                        <td>{task.taskDesc}</td>
                                        <td>{task.taskType}</td>
                                        <td>
                                            <button onClick={() => handleUpdateClick(task)} className="btn btn-primary btn-sm me-2">Update</button>
                                            <button onClick={() => deleteTask(task.id)} className="btn btn-danger btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : tasks.length < 0 ? (
                    <div className="alert alert-info" role="alert">
                        No tasks found.
                    </div>
                ) : (
                    <div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSearchTasks;