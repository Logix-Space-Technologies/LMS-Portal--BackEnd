import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../config/config'

const AdminUpdateAdminStaff = () => {

    const [adstaffData, setAdstaffData] = useState([])
    const [updateField, setUpdateField] = useState({
        "id": "",
        "AdStaffName": "",
        "PhNo": "",
        "Address": "",
        "AadharNo": ""
    })

    const [errors, setErrors] = useState({});

    const apiUrl = global.config.urls.api.server + "/api/lms/updateAdminStaff";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/viewoneadminstaff";
    const navigate = useNavigate()

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

    const readNewValue = (e) => {
        e.preventDefault()
        const validationErrors = validateForm(updateField);
        if (Object.keys(validationErrors).length === 0) {
            let axiosConfig = {
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    "token": sessionStorage.getItem("admtoken"),
                    "key": sessionStorage.getItem("admkey")
                }
            }
            let data = {
                "id": sessionStorage.getItem("admStaffId"),
                "AdStaffName": updateField.AdStaffName,
                "PhNo": updateField.PhNo,
                "Address": updateField.Address,
                "AadharNo": updateField.AadharNo
            }
            setShowWaitingModal(true)
            setShowOverlay(true)
            axios.post(apiUrl, data, axiosConfig).then(
                (response) => {
                    if (response.data.status === "success") {
                        closeWaitingModal()
                        setTimeout(() => {
                            setUpdateField({
                                "id": sessionStorage.getItem("admStaffId"),
                                "AdStaffName": "",
                                "PhNo": "",
                                "Address": "",
                                "AadharNo": ""
                            })
                            alert("Profile Updated Successfully")
                            navigate("/AdminViewAllAdminStaff")
                        }, 500)
                    } else {
                        closeWaitingModal()
                        if (response.data.status === "Validation failed" && response.data.data.name) {
                            setTimeout(() => { alert(response.data.data.name) }, 500)
                        } else {
                            if (response.data.status === "Validation failed" && response.data.data.PhNo) {
                                setTimeout(() => { alert(response.data.data.PhNo) }, 500)
                            } else {
                                if (response.data.status === "Validation failed" && response.data.data.address) {
                                    setTimeout(() => { alert(response.data.data.address) }, 500)
                                } else {
                                    if (response.data.status === "Validation failed" && response.data.data.aadharno) {
                                        setTimeout(() => { alert(response.data.data.aadharno) }, 500)
                                    } else {
                                        if (response.data.status === "Unauthorized access!!") {
                                            navigate("/")
                                            sessionStorage.clear()
                                        } else {
                                            closeWaitingModal()
                                            setTimeout(() => {
                                                alert(response.data.status)
                                            }, 500)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            )
        } else {
            setErrors(validationErrors);
        }
    }

    const getData = () => {
        let data = { "id": sessionStorage.getItem("admStaffId") }
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
                if (response.data.data) {
                    setAdstaffData(response.data.data)
                    setUpdateField(response.data.data[0])
                } else {
                    if (response.data.status === "Unauthorized access!!") {
                        navigate("/")
                        sessionStorage.clear()
                    } else {
                        if (!response.data.data) {
                            setAdstaffData([])
                            setUpdateField({
                                "id": "",
                                "AdStaffName": "",
                                "PhNo": "",
                                "Address": "",
                                "AadharNo": ""
                            })
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            }
        )
    }

    const validateForm = (data) => {
        let errors = {};

        if (!data.AdStaffName.trim()) {
            errors.AdStaffName = 'Admin Staff Name is required';
        }
        if (!data.PhNo.trim()) {
            errors.PhNo = 'Mobile number is required';
        } else if (!/^\+91[6-9]\d{9}$|^\+91\s?[6-9]\d{9}$|^[6-9]\d{9}$/.test(data.PhNo)) {
            errors.PhNo = 'Invalid Mobile Number'
        }

        if (!data.Address.trim()) {
            errors.Address = 'Address is required';
        }
        if (!data.AadharNo.trim()) {
            errors.AadharNo = 'Aadhar Number is required';
        }
        return errors;
    };

    useEffect(() => { getData() }, [])


    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-4 mb-sm-5">
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h3 className="h2 text-black mb-0">Update Admin Staff Details</h3>
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
                                                {/* <label htmlFor="" className="form-label">Id</label> */}
                                                <input type="hidden" className="form-control" name="id" value={updateField.id} disabled />
                                            </div>

                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Staff Name</label>
                                                <input type="text" className="form-control" name="AdStaffName" onChange={updateHandler} value={updateField.AdStaffName} />
                                                {errors.AdStaffName && <span style={{ color: 'red' }} className="error">{errors.AdStaffName}</span>}
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Mobile Number</label>
                                                <input type="text" className="form-control" name="PhNo" onChange={updateHandler} value={updateField.PhNo} />
                                                {errors.PhNo && <span style={{ color: 'red' }} className="error">{errors.PhNo}</span>}
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Address</label>
                                                <input type="text" className="form-control" name="Address" onChange={updateHandler} value={updateField.Address} />
                                                {errors.Address && <span style={{ color: 'red' }} className="error">{errors.Address}</span>}
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">AadharNo</label>
                                                <input type="text" className="form-control" name="AadharNo" onChange={updateHandler} value={updateField.AadharNo} />
                                                {errors.AadharNo && <span style={{ color: 'red' }} className="error">{errors.AadharNo}</span>}
                                            </div>
                                            <br></br>
                                            <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                <button onClick={readNewValue} className="btn btn-warning">Update</button>
                                            </div>
                                            <br></br>
                                            <div class="mb-3">
                                                <Link class="btn btn-danger" to="/AdminViewAllAdminStaff">Back</Link>
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
            </div>
        </>
    )
}

export default AdminUpdateAdminStaff