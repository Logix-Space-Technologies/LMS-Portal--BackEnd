import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../config/config'

const AdminUpdateTask = () => {
    const [updateField, setUpdateField] = useState({
        id: sessionStorage.getItem("taskId") || "",
        batchId: "",
        taskTitle: "",
        taskDesc: "",
        taskType: "",
        totalScore: "",
        dueDate: "",
        taskFileUpload: null,
    });

    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    const apiURL = global.config.urls.api.server + '/api/lms/viewOneTask';
    const updateURL = global.config.urls.api.server + '/api/lms/updateTask';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(apiURL, { id: sessionStorage.getItem("taskId") }, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                        "token": sessionStorage.getItem("admtoken"),
                        "key": sessionStorage.getItem("admkey"),
                    },
                });
                if (response.data && response.data.data) {
                    console.log(response.data.data)
                    setUpdateField(prevState => ({ ...prevState, ...response.data.data }));
                } else {
                    console.error("Invalid response format or no data");
                }
            } catch (error) {
                console.error("Fetching task details failed:", error);
            } 
        };
        fetchData();
    }, [apiURL]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateField(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setUpdateField(prev => ({
            ...prev,
            taskFileUpload: e.target.files[0] || null,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(updateField).forEach(key => {
            if (key === 'taskFileUpload') {
                if (updateField.taskFileUpload) {
                    formData.append(key, updateField.taskFileUpload);
                }
            } else {
                formData.append(key, updateField[key] || '');
            }
        });

        axios.post(updateURL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey"),
            },
        })
            .then(response => {
                if (response.status === 200 && response.data.status === "success") {
                    alert("Task Updated Successfully");
                    navigate(-1);
                } else {
                    handleResponseError(response);
                }
            })
            .catch(error => {
                if (error.response) {
                    // Extract the status code from the response
                    const statusCode = error.response.status;

                    if (statusCode === 400) {
                        alert(error.response.data.status)
                        // Additional logic for status 400
                    } else if (statusCode === 500) {
                        alert(error.response.data.status)
                        // Additional logic for status 500
                    } else {
                        alert(error.response.data.status)
                    }
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
    };

    const handleResponseError = (response) => {
        switch (response.status) {
            case 400:
                alert("Bad request: " + response.data.status);
                if (response.data.status === "Validation failed") {
                    setValidationErrors(response.data.data || {});
                }
                break;
            case 403:
                alert("Unauthorized access!!");
                navigate("/");
                break;
            case 404:
                alert("Task not found");
                break;
            case 422:
                alert("Unprocessable Entity: " + response.data.status);
                break;
            case 500:
                alert("Internal server error: " + response.data.status);
                break;
            default:
                alert("Unexpected error: " + response.data.status);
                break;
        }
    };

    useEffect(() => {
        const formattedDate = formatDate(updateField.dueDate);
        setUpdateField({ ...updateField, dueDate: formattedDate });
    }, [updateField.dueDate]);

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card w-75">
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Update Task Details</h3>
                    <div className="mb-3">
                        <label htmlFor="taskTitle" className="form-label">Task Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="taskTitle"
                            name="taskTitle"
                            value={updateField.taskTitle}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskDesc" className="form-label">Task Description</label>
                        <textarea
                            className="form-control"
                            id="taskDesc"
                            name="taskDesc"
                            rows="3"
                            value={updateField.taskDesc}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskType" className="form-label">Task Type</label>
                        <input
                            type="text"
                            className="form-control"
                            id="taskType"
                            name="taskType"
                            value={updateField.taskType}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="totalScore" className="form-label">Total Score</label>
                        <input
                            type="text"
                            className="form-control"
                            id="totalScore"
                            name="totalScore"
                            value={updateField.totalScore}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dueDate" className="form-label">Due Date</label>
                        <input
                            type="text"
                            className="form-control"
                            id="dueDate"
                            name="dueDate"
                            value={updateField.dueDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskFileUpload" className="form-label">Task File Upload</label>
                        <input
                            type="file"
                            className="form-control"
                            id="taskFileUpload"
                            name="taskFileUpload"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleSubmit}>Update</button>

                    {Object.keys(validationErrors).length > 0 && (
                        <div className="alert alert-danger mt-3">
                            {Object.entries(validationErrors).map(([key, error], index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    } else {
        return '';
    }
};

export default AdminUpdateTask;