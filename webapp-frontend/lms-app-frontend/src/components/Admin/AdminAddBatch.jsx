import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import '../../config/config'
import { Link } from 'react-router-dom';

const AdminAddBatch = () => {
    const [inputField, setInputField] = useState({
        collegeId: '',
        batchName: '',
        regStartDate: '',
        regEndDate: '',
        batchDesc: '',
        batchAmount: ''
    });

    const [errors, setErrors] = useState({});
    const [outputField, setOutputField] = useState([]);

    const apiUrl = global.config.urls.api.server + '/api/lms/viewallcolleges';
    const apiUrl2 = global.config.urls.api.server + '/api/lms/addBatches';

    const getData = () => {
        let axiosConfig = {
            headers: {
                'content-type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                token: sessionStorage.getItem('admtoken'),
                key: sessionStorage.getItem('admkey')
            }
        };

        axios.post(apiUrl, {}, axiosConfig).then((response) => {
            setOutputField(response.data.data);
            console.log(response.data.data);
        });
    };

    const inputHandler = (event) => {
        setErrors({});
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const readValue = (e) => {
        e.preventDefault();
        console.log('Handle submit function called');
        const validationErrors = validateForm(inputField);
        console.log(validationErrors)
        if (Object.keys(validationErrors).length === 0) {
            let axiosConfig2 = {
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    "token": sessionStorage.getItem("admtoken"),
                    "key": sessionStorage.getItem("admkey")
                }
            }
            console.log(axiosConfig2)
            let data = {
                collegeId: inputField.collegeId,
                batchName: inputField.batchName,
                regStartDate: inputField.regStartDate,
                regEndDate: inputField.regEndDate,
                batchDesc: inputField.batchDesc,
                batchAmount: inputField.batchAmount
            };
            console.log(data)
            axios.post(apiUrl2, data, axiosConfig2).then((response) => {
                if (response.data.status === 'success') {
                    alert('Batch Added Successfully !!');
                    setInputField({
                        collegeId: '',
                        batchName: '',
                        regStartDate: '',
                        regEndDate: '',
                        batchDesc: '',
                        batchAmount: ''
                    });
                } else {
                    if (response.data.status === "Validation failed" && response.data.data.collegeid) {
                        alert(response.data.data.collegeid)
                    } else {
                        if (response.data.status === "Validation failed" && response.data.data.name) {
                            alert(response.data.data.name)
                        } else {
                            if (response.data.status === "Validation failed" && response.data.data.regstartdate) {
                                alert(response.data.data.regstartdate)
                            } else {
                                if (response.data.status === "Validation failed" && response.data.data.regenddate) {
                                    alert(response.data.data.regenddate)
                                } else {
                                    if (response.data.status === "Validation failed" && response.data.data.description) {
                                        alert(response.data.data.description)
                                    } else {
                                        if (response.data.status === "Validation failed" && response.data.data.amount) {
                                            alert(response.data.data.amount)
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
        )
    }
    else {
        setErrors(validationErrors);
    }
}

    const validateForm = (data) => {
        let errors = {};

        if (!data.collegeId.trim()) {
            errors.collegeId = 'College Id is required';
        }
        if (!data.batchName.trim()) {
            errors.batchName = 'Name is required';
        }
        if (!data.batchDesc.trim()) {
            errors.batchDesc = 'Description is required';
        }
        if (!(data.batchAmount > 0)) {
            errors.batchAmount = 'Amount must be greater than zero';
        }
        if (!data.regStartDate.trim()) {
            errors.regStartDate = 'Date is required';
        }
        if (!data.regEndDate.trim()) {
            errors.regEndDate = 'Date is required';
        }else if (new Date(data.regEndDate) <= new Date(data.regStartDate)) {
            errors.regEndDate = 'End date must be greater than start date';
        }

        return errors;
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <div>
            <Navbar />
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
                                            <h3>Admin Add Batch</h3>
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
                                            onChange={inputHandler}
                                            id="collegeId"
                                            className="form-control"
                                        >
                                            <option value="">Select</option>
                                            {outputField &&
                                                outputField.map((value) => {
                                                    return (
                                                        <option key={value.id} value={value.id}>
                                                            {value.collegeName}
                                                        </option>
                                                    );
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
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="batchName"
                                            id="batchName"
                                            value={inputField.batchName}
                                            onChange={inputHandler}
                                        />
                                        {errors.batchName && (<span style={{ color: 'red' }} className="error">{errors.batchName}</span>)}
                                    </div>

                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="regStartDate" className="form-label">
                                            Registration Start Date <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="regStartDate"
                                            id="regStartDate"
                                            value={inputField.regStartDate}
                                            onChange={inputHandler}
                                        />
                                        {errors.regStartDate && (<span style={{ color: 'red' }} className="error">{errors.regStartDate}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="regEndDate" className="form-label">
                                            Registration End Date <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="regEndDate"
                                            id="regEndDate"
                                            value={inputField.regEndDate}
                                            onChange={inputHandler}
                                        />
                                        {errors.regEndDate && (<span style={{ color: 'red' }} className="error">{errors.regEndDate}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="batchAmount" className="form-label">
                                            Batch Amount <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="batchAmount"
                                            id="batchAmount"
                                            value={inputField.batchAmount}
                                            onChange={inputHandler}
                                        />
                                        {errors.batchAmount && (<span style={{ color: 'red' }} className="error">{errors.batchAmount}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="batchDesc" className="form-label">
                                            Batch Description
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="batchDesc"
                                            id="batchDesc"
                                            rows="3"
                                            value={inputField.batchDesc}
                                            onChange={inputHandler}
                                        ></textarea>
                                        {errors.batchDesc && (<span style={{ color: 'red' }} className="error">{errors.batchDesc}</span>)}
                                    </div>

                                    <div className="col-12">
                                        <div className="d-grid">
                                            <button
                                                className="btn btn-primary btn-lg"
                                                type="submit"
                                                onClick={readValue}
                                            >
                                                Register
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
    );
};

export default AdminAddBatch;