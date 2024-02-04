import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import '../../config/config'

const AdminAddTask = () => {

    const [inputField, setInputField] = useState({
        "collegeId": "",
        "batchId": "",
        "taskTitle": "",
        "taskDesc": "",
        "taskType": "",
        "totalScore": "",
        "dueDate": "",
    })

    const [file, setFile] = useState(null)

    const [fileValidationMessage, setFileValidationMessage] = useState('');

    const fileUploadHandler = (event) => {
        setFileValidationMessage({})
        const file = event.target.files[0];
        if (file) {
            const isSizeValid = file.size <= 2097152; // 2MB in bytes
            const isTypeValid = file.type === "application/pdf";
    
            if (isSizeValid && isTypeValid) {
                setFile(file);
                setFileValidationMessage('');
            } else {
                if (!isSizeValid) {
                    setFileValidationMessage('File size should be less than 2MB.');
                }
                if (!isTypeValid) {
                    setFileValidationMessage('Invalid file type. Only PDFs are allowed.');
                }
            }
        } else {
            setFileValidationMessage("Please upload a file.");
        }
    };

    const [outputField, setOutputField] = useState([])

    const [errors, setErrors] = useState({})

    const [batches, setBatches] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/addtask";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/viewallcolleges";
    const batchUrl = global.config.urls.api.server + "/api/lms/adminviewbatch";

    const getData = () => {
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": sessionStorage.getItem('admtoken'),
                "key": sessionStorage.getItem('admkey')
            }
        };
        axios.post(apiUrl2, {}, axiosConfig).then(
            (response) => {
                setOutputField(response.data.data)
                console.log(response.data.data)
            }
        )
    }

    const getBatches = (collegeId) => {
        let axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": sessionStorage.getItem('admtoken'),
                "key": sessionStorage.getItem('admkey')
            }
        };
        console.log(collegeId)
        axios.post(batchUrl, { collegeId }, axiosConfig2).then((response) => {
            setBatches(response.data)
            console.log(response.data)
        })
    }

    const handleCollegeChange = (event) => {
        const selectedCollegeId = event.target.value;
        setInputField(prevState => ({ ...prevState, collegeId: selectedCollegeId }))
        getBatches(selectedCollegeId);
    }

    const inputHandler = (event) => {
        setErrors({})
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const readValue = (e) => {
        if (!file) {
            setFileValidationMessage("Please upload a file.");
            return;
        }
        if (fileValidationMessage) {
            return;
        }
        e.preventDefault();
        const validationErrors = validateForm(inputField);
        console.log(validationErrors)
        if (Object.keys(validationErrors).length === 0) {
            let axiosConfig3 = {
                headers: {
                    'content-type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*",
                    "token": sessionStorage.getItem("admtoken"),
                    "key": sessionStorage.getItem("admkey")
                }
            }
            console.log(axiosConfig3)
            let data = {
                "batchId": inputField.batchId,
                "taskTitle": inputField.taskTitle,
                "taskDesc": inputField.taskDesc,
                "taskType": inputField.taskType,
                "totalScore": inputField.totalScore,
                "dueDate": inputField.dueDate,
                "taskFileUpload" : file
            }
            console.log(data)
            axios.post(apiUrl, data, axiosConfig3).then((response) => {
                console.log(response.data.status)
                if (response.data.status === 'success') {
                    alert('Task Added Successfully !!');
                    setInputField({
                        collegeId: '',
                        batchId: '',
                        taskTitle: '',
                        taskDesc: '',
                        taskType: '',
                        totalScore: '',
                        dueDate: '',
                        taskFileUpload: ''
                    })
                } else {
                    if (response.data.status === "Validation failed" && response.data.data.amount) {
                        alert(response.data.data.amount)
                    } else {
                        if (response.data.status === "Validation failed" && response.data.data.name) {
                            alert(response.data.data.name)
                        } else {
                            if (response.data.status === "Validation failed" && response.data.data.address) {
                                alert(response.data.data.address)
                            } else {
                                if (response.data.status === "Validation failed" && response.data.data.name) {
                                    alert(response.data.data.name)
                                } else {
                                    if (response.data.status === "Validation failed" && response.data.data.totalScore) {
                                        alert(response.data.data.totalScore)
                                    } else {
                                        if (response.data.status === "Validation failed" && response.data.data.date) {
                                            alert(response.data.data.date)
                                        } else {
                                            if (response.data.status === "Validation failed" && response.data.data.date) {
                                                alert(response.data.data.date)
                                            } else {
                                                if (response.status === "400" && response.data.status) {
                                                    alert(response.data.status)
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
                }
            }
            )
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
        // if (!data.taskFileUpload) {
        //     errors.taskFileUpload = 'File Upload is required';
        // }
        if (!data.dueDate.trim()) {
            errors.dueDate = 'Due Date is required';
        }
        return errors;
    }

    useEffect(() => {getData()}, [])

    return (
        <div>
            <Navbar />
            <div className="bg-light py-3 py-md-5">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
                            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="text-center mb-5">
                                            <a href="#!">
                                                <img
                                                    src="https://www.linkurcodes.com/images/logo.png"
                                                    alt=""
                                                    width="175"
                                                    height="57"
                                                />
                                            </a>
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
                                            onChange={inputHandler}>
                                            <option value="">Select</option>
                                            {batches.data && batches.data.map((value) => {
                                                return <option value={value.id}> {value.batchName} </option>;
                                            })}
                                        </select>
                                        {errors.batchId && (<span style={{ color: 'red' }} className="error">{errors.batchId}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
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
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="taskType"
                                            id="taskType"
                                            value={inputField.taskType}
                                            onChange={inputHandler}
                                        />
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
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
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
                                        {fileValidationMessage && <div className="text-danger">{fileValidationMessage}</div>}
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

export default AdminAddTask