import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../config/config'
import Navbar from './Navbar'

const AdminUpdateCurriculum = () => {

    const [curriculumData, setCurriculumData] = useState([])
    const [file, setFile] = useState("")
    const [fileValidationMessage, setFileValidationMessage] = useState('');
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

    const updateHandler = (event) => {
        setUpdateField({ ...updateField, [event.target.name]: event.target.value })
    }

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
    

    const readNewValue = () => {
        if (!file) {
            setFileValidationMessage("Please upload a file.");
            return;
        }
        if (fileValidationMessage) {
            return;
        }
        console.log(updateField)
        let axiosConfig2 = {
            headers: {
                'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        }
        let data = {
            "id": sessionStorage.getItem("curriculumId"),
            "curriculumTitle": updateField.curriculumTitle,
            "curriculumDesc": updateField.curriculumDesc,
            "updatedBy": sessionStorage.getItem("adminId"),
            "curriculumFileLink": file
        }
        axios.post(apiUrl2, data, axiosConfig2).then(
            (Response) => {
                if (Response.data.status === "success") {
                    setUpdateField({
                        "id": sessionStorage.getItem("curriculumId"),
                        "curriculumTitle": "",
                        "curriculumDesc": "",
                        "updatedBy": sessionStorage.getItem("adminId"),
                        "curriculumFileLink": ""
                    })
                    alert("Curriculum Updated Successfully")
                    navigate("/adminviewallcurriculum")
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
                                alert(Response.data.status)
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
                    console.log(error.response.data);
                    alert(error.response.data.status)
                }
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        })
    }
    

    const getData = () => {
        let data = { "id": sessionStorage.getItem("curriculumId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        }
        axios.post(apiURL, data, axiosConfig).then(
            (response) => {
                setCurriculumData(response.data.curriculum)
                setUpdateField(response.data.curriculum[0])
                console.log(response.data.curriculum)
            }
        )
    }

    useEffect(() => { getData() }, [])

    return (
        <div><Navbar />
            <div className="container">

                <br />
                <strong>Admin Update Curriculum</strong><br /><br />
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
                                                <label htmlFor="" className="form-label">Id</label>
                                                <input type="text" className="form-control" name="id" value={updateField.id} disabled />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Curriculum Title</label>
                                                <input onChange={updateHandler} type="text" className="form-control" name="curriculumTitle" value={updateField.curriculumTitle} />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Curriculum Description</label>
                                                <input onChange={updateHandler} type="text" className="form-control" name="curriculumDesc" value={updateField.curriculumDesc} />
                                            </div>
                                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                                <label for="studProfilePic" className="form-label">
                                                    Curriculum File <span className="text-danger">*</span>
                                                </label>
                                                <input onChange={fileUploadHandler} type="file" className="form-control" name="curriculumFileLink" id="curriculumFileLink" accept="*" />
                                                {fileValidationMessage && <div className="text-danger">{fileValidationMessage}</div>}
                                            </div>
                                            <br></br>
                                            <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                <button onClick={readNewValue} className="btn btn-warning">Update</button>
                                            </div>
                                            <br></br>
                                            <div class="mb-3">
                                                <a class="btn btn-danger" href="/adminviewallcurriculum">Back</a>
                                            </div>
                                        </ul>

                                        <ul className="social-icon-style1 list-unstyled mb-0 ps-0">
                                        <li><Link to="#!"><i className="ti-twitter-alt" /></Link></li>
                                        <li><Link to="#!"><i className="ti-facebook" /></Link></li>
                                        <li><Link to="#!"><i className="ti-pinterest" /></Link></li>
                                        <li><Link to="#!"><i className="ti-instagram" /></Link></li>
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