import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import '../../config/config'
import { Link, useNavigate } from 'react-router-dom';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';

const AdminAddTrainer = () => {

    const [inputField, setInputField] = useState({
        "trainerName": "",
        "about": "",
        "email": "",
        "password": "",
        "phoneNumber": "",
        "confirmpassword": ""
    })

    const navigate = useNavigate()

    const [file, setFile] = useState(null)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [fileType, setFileType] = useState("");

    const [key, setKey] = useState('');

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

    const [errors, setErrors] = useState({})

    const apiUrl = global.config.urls.api.server + "/api/lms/addTrainers";

    const inputHandler = (event) => {
        setErrors({})
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const readValue = (e) => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        e.preventDefault();
        const validationErrors = validateForm(inputField);
        if (Object.keys(validationErrors).length === 0) {
            let axiosConfig3 = {
                headers: {
                    'content-type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*",
                    "token": token,
                    "key": currentKey
                }
            }
            let data = {
                "trainerName": inputField.trainerName,
                "about": inputField.about,
                "email": inputField.email,
                "password": inputField.password,
                "phoneNumber": inputField.phoneNumber,
                "profilePicture": file,
                "confirmpassword": inputField.confirmpassword
            }
            axios.post(apiUrl, data, axiosConfig3).then((response) => {
                if (response.data.status === 'success') {
                    alert('Trainer Added Successfully !!');
                    setInputField({
                        trainerName: '',
                        about: '',
                        email: '',
                        password: '',
                        phoneNumber: '',
                        confirmpassword: '',
                        profilePicture: ''
                    })
                } else if (response.data.status === "Validation failed" && response.data.data.trainerName) {
                    alert(response.data.data.trainerName)
                } else if (response.data.status === "Validation failed" && response.data.data.about) {
                    alert(response.data.data.about)
                } else if (response.data.status === "Validation failed" && response.data.data.email) {
                    alert(response.data.data.email)
                } else if (response.data.status === "Validation failed" && response.data.data.phoneNumber) {
                    alert(response.data.data.phoneNumber)
                } else if (response.data.status === "Validation failed" && response.data.data.password) {
                    alert(response.data.data.password)
                } else if (response.data.status === "Validation failed" && response.data.data.date) {
                    alert(response.data.data.date)
                } else if (response.data.status === "Unauthorized access!!") {
                    { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                    sessionStorage.clear()
                } else {
                    alert(response.data.status)
                }
            }).catch(error => {
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
                    alert(error.config);
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
        }
        if (!data.about.trim()) {
            errors.about = 'About is required';
        }
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        }
        if (!data.password.trim()) {
            errors.password = 'New Password is required';
        } else if (data.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        } else if (data.password.length > 12) {
            errors.password = 'Password should not exceed 12 characters';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,12}$/.test(data.password)) {
            errors.password = 'Password should include one uppercase letter, one lowercase letter, numbers and special characters';
        }
        if (!data.phoneNumber.trim()) {
            errors.phoneNumber = 'Contact Details required';
        }
        if (fileType !== "jpg" && fileType !== "jpeg" && fileType !== "png" && fileType !== "webp" && fileType !== "heif") {
            errors.file = "File must be in jpg/jpeg/png/webp/heif format";
        }
        if (!data.confirmpassword) {
            errors.confirmpassword = 'Confirm password is required';
        }
        if (data.confirmpassword !== data.password) {
            errors.confirmpassword = 'Passwords do not match';
        }
        return errors;
    }

    useEffect(() => { setKey(sessionStorage.getItem("admkey") || '') }, []);

    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
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
                                            <h3>Add Trainer</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="row gy-3 gy-md-4 overflow-hidden">
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="trainerName" className="form-label">
                                            Trainer Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="trainerName"
                                            id="trainerName"
                                            value={inputField.trainerName}
                                            onChange={inputHandler}
                                            required
                                        />
                                        {errors.trainerName && (<span style={{ color: 'red' }} className="error">{errors.trainerName}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="about" className="form-label">
                                            About<span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="about"
                                            id="about"
                                            rows="3"
                                            value={inputField.about}
                                            onChange={inputHandler}
                                        ></textarea>
                                        {errors.about && (<span style={{ color: 'red' }} className="error">{errors.about}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="email" className="form-label">
                                            Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            id="email"
                                            value={inputField.email}
                                            onChange={inputHandler}
                                        />
                                        {errors.email && (<span style={{ color: 'red' }} className="error">{errors.email}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="phoneNumber" className="form-label">
                                            Mobile Number <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            value={inputField.phoneNumber}
                                            onChange={inputHandler}
                                        />
                                        {errors.phoneNumber && (<span style={{ color: 'red' }} className="error">{errors.phoneNumber}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="profilePicture" className="form-label">
                                            Profile Pic <span className="text-danger">*</span>
                                        </label>
                                        <input type="file" className="form-control" name="profilePicture" id="profilePicture" onChange={fileUploadHandler} />
                                        {errors.file && (<span style={{ color: 'red' }} className="error">{errors.file}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="password" className="form-label">
                                            Password <span className="text-danger">*</span>
                                        </label>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                name="password"
                                                id="password"
                                                value={inputField.password}
                                                onChange={inputHandler}
                                            />
                                            <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                                                <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"} id="togglePassword"></i>
                                            </span>
                                        </div>
                                        {errors.password && (<span style={{ color: 'red' }} className="error">{errors.password}</span>)}
                                    </div>
                                    <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label for="password" class="form-label">Confirm Password <span class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <input type={showConfirmPassword ? "text" : "password"} class="form-control" name="confirmpassword" id="confirmpassword" onChange={inputHandler} value={inputField.confirmpassword} />
                                            <span className="input-group-text" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                <i className={showConfirmPassword ? "bi bi-eye" : "bi bi-eye-slash"} id="toggleConfirmPassword"></i>
                                            </span>
                                        </div>
                                        {errors.confirmpassword && <span style={{ color: 'red' }} className="error">{errors.confirmpassword}</span>}
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

export default AdminAddTrainer