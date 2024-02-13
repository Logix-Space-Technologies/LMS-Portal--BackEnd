import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminSearchTasks = () => {
    const [inputField, setInputField] = useState({
        "taskQuery": ""
    });
    const [updateField, setUpdateField] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const apiUrl = global.config.urls.api.server + "/api/lms/searchTasks";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/deleteTask";
    const updateUrl = "/AdminUpdateTask"; // Update this URL with the correct path for the update task page

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        axios.post(apiUrl, inputField, axiosConfig).then(
            (response) => {
                setUpdateField(response.data.data);
                setIsLoading(false);
                setInputField({
                    "taskQuery": ""
                });
            }
        );
    };

    const handleDeleteClick = (id) => {
        let data = { "id": id };
        let axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };

        axios.post(apiUrl2, data, axiosConfig2).then(
            (response) => {
                if (response.data.status === "Task Deleted.") {
                    alert("Task deleted!!");
                    // Reload the page after clicking OK in the alert
                    window.location.reload();
                } else {
                    alert(response.data.status);
                }
            }
        );
    };

    const handleUpdateClick = (task) => {
        // Set the task data in sessionStorage to pass to the update task page
        sessionStorage.setItem("taskId", task.id);
        sessionStorage.setItem("batchId", task.batchId);
        // Navigate to the update task page
        navigate(updateUrl);
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <h1>Search Task</h1>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">Task Title/Task Description/Task Type/Batch Name</label>
                                <input onChange={inputHandler} value={inputField.taskQuery} type="text" className="form-control" name="taskQuery" />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <button onClick={readValue} className="btn btn-warning">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoading ? (<div className="col-12 text-center">
                    <p></p>
                </div>) :
                    (updateField ? (
                        <div className="row g-3">
                            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                                <header className="px-5 py-4 border-b border-gray-100">
                                    <h2 className="font-semibold text-2xl text-gray-800">Task Details</h2>
                                </header>
                                <div className="p-3">
                                    <div className="overflow-x-auto">
                                        <table className="table-auto w-full">
                                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                                <tr>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Id</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Batch Name</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Batch Id</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Task Title</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Task Description</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Task Type</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Task File</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Total Score</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Due Date</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Added Date</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Updated Date</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Actions</div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm divide-y divide-gray-100">
                                                {updateField.map(
                                                    (value, index) => {
                                                        return <tr key={index}>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="font-medium text-gray-800">{value.id}</div>
                                                                </div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.batchName}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.batchId}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.taskTitle}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.taskDesc}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.taskType}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.taskFileUpload}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.totalScore}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{new Date(value.dueDate).toLocaleDateString()}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{new Date(value.addedDate).toLocaleDateString()}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{new Date(value.updatedDate).toLocaleDateString()}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                {/* "Update" button */}
                                                                <button onClick={() => handleUpdateClick(value)} className="btn btn-primary">Update</button>
                                                                {/* "Delete" button */}
                                                                <button onClick={() => handleDeleteClick(value.id)} className="btn btn-danger">Delete</button>
                                                            </td>
                                                        </tr>
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="col-12 text-center">No Tasks Found!!</div>
                    ))}
            </div>
        </div>
    );
};

export default AdminSearchTasks;
