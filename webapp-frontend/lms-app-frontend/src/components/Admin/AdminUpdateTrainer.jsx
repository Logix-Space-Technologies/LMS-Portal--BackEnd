import React, { useEffect, useState } from 'react'
import '../../config/config'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminUpdateTrainer = () => {
    const [trainerData, settrainerData] = useState([])
    const [file, setFile] = useState("")
    const [updateField, setUpdateField] = useState(
        {
            "id": sessionStorage.getItem("trainerId"),
            "trainerName": "",
            "about": "",
            "phoneNumber": "",
            "profilePicture": file
        }
    )
    const apiURL = global.config.urls.api.server + "/api/lms/adminvieonetrainer";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/updateTrainer";
    const navigate = useNavigate()

    const updateHandler = (event) => {
        setUpdateField({ ...updateField, [event.target.name]: event.target.value })
    }

    const fileUploadHandler = (event) => {
        setFile(event.target.files[0]);
        setUpdateField({ ...updateField, studProfilePic: event.target.files[0] });
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
            "id": sessionStorage.getItem("trainerId"),
            "trainerName": updateField.trainerName,
            "about": updateField.about,
            "phoneNumber": updateField.phoneNumber,
            "profilePicture": file
        }
        axios.post(apiUrl2, data, axiosConfig).then(
            (Response) => {
                if (Response.data.status === "Trainer Details Updated") {
                    setUpdateField({
                        "id": sessionStorage.getItem("trainerId"),
                        "trainerName": "",
                        "about": "",
                        "phoneNumber": "",
                        "profilePicture": ""
                    })
                    alert("Profile Updated Successfully")
                    navigate("/adminviewalltrainers")
                } else {
                    if (Response.data.status === "Validation failed" && Response.data.data.trainerName) {
                        alert(Response.data.data.trainerName)
                    } else {
                        if (Response.data.status === "Validation failed" && Response.data.data.about) {
                            alert(Response.data.data.about)
                        } else {
                            if (Response.data.status === "Validation failed" && Response.data.data.phoneNumber) {
                                alert(Response.data.data.phoneNumber)
                            } else {
                                alert(Response.data.status)
                            }
                        }
                    }
                }

            }
        )
    }

    const getData = () => {
        let data = { "id": sessionStorage.getItem("trainerId") }
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
                settrainerData(response.data.Trainers)
                setUpdateField(response.data.Trainers[0])
                console.log(response.data.Trainers)
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
                    <h3 className="h2 text-black mb-0">Update Trainer Details</h3>
                    <br></br>
                    <div className="card card-style1 --bs-primary-border-subtle border-5">
                        <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                            <div className="row align-items-center">
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <img height="300px" src={updateField.profilePicture} alt="" />
                                </div>
                                <div className="col-lg-6 px-xl-10">
                                    <div className=" d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                        <h3 className="h2 text-black mb-0">{updateField.trainerName}</h3>
                                        <br></br>
                                    </div>
                                    <ul className="list-unstyled mb-1-9">
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Id</label>
                                            <input type="text" className="form-control" name="id" value={updateField.id} disabled />
                                        </div>
                                
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Trainer Name</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="trainerName" value={updateField.trainerName} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">About</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="about" value={updateField.about} />
                                        </div>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Phone No:</label>
                                            <input onChange={updateHandler} type="text" className="form-control" name="phoneNumber" value={updateField.phoneNumber} />
                                        </div>
                                        
                                        
                                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                            <label for="studProfilePic" className="form-label">
                                                Profile Picture <span className="text-danger">*</span>
                                            </label>
                                            <input onChange={fileUploadHandler} type="file" className="form-control" name="profilePicture" id="profilePicture" accept="image/*" />
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
    );
};

export default AdminUpdateTrainer