import React, { useEffect, useState } from 'react';
import '../../config/config';
import axios from 'axios';
import StudNavBar from './StudNavBar';
import { useNavigate } from 'react-router-dom';

const StudentBatchInCharge = () => {
    const [staffData, setStaffData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + '/api/lms/viewCollegeStaffofStudent';

    const getData = () => {
        let data = { studId: sessionStorage.getItem('studentId') };
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                token: sessionStorage.getItem('studLoginToken'),
                key: sessionStorage.getItem('studentkey'),
            },
        };
        axios.post(apiUrl, data, axiosConfig).then((response) => {
            if (response.data.data) {
                setLoading(false)
                setStaffData(response.data.data);
            } else {
                if (response.data.status === "Invalid or expired token.") {
                    navigate("/studentLogin")
                    sessionStorage.clear()
                } else {
                    setLoading(false)
                    alert(response.data.status)
                }
            }
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <StudNavBar />
            <br />
            <strong>View Batch-In Charge Details</strong>
            {loading ? <div>Loading...</div> : <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card" style={{ width: '18rem' }}>
                    <img src={staffData.profilePic} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p className="card-text"><b>Name: </b>{staffData.collegeStaffName}</p>
                        <p className="card-text"><b>Department:</b> {staffData.department}</p>
                        <p className="card-text"><b>Phone: </b>{staffData.phNo}</p>
                        <p className="card-text"><b>Email: </b>{staffData.email}</p>

                    </div>
                </div>
            </div>}
        </div>


    );
};

export default StudentBatchInCharge;
