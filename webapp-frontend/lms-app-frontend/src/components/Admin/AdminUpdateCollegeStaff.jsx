import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../config/config'

const AdminUpdateCollegeStaff = () => {

    const [clgStaffData, setClgStaffData] = useState([])
    const [key, setKey] = useState('');
    const [file, setFile] = useState("")
    const [fileValidationMessage, setFileValidationMessage] = useState('');
    const [updateField, setUpdateField] = useState({
        "id": "",
        "collegeId": "",
        "collegeStaffName": "",
        "email": "",
        "phNo": "",
        "aadharNo": "",
        "clgStaffAddress": "",
        "profilePic": file,
        "department": ""
    })

    const apiUrl = global.config.urls.api.server + "/api/lms/updateClgStaff";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/viewonecollgestaff";
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
                    setFileValidationMessage('Invalid file type. Only image files (jpeg, png, jpg, webp, heif) are allowed.');
                }
            }
        } else {
            setFileValidationMessage("Please upload a file.");
        }
    };

    const readNewValue = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        if (!file) {
            setFileValidationMessage("Please upload an image.");
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
                "token": token,
                "key": currentKey
            }
        }
        let data = {
            "id": sessionStorage.getItem("clgStaffId"),
            "collegeId": updateField.collegeId,
            "collegeStaffName": updateField.collegeStaffName,
            "email": updateField.email,
            "phNo": updateField.phNo,
            "aadharNo": updateField.aadharNo,
            "clgStaffAddress": updateField.clgStaffAddress,
            "profilePic": file,
            "department": updateField.department
        }
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                if (response.data.status === "success") {
                    setUpdateField({
                        "id": sessionStorage.getItem("clgStaffId"),
                        "collegeId": "",
                        "collegeStaffName": "",
                        "email": "",
                        "phNo": "",
                        "aadharNo": "",
                        "clgStaffAddress": "",
                        "profilePic": "",
                        "department": ""
                    })
                    alert("Profile Updated Successfully")
                    navigate("/adminviewallclgstaff")
                } else {
                    if (response.data.status === "Validation failed" && response.data.data.name) {
                        alert(response.data.data.name)
                    } else {
                        if (response.data.status === "Validation failed" && response.data.data.email) {
                            alert(response.data.data.email)
                        } else {
                            if (response.data.status === "Validation failed" && response.data.data.phNo) {
                                alert(response.data.data.phNo)
                            } else {
                                if (response.data.status === "Validation failed" && response.data.data.aadharnumber) {
                                    alert(response.data.data.aadharnumber)
                                } else {
                                    if (response.data.status === "Validation failed" && response.data.data.address) {
                                        alert(response.data.data.address)
                                    } else {
                                        if (response.data.status === "Validation failed" && response.data.data.department) {
                                            alert(response.data.data.department)
                                        } else {
                                            if (response.data.status === "Validation failed" && response.data.data.image) {
                                                alert(response.data.data.image)
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
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let data = { "id": sessionStorage.getItem("clgStaffId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        }
        axios.post(apiUrl2, data, axiosConfig).then(
            (response) => {
                setClgStaffData(response.data.ClgStaffs)
                setUpdateField(response.data.ClgStaffs[0])
                console.log(response.data)
            }
        )
    }

    useEffect(() => {
        getData()
    }, [])

    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 mb-4 mb-sm-5">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h3 className="h2 text-black mb-0">Update College Staff Details</h3>
                    <br></br>
                    <div className="card card-style1 --bs-primary-border-subtle border-5">
                        <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                            <div className="row align-items-center">
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <img height="300px" src={updateField.profilePic} alt="" />
                                </div>
                                <div className="col-lg-6 px-xl-10">
                                    <ul className="list-unstyled mb-1-9">
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">collegeId </label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="collegeId" value={updateField.collegeId} disabled />
                                        </div>

                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">collegeStaffName</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="collegeStaffName" value={updateField.collegeStaffName} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">email</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="email" value={updateField.email} disabled />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">phNo</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="phNo" value={updateField.phNo} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">aadharNo</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="aadharNo" value={updateField.aadharNo} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">department</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="department" value={updateField.department} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">clgStaffAddress</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="clgStaffAddress" value={updateField.clgStaffAddress} />
                                        </div>


                                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                            <label for="studProfilePic" className="form-label">
                                                profilePic  <span className="text-danger">*</span>
                                            </label>
                                            <input type="file" onChange={fileUploadHandler} className="form-control" name="profilePic" id="profilePic" accept="image/*" />
                                            {fileValidationMessage && <div className="text-danger">{fileValidationMessage}</div>}
                                        </div>
                                        <br></br>
                                        <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                            <button onClick={readNewValue} className="btn btn-warning">Update</button>
                                        </div>
                                        <br></br>
                                        <div class="mb-3">
                                            <a class="btn btn-danger" href="/adminviewallclgstaff">Back</a>
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
    )
}

export default AdminUpdateCollegeStaff