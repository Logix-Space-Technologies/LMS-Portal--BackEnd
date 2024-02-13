import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../config/config'

const AdminUpdateCollege = () => {

    const [clgData, setClgData] = useState([])

    const [file, setFile] = useState(null)

    const [fileType, setFileType] = useState("");

    const [errors, setErrors] = useState({})

    const [updateField, setUpdateField] = useState(
        {
            "id": "",
            "collegeName": "",
            "collegeCode": "",
            "collegeAddress": "",
            "website": "",
            "email": "",
            "collegePhNo": "",
            "collegeMobileNumber": "",
            "collegeImage": file
        }
    )

    const apiUrl = global.config.urls.api.server + "/api/lms/updateCollege";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/viewOneclg";
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
        e.preventDefault()
        const validationErrors = validateForm(updateField)
        console.log(validationErrors)
        if (Object.keys(validationErrors).length === 0) {
            let axiosConfig = {
                headers: {
                    'content-type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*",
                    "token": sessionStorage.getItem("admtoken"),
                    "key": sessionStorage.getItem("admkey")
                }
            }
            let data = {
                "id": sessionStorage.getItem("clgId"),
                "collegeName": updateField.collegeName,
                "collegeCode": updateField.collegeCode,
                "collegeAddress": updateField.collegeAddress,
                "website": updateField.website,
                "email": updateField.email,
                "collegePhNo": updateField.collegePhNo,
                "collegeMobileNumber": updateField.collegeMobileNumber,
                "collegeImage": file
            }
            console.log(data)
            axios.post(apiUrl, data, axiosConfig).then(
                (response) => {
                    if (response.data.status === "success") {
                        setUpdateField({
                            "id": sessionStorage.getItem("clgId"),
                            "collegeName": "",
                            "collegeCode": "",
                            "collegeAddress": "",
                            "website": "",
                            "email": "",
                            "collegePhNo": "",
                            "collegeMobileNumber": "",
                            "collegeImage": ""
                        })
                        alert("College Details Updated Successfully")
                        setFile(null)
                        // navigate("")
                    } else {
                        if (response.data.status === "Validation Failed" && response.data.data.name) {
                            alert(response.data.data.name)
                        } else {
                            if (response.data.status === "Validation Failed" && response.data.data.address) {
                                alert(response.data.data.address)
                            } else {
                                if (response.data.status === "Validation Failed" && response.data.data.website) {
                                    alert(response.data.data.website)
                                } else {
                                    if (response.data.status === "Validation Failed" && response.data.data.phone) {
                                        alert(response.data.data.phone)
                                    } else {
                                        if (response.data.status === "Validation Failed" && response.data.data.mobile) {
                                            alert(response.data.data.mobile)
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
            })
        } else {
            setErrors(validationErrors);
        }
    }

    const validateForm = (data) => {
        let errors = {};

        if (!data.collegeName.trim()) {
            errors.collegeName = 'College Name is required';
        }
        if (!data.collegeCode.trim()) {
            errors.collegeCode = 'College Code is required';
        }
        if (!data.collegeAddress.trim()) {
            errors.collegeAddress = 'College Address is required';
        }
        if (!data.website.trim()) {
            errors.website = 'Website is required';
        }
        if (!data.collegeMobileNumber.trim()) {
            errors.collegeMobileNumber = 'Mobile Number is required';
        }
        if (fileType !== "jpg" && fileType !== "jpeg" && fileType !== "png" && fileType !== "webp" && fileType !== "heif") {
            errors.file = "File must be in jpg/jpeg/png/webp/heif format";
        }
        return errors;
    };

    const getData = () => {
        let data = { "id": sessionStorage.getItem("clgId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        }
        axios.post(apiUrl2, data, axiosConfig).then(
            (response) => {
                setClgData(response.data.data)
                setUpdateField(response.data.data[0])
                console.log(response.data)
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
                    <h3 className="h2 text-black mb-0">Update College Details</h3>
                    <br></br>
                    <div className="card card-style1 --bs-primary-border-subtle border-5">
                        <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                            <div className="row align-items-center">
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <img height="300px" src={updateField.collegeImage} alt="" />
                                </div>
                                <div className="col-lg-6 px-xl-10">
                                    <ul className="list-unstyled mb-1-9">
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">College Id </label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="id" value={updateField.id} disabled />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">College Name</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="collegeName" value={updateField.collegeName} />
                                            {errors.collegeName && <span style={{ color: 'red' }} className="error">{errors.collegeName}</span>}
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">College Code</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="collegeCode" value={updateField.collegeCode} disabled />
                                        </div>
                                        <div class="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label for="" class="form-label">College Address</label>
                                            <textarea onChange={updateHandler} name="collegeAddress" id="collegeAddress" cols="30" rows="5" className="input form-control" value={updateField.collegeAddress} ></textarea>
                                            {errors.collegeAddress && <span style={{ color: 'red' }} className="error">{errors.collegeAddress}</span>}
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Website</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="website" value={updateField.website} />
                                            {errors.website && <span style={{ color: 'red' }} className="error">{errors.website}</span>}
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">email</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="email" value={updateField.email} disabled />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Phone No.</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="collegePhNo" value={updateField.collegePhNo} />
                                            {errors.collegePhNo && <span style={{ color: 'red' }} className="error">{errors.collegePhNo}</span>}
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Mobile No.</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="collegeMobileNumber" value={updateField.collegeMobileNumber} />
                                            {errors.collegeMobileNumber && <span style={{ color: 'red' }} className="error">{errors.collegeMobileNumber}</span>}
                                        </div>
                                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                            <label for="studProfilePic" className="form-label">
                                                College Image  <span className="text-danger">*</span>
                                            </label>
                                            <input type="file" onChange={fileUploadHandler} className="form-control" name="collegeImage" id="collegeImage" accept="image/*" />
                                            {errors.file && (<span style={{ color: 'red' }} className="error">{errors.file}</span>)}
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
    )
}

export default AdminUpdateCollege