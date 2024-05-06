import React, { useEffect, useState } from 'react'
import '../../config/config'
import axios from 'axios';
import AdmStaffNavBar from './AdmStaffNavBar';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Admin/Navbar';

const AdminStaffUpdateMaterial = () => {

    const [materialData, setMaterialData] = useState([])
    const [file, setFile] = useState("")
    const [errors, setErrors] = useState({})
    const [fileType, setFileType] = useState("");
    const [batches, setBatches] = useState([])
    const [outputField, setOutputField] = useState([])
    const [showWaitingModal, setShowWaitingModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay
    const [key, setKey] = useState('');

    const [updateField, setUpdateField] = useState(
        {
            "id": sessionStorage.getItem("materialId"),
            "collegeId": "",
            "batchId": "",
            "fileName": "",
            "materialDesc": "",
            "remarks": "",
            "materialType": "",
            "uploadFile": ""
        }
    )
    const apiURL = global.config.urls.api.server + "/api/lms/AdmViewOneMaterial";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/updateMaterial";
    const clgUrl = global.config.urls.api.server + "/api/lms/viewallcolleges";
    const batchUrl = global.config.urls.api.server + "/api/lms/adminviewbatch";
    const navigate = useNavigate()

    const closeWaitingModal = () => {
        setShowOverlay(false)
        setShowWaitingModal(false)
    }

    const getClg = () => {
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
        axios.post(clgUrl, {}, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setOutputField(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    const handleCollegeChange = (event) => {
        const selectedCollegeId = event.target.value;
        setUpdateField(prevState => ({ ...prevState, collegeId: selectedCollegeId }))
        getBatches(selectedCollegeId);
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
            if (response.data.data) {
                setBatches(response.data)
            } else {
                if (response.data.status === "Unauthorized User!!") {
                    { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                    sessionStorage.clear()
                } else {
                    alert(response.data.status)
                }
            }
        })
    }

    const updateHandler = (event) => {
        setErrors({})
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
        let addedBy;
        if (currentKey === 'lmsapp') {
            addedBy = 0
        } else {
            addedBy = sessionStorage.getItem("admstaffId")
        }
        e.preventDefault();
        const validationErrors = validateForm(updateField);
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
                    "id": sessionStorage.getItem("materialId"),
                    "batchId": updateField.batchId,
                    "fileName": updateField.fileName,
                    "materialDesc": updateField.materialDesc,
                    "remarks": updateField.remarks,
                    "materialType": updateField.materialType,
                    "uploadFile": file,
                    "addedby": addedBy
                }
            } else {
                data = {
                    "id": sessionStorage.getItem("materialId"),
                    "batchId": updateField.batchId,
                    "fileName": updateField.fileName,
                    "materialDesc": updateField.materialDesc,
                    "remarks": updateField.remarks,
                    "materialType": updateField.materialType,
                    "uploadFile": updateField.uploadFile,
                    "addedby": addedBy
                }
            }
            setShowWaitingModal(true)
            setShowOverlay(true)
            axios.post(apiUrl2, data, axiosConfig2).then(
                (Response) => {
                    console.log(Response)
                    if (Response.data.status === "Material Details Updated") {
                        closeWaitingModal()
                        setTimeout(() => {
                            setUpdateField({
                                "id": sessionStorage.getItem("materialId"),
                                "batchId": "",
                                "fileName": "",
                                "materialDesc": "",
                                "remarks": "",
                                "materialType": "",
                                "uploadFile": ""
                            })
                            alert("Material Updated Successfully")
                            navigate(-1)
                        }, 500)

                    } else if (Response.data.status === "Validation failed" && Response.data.data.batchId) {
                        closeWaitingModal()
                        setTimeout(() => {
                            alert(Response.data.data.batchId)
                        }, 500)
                    } else if (Response.data.status === "Validation failed" && Response.data.data.fileName) {
                        closeWaitingModal()
                        setTimeout(() => {
                            alert(Response.data.data.fileName)
                        }, 500)
                    } else if (Response.data.status === "Validation failed" && Response.data.data.remarks) {
                        closeWaitingModal()
                        setTimeout(() => {
                            alert(Response.data.data.remarks)
                        }, 500)
                    } else if (Response.data.status === "Validation failed" && Response.data.data.materialDesc) {
                        closeWaitingModal()
                        setTimeout(() => {
                            alert(Response.data.data.materialDesc)
                        }, 500)
                    } else if (Response.data.status === "Validation failed" && Response.data.data.materialType) {
                        closeWaitingModal()
                        setTimeout(() => {
                            alert(Response.data.data.materialType)
                        }, 500)
                    } else if (Response.data.status === "Validation failed" && Response.data.data.file) {
                        closeWaitingModal()
                        setTimeout(() => {
                            alert(Response.data.data.file)
                        }, 500)
                    } else if (Response.data.status === "Validation failed" && Response.data.data.website) {
                        closeWaitingModal()
                        setTimeout(() => {
                            alert(Response.data.data.website)
                        }, 500)
                    } else if (Response.data.status === "Unauthorized Access!!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear()
                    } else {
                        closeWaitingModal()
                        setTimeout(() => {
                            alert(Response.data.status)
                        }, 500)
                    }

                }).catch(error => {
                    closeWaitingModal()
                    if (error.response) {
                        // Extract the status code from the response
                        const statusCode = error.response.status;

                        if (statusCode === 400) {
                            setTimeout(() => {
                                alert(error.response.data.status)
                            }, 500)
                            // Additional logic for status 400
                        } else if (statusCode === 500) {
                            setTimeout(() => {
                                alert(error.response.data.status)
                            }, 500)
                            // Additional logic for status 500
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

        if (!data.batchId) {
            errors.batchId = 'Batch Name is required';
        }
        if (!data.collegeId) {
            errors.collegeId = 'College Name is required';
        }
        if (!data.fileName) {
            errors.fileName = 'Material Title is required';
        }
        if (!data.materialDesc) {
            errors.materialDesc = 'Material Description is required';
        }
        if (!data.remarks) {
            errors.remarks = 'Remarks are required';
        }
        if (!data.materialType) {
            errors.materialType = 'Material Type is required';
        }
        if (data.materialType === "Link" && !data.uploadFile) {
            errors.website = 'Website is required';
        }
        if (data.materialType !== "Link" && !data.uploadFile) {
            errors.file = 'File is required';
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
        let data = { "id": sessionStorage.getItem("materialId") }
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
                if (response.data.Material) {
                    setMaterialData(response.data.Material)
                    setUpdateField(response.data.Material[0])
                    console.log(response.data.Material[0])
                } else {
                    if (response.data.status === "Unauthorized access!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    useEffect(() => { getData() }, [])

    useEffect(() => { getClg() }, [])

    useEffect(() => {
        if (updateField.collegeId) {
            getBatches(updateField.collegeId);
        }
    }, [updateField.collegeId]);

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

                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Update Material</p>

                            <div></div>
                        </div>
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
                                                <label htmlFor="collegeId" className="form-label">
                                                    College Name <span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    name="collegeId"
                                                    value={updateField.collegeId}
                                                    onChange={handleCollegeChange}
                                                    id="collegeId"
                                                    className="form-control"
                                                    disabled>
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
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="batchName" className="form-label">
                                                    Batch Name <span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    name="batchId"
                                                    id="batchId"
                                                    className="form-control"
                                                    value={updateField.batchId}
                                                    onChange={updateHandler}>
                                                    <option value="">Select</option>
                                                    {batches.data && batches.data.map((value) => {
                                                        return <option value={value.id}> {value.batchName} </option>;
                                                    })}
                                                </select>
                                                {errors.batchId && (<span style={{ color: 'red' }} className="error">{errors.batchId}</span>)}
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Material Title</label>
                                                <input onChange={updateHandler} type="text" className="form-control" name="fileName" value={updateField.fileName} />
                                                {errors.fileName && (<span style={{ color: 'red' }} className="error">{errors.fileName}</span>)}
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Description</label>
                                                <input onChange={updateHandler} type="text" className="form-control" name="materialDesc" value={updateField.materialDesc} />
                                                {errors.materialDesc && (<span style={{ color: 'red' }} className="error">{errors.materialDesc}</span>)}
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Remarks</label>
                                                <input onChange={updateHandler} type="text" className="form-control" name="remarks" value={updateField.remarks} />
                                                {errors.remarks && (<span style={{ color: 'red' }} className="error">{errors.remarks}</span>)}
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Material Type</label>
                                                <select
                                                    name="materialType"
                                                    id="materialType"
                                                    className="form-control"
                                                    value={updateField.materialType}
                                                    onChange={updateHandler}
                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="Image">Image</option>
                                                    <option value="Video">Video</option>
                                                    <option value="Document">Document</option>
                                                    <option value="Link">Link</option>
                                                </select>
                                                {errors.materialType && (<span style={{ color: 'red' }} className="error">{errors.materialType}</span>)}
                                            </div>
                                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                                <label for="studProfilePic" className="form-label">
                                                    File <span className="text-danger">*</span>
                                                </label>
                                                {updateField.materialType === "Link" ? (
                                                    <>
                                                        <input type="text" onChange={updateHandler} className="form-control" name="uploadFile" value={updateField.uploadFile} />
                                                        {errors.website && (<span style={{ color: 'red' }} className="error">{errors.website}</span>)}
                                                    </>
                                                ) : (
                                                    <>
                                                        <input onChange={fileUploadHandler} type="file" className="form-control" name="uploadFile" id="uploadFile" accept="*" />
                                                        {errors.file && (<span style={{ color: 'red' }} className="error">{errors.file}</span>)}
                                                    </>
                                                )}
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
            </div >
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
        </div>
    )
}

export default AdminStaffUpdateMaterial