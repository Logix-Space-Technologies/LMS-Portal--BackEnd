import React, { useEffect, useState } from 'react'
import '../../config/config';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminUpdateTask = () => {
    const [taskData, setTaskData] = useState([]);
    const [file, setFile] = useState(null)
    const [fileType, setFileType] = useState("");
    const [errors, setErrors] = useState({})
    const [updateField, setUpdateField] = useState({
        "id": sessionStorage.getItem('taskId'),
        "batchId": '',
        "taskTitle": '',
        "taskDesc": '',
        "taskType": '',
        "totalScore": '',
        "dueDate": '',
        "taskFileUpload": file,
    });
    const apiURL = global.config.urls.api.server + '/api/lms/viewOneTask';
    const apiUrl2 = global.config.urls.api.server + '/api/lms/updateTask';
    const navigate = useNavigate();

    const updateHandler = (event) => {
        setErrors({});
        setUpdateField({ ...updateField, [event.target.name]: event.target.value })
    }

    const fileUploadHandler = (event) => {
        setErrors({});
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setErrors({});
            setFile(uploadedFile);
            const extension = uploadedFile.name.split('.').pop().toLowerCase();
            setFileType(extension);
        } else {
            setFile(null);
            setFileType("");
        }
    }

    const readNewValue = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(updateField);
        console.log(updateField)
        if (Object.keys(validationErrors).length === 0) {
            let axiosConfig2 = {
                headers: {
                    'content-type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*",
                    "token": sessionStorage.getItem("admtoken"),
                    "key": sessionStorage.getItem("admkey")
                }
            }
            let data = {
                "id": sessionStorage.getItem('taskId'),
                "batchId": updateField.batchId,
                "taskTitle": updateField.taskTitle,
                "taskDesc": updateField.taskDesc,
                "taskType": updateField.taskType,
                "totalScore": updateField.totalScore,
                "dueDate": updateField.dueDate,
                "taskFileUpload": file,
            }
            axios.post(apiUrl2, data, axiosConfig2).then(
                (Response) => {
                    if (Response.data.status === "success") {
                        setUpdateField({
                            "id": sessionStorage.getItem('taskId'),
                            "batchId": '',
                            "taskTitle": '',
                            "taskDesc": '',
                            "taskType": '',
                            "totalScore": '',
                            "dueDate": '',
                        })
                        alert("Task Updated Successfully")
                        navigate(-1)
                    } else {
                        if (Response.data.status === "Validation failed" && Response.data.data.value) {
                            alert(Response.data.data.value)
                        } else {
                            if (Response.data.status === "Validation failed" && Response.data.data.name) {
                                alert(Response.data.data.name)
                            } else {
                                if (Response.data.status === "Validation failed" && Response.data.data.desc) {
                                    alert(Response.data.data.desc)
                                } else {
                                    if (Response.data.status === "Validation failed" && Response.data.data.type) {
                                        alert(Response.data.data.type)
                                    } else {
                                        if (Response.data.status === "Validation failed" && Response.data.data.score) {
                                            alert(Response.data.data.score)
                                        } else {
                                            if (Response.data.status === "Validation failed" && Response.data.data.date) {
                                                alert(Response.data.data.date)
                                            } else {
                                                alert(Response.data.status)
                                            }
                                        }
                                    }
                                }

                            }
                        }
                    }

                }
            ).catch(error => {
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
        } else {
            setErrors(validationErrors);
        }
    }

    const validateForm = (data) => {
        let errors = {};

        if (!data.batchId) {
            errors.batchId = 'Batch Name is required';
        }
        if (!data.taskTitle) {
            errors.taskTitle = 'Task Title is required';
        }
        if (!data.taskDesc) {
            errors.taskDesc = 'Task Description is required';
        }
        if (!data.taskType) {
            errors.taskType = 'Task Type is required';
        }
        if (!data.totalScore) {
            errors.totalScore = 'Total Score is required';
        }
        if (!data.dueDate) {
            errors.dueDate = 'Due Date is required';
        }
        if (fileType !== "pdf" && fileType !== "docx") {
            errors.file = "File must be in PDF or DOCX format";
        }
        return errors;
    }

    const getData = () => {
        let data = { "id": sessionStorage.getItem('taskId') };
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": sessionStorage.getItem('admtoken'),
                "key": sessionStorage.getItem('admkey'),
            }
        }
        axios.post(apiURL, data, axiosConfig).then((response) => {
            setTaskData(response.data.data);
            setUpdateField(response.data.data);
            console.log(response.data.data);
        });
    };

    const handleBackButton = () => {
      navigate(-1)
    }

    useEffect(() => {
        const formattedDate = formatDate(updateField.dueDate);
        setUpdateField({ ...updateField, dueDate: formattedDate });
    }, [updateField.dueDate]);

    useEffect(() => {
        getData();
    }, []);
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
                                <div className="col-lg-6 px-xl-10">
                                    <ul className="list-unstyled mb-1-9">
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">
                                                Id
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="id"
                                                value={updateField.id}
                                                disabled
                                            />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">
                                                BatchId
                                            </label>
                                            <input
                                                onChange={updateHandler}
                                                type="text"
                                                className="form-control"
                                                name="batchId"
                                                value={updateField.batchId}
                                            />
                                            {errors.batchId && (<span style={{ color: 'red' }} className="error">{errors.batchId}</span>)}
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">
                                                Task Title
                                            </label>
                                            <input
                                                onChange={updateHandler}
                                                type="text"
                                                className="form-control"
                                                name="taskTitle"
                                                value={updateField.taskTitle}
                                            />
                                            {errors.taskTitle && (<span style={{ color: 'red' }} className="error">{errors.taskTitle}</span>)}
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">
                                                Task Description
                                            </label>
                                            <input
                                                onChange={updateHandler}
                                                type="text"
                                                className="form-control"
                                                name="taskDesc"
                                                value={updateField.taskDesc}
                                            />
                                            {errors.taskDesc && (<span style={{ color: 'red' }} className="error">{errors.taskDesc}</span>)}
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">
                                                Task Type
                                            </label>
                                            <input
                                                onChange={updateHandler}
                                                type="text"
                                                className="form-control"
                                                name="taskType"
                                                value={updateField.taskType}
                                            />
                                            {errors.taskType && (<span style={{ color: 'red' }} className="error">{errors.taskType}</span>)}
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">
                                                Total Score
                                            </label>
                                            <input
                                                onChange={updateHandler}
                                                type="text"
                                                className="form-control"
                                                name="totalScore"
                                                value={updateField.totalScore}
                                            />
                                            {errors.totalScore && (<span style={{ color: 'red' }} className="error">{errors.totalScore}</span>)}
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">
                                                Due Date
                                            </label>
                                            <input
                                                onChange={updateHandler}
                                                type="text"
                                                className="form-control"
                                                name="dueDate"
                                                value={updateField.dueDate}
                                            />
                                            {errors.dueDate && (<span style={{ color: 'red' }} className="error">{errors.dueDate}</span>)}
                                        </div>
                                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                            <label for="studProfilePic" className="form-label">
                                                File <span className="text-danger">*</span>
                                            </label>
                                            <input onChange={fileUploadHandler} type="file" className="form-control" name="taskFileUpload" id="taskFileUpload" accept="pdf/*" />
                                            {errors.file && (<span style={{ color: 'red' }} className="error">{errors.file}</span>)}
                                        </div>
                                        <br></br>
                                        <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                            <button onClick={readNewValue} className="btn btn-warning">
                                                Update
                                            </button>
                                        </div>
                                        <br></br>
                                        <div className="mb-3">
                                            <Link className="btn btn-danger" onClick={handleBackButton}>
                                                Back
                                            </Link>
                                        </div>
                                    </ul>

                                    <ul className="social-icon-style1 list-unstyled mb-0 ps-0">
                                        <li>
                                            <a href="#!">
                                                <i className="ti-twitter-alt" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!">
                                                <i className="ti-facebook" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!">
                                                <i className="ti-pinterest" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!">
                                                <i className="ti-instagram" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

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

export default AdminUpdateTask