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

    const apiUrl = global.config.urls.api.server + "/api/lms/updateAdminStaff";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/viewoneadminstaff";
    const navigate = useNavigate()

    const updateHandler = (event) => {
        setUpdateField({ ...updateField, [event.target.name]: event.target.value })
    }

    const readNewValue = (e) => {
        e.preventDefault()
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
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                if (response.data.status === "success") {
                    setUpdateField({
                        "id": sessionStorage.getItem("admStaffId"),
                        "AdStaffName": "",
                        "PhNo": "",
                        "Address": "",
                        "AadharNo": ""
                    })
                    alert("Profile Updated Successfully")
                    navigate("/AdminViewAllAdminStaff")
                } else {
                    if (response.data.status === "Validation failed" && response.data.data.name) {
                        alert(response.data.data.name)
                    } else {
                        if (response.data.status === "Validation failed" && response.data.data.PhNo) {
                            alert(response.data.data.PhNo)
                        } else {
                            if (response.data.status === "Validation failed" && response.data.data.address) {
                                alert(response.data.data.address)
                            } else {
                                if (response.data.status === "Validation failed" && response.data.data.aadharno) {
                                    alert(response.data.data.aadharno)
                                } else {
                                    alert(response.data.status)
                                }
                            }
                        }
                    }
                }
            }
        )
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
                setAdstaffData(response.data.data)
                setUpdateField(response.data.data[0])
            }
        )
    }

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
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Phone</label>
                                                <input type="text" className="form-control" name="PhNo" onChange={updateHandler} value={updateField.PhNo} />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Address</label>
                                                <input type="text" className="form-control" name="Address" onChange={updateHandler} value={updateField.Address} />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">AadharNo</label>
                                                <input type="text" className="form-control" name="AadharNo" onChange={updateHandler} value={updateField.AadharNo} />
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
            </div>
        </>
    )
}

export default AdminUpdateAdminStaff