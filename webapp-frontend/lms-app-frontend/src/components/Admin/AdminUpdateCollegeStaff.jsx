import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../config/config'
import Navbar from './Navbar'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar'

const AdminUpdateCollegeStaff = () => {

    const [clgStaffData, setClgStaffData] = useState([])
    const [key, setKey] = useState('');
    const [file, setFile] = useState("")
    const [fileType, setFileType] = useState("");
    const [errors, setErrors] = useState({})

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
            let axiosConfig = {
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
            } else {
                 data = {
                    "id": sessionStorage.getItem("clgStaffId"),
                    "collegeId": updateField.collegeId,
                    "collegeStaffName": updateField.collegeStaffName,
                    "email": updateField.email,
                    "phNo": updateField.phNo,
                    "aadharNo": updateField.aadharNo,
                    "clgStaffAddress": updateField.clgStaffAddress,
                    "profilePic": "",
                    "department": updateField.department
                }
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
                            "department": ""
                        })
                        alert("Profile Updated Successfully")
                        setFile(null)
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

        if (!data.collegeStaffName.trim()) {
            errors.collegeStaffName = 'College Staff Name is required';
        }
        if (!data.phNo.trim()) {
            errors.phNo = 'Mobile No. is required';
        }
        if (!data.aadharNo.trim()) {
            errors.aadharNo = 'Aadhar No. is required';
        }
        if (!data.clgStaffAddress.trim()) {
            errors.clgStaffAddress = 'Address is required';
        }
        if (!data.department.trim()) {
            errors.department = 'Department is required';
        }
        if (file && fileType !== "jpg" && fileType !== "jpeg" && fileType !== "png" && fileType !== "webp" && fileType !== "heif") {
            errors.file = "File must be in jpg/jpeg/png/webp/heif format";
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
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
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
                                            {/* <label htmlFor="" className="form-label">collegeId </label> */}
                                            <input onChange={updateHandler} type="hidden" className="form-control" name="collegeId" value={updateField.collegeId} disabled />
                                        </div>

                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">College Staff Name</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="collegeStaffName" value={updateField.collegeStaffName} />
                                            {errors.collegeStaffName && <span style={{ color: 'red' }} className="error">{errors.collegeStaffName}</span>}
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Email</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="email" value={updateField.email} disabled />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Phone No.</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="phNo" value={updateField.phNo} />
                                            {errors.phNo && <span style={{ color: 'red' }} className="error">{errors.phNo}</span>}
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Aadhar No.</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="aadharNo" value={updateField.aadharNo} />
                                            {errors.aadharNo && <span style={{ color: 'red' }} className="error">{errors.aadharNo}</span>}
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Department</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="department" value={updateField.department} />
                                            {errors.department && <span style={{ color: 'red' }} className="error">{errors.department}</span>}
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Address</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="clgStaffAddress" value={updateField.clgStaffAddress} />
                                            {errors.clgStaffAddress && <span style={{ color: 'red' }} className="error">{errors.clgStaffAddress}</span>}
                                        </div>
                                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                            <label for="studProfilePic" className="form-label">
                                                Profile Picture  <span className="text-danger">*</span>
                                            </label>
                                            <input type="file" onChange={fileUploadHandler} className="form-control" name="profilePic" id="profilePic" accept="image/*" />
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
    )
}

export default AdminUpdateCollegeStaff