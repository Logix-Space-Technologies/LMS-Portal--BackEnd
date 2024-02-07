import React, { useEffect, useState } from 'react'
import '../../config/config'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const StudentUpdateProfile = () => {
    const [studData, setStudData] = useState([])
    const [file, setFile] = useState("")
    const [fileValidationMessage, setFileValidationMessage] = useState('');
    const [updateField, setUpdateField] = useState(
        {
            "id": sessionStorage.getItem("studentId"),
            "studName": "",
            "admNo": "",
            "rollNo": "",
            "studDept": "",
            "course": "",
            "studPhNo": "",
            "aadharNo": "",
            "studProfilePic": file
        }
    )
    const apiURL = global.config.urls.api.server + "/api/lms/studentViewProfile";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/studentUpdateProfile";
    const navigate = useNavigate()

    const updateHandler = (event) => {
        setUpdateField({ ...updateField, [event.target.name]: event.target.value })
    }

    const fileUploadHandler = (event) => {
        setFileValidationMessage({})
        const file = event.target.files[0];
        if (file) {
            const isSizeValid = file.size <= 2097152; // 2MB in bytes
            const isTypeValid = /image\/(jpg|jpeg|png|webp|heif)$/.test(file.type);

            if (isSizeValid && isTypeValid) {
                setFile(file);
                setFileValidationMessage('');
            } else {
                if (!isSizeValid) {
                    setFileValidationMessage('File size should be less than 2MB.');
                }
                if (!isTypeValid) {
                    setFileValidationMessage('Invalid file type. Only image files (jpeg, png, jpg, gif, bmp, tiff) are allowed.');
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
        let axiosConfig = {
            headers: {
                'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken"),
                "key": sessionStorage.getItem("studentkey")
            }
        }
        let data = {
            "id": sessionStorage.getItem("studentId"),
            "studName": updateField.studName,
            "admNo": updateField.admNo,
            "rollNo": updateField.rollNo,
            "studDept": updateField.studDept,
            "course": updateField.course,
            "studPhNo": updateField.studPhNo,
            "aadharNo": updateField.aadharNo,
            "studProfilePic": file
        }
        axios.post(apiUrl2, data, axiosConfig).then(
            (Response) => {
                if (Response.data.status === "success") {
                    setUpdateField({
                        "id": sessionStorage.getItem("studentId"),
                        "studName": "",
                        "admNo": "",
                        "rollNo": "",
                        "studDept": "",
                        "course": "",
                        "studPhNo": "",
                        "aadharNo": "",
                        "studProfilePic": ""
                    })
                    alert("Profile Updated Successfully")
                    navigate("/studdashboard")
                } else {
                    if (Response.data.status === "Unauthorized User!!") {
                        navigate("/studentLogin")
                        sessionStorage.removeItem("studentkey");
                        sessionStorage.removeItem("studentId");
                        sessionStorage.removeItem("studemail");
                        sessionStorage.removeItem("studBatchId");
                        sessionStorage.removeItem("studLoginToken");
                        sessionStorage.removeItem("subtaskId");
                    } else {
                        alert(Response.data.status)
                    }
                }

            }
        )
    }

    const getData = () => {
        let data = { "studId": sessionStorage.getItem("studentId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken"),
                "key": sessionStorage.getItem("studentkey")
            }
        }
        axios.post(apiURL, data, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setStudData(response.data.data[0])
                    setUpdateField(response.data.data[0])
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/studentLogin")
                        sessionStorage.removeItem("studentkey");
                        sessionStorage.removeItem("studentId");
                        sessionStorage.removeItem("studemail");
                        sessionStorage.removeItem("studBatchId");
                        sessionStorage.removeItem("studLoginToken");
                        sessionStorage.removeItem("subtaskId");
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    useEffect(() => { getData() }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 mb-4 mb-sm-5">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="card card-style1 --bs-primary-border-subtle border-5">
                        <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                            <div className="row align-items-center">
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <img height="300px" src={studData.studProfilePic} alt="" />
                                </div>
                                <div className="col-lg-6 px-xl-10">
                                    <div className=" d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                        <h3 className="h2 text-black mb-0">{studData.studName}</h3>
                                        <br></br>
                                    </div>
                                    <ul className="list-unstyled mb-1-9">
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">College Name :   </label>
                                            <input type="text" className="form-control" name="collegeName" value={studData.collegeName} disabled />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Batch ID : </label>
                                            <input type="text" className="form-control" name="batchId" value={studData.batchId} disabled />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Student Name :</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="studName" value={updateField.studName} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Admission No :  </label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="admNo" value={updateField.admNo} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Roll No : </label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="rollNo" value={updateField.rollNo} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Department : </label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="studDept" value={updateField.studDept} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Course : </label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="course" value={updateField.course} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Phone No : </label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="studPhNo" value={updateField.studPhNo} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Aadhar No : </label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="aadharNo" value={updateField.aadharNo} />
                                        </div>
                                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                            <label for="studProfilePic" className="form-label">
                                                Profile Picture <span className="text-danger">*</span>
                                            </label>
                                            <input onChange={fileUploadHandler} type="file" className="form-control" name="studProfilePic" id="studProfilePic" accept="image/*" />
                                            {fileValidationMessage && <div className="text-danger">{fileValidationMessage}</div>}
                                        </div>
                                        <br></br>
                                        <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                            <Link onClick={readNewValue} className="btn btn-warning">Update</Link>
                                        </div>
                                        <br></br>
                                        <div class="mb-3">
                                            <Link class="btn btn-danger" to="/studdashboard">Back</Link>
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
        </div >
    );
};

export default StudentUpdateProfile;
