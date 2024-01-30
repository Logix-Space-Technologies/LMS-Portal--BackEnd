import React, { useEffect, useState } from 'react';
import '../../config/config';
import axios from 'axios';
import StudNavBar from './StudNavBar';

const StudentBatchInCharge = () => {
    const [staffData, setStaffData] = useState({});

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
            if (response.data.status === 'success') {
                setStaffData(response.data.data);
            } else {
                alert(response.data.status);
            }
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        //     <div className="d-flex justify-content-center align-items-center vh-100">
        //     <div className="card mb-3" style={{ maxWidth: 540 }}>
        //       <div className="row g-0">
        //         <div className="col-md-2">
        //           <img src={staffData.profilePic} alt="..." />
        //         </div>
        //         <div className="col-md-10">
        //           <div className="card-body">
        //             <p className="card-title">Name: {staffData.collegeStaffName}</p>
        //             <p className="card-text">Department: {staffData.department}</p>
        //             <p className="card-text">Phone: {staffData.phNo}</p>
        //             <p className="card-text">Email: {staffData.email}</p>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        <div>
            <StudNavBar />
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card" style={{ width: '18rem' }}>
                    <img src={staffData.profilePic} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h6 className="card-title"><b>College Staff Details</b></h6>
                        <p className="card-text"><b>Name: </b>{staffData.collegeStaffName}</p>
                        <p className="card-text"><b>Department:</b> {staffData.department}</p>
                        <p className="card-text"><b>Phone: </b>{staffData.phNo}</p>
                        <p className="card-text"><b>Email: </b>{staffData.email}</p>

                    </div>
                </div>
            </div>
        </div>


    );
};

export default StudentBatchInCharge;
