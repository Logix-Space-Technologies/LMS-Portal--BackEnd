import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../config/config'
import { Link } from 'react-router-dom';
import AdmStaffNavBar from './AdmStaffNavBar';

const AdminStaffAddMaterials = () => {

    const [inputField, setInputField] = useState({
        "collegeId": "",
        "batchId": "",
        "fileName": "",
        "materialDesc": "",
        "remarks": "",
        "materialType": ""
    })

    const [file, setFile] = useState(null)

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

    const [outputField, setOutputField] = useState([])

    const [errors, setErrors] = useState({})

    const [batches, setBatches] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/AddMaterials";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/viewallcolleges";
    const batchUrl = global.config.urls.api.server + "/api/lms/adminviewbatch";

    const getData = () => {
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": sessionStorage.getItem("admstaffLogintoken"),
                "key": sessionStorage.getItem("admstaffkey")
            }
        };
        axios.post(apiUrl2, {}, axiosConfig).then(
            (response) => {
                setOutputField(response.data.data)
            }
        )
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
        e.preventDefault();
        const validationErrors = validateForm(inputField);
        console.log(validationErrors)
        if (Object.keys(validationErrors).length === 0) {
            let axiosConfig3 = {
                headers: {
                    'content-type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*",
                    "token": sessionStorage.getItem("admstaffLogintoken"),
                    "key": sessionStorage.getItem("admstaffkey")
                }
            }
            console.log(axiosConfig3)
            let data = {
                "batchId": inputField.batchId,
                "fileName": inputField.fileName,
                "materialDesc": inputField.materialDesc,
                "remarks": inputField.remarks,
                "materialType": inputField.materialType,
                "uploadFile": file
            }
            console.log(data)
            axios.post(apiUrl, data, axiosConfig3).then((response) => {
                console.log(response.data.status)
                if (response.data.status === 'success') {
                    alert('Material Added Successfully !!');
                    setInputField({
                        collegeId: '',
                        batchId: '',
                        fileName: '',
                        materialDesc: '',
                        remarks: '',
                        materialType: '',
                        uploadFile: ''
                    })
                    window.location.reload()
                } else {
                    if (response.data.status === "Validation failed" && response.data.data.batchId) {
                        alert(response.data.data.batchId)
                    } else {
                        if (response.data.status === "Validation failed" && response.data.data.fileName) {
                            alert(response.data.data.fileName)
                        } else {
                            if (response.data.status === "Validation failed" && response.data.data.materialDesc) {
                                alert(response.data.data.materialDesc)
                            } else {
                                if (response.data.status === "Validation failed" && response.data.data.remarks) {
                                    alert(response.data.data.remarks)
                                } else {
                                    if (response.data.status === "Validation failed" && response.data.data.materialType) {
                                        alert(response.data.data.materialType)
                                    } else {
                                        alert(response.data.status)
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
            });
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
        if (!data.fileName.trim()) {
            errors.fileName = 'Material Title is required';
        }
        if (!data.materialDesc.trim()) {
            errors.materialDesc = 'Material Description is required';
        }
        if (!data.remarks.trim()) {
            errors.remarks = 'Remarks are required';
        }
        if (!data.materialType.trim()) {
            errors.materialType = 'Material Type is required';
        }
        return errors;
    }

    useEffect(() => { getData() }, [])

    return (
        <div>
            <AdmStaffNavBar />
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
                                            <h3>Add Material</h3>
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
                                        <label htmlFor="fileName" className="form-label">
                                            Material Title <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fileName"
                                            id="fileName"
                                            value={inputField.fileName}
                                            onChange={inputHandler}
                                            required
                                        />
                                        {errors.fileName && (<span style={{ color: 'red' }} className="error">{errors.fileName}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="materialDesc" className="form-label">
                                            Material Description<span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="materialDesc"
                                            id="materialDesc"
                                            rows="3"
                                            value={inputField.materialDesc}
                                            onChange={inputHandler}
                                        ></textarea>
                                        {errors.materialDesc && (<span style={{ color: 'red' }} className="error">{errors.materialDesc}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="remarks" className="form-label">
                                            Remarks<span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="remarks"
                                            id="remarks"
                                            rows="3"
                                            value={inputField.remarks}
                                            onChange={inputHandler}
                                        ></textarea>
                                        {errors.remarks && (<span style={{ color: 'red' }} className="error">{errors.remarks}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="materialType" className="form-label">
                                            Material Type <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="materialType"
                                            id="materialType"
                                            value={inputField.materialType}
                                            onChange={inputHandler}
                                        />
                                        {errors.materialType && (<span style={{ color: 'red' }} className="error">{errors.materialType}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="uploadFile" className="form-label">
                                            Task File <span className="text-danger">*</span>
                                        </label>
                                        <input type="file" className="form-control" name="uploadFile" id="uploadFile" onChange={fileUploadHandler} />
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

export default AdminStaffAddMaterials