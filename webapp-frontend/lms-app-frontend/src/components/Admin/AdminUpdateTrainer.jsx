import React, { useEffect, useState } from 'react'
import '../../config/config'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';

const AdminUpdateTrainer = () => {

    const [trainerData, settrainerData] = useState([])
    const [file, setFile] = useState("")
    const [errors, setErrors] = useState({})
    const [fileType, setFileType] = useState("");


    const [updateField, setUpdateField] = useState(
        {
            "id": sessionStorage.getItem("trainerId"),
            "trainerName": "",
            "about": "",
            "phoneNumber": "",
            "profilePicture": file
        }
    )
    const apiURL = global.config.urls.api.server + "/api/lms/adminviewonetrainer";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/updateTrainer";
    const navigate = useNavigate()
    const [key, setKey] = useState('');

    const [showWaitingModal, setShowWaitingModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay

    const updateHandler = (event) => {
        setErrors({})
        setUpdateField({ ...updateField, [event.target.name]: event.target.value })
    }

    const closeWaitingModal = () => {
        setShowOverlay(false)
        setShowWaitingModal(false)
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
        let updatedby;
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        if (currentKey === 'lmsapp') {
            updatedby = 0
        } else {
            updatedby = sessionStorage.getItem("admstaffId")
        }
        e.preventDefault();
        const validationErrors = validateForm(updateField);
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
                    "id": sessionStorage.getItem("trainerId"),
                    "trainerName": updateField.trainerName,
                    "about": updateField.about,
                    "phoneNumber": updateField.phoneNumber,
                    "profilePicture": file,
                    "updatedby": updatedby
                }
            } else {
                data = {
                    "id": sessionStorage.getItem("trainerId"),
                    "trainerName": updateField.trainerName,
                    "about": updateField.about,
                    "phoneNumber": updateField.phoneNumber,
                    "updatedby": updatedby
                }
            }
            setShowWaitingModal(true)
            setShowOverlay(true)
            axios.post(apiUrl2, data, axiosConfig).then(
                (Response) => {
                    if (Response.data.status === "Trainer Details Updated") {
                        closeWaitingModal()
                        setTimeout(() => {
                            setUpdateField({
                                "id": sessionStorage.getItem("trainerId"),
                                "trainerName": "",
                                "about": "",
                                "phoneNumber": "",
                                "profilePicture": ""
                            })
                            alert("Profile Updated Successfully")
                            navigate(-1)
                        }, 500)
                    } else {
                        closeWaitingModal()
                        if (Response.data.status === "Validation failed" && Response.data.data.trainerName) {
                            setTimeout(() => { alert(Response.data.data.trainerName) }, 500)
                        } else {
                            if (Response.data.status === "Validation failed" && Response.data.data.about) {
                                setTimeout(() => { alert(Response.data.data.about) }, 500)
                            } else {
                                if (Response.data.status === "Validation failed" && Response.data.data.phoneNumber) {
                                    setTimeout(() => { alert(Response.data.data.phoneNumber) }, 500)
                                } else {
                                    if (Response.data.status === "Unauthorized Access!!!") {
                                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                                        sessionStorage.clear()
                                    } else {
                                        closeWaitingModal()
                                        setTimeout(() => {
                                            alert(Response.data.status)
                                        }, 500)
                                    }
                                }
                            }
                        }
                    }

                }
            ).catch(error => {
                closeWaitingModal()
                if (error.response) {
                    // Extract the status code from the response
                    const statusCode = error.response.status;

                    if (statusCode === 400) {
                        setTimeout(() => {
                            alert(error.response.data.status)
                        }, 500)
                    } else if (statusCode === 500) {
                        setTimeout(() => {
                            alert(error.response.data.status)
                        }, 500)
                    } else {
                        setTimeout(() => {
                            alert(error.response.data.status)
                        }, 500)
                    }
                } else if (error.request) {
                    setTimeout(() => {
                        alert(error.request);
                    }, 500)
                } else if (error.message) {
                    setTimeout(() => {
                        alert('Error', error.message);
                    }, 500)
                } else {
                    setTimeout(() => {
                        alert(error.config);
                    }, 500)
                }
            })
        } else {
            setErrors(validationErrors);
        }
    }

    const validateForm = (data) => {
        let errors = {};

        if (!data.trainerName.trim()) {
            errors.trainerName = 'Trainer Name is required';
        } else if (!data.about.trim()) {
            errors.about = 'About is required';
        } else if (!data.phoneNumber.trim()) {
            errors.phoneNumber = 'Contact Details required';
        } else if (file && fileType !== "jpg" && fileType !== "jpeg" && fileType !== "png" && fileType !== "webp" && fileType !== "heif") {
            errors.file = "File must be in jpg/jpeg/png/webp/heif format";
        }

        return errors;
    }

    const getData = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let data = { "id": sessionStorage.getItem("trainerId") }
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
                if (response.data.Trainers) {
                    settrainerData(response.data.Trainers)
                    setUpdateField(response.data.Trainers[0])
                } else {
                    if (response.data.status === "Unauthorized access!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear()
                    } else {
                        if (!response.data.Trainers) {
                            settrainerData([])
                            setUpdateField(
                                {
                                    "id": "",
                                    "trainerName": "",
                                    "about": "",
                                    "phoneNumber": "",
                                    "profilePicture": ""
                                }
                            )
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
                        <div className="flex justify-between items-center mx-4 my-4">
                            <button onClick={() => navigate(-1)} className="btn bg-gray-500 text-white px-4 py-2 rounded-md">Back</button>

                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Update Trainer Details</p>

                            <div></div>
                        </div>
                        <div className="card card-style1 --bs-primary-border-subtle border-5">
                            <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                                <div className="row align-items-center">
                                    <div className="col-lg-6 mb-4 mb-lg-0">
                                        <img height="300px" src={updateField.profilePicture} alt="" />
                                    </div>
                                    <div className="col-lg-6 px-xl-10">
                                        <div className=" d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                        </div>
                                        <ul className="list-unstyled mb-1-9">
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                {/* <label htmlFor="" className="form-label">Id</label> */}
                                                <input type="hidden" className="form-control" name="id" value={updateField.id} disabled />
                                            </div>

                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Trainer Name</label>
                                                <input onChange={updateHandler} type="text" className="form-control" name="trainerName" value={updateField.trainerName} />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">About</label>
                                                <input onChange={updateHandler} type="text" className="form-control" name="about" value={updateField.about} />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Phone No:</label>
                                                <input onChange={updateHandler} type="text" className="form-control" name="phoneNumber" value={updateField.phoneNumber} />
                                            </div>


                                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                                <label for="studProfilePic" className="form-label">
                                                    Profile Picture <span className="text-danger">*</span>
                                                </label>
                                                <input onChange={fileUploadHandler} type="file" className="form-control" name="profilePicture" id="profilePicture" accept="image/*" />
                                                {errors.file && (<span style={{ color: 'red' }} className="error">{errors.file}</span>)}
                                            </div>
                                            <br></br>
                                            <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                <button onClick={readNewValue} className="btn btn-warning">Update</button>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showWaitingModal && (
                    <div className="modal show d-block" tabIndex={-1}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
                                </div>
                                <div className="modal-body">
                                    <>
                                        <div className="mb-3">
                                            <p>Processing Request. Do Not Refresh.</p>
                                        </div>
                                    </>
                                </div>
                                <div className="modal-footer">
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showOverlay && (
                    <div
                        className="modal-backdrop fade show"
                        onClick={() => {
                            setShowWaitingModal(false);
                            setShowOverlay(false);
                        }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            zIndex: 1040, // Ensure this is below your modal's z-index
                        }}
                    ></div>
                )}
            </div >
        </div>
    );
};

export default AdminUpdateTrainer