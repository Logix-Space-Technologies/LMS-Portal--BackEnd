import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../../config/config';
import axios from 'axios';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';

const AdminSendNotification = () => {
    const initialNotificationData = {
        "collegeId": "",
        "batchId": "",
        "message": "",
        "sendby": "",
        "title": ""
    };

    const [notificationData, setNotificationData] = useState(initialNotificationData);
    const [outputField, setOutputField] = useState([])
    const [batches, setBatches] = useState([])
    const [key, setKey] = useState('');

    const apiUrl2 = global.config.urls.api.server + "/api/lms/viewallcolleges";
    const batchUrl = global.config.urls.api.server + "/api/lms/adminviewbatch";
    const apiUrl = global.config.urls.api.server + "/api/lms/sendNotification";

    const handleChange = (event) => {
        setNotificationData({ ...notificationData, [event.target.name]: event.target.value });
    };

    const getData = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": token,
                "key": currentKey
            }
        };
        axios.post(apiUrl2, {}, axiosConfig2).then(
            (response) => {
                setOutputField(response.data.data)
                console.log(response.data.data)
            }
        )
    }

    const getBatches = (collegeId) => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let axiosConfig3 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": token,
                "key": currentKey
            }
        };
        console.log(collegeId)
        axios.post(batchUrl, { collegeId }, axiosConfig3).then((response) => {
            setBatches(response.data)
            console.log(response.data)
        })
    }

    const handleCollegeChange = (event) => {
        const selectedCollegeId = event.target.value;
        setNotificationData(prevState => ({ ...prevState, collegeId: selectedCollegeId }))
        getBatches(selectedCollegeId);
    }

    const handleSubmit = async (event) => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        let sendby;
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        if (currentKey === 'lmsapp') {
            sendby = 0
        } else {
            sendby = sessionStorage.getItem("admstaffId")
        }
        event.preventDefault();
        const axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };
        let data = {
            "batchId": notificationData.batchId,
            "message": notificationData.message,
            "sendby": sendby,
            "title": notificationData.title
        }

        try {
            const response = await axios.post(apiUrl, data, axiosConfig);
            if (response.data.status === 'Success') {
                alert(response.data.message)
                // Reset the text fields to their initial empty state
                setNotificationData(initialNotificationData);
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            alert(error.message)
        }
    };

    // Inline styles
    const styles = {
        container: {
            textAlign: 'center',
            margin: '20px',
        },
        card: {
            border: '1px solid #ddd',
            borderRadius: '5px',
            padding: '20px',
            maxWidth: '400px',
            margin: '0 auto',
        },
        input: {
            margin: '5px 0',
            padding: '10px',
            width: '100%',
            borderRadius: '5px',
            border: '1px solid #ddd'
        },
        textarea: {
            margin: '5px 0',
            padding: '10px',
            width: '100%',
            height: '100px',
            borderRadius: '5px',
            border: '1px solid #ddd'
        },
        label: {
            display: 'block',
            margin: '10px 0 5px 0',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
            width: '100%',
        },
        errorMessage: {
            color: 'red',
            margin: '10px 0',
        },
        successMessage: {
            color: 'green',
            margin: '10px 0',
        }
    };

    useEffect(() => { getData() }, [])

    useEffect(() => { setKey(sessionStorage.getItem("admkey") || '') }, []);

    return (
        <div style={styles.container}>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
            <br />
            <h2>Send Notification</h2>
            <br />
            <div style={styles.card}>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <label htmlFor="collegeId" className="form-label">
                        College Name <span className="text-danger">*</span>
                    </label>
                    <select
                        name="collegeId"
                        value={notificationData.collegeId}
                        onChange={handleCollegeChange}
                        id="collegeId"
                        className="form-control">
                        <option value="">Select</option>
                        {outputField.map((value) => {
                            return <option value={value.id}> {value.collegeName} </option>
                        })}
                    </select>
                </div>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <label htmlFor="batchName" className="form-label">
                        Batch Name <span className="text-danger">*</span>
                    </label>
                    <select
                        name="batchId"
                        id="batchId"
                        className="form-control"
                        value={notificationData.batchId}
                        onChange={handleChange}>
                        <option value="">Select</option>
                        {batches.data && batches.data.map((value) => {
                            return <option value={value.id}> {value.batchName} </option>;
                        })}
                    </select>
                </div>
                <div>
                    <label style={styles.label}>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={notificationData.title}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div>
                    <label style={styles.label}>Message:</label>
                    <textarea
                        name="message"
                        value={notificationData.message}
                        onChange={handleChange}
                        style={styles.textarea}
                    />
                </div>
                <button type="submit" onClick={handleSubmit} style={styles.button}>Send Notification</button>
            </div>
        </div>
    );
};

export default AdminSendNotification;
