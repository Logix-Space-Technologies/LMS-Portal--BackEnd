import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import '../../config/config'

const AdminAddSession = () => {

    const [inputField, setInputField] = useState({
        "collegeId": "",
        "batchId": "",
        "sessionName": "",
        "date": "",
        "time": "",
        "type": "",
        "remarks": "",
        "venueORlink": "",
        "trainerId": ""
    })

    const [outputField, setOutputField] = useState([])

    const [errors, setErrors] = useState({})

    const [batches, setBatches] = useState([])

    const [trainers, setTrainers] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/createsession";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/viewallcolleges";
    const batchUrl = global.config.urls.api.server + "/api/lms/adminviewbatch";
    const trainerUrl = global.config.urls.api.server + "/api/lms/viewAllTrainer";

    const getTrainer = () => {
        let axiosConfig = {
            headers: {
                'content-type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                "token": sessionStorage.getItem('admtoken'),
                "key": sessionStorage.getItem('admkey')
            }
        };
        axios.post(trainerUrl, {}, axiosConfig).then(
            (response) => {
                setTrainers(response.data.Trainers)
                console.log(response.data)
            }
        )
    }

    const getData = () => {
        let axiosConfig = {
            headers: {
                'content-type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                "token": sessionStorage.getItem('admtoken'),
                "key": sessionStorage.getItem('admkey')
            }
        };
        axios.post(apiUrl2, {}, axiosConfig).then(
            (response) => {
                setOutputField(response.data.data)
                console.log(response.data.data)
            }
        )
    }

    const getBatches = (collegeId) => {
        let axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": sessionStorage.getItem('admtoken'),
                "key": sessionStorage.getItem('admkey')
            }
        };
        console.log(collegeId)
        axios.post(batchUrl, { collegeId }, axiosConfig2).then((response) => {
            setBatches(response.data)
            console.log(response.data)
        })
    }

    const handleCollegeChange = (event) => {
        const selectedCollegeId = event.target.value;
        setInputField(prevState => ({ ...prevState, collegeId: selectedCollegeId }))
        getBatches(selectedCollegeId);
    }


    const inputHandler = (event) => {
        setErrors({})
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const readValue = (e) => {
        e.preventDefault();
        console.log('Handle submit function called');
        const validationErrors = validateForm(inputField);
        console.log(validationErrors)
        if (Object.keys(validationErrors).length === 0) {
            let axiosConfig3 = {
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    "token": sessionStorage.getItem("admtoken"),
                    "key": sessionStorage.getItem("admkey")
                }
            }
            console.log(axiosConfig3)
            let data = {
                batchId: inputField.batchId,
                sessionName: inputField.sessionName,
                date: inputField.date,
                time: inputField.time,
                type: inputField.type,
                remarks: inputField.remarks,
                venueORlink: inputField.venueORlink,
                trainerId: inputField.trainerId
            }
            console.log(data)
            axios.post(apiUrl, data, axiosConfig3).then((response) => {
                if (response.data.status === 'success') {
                    alert('Session Added Successfully !!');
                    setInputField({
                        collegeId: '',
                        batchId: '',
                        sessionName: '',
                        date: '',
                        time: '',
                        type: '',
                        remarks: '',
                        venueORlink: '',
                        trainerId: ''
                    })
                } else {
                    if (response.data.status === "Validation failed" && response.data.data.batchId) {
                        alert(response.data.data.batchId)
                    } else {
                        if (response.data.status === "Validation failed" && response.data.data.sessionName) {
                            alert(response.data.data.sessionName)
                        } else {
                            if (response.data.status === "Validation failed" && response.data.data.date) {
                                alert(response.data.data.date)
                            } else {
                                if (response.data.status === "Validation failed" && response.data.data.time) {
                                    alert(response.data.data.time)
                                } else {
                                    if (response.data.status === "Validation failed" && response.data.data.type) {
                                        alert(response.data.data.type)
                                    } else {
                                        if (response.data.status === "Validation failed" && response.data.data.remarks) {
                                            alert(response.data.data.remarks)
                                        } else {
                                            if (response.data.status === "Validation failed" && response.data.data.venueORlink) {
                                                alert(response.data.data.venueORlink)
                                            } else {
                                                if (response.data.status === "Validation failed" && response.data.data.trainerId) {
                                                    alert(response.data.data.trainerId)
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
                }
            }
            )
        } else {
            setErrors(validationErrors);
        }
    }

    const validateForm = (data) => {
        let errors = {};

        if (!data.batchId.trim()) {
            errors.batchId = 'Batch Id is required';
        }
        if (!data.collegeId.trim()) {
            errors.collegeId = 'College Id is required';
        }
        if (!data.sessionName.trim()) {
            errors.sessionName = 'Session name is required';
        }
        if (!data.remarks.trim()) {
            errors.remarks = 'Remarks is required';
        }
        if (!data.date.trim()) {
            errors.date = 'Date is required';
        }
        if (!data.type.trim()) {
            errors.type = 'Type is required';
        }
        if (!data.venueORlink.trim()) {
            errors.venueORlink = 'Venue or Link is required';
        }
        if (!data.trainerId.trim()) {
            errors.trainerId = 'Trainer Id is required';
        }
        if (!data.time.trim()) {
            errors.time = 'Time is required';
        }

        return errors;
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getTrainer()
    }, [])


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
                                            <a href="#!">
                                                <img
                                                    src="https://www.linkurcodes.com/images/logo.png"
                                                    alt=""
                                                    width="175"
                                                    height="57"
                                                />
                                            </a>
                                            <br />
                                            <br />
                                            <h3>Admin Add Session</h3>
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
                                            onChange={handleCollegeChange}
                                            id="collegeId"
                                            className="form-control">
                                            <option value="">Select</option>
                                            {outputField.map((value) => {
                                                return <option value={value.id}> {value.collegeName} </option>
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
                                        <select
                                            name="batchId"
                                            id="batchId"
                                            className="form-control"
                                            value={inputField.batchId}
                                            onChange={inputHandler}>
                                            <option value="">Select</option>
                                            {batches.data && batches.data.map((value) => {
                                                return <option value={value.id}> {value.batchName} </option>;
                                            })}
                                        </select>
                                        {errors.batchId && (<span style={{ color: 'red' }} className="error">{errors.batchId}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="sessionName" className="form-label">
                                            Session Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="sessionName"
                                            id="sessionName"
                                            value={inputField.sessionName}
                                            onChange={inputHandler}
                                        />
                                        {errors.sessionName && (<span style={{ color: 'red' }} className="error">{errors.sessionName}</span>)}
                                    </div>

                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="date" className="form-label">
                                            Date <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="date"
                                            id="date"
                                            value={inputField.date}
                                            onChange={inputHandler}
                                        />
                                        {errors.date && (<span style={{ color: 'red' }} className="error">{errors.date}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="time" className="form-label">
                                            Time<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            name="time"
                                            id="time"
                                            value={inputField.time}
                                            onChange={inputHandler}
                                        />
                                        {errors.time && (<span style={{ color: 'red' }} className="error">{errors.time}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="type" className="form-label">
                                            Type <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="type"
                                            id="type"
                                            value={inputField.type}
                                            onChange={inputHandler}
                                        />
                                        {errors.type && (<span style={{ color: 'red' }} className="error">{errors.type}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="venueORlink" className="form-label">
                                            Venue or Link <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="venueORlink"
                                            id="venueORlink"
                                            value={inputField.venueORlink}
                                            onChange={inputHandler}
                                        />
                                        {errors.venueORlink && (<span style={{ color: 'red' }} className="error">{errors.venueORlink}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <label htmlFor="trainerId" className="form-label">
                                            Trainer <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            name="trainerId"
                                            value={inputField.trainerId}
                                            onChange={inputHandler}
                                            id="trainerId"
                                            className="form-control"
                                        >
                                            <option value="">Select</option>
                                            {trainers.map((trainer) => (
                                                <option key={trainer.id} value={trainer.id}>
                                                    {trainer.trainerName}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.trainerId && (<span style={{ color: 'red' }} className="error">{errors.trainerId}</span>)}
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="remarks" className="form-label">
                                            Remarks
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="remarks"
                                            id="remarks"
                                            rows="3"
                                            value={inputField.remarks}
                                            onChange={inputHandler}
                                        ></textarea>
                                        {errors.remarks && (<span style={{ color: 'red' }} className="error">{errors.remarks}</span>)}
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
    );
}

export default AdminAddSession