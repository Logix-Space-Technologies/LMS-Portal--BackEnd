import React, { useEffect, useState } from 'react'
import '../../config/config'
import axios from 'axios';
import AdmStaffNavBar from './AdmStaffNavBar';
import { Link, useNavigate } from 'react-router-dom';

const AdminStaffUpdateMaterial = () => {

    const [materialData, setMaterialData] = useState([])
    const [file, setFile] = useState("")
    const [fileValidationMessage, setFileValidationMessage] = useState('');
    const [updateField, setUpdateField] = useState(
        {
            "id": sessionStorage.getItem("materialId"),
            "batchId": "",
            "fileName": "",
            "materialDesc": "",
            "remarks": "",
            "materialType": "",
            "uploadFile": file
        }
    )
    const apiURL = global.config.urls.api.server + "/api/lms/AdmViewOneMaterial";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/updateMaterial";
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
                "token": sessionStorage.getItem("admstaffLogintoken"),
                "key": sessionStorage.getItem("admstaffkey")
            }
        }
        let data = {
            "id": sessionStorage.getItem("materialId"),
            "batchId": updateField.batchId,
            "fileName": updateField.fileName,
            "materialDesc": updateField.materialDesc,
            "remarks": updateField.remarks,
            "materialType": updateField.materialType,
            "uploadFile": file
        }
        axios.post(apiUrl2, data, axiosConfig2).then(
            (Response) => {
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
        )
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
                    console.log(response.data.Material)
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

    useEffect(() => { getData() }, [])

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
                                                <label htmlFor="" className="form-label">Id</label>
                                                <input type="text" className="form-control" name="id" value={updateField.id} disabled />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Batch Id</label>
                                                <input onChange={updateHandler} type="text" className="form-control" name="batchId" value={updateField.batchId} />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">File Name</label>
                                                <input onChange={updateHandler} type="text" className="form-control" name="fileName" value={updateField.fileName} />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Description</label>
                                                <input onChange={updateHandler} type="text" className="form-control" name="materialDesc" value={updateField.materialDesc} />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Remarks</label>
                                                <input onChange={updateHandler} type="text" className="form-control" name="remarks" value={updateField.remarks} />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Material Type</label>
                                                <input onChange={updateHandler} type="text" className="form-control" name="materialType" value={updateField.materialType} />
                                            </div>
                                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                                <label for="studProfilePic" className="form-label">
                                                    File <span className="text-danger">*</span>
                                                </label>
                                                <input onChange={fileUploadHandler} type="file" className="form-control" name="uploadFile" id="uploadFile" accept="*" />
                                                {fileValidationMessage && <div className="text-danger">{fileValidationMessage}</div>}
                                            </div>
                                            <br></br>
                                            <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                <button onClick={readNewValue} className="btn btn-warning">Update</button>
                                            </div>
                                            <br></br>
                                            <div class="mb-3">
                                                <Link class="btn btn-danger" to="/AdminStaffViewAllMaterial">Back</Link>
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

export default AdminStaffUpdateMaterial