import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminUpdateTask = () => {
    const [taskData, setTaskData] = useState([]);
    const [file, setFile] = useState("");
    const [updateField, setUpdateField] = useState({
        "id": sessionStorage.getItem("taskId"),
        "batchId": sessionStorage.getItem("batchId"),
        "taskTitle": "",
        "taskDesc": "",
        "taskType": "",
        "totalScore": "",
        "dueDate": "",
        "taskFileUpload": file
    });
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    const apiURL = global.config.urls.api.server + "/api/lms/adminviewonetask";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/updateTask";

    const updateHandler = (event) => {
        setUpdateField({ ...updateField, [event.target.name]: event.target.value });
    }

    const fileUploadHandler = (event) => {
        setFile(event.target.files[0]);
        setUpdateField({ ...updateField, taskFileUpload: event.target.files[0] });
    }

    const readNewValue = () => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };

        let data = {
            "id": sessionStorage.getItem("taskId"),
            "batchId": updateField.batchId,
            "taskTitle": updateField.taskTitle,
            "taskDesc": updateField.taskDesc,
            "taskType": updateField.taskType,
            "totalScore": updateField.totalScore,
            "dueDate": updateField.dueDate,
            "taskFileUpload": file
        };

        axios.post(apiUrl2, data, axiosConfig)
            .then((response) => {
                const status = response.status;
                switch (status) {
                    case 200:
                        alert("Task Updated Successfully");
                        navigate("/adminviewalltasks");
                        break;
                    // Handle other success codes if necessary
                    default:
                        alert("An unexpected error occurred.");
                        break;
                }
            })
            .catch((error) => {
                if (error.response) {
                    switch (error.response.status) {
                        case 400:
                            setValidationErrors(error.response.data.data);
                            break;
                        case 403:
                            alert("Unauthorized access")
                            navigate("/");
                            break;
                        case 500:
                            alert("Internal server error. Please try again later.");
                            break;
                        default:
                            console.error("Error:", error.response.data.status);
                            alert("An unexpected error occurred.");
                            break;
                    }
                } else {
                    console.error("Error:", error.message);
                    alert("An unexpected error occurred.");
                }
            });
    }

    const getData = () => {
        let data = { "id": sessionStorage.getItem("taskId") };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };

        axios.post(apiURL, data, axiosConfig)
            .then((response) => {
                setTaskData(response.data.data);
                setUpdateField(response.data.data[0]);
            })
            .catch((error) => {
                console.error("Error:", error.message);
                alert("An unexpected error occurred.");
            });
    }

    useEffect(() => { getData() }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 mb-4 mb-sm-5">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h3 className="h2 text-black mb-0">Update Task Details</h3>
                    <br></br>
                    <div className="card card-style1 --bs-primary-border-subtle border-5">
                        <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                            <div className="row align-items-center">
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    {/* Display task data or image here */}
                                </div>
                                <div className="col-lg-6 px-xl-10">
                                    <div className="d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                        <h3 className="h2 text-black mb-0">{updateField.taskTitle}</h3>
                                        <br></br>
                                    </div>
                                    <ul className="list-unstyled mb-1-9">
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Task ID</label>
                                            <input type="text" className="form-control" name="id" value={updateField.id} disabled />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Batch ID</label>
                                            <input type="text" className="form-control" name="batchId" value={updateField.batchId || sessionStorage.getItem("batchId")} disabled />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Task Title</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="taskTitle" value={updateField.taskTitle} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Task Description</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="taskDesc" value={updateField.taskDesc} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Task Type</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="taskType" value={updateField.taskType} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Total Score</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="totalScore" value={updateField.totalScore} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Due Date</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="dueDate" value={updateField.dueDate} />
                                        </div>
                                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                            <label htmlFor="taskFileUpload" className="form-label">
                                                Task File Upload <span className="text-danger">*</span>
                                            </label>
                                            <input onChange={fileUploadHandler} type="file" className="form-control" name="taskFileUpload" id="taskFileUpload" accept="image/*" />
                                        </div>
                                        <br></br>
                                        <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                            <button onClick={readNewValue} className="btn btn-warning">Update</button>
                                        </div>
                                        <br></br>
                                        <div className="mb-3">
                                            <Link to="/adminviewalltasks" className="btn btn-danger">Back</Link>
                                        </div>
                                    </ul>

                                    <ul className="social-icon-style1 list-unstyled mb-0 ps-0">
                                        <li><a href="#!"><i className="ti-twitter-alt" /></a></li>
                                        <li><a href="#!"><i className="ti-facebook" /></a></li>
                                        <li><a href="#!"><i className="ti-pinterest" /></a></li>
                                        <li><a href="#!"><i className="ti-instagram" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Alert for validation errors */}
            {Object.keys(validationErrors).length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {Object.values(validationErrors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminUpdateTask;
