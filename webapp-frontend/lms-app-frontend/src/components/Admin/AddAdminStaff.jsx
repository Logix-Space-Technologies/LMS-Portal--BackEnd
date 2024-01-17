import axios from 'axios';
import '../../config/config';
import React, { useState } from 'react';

const AddAdminStaff = () => {
    const [inputField, setInputField] = useState({
        AdStaffName: '',
        PhNo: '',
        Address: '',
        AadharNo: '',
        Email: '',
        Password: '',
    });

    const [errors, setErrors] = useState({});

    const apiUrl = global.config.urls.api.server + '/api/lms/addAdminStaff';

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const handleSubmit = (e) => {
        console.log(inputField);
        e.preventDefault();
        const validationErrors = validateForm(inputField);
        console.log(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            let axiosConfig = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    token: sessionStorage.getItem('admtoken'),
                    key: 'lmsapp',
                },
            };
            let data = {
                AdStaffName: inputField.AdStaffName,
                PhNo: inputField.PhNo,
                Address: inputField.Address,
                AadharNo: inputField.AadharNo,
                Email: inputField.Email,
                Password: inputField.Password,
            };
            console.log(data);
            axios.post(apiUrl, data, axiosConfig).then((response) => {
                if (response.data.status === 'success') {
                    alert(response.data.status);
                    setInputField({
                        AdStaffName: '',
                        PhNo: '',
                        Address: '',
                        AadharNo: '',
                        Email: '',
                        Password: '',
                    });
                } else {
                    if (response.data.status === 'Validation failed' && response.data.data.name) {
                        alert(response.data.data.name);
                    } else if (response.data.status === 'Validation failed' && response.data.data.mobile) {
                        alert(response.data.data.mobile);
                    } else if (response.data.status === 'Validation failed' && response.data.data.address) {
                        alert(response.data.data.address);
                    } else if (response.data.status === 'Validation failed' && response.data.data.aadharno) {
                        alert(response.data.data.aadharno);
                    } else if (response.data.status === 'Validation failed' && response.data.data.email) {
                        alert(response.data.data.email);
                    } else if (response.data.status === 'Validation failed' && response.data.data.password) {
                        alert(response.data.data.password);
                    } else {
                        alert(response.data.status);
                    }
                }
            });
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = (data) => {
        let errors = {};

        if (!data.AdStaffName.trim()) {
            errors.AdStaffName = 'Admin Staff Name is required';
        }
        if (!data.PhNo.trim()) {
            errors.PhNo = 'Mobile number is required';
        } else if (!/^\+91[6-9]\d{9}$|^\+91\s?[6-9]\d{9}$|^[6-9]\d{9}$/.test(data.PhNo)) {
            errors.PhNo = 'Invalid Mobile Number Format';
        }
        
        if (!data.Address.trim()) {
            errors.Address = 'Address is required';
        }
        if (!data.AadharNo.trim()) {
            errors.AadharNo = 'Aadhar Number is required';
        } else if (!/^\d{12}$/.test(data.AadharNo)) {
            errors.AadharNo = 'Invalid AadharNo Format';
        }
        if (!data.Email.trim()) {
            errors.Email = 'Email is required';
        } else if (!/^[a-z0-9._!#$%&'*+/=?^_`{|}~-]+@[a-z]+(\.[a-z]+)+$/.test(data.Email)) {
            errors.Email = 'Invalid Email address Format';
        }
        if (!data.Password.trim()) {
            errors.Password = 'Password is required';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,12}$/.test(data.Password)) {
            errors.Password = 'Invalid Password Format';
        }
        return errors;
    };


    return (
        <div class="bg-light py-3 py-md-5">
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
                        <div class="bg-white p-4 p-md-5 rounded shadow-sm">
                            <div class="row">
                                <div class="col-12">
                                    <div class="text-center mb-5">
                                        <a href="#!">
                                            <img src="https://www.linkurcodes.com/images/logo.png" alt="" width="175" height="57" />
                                        </a><br /><br />
                                        <h3>Add Admin Staff Details</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="row gy-3 gy-md-4 overflow-hidden">
                                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label for="" class="form-label">Admin Staff Name <span class="text-danger">*</span></label>
                                    <input onChange={inputHandler} type="text" class="form-control" name="AdStaffName" value={inputField.AdStaffName} id="AdStaffName" />
                                    {errors.AdStaffName && <span style={{ color: 'red' }} className="error">{errors.AdStaffName}</span>}
                                </div>
                                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label for="" class="form-label">Mobile Number <span class="text-danger">*</span></label>
                                    <input onChange={inputHandler} type="text" class="form-control" name="PhNo" value={inputField.PhNo} id="PhNo" />
                                    {errors.PhNo && <span style={{ color: 'red' }} className="error">{errors.PhNo}</span>}
                                </div>
                                <div class="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                    <label for="" class="form-label">Address <span class="text-danger">*</span></label>
                                    <textarea onChange={inputHandler} name="Address" id="Address" cols="30" rows="5" className="input form-control" value={inputField.Address} ></textarea>
                                    {errors.Address && <span style={{ color: 'red' }} className="error">{errors.Address}</span>}
                                </div>
                                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label for="" class="form-label">Aadhar Number <span class="text-danger">*</span></label>
                                    <input onChange={inputHandler} type="text" class="form-control" name="AadharNo" value={inputField.AadharNo} id="AadharNo" />
                                    {errors.AadharNo && <span style={{ color: 'red' }} className="error">{errors.AadharNo}</span>}
                                </div>
                                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label for="" class="form-label">Email <span class="text-danger">*</span></label>
                                    <input onChange={inputHandler} type="text" class="form-control" name="Email" value={inputField.Email} id="Email" />
                                    {errors.Email && <span style={{ color: 'red' }} className="error">{errors.Email}</span>}
                                </div>
                                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <label for="" class="form-label">Password</label>
                                    <input onChange={inputHandler} type="text" class="form-control" name="Password" value={inputField.Password} id="Password" />
                                    {errors.Password && <span style={{ color: 'red' }} className="error">{errors.Password}</span>}
                                </div>
                                <div class="col-12">
                                    <div class="d-grid">
                                        <button onClick={handleSubmit} class="btn btn-primary btn-lg" type="submit">Register</button>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <hr class="mt-5 mb-4 border-secondary-subtle" />
                                    <div class="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center">
                                        &copy; 2024 Link Ur Codes. All rights reserved.
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

export default AddAdminStaff