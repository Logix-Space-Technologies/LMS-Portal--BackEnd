import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../config/config'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar'

const AdminUpdateBatch = () => {

    // const [errors, setErrors] = useState({});
    const [batchData, setBatchData] = useState([])
    const [updateField, setUpdateField] = useState({
        "id": sessionStorage.getItem("batchId"),
        "collegeId": "",
        "batchName": "",
        "regStartDate": "",
        "regEndDate": "",
        "batchDesc": "",
        "batchAmount": ""
    })

    const [key, setKey] = useState('');

    const apiURL = global.config.urls.api.server + "/api/lms/viewonebatch";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/updateBatch";

    const navigate = useNavigate()

    const updateHandler = (event) => {
        setUpdateField({ ...updateField, [event.target.name]: event.target.value })
    }

    const readNewValue = () => {
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
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        }
        let data = {
            "id": sessionStorage.getItem("batchId"),
            "collegeId": updateField.collegeId,
            "batchName": updateField.batchName,
            "regStartDate": updateField.regStartDate,
            "regEndDate": updateField.regEndDate,
            "batchDesc": updateField.batchDesc,
            "batchAmount": updateField.batchAmount
        }
        axios.post(apiUrl2, data, axiosConfig).then(
            (response) => {
                if (response.data.status === "Updated Batch Details") {
                    setUpdateField({
                        "id": sessionStorage.getItem("batchId"),
                        "collegeId": "",
                        "batchName": "",
                        "regStartDate": "",
                        "regEndDate": "",
                        "batchDesc": "",
                        "batchAmount": ""
                    })
                    alert("Batch Updated!")
                    navigate("/adminviewallbatches")
                } else {
                    if (response.data.status === "Validation Failed" && response.data.data.batchName) {
                        alert(response.data.data.batchName)
                    } else {
                        if (response.data.status === "Validation Failed" && response.data.data.regStartDate) {
                            alert(response.data.data.regStartDate)
                        } else {
                            if (response.data.status === "Validation Failed" && response.data.data.regEndDate) {
                                alert(response.data.data.regEndDate)
                            } else {
                                if (response.data.status === "Validation Failed" && response.data.data.batchDesc) {
                                    alert(response.data.data.batchDesc)
                                } else {
                                    if (response.data.status === "Validation Failed" && response.data.data.batchAmount) {
                                        alert("batch amount: ", response.data.data.batchAmount)
                                    } else {
                                        alert(response.data.status)
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
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        // let newErrors = {};
        // if (!updateField.regStartDate || !updateField.regStartDate.trim()) {
        //     newErrors.regStartDate = "Registration start date is required!";
        // } else if (!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/i.test(updateField.regStartDate)) {
        //     newErrors.regStartDate = 'Invalid Date';
        // }

        // if (!updateField.regEndDate || !updateField.regEndDate.trim()) {
        //     newErrors.regEndDate = "Registration End date is required!";
        // } else if (!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/i.test(updateField.regEndDate)) {
        //     newErrors.regEndDate = 'Invalid Date';
        // }

        // if (Object.keys(newErrors).length > 0) {
        //     setErrors(newErrors);
        //     return;
        // }

        let data = { "id": sessionStorage.getItem("batchId") }
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
                setBatchData(response.data.data)
                setUpdateField(response.data.data[0])
            }
        )
    }

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    useEffect(() => {
        const formattedStartDate = formatDate(updateField.regStartDate);
        const formattedEndDate = formatDate(updateField.regEndDate);
        setUpdateField({ ...updateField, regStartDate: formattedStartDate, regEndDate: formattedEndDate });
    }, [updateField.regStartDate, updateField.regEndDate]);

    useEffect(() => { getData() }, [])


    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);

    return (
        <>
        {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-4 mb-sm-5">
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h3 className="h2 text-black mb-0">Update Batch Details</h3>
                        <br></br>
                        <div className="card card-style1 --bs-primary-border-subtle border-5">
                            <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                                <div className="row align-items-center">

                                    <div className="col-lg-6 px-xl-10">
                                        <div className=" d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                            <h3 className="h2 text-black mb-0"></h3>
                                            <br></br>
                                        </div>
                                        <ul className="list-unstyled mb-1-9">
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                {/* <label htmlFor="" className="form-label">College Id</label> */}
                                                <input type="hidden" className="form-control" name="id" value={updateField.collegeId} disabled />
                                            </div>

                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Batch Name</label>
                                                <input type="text" className="form-control" name="batchName" onChange={updateHandler} value={updateField.batchName} />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Registration Start Date</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="regStartDate"
                                                    onChange={updateHandler}
                                                    value={updateField.regStartDate}
                                                />

                                                {/* {errors.regStartDate && <span style={{ color: 'red' }} className="error">{errors.regStartDate}</span>} */}
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Registration End Date</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="regEndDate"
                                                    onChange={updateHandler}
                                                    value={updateField.regEndDate}
                                                />
                                                {/* {errors.regEndDate && <span style={{ color: 'red' }} className="error">{errors.regEndDate}</span>} */}
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Description</label>
                                                <input type="text" className="form-control" name="batchDesc" onChange={updateHandler} value={updateField.batchDesc} />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Amount</label>
                                                <input type="text" className="form-control" name="batchAmount" onChange={updateHandler} value={updateField.batchAmount} />
                                            </div>
                                            <br></br>
                                            <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                <button onClick={readNewValue} className="btn btn-warning">Update</button>
                                            </div>
                                            <br></br>
                                            <div className="mb-3">
                                                <button className="btn btn-danger" onClick={handleBack}>Back</button>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    } else {
        return '';
    }
};

export default AdminUpdateBatch