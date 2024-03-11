import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import '../../config/config'
import { Link } from 'react-router-dom';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';

const AdminAddTask = () => {

    const [inputField, setInputField] = useState({
        "collegeId": "",
        "batchId": "",
        "sessionId": "",
        "taskTitle": "",
        "taskDesc": "",
        "taskType": "",
        "totalScore": "",
        "dueDate": "",
    })

    const [file, setFile] = useState(null)

    const [fileType, setFileType] = useState("");

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

    const [outputField, setOutputField] = useState([])

    const [errors, setErrors] = useState({})

    const [batches, setBatches] = useState([])

    const [sessions, setSessions] = useState([])

    const [key, setKey] = useState('');

    const apiUrl = global.config.urls.api.server + "/api/lms/addtask";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/viewallcolleges";
    const batchUrl = global.config.urls.api.server + "/api/lms/adminviewbatch";
    const apiUrl3 = global.config.urls.api.server + "/api/lms/viewSessions";

    const getData = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": token,
                "key": currentKey
            }
        };
        axios.post(apiUrl2, {}, axiosConfig).then(
            (response) => {
                setOutputField(response.data.data)
            }
        )
    }

    const getBatches = (collegeId) => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": token,
                "key": currentKey
            }
        };
        axios.post(batchUrl, { collegeId }, axiosConfig2).then((response) => {
            setBatches(response.data)
        })
    }

    const getSessions = (batchId) => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let axiosConfig3 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": token,
                "key": currentKey
            }
        };
        axios.post(apiUrl3, { batchId }, axiosConfig3).then((response) => {
            setSessions(response.data.Sessions || []);
        });
    };

    const viewBatches = (collegeId) => {
        getBatches(collegeId);
        setSessions([]); // Clear sessions when viewing batches
    };

    const viewSessions = (batchId) => {
        getSessions(batchId);
    };

    const handleCollegeChange = (event) => {
        const selectedCollegeId = event.target.value;
        setInputField((prevState) => ({ ...prevState, collegeId: selectedCollegeId }));
        viewBatches(selectedCollegeId);
    };

    const inputHandler = (event) => {
        setErrors({})
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const readValue = (e) => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        e.preventDefault();
        const validationErrors = validateForm(inputField);
        if (Object.keys(validationErrors).length === 0) {
            let axiosConfig3 = {
                headers: {
                    'content-type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*",
                    "token": token,
                    "key": currentKey
                }
            }
            let data = {
                "batchId": inputField.batchId,
                "sessionId": inputField.sessionId,
                "taskTitle": inputField.taskTitle,
                "taskDesc": inputField.taskDesc,
                "taskType": inputField.taskType,
                "totalScore": inputField.totalScore,
                "dueDate": inputField.dueDate,
                "taskFileUpload": file
            }
            axios.post(apiUrl, data, axiosConfig3).then((response) => {
                if (response.data.status === 'success') {
                    alert('Task Added Successfully !!');
                    setInputField({
                        collegeId: '',
                        batchId: '',
                        sessionId: '',
                        taskTitle: '',
                        taskDesc: '',
                        taskType: '',
                        totalScore: '',
                        dueDate: '',
                        taskFileUpload: ''
                    })
                } else {
                    if (response.data.status === "Validation failed" && response.data.data.batchId) {
                        alert(response.data.data.batchId)
                    } else {
                        if (response.data.status === "Validation failed" && response.data.data.taskTitle) {
                            alert(response.data.data.taskTitle)
                        } else {
                            if (response.data.status === "Validation failed" && response.data.data.taskDesc) {
                                alert(response.data.data.taskDesc)
                            } else {
                                if (response.data.status === "Validation failed" && response.data.data.taskType) {
                                    alert(response.data.data.taskType)
                                } else {
                                    if (response.data.status === "Validation failed" && response.data.data.totalScore) {
                                        alert(response.data.data.totalScore)
                                    } else {
                                        if (response.data.status === "Validation failed" && response.data.data.dueDate) {
                                            alert(response.data.data.dueDate)
                                        } else {
                                            alert(response.data.status)
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
                        console.log("Status 400:", error.response.data);
                        alert(error.response.data.status)
                        // Additional logic for status 400
                    } else if (statusCode === 500) {
                        console.log("Status 500:", error.response.data);
                        alert(error.response.data.status)
                        // Additional logic for status 500
                    } else {
                        alert(error.response.data.status)
                    }
                } else if (error.request) {
                    console.log(error.request);
                    alert(error.request);
                } else if (error.message) {
                    console.log('Error', error.message);
                    alert('Error', error.message);
                } else {
                    alert(error.config);
                    console.log(error.config);
                }
            })
        } else {
            setErrors(validationErrors);
        }
    }

    const validateForm = (data) => {
        let errors = {};

        if (!data.batchId.trim()) {
            errors.batchId = 'Batch Name is required';
        }
        if (!data.collegeId.trim()) {
            errors.collegeId = 'College Name is required';
        }
        if (!data.sessionId.trim()) {
            errors.sessionId = 'Session Name is required';
        }
        if (!data.taskTitle.trim()) {
            errors.taskTitle = 'Task Title is required';
        }
        if (!data.taskDesc.trim()) {
            errors.taskDesc = 'Task Description is required';
        }
        if (!data.taskType.trim()) {
            errors.taskType = 'Task Type is required';
        }
        if (!data.totalScore.trim()) {
            errors.totalScore = 'Total Score is required';
        }
        if (!data.dueDate.trim()) {
            errors.dueDate = 'Due Date is required';
        }
        if (fileType !== "pdf" && fileType !== "docx") {
            errors.file = "File must be in PDF or DOCX format";
        }
        return errors;
    }

    useEffect(() => { getData() }, [])

    useEffect(() => { setKey(sessionStorage.getItem("admkey") || '') }, []);

    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
            <div className="bg-light py-3 py-md-5">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
                            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="text-center mb-5">
                                            <Link to="#!">
                                                <img
                                                    src="https://www.linkurcodes.com/images/logo.png"
                                                    alt=""
                                                    width="175"
                                                    height="57"
                                                />
                                            </Link>
                                            <br />
                                            <br />
                                            <h3>Admin Add Task</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="row gy-3 gy-md-4 overflow-hidden">
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="collegeId" className="form-label">
                                            College Name <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            name="collegeId"
                                            value={inputField.collegeId}
                                            onChange={handleCollegeChange}
                                            id="collegeId"
                                            className="form-control">
                                            <option value="">Select</option>
                                            {outputField.map((value) => {
                                                return <option value={value.id}> {value.collegeName} </option>
                                            })}
                                        </select>
                                        {errors.collegeId && (
                                            <span style={{ color: 'red' }} className="error">
                                                {errors.collegeId}
                                            </span>
                                        )}
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="batchName" className="form-label">
                                            Batch Name <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            name="batchId"
                                            id="batchId"
                                            className="form-control"
                                            value={inputField.batchId}
                                            onChange={(e) => {
                                                inputHandler(e);
                                                viewSessions(e.target.value); // Call viewSessions when batch is selected
                                            }}
                                        >
                                            <option value="">Select</option>
                                            {batches.data && batches.data.map((value) => {
                                                return <option value={value.id}> {value.batchName} </option>;
                                            })}
                                        </select>
                                        {errors.batchId && (<span style={{ color: 'red' }} className="error">{errors.batchId}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="session" className="form-label">
                                            Session Name <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            name="sessionId"
                                            id="sessionId"
                                            className="form-control"
                                            value={inputField.sessionId}
                                            onChange={inputHandler}
                                        >
                                            <option value="">Select</option>
                                            {sessions.map((value) => {
                                                return <option value={value.id}> {value.sessionName} </option>;
                                            })}
                                        </select>
                                        {errors.sessionId && (<span style={{ color: 'red' }} className="error">{errors.sessionId}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="taskTitle" className="form-label">
                                            Task Title <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="taskTitle"
                                            id="taskTitle"
                                            value={inputField.taskTitle}
                                            onChange={inputHandler}
                                            required
                                        />
                                        {errors.taskTitle && (<span style={{ color: 'red' }} className="error">{errors.taskTitle}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="taskDesc" className="form-label">
                                            Task Description<span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="taskDesc"
                                            id="taskDesc"
                                            rows="3"
                                            value={inputField.taskDesc}
                                            onChange={inputHandler}
                                        ></textarea>
                                        {errors.taskDesc && (<span style={{ color: 'red' }} className="error">{errors.taskDesc}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="taskType" className="form-label">
                                            Task Type <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className="form-select"
                                            name="taskType"
                                            id="taskType"
                                            value={inputField.taskType}
                                            onChange={inputHandler}
                                        >
                                            <option value="">Select Type</option>
                                            <option value="Mini Project">Mini Project</option>
                                            <option value="Project">Project</option>
                                            <option value="Live Project">Live Project</option>
                                            <option value="Daily Task">Daily Task</option>
                                            <option value="Weekly Task">Weekly Task</option>
                                            <option value="Homework">Homework</option>
                                        </select>
                                        {errors.taskType && (<span style={{ color: 'red' }} className="error">{errors.taskType}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="totalScore" className="form-label">
                                            Total Score <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="totalScore"
                                            id="totalScore"
                                            value={inputField.totalScore}
                                            onChange={inputHandler}
                                        />
                                        {errors.totalScore && (<span style={{ color: 'red' }} className="error">{errors.totalScore}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="dueDate" className="form-label">
                                            Due Date <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="dueDate"
                                            id="dueDate"
                                            value={inputField.dueDate}
                                            onChange={inputHandler}
                                        />
                                        {errors.dueDate && (<span style={{ color: 'red' }} className="error">{errors.dueDate}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="taskFileUpload" className="form-label">
                                            Task File <span className="text-danger">*</span>
                                        </label>
                                        <input type="file" className="form-control" name="taskFileUpload" id="taskFileUpload" onChange={fileUploadHandler} />
                                        {errors.file && (<span style={{ color: 'red' }} className="error">{errors.file}</span>)}
                                    </div>
                                    <div className="col-12">
                                        <div className="d-grid">
                                            <button
                                                className="btn btn-primary btn-lg"
                                                type="submit"
                                                onClick={readValue}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <hr className="mt-5 mb-4 border-secondary-subtle" />
                                        <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center">
                                            &copy; 2024 Link Ur Codes. All rights reserved.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAddTask;
