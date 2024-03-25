import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import '../../config/config'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar'
import { Link, useNavigate } from 'react-router-dom'

const AdminAddCurriculum = () => {

    const [inputField, setInputField] = useState({
        "collegeId": "",
        "batchId": "",
        "curriculumTitle": "",
        "curriculumDesc": ""
    })

    const navigate = useNavigate()

    const [file, setFile] = useState(null)
    const [key, setKey] = useState('');
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

    const [errors, setErrors] = useState({})

    const [outputField, setOutputField] = useState([])

    const [batches, setBatches] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/createCurriculum";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/viewallcolleges";
    const batchUrl = global.config.urls.api.server + "/api/lms/adminviewbatch";

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
                if (response.data.data) {
                    setOutputField(response.data.data)
                } else if (response.data.status === "Unauthorized User!!") {
                    { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                    sessionStorage.clear()
                } else if (!response.data.data) {
                    setOutputField([])
                } else {
                    alert(response.data.status)
                }
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
            if (response.data) {
                setBatches(response.data)
            } else if (response.data.status === "Unauthorized User!!") {
                { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                sessionStorage.clear()
            } else if (!response.data) {
                setBatches([])
            } else {
                alert(response.data.status)
            }
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
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        let addedBy;
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        if (currentKey === 'lmsapp') {
            addedBy = 0
        } else {
            addedBy = sessionStorage.getItem("admstaffId")
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
                "curriculumTitle": inputField.curriculumTitle,
                "curriculumDesc": inputField.curriculumDesc,
                "curriculumFileLink": file,
                "addedBy": addedBy
            }
            axios.post(apiUrl, data, axiosConfig3).then((response) => {
                if (response.data.status === 'success') {
                    alert('Curriculum Added Successfully !!');
                    setInputField({
                        collegeId: '',
                        batchId: '',
                        curriculumTitle: '',
                        curriculumDesc: '',
                        curriculumFileLink: '',
                    })
                } else if (response.data.status === "Validation failed" && response.data.data.addedBy) {
                    alert(response.data.data.addedBy)
                } else if (response.data.status === "Validation failed" && response.data.data.batchId) {
                    alert(response.data.data.batchId)
                } else if (response.data.status === "Validation failed" && response.data.data.curriculumTitle) {
                    alert(response.data.data.curriculumTitle)
                } else if (response.data.status === "Validation failed" && response.data.data.curriculumDesc) {
                    alert(response.data.data.curriculumDesc)
                } else if (response.data.status === "Unauthorized User!!") {
                    { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                    sessionStorage.clear()
                } else {
                    alert(response.data.status)
                }
            }).catch(error => {
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
        if (!data.curriculumTitle.trim()) {
            errors.curriculumTitle = 'Curriculum Title is required';
        }
        if (!data.curriculumDesc.trim()) {
            errors.curriculumDesc = 'Curriculum Description is required';
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
                                            <h3>Add Currirculum</h3>
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
                                        <label htmlFor="curriculumTitle" className="form-label">
                                            Curriculum Title <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="curriculumTitle"
                                            id="curriculumTitle"
                                            value={inputField.curriculumTitle}
                                            onChange={inputHandler}
                                            required
                                        />
                                        {errors.curriculumTitle && (<span style={{ color: 'red' }} className="error">{errors.curriculumTitle}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="curriculumDesc" className="form-label">
                                            Curriculum Description<span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="curriculumDesc"
                                            id="curriculumDesc"
                                            rows="3"
                                            value={inputField.curriculumDesc}
                                            onChange={inputHandler}
                                        ></textarea>
                                        {errors.curriculumDesc && (<span style={{ color: 'red' }} className="error">{errors.curriculumDesc}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="curriculumFileLink" className="form-label">
                                            Curriculum File <span className="text-danger">*</span>
                                        </label>
                                        <input type="file" className="form-control" name="curriculumFileLink" id="curriculumFileLink" onChange={fileUploadHandler} />
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

export default AdminAddCurriculum