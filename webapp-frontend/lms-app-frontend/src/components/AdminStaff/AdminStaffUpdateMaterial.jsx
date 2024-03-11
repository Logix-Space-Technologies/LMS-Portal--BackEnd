import React, { useEffect, useState } from 'react'
import '../../config/config'
import axios from 'axios';
import AdmStaffNavBar from './AdmStaffNavBar';
import { Link, useNavigate } from 'react-router-dom';

const AdminStaffUpdateMaterial = () => {

    const [materialData, setMaterialData] = useState([])
    const [file, setFile] = useState("")
    const [errors, setErrors] = useState({})
    const [fileType, setFileType] = useState("");
    const [batches, setBatches] = useState([])
    const [outputField, setOutputField] = useState([])

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


    const getClg = () => {
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": sessionStorage.getItem("admstaffLogintoken"),
                "key": sessionStorage.getItem("admstaffkey")
            }
        };
        axios.post(clgUrl, {}, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setOutputField(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/admstafflogin")
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
        let axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": sessionStorage.getItem("admstaffLogintoken"),
                "key": sessionStorage.getItem("admstaffkey")
            }
        };
        axios.post(batchUrl, { collegeId }, axiosConfig2).then((response) => {
            if (response.data.data) {
                setBatches(response.data)
            } else {
                if (response.data.status === "Unauthorized User!!") {
                    navigate("/admstafflogin")
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
        e.preventDefault();
        const validationErrors = validateForm(updateField);
        if (Object.keys(validationErrors).length === 0) {
            let axiosConfig2 = {
                headers: {
                    'content-type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*",
                    "token": sessionStorage.getItem("admstaffLogintoken"),
                    "key": sessionStorage.getItem("admstaffkey")
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
                    "uploadFile": file
                }
            } else {
                data = {
                    "id": sessionStorage.getItem("materialId"),
                    "batchId": updateField.batchId,
                    "fileName": updateField.fileName,
                    "materialDesc": updateField.materialDesc,
                    "remarks": updateField.remarks,
                    "materialType": updateField.materialType,
                    "uploadFile": updateField.uploadFile
                }
            }
            axios.post(apiUrl2, data, axiosConfig2).then(
                (Response) => {
                    console.log(Response)
                    if (Response.data.status === "Material Details Updated") {
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
                        navigate("/AdminStaffViewAllMaterial")
                    } else {
                        if (Response.data.status === "Validation failed" && Response.data.data.batchId) {
                            alert(Response.data.data.batchId)
                        } else {
                            if (Response.data.status === "Validation failed" && Response.data.data.fileName) {
                                alert(Response.data.data.fileName)
                            } else {
                                if (Response.data.status === "Validation failed" && Response.data.data.remarks) {
                                    alert(Response.data.data.remarks)
                                } else {
                                    if (Response.data.status === "Validation failed" && Response.data.data.materialDesc) {
                                        alert(Response.data.data.materialDesc)
                                    } else {
                                        if (Response.data.status === "Validation failed" && Response.data.data.materialType) {
                                            alert(Response.data.data.materialType)
                                        } else {
                                            if (Response.data.status === "Validation failed" && Response.data.data.file) {
                                                alert(Response.data.data.file)
                                            } else {
                                                if (Response.data.status === "Validation failed" && Response.data.data.website) {
                                                    alert(Response.data.data.website)
                                                } else {
                                                    if (Response.data.status === "Unauthorized Access!!!") {
                                                        navigate("/admstafflogin")
                                                        sessionStorage.clear()
                                                    } else {
                                                        alert(Response.data.status)
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
            ).catch(error => {
                if (error.response) {
                    // Extract the status code from the response
                    const statusCode = error.response.status;

                    if (statusCode === 400) {
                        alert(error.response.data.status)
                        // Additional logic for status 400
                    } else if (statusCode === 500) {
                        alert(error.response.data.status)
                        // Additional logic for status 500
                    } else {
                        alert(error.response.data.status)
                    }
                } else if (error.request) {
                    alert(error.request);
                } else if (error.message) {
                    alert('Error', error.message);
                } else {
                    console.log(error.config);
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
        } else if (!data.collegeId) {
            errors.collegeId = 'College Name is required';
        } else if (!data.fileName) {
            errors.fileName = 'Material Title is required';
        } else if (!data.materialDesc) {
            errors.materialDesc = 'Material Description is required';
        } else if (!data.remarks) {
            errors.remarks = 'Remarks are required';
        } else if (!data.materialType) {
            errors.materialType = 'Material Type is required';
        } else if (file && fileType !== "docx" && fileType !== "pdf") {
            errors.file = "File must be in PDF or DOCX format";
        }
        return errors;
    }

    const getData = () => {
        let data = { "id": sessionStorage.getItem("materialId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admstaffLogintoken"),
                "key": sessionStorage.getItem("admstaffkey")
            }
        }
        axios.post(apiURL, data, axiosConfig).then(
            (response) => {
                if (response.data.Material) {
                    setMaterialData(response.data.Material)
                    setUpdateField(response.data.Material[0])
                } else {
                    if (response.data.status === "Unauthorized access!!") {
                        navigate("/admstafflogin")
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    useEffect(() => { getClg() }, [])

    useEffect(() => { getData() }, [])

    useEffect(() => {
        if (updateField.collegeId) {
            getBatches(updateField.collegeId);
        }
    }, [updateField.collegeId]);

    return (
        <div>
            <AdmStaffNavBar />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-4 mb-sm-5">
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h3 className="h2 text-black mb-0">Update Material Details</h3>
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
                                                    className="form-select"
                                                    name="materialType"
                                                    id="materialType"
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
                                                    </>
                                                ) : (
                                                    <>
                                                        <input onChange={fileUploadHandler} type="file" className="form-control" name="uploadFile" id="uploadFile" accept="*" />
                                                        {errors.file && (<span style={{ color: 'red' }} className="error">{errors.file}</span>)}
                                                    </>
                                                )}
                                                {errors.website && (<span style={{ color: 'red' }} className="error">{errors.website}</span>)}
                                            </div>
                                            <br></br>
                                            <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                <button onClick={readNewValue} className="btn btn-warning">Update</button>
                                            </div>
                                            <br></br>
                                            <div class="mb-3">
                                                <Link class="btn btn-danger" onClick={() => navigate(-1)}>Back</Link>
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

export default AdminStaffUpdateMaterial