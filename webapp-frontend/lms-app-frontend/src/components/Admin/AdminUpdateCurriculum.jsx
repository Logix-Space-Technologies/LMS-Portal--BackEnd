import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../config/config'
import Navbar from './Navbar'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar'

const AdminUpdateCurriculum = () => {

    const [curriculumData, setCurriculumData] = useState([])
    const [file, setFile] = useState("")
    const [fileType, setFileType] = useState("");
    const [errors, setErrors] = useState({})

    const [updateField, setUpdateField] = useState(
        {
            "id": sessionStorage.getItem("curriculumId"),
            "curriculumTitle": "",
            "curriculumDesc": "",
            "updatedBy": sessionStorage.getItem("adminId"),
            "curriculumFileLink": file
        }
    )
    const apiURL = global.config.urls.api.server + "/api/lms/viewOneCurriculum";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/updatecurriculum";
    const navigate = useNavigate()
    const [key, setKey] = useState('');

    const updateHandler = (event) => {
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
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        e.preventDefault()
        const validationErrors = validateForm(updateField)
        if (Object.keys(validationErrors).length === 0) {
            let axiosConfig2 = {
                headers: {
                    'content-type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*",
                    "token": token,
                    "key": currentKey
                }
            }
            let data = {}
            if (file) {
                data = {
                    "id": sessionStorage.getItem("curriculumId"),
                    "curriculumTitle": updateField.curriculumTitle,
                    "curriculumDesc": updateField.curriculumDesc,
                    "updatedBy": sessionStorage.getItem("adminId"),
                    "curriculumFileLink": file
                }
            } else {
                data = {
                    "id": sessionStorage.getItem("curriculumId"),
                    "curriculumTitle": updateField.curriculumTitle,
                    "curriculumDesc": updateField.curriculumDesc,
                    "updatedBy": sessionStorage.getItem("adminId"),

                }
            }
            axios.post(apiUrl2, data, axiosConfig2).then(
                (Response) => {
                    console.log(Response)
                    if (Response.data.status === "success") {
                        setUpdateField({
                            "id": sessionStorage.getItem("curriculumId"),
                            "curriculumTitle": "",
                            "curriculumDesc": "",
                            "updatedBy": sessionStorage.getItem("adminId"),
                            "curriculumFileLink": ""
                        })
                        alert("Curriculum Updated Successfully")
                        setFile(null)
                        navigate(-1)
                    } else {
                        if (Response.data.status === "Validation failed" && Response.data.data.curriculumTitle) {
                            alert(Response.data.data.curriculumTitle)
                        } else {
                            if (Response.data.status === "Validation failed" && Response.data.data.curriculumDesc) {
                                alert(Response.data.data.curriculumDesc)
                            } else {
                                if (Response.data.status === "Validation failed" && Response.data.data.updatedBy) {
                                    alert(Response.data.data.updatedBy)
                                } else {
                                    if (Response.data.status === "Unauthorized User!!") {
                                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                                        sessionStorage.clear()
                                    } else {
                                        alert(Response.data.status)
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
            setErrors(validationErrors)
        }
    }

    const validateForm = (data) => {
        let errors = {};

        if (!data.curriculumTitle.trim()) {
            errors.curriculumTitle = 'Curriculum Title Name is required';
        } else if (!data.curriculumDesc.trim()) {
            errors.curriculumDesc = 'Curriculum Description is required';
        } else if (file && fileType !== "docx" && fileType !== "pdf") {
            errors.file = "File must be in PDF or DOCX format";
        }

        return errors;
    };

    const getData = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let data = { "id": sessionStorage.getItem("curriculumId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        }
        axios.post(apiURL, data, axiosConfig).then(
            (response) => {
                if (response.data.curriculum) {
                    setCurriculumData(response.data.curriculum)
                    setUpdateField(response.data.curriculum[0])
                } else {
                    if (response.data.status === "Unauthorized access!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear()
                    } else {
                        if (!response.data.curriculum) {
                            setCurriculumData([])
                            setUpdateField({
                                "id": "",
                                "curriculumTitle": "",
                                "curriculumDesc": "",
                                "updatedBy": "",
                                "curriculumFileLink": ""
                            })
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            }
        )
    }

    useEffect(() => { getData() }, [])

    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);

    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-4 mb-sm-5">
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h3 className="h2 text-black mb-0">Update Curriculum Details</h3>
                        <br></br>
                        <div className="card card-style1 --bs-primary-border-subtle border-5">
                            <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                                <div className="row align-items-center">
                                    <div className="col-lg-6 px-xl-10">
                                        <ul className="list-unstyled mb-1-9">
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                {/* <label htmlFor="" className="form-label">Id</label> */}
                                                <input type="hidden" className="form-control" name="id" value={updateField.id} disabled />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Curriculum Title</label>
                                                <input onChange={updateHandler} type="text" className="form-control" name="curriculumTitle" value={updateField.curriculumTitle} />
                                                {errors.curriculumTitle && <span style={{ color: 'red' }} className="error">{errors.curriculumTitle}</span>}
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Curriculum Description</label>
                                                <input onChange={updateHandler} type="text" className="form-control" name="curriculumDesc" value={updateField.curriculumDesc} />
                                                {errors.curriculumDesc && <span style={{ color: 'red' }} className="error">{errors.curriculumDesc}</span>}
                                            </div>
                                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                                <label for="studProfilePic" className="form-label">
                                                    Curriculum File <span className="text-danger">*</span>
                                                </label>
                                                <input onChange={fileUploadHandler} type="file" className="form-control" name="curriculumFileLink" id="curriculumFileLink" accept="*" />
                                                {errors.file && <span style={{ color: 'red' }} className="error">{errors.file}</span>}
                                            </div>
                                            <br></br>
                                            <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                <button onClick={readNewValue} className="btn btn-warning">Update</button>
                                            </div>
                                            <br></br>
                                            <div class="mb-3">
                                                <button onClick={() => navigate(-1)} className="btn bg-red-500 text-white px-4 py-2 rounded-md">Back</button>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default AdminUpdateCurriculum