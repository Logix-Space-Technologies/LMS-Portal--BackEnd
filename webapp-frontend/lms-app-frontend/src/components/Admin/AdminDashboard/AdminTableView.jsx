import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../../config/config'

const AdminTableView = () => {
    const [batchData, setBatchData] = useState([]);
    const [studData, setStudData] = useState([]);
    const [taskData, setTaskData] = useState([]);
    const apiUrl = global.config.urls.api.server + "/api/lms/adminDashboard"

    const getData = () => {
        let token = { "token": sessionStorage.getItem("ustoken") };
        axios.post(apiUrl, token).then(
            (Response) => {
                setBatchData(Response.data.data.collegeBatches);
                setStudData(Response.data.data.collegeStudentStatistics);
                setTaskData(Response.data.data.collegeTaskStatistics);
            }
        );
    };

    useEffect(() => { getData(); }, []);

    return (
        <div>
            <div className="container-fluid pt-4 px-4">
                <div className="bg-light text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">Batch Details</h6>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr className="text-dark">
                                    <th scope="col">College</th>
                                    <th scope="col">Batches</th>
                                </tr>
                            </thead>
                            <tbody>
                                {batchData.map(
                                    (value, index) => (
                                        <tr key={index}>
                                            <td>{value.collegeName}</td>
                                            <td>{value.numberOfBatches}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="container-fluid pt-4 px-4">
                <div className="bg-light text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">Student Details</h6>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr className="text-dark">
                                    <th scope="col">College</th>
                                    <th scope="col">No. Of Students</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studData.map(
                                    (value, index) => (
                                        <tr key={index}>
                                            <td>{value.collegeName}</td>
                                            <td>{value.noofstudents}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="container-fluid pt-4 px-4">
                <div className="bg-light text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">Task Completion Details</h6>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr className="text-dark">
                                    <th scope="col">College</th>
                                    <th scope="col">No. Of Students</th>
                                    <th scope="col">No. Of Tasks</th>
                                    <th scope="col">Completion Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taskData.map(
                                    (value, index) => {
                                        return <tr>
                                            <td>{value.collegeName}</td>
                                            <td>{value.noofstudents}</td>
                                            <td>{value.nooftasks}</td>
                                            <td>{value.percentageofcompletion}%</td>
                                        </tr>
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTableView;
