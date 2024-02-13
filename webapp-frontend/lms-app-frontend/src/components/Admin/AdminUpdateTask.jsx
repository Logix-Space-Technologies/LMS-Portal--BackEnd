import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminUpdateTask = () => {
    const [updateField, setUpdateField] = useState({
        "id": sessionStorage.getItem("taskId"),
        "batchId": sessionStorage.getItem("batchId"),
        "taskTitle": "",
        "taskDesc": "",
        "taskType": "",
        "totalScore": "",
        "dueDate": "",
        "taskFileUpload": ""
    });
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    const apiURL = global.config.urls.api.server + "/api/lms/adminviewonetask";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/updateTask";

    const updateHandler = (event) => {
        setUpdateField({ ...updateField, [event.target.name]: event.target.value });
    }

    const fileUploadHandler = (event) => {
        setUpdateField({ ...updateField, taskFileUpload: event.target.files[0] });
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.post(apiURL, { id: sessionStorage.getItem("taskId") }, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                        "token": sessionStorage.getItem("admtoken"),
                        "key": sessionStorage.getItem("admkey")
                    }
                });
                setUpdateField(response.data.data[0]);
            } catch (error) {
                console.error("Error:", error.message);
                alert("An unexpected error occurred.");
            }
        };
        getData();
    }, [apiURL]);

    const readNewValue = () => {
        let formData = new FormData();
        formData.append("id", sessionStorage.getItem("taskId"));
        formData.append("batchId", updateField.batchId);
        formData.append("taskTitle", updateField.taskTitle);
        formData.append("taskDesc", updateField.taskDesc);
        formData.append("taskType", updateField.taskType);
        formData.append("totalScore", updateField.totalScore);
        formData.append("dueDate", updateField.dueDate);
        formData.append("taskFileUpload", updateField.taskFileUpload);

        axios.post(apiUrl2, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        })
            .then((response) => {
                if (response.status === 200 && response.data.status === "success") {
                    alert("Task Updated Successfully");
                    navigate("/adminviewalltasks");
                } else if (response.status === 400) {
                    if (response.data && response.data.status === "Validation failed") {
                        setValidationErrors(response.data.data || {});
                    } else {
                        alert("Bad request: " + response.data.status);
                    }
                } else if (response.status === 403) {
                    alert("Unauthorized access!!");
                    navigate("/");
                } else if (response.status === 404) {
                    alert("Task not found");
                } else if (response.status === 422) {
                    alert("Unprocessable Entity: " + response.data.status);
                } else if (response.status === 500) {
                    alert("Internal server error: " + response.data.status);
                } else {
                    alert("Unexpected error: " + response.data.status);
                }
            })
            .catch((error) => {
                console.error("Error:", error.message);
                alert("An unexpected error occurred.");
            });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card w-75">
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Update Task Details</h3>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="taskTitle" className="form-label">Task Title</label>
                            <input onChange={updateHandler} type="text" className="form-control" id="taskTitle" name="taskTitle" value={updateField.taskTitle} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="taskDesc" className="form-label">Task Description</label>
                            <textarea onChange={updateHandler} className="form-control" id="taskDesc" name="taskDesc" rows="3" value={updateField.taskDesc}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="taskType" className="form-label">Task Type</label>
                            <input onChange={updateHandler} type="text" className="form-control" id="taskType" name="taskType" value={updateField.taskType} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="totalScore" className="form-label">Total Score</label>
                            <input onChange={updateHandler} type="text" className="form-control" id="totalScore" name="totalScore" value={updateField.totalScore} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dueDate" className="form-label">Due Date</label>
                            <input onChange={updateHandler} type="date" className="form-control" id="dueDate" name="dueDate" value={updateField.dueDate} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="taskFileUpload" className="form-label">Task File Upload</label>
                            <input onChange={fileUploadHandler} type="file" className="form-control" id="taskFileUpload" name="taskFileUpload" accept="image/*" />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="button" onClick={readNewValue} className="btn btn-primary me-2">Update</button>
                            <Link to="/adminviewalltasks" className="btn btn-danger">Back</Link>
                        </div>
                    </form>
                </div>
            </div>
            {/* Alert for validation errors */}
            {Object.keys(validationErrors).length > 0 && (
                <div className="alert alert-danger mt-3" role="alert">
                    {Object.values(validationErrors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminUpdateTask;
