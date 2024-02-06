import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminUpdateBatch = () => {

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

    const apiURL = global.config.urls.api.server + "/api/lms/viewonebatch";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/updateBatch";

    const navigate = useNavigate()

    const updateHandler = (event) => {
        setUpdateField({ ...updateField, [event.target.name]: event.target.value })
    }

    const readNewValue = () => {
        console.log(updateField)
        let axiosConfig = {
            headers: {
                'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
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
                    if (response.data.status === "Validation failed" && response.data.data.trainerName) {
                        alert(response.data.data.trainerName)
                    } else {
                        if (response.data.status === "Validation failed" && response.data.data.trainerName) {
                            alert(response.data.data.trainerName)
                        } else {
                            if (response.data.status === "Validation failed" && response.data.data.trainerName) {
                                alert(response.data.data.trainerName)
                            } else {
                                if (response.data.status === "Validation failed" && response.data.data.trainerName) {
                                    alert(response.data.data.trainerName)
                                } else {
                                    if (response.data.status === "Validation failed" && response.data.data.trainerName) {
                                        alert(response.data.data.trainerName)
                                    } else {
                                        if (response.data.status === "Validation failed" && response.data.data.trainerName) {
                                            alert(response.data.data.trainerName)
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

    const getData = () =>{
        let data = { "id": sessionStorage.getItem("batchId")}
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        }
        
        axios.post(apiURL, data, axiosConfig).then(
            (response) => {
                setBatchData(response.data.data)
                setUpdateField(response.data.data[0])
                console.log(axiosConfig)
                console.log(data)
                console.log(response.data)
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
                                                <label htmlFor="" className="form-label">College Id</label>
                                                <input type="text" className="form-control" name="id" value={updateField.collegeId} disabled />
                                            </div>

                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Batch Name</label>
                                                <input type="text" className="form-control" name="batchName" onChange={updateHandler} value={updateField.batchName}/>
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Registration Start Date</label>
                                                <input type="date" className="form-control" name="regStartDate" onChange={updateHandler} value={updateField.regStartDate}/>
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Registration End Date</label>
                                                <input type="date" className="form-control" name="regEndDate" onChange={updateHandler} value={updateField.regEndDate}/>
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Description</label>
                                                <input type="text" className="form-control" name="batchDesc" onChange={updateHandler} value={updateField.batchDesc} />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">Amount</label>
                                                <input type="text" className="form-control" name="batchAmount" onChange={updateHandler} value={updateField.batchAmount}/>
                                            </div>
                                            <br></br>
                                            <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                <button onClick={readNewValue} className="btn btn-warning">Update</button>
                                            </div>
                                            <br></br>
                                            <div class="mb-3">
                                                <a class="btn btn-danger" href="/adminviewalltrainers">Back</a>
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
        </>
    )
}

export default AdminUpdateBatch