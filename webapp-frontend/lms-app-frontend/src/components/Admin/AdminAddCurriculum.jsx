import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar'

const AdminAddCurriculum = () => {

    const [inputField, setInputField] = useState({
        "collegeId": "",
        "batchId": "",
        "curriculumTitle": "",
        "curriculumDesc": "",
    })

    const [file, setFile] = useState(null)
    const [key, setKey] = useState('');

    const fileUploadHandler = (event) => {
        setFile(event.target.files[0])
    }

    const [errors, setErrors] = useState({})

    const [outputField, setOutputField] = useState([])

    const [batches, setBatches] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/createCurriculum";
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
                "curriculumTitle": inputField.curriculumTitle,
                "curriculumDesc": inputField.curriculumDesc,
                "curriculumFileLink": file,
                "addedBy" : addedBy
            }
            console.log(data)
            axios.post(apiUrl, data, axiosConfig3).then((response) => {
                console.log(response.data.status)
                if (response.data.status === 'success') {
                    alert('Curriculum Added Successfully !!');
                    setInputField({
                        collegeId: '',
                        batchId: '',
                        curriculumTitle: '',
                        curriculumDesc: '',
                        curriculumFileLink: '',
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
        if (!data.curriculumTitle.trim()) {
            errors.curriculumTitle = 'Curriculum Title is required';
        }
        if (!data.curriculumDesc.trim()) {
            errors.curriculumDesc = 'Curriculum Description is required';
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
                                            <h3>Admin Add Currirculum</h3>
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