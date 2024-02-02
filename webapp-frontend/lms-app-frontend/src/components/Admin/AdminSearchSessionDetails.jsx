import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../../config/config';

const AdminSearchSessionDetails = () => {
    const [inputField, setInputField] = useState({ "SessionSearchQuery": "" });
    const [updateField, setUpdateField] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const apiLink = global.config.urls.api.server + "/api/lms/searchSession";

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };

        axios.post(apiLink, inputField, axiosConfig).then((response) => {
            setUpdateField(response.data.data);
            setIsLoading(false);
            setInputField({ "SessionSearchQuery": "" });
        });
    };

    const deleteSession = (sessionId) => {
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };

        axios.post(`${global.config.urls.api.server}/api/lms/deleteSessions`, { id: sessionId }, axiosConfig)
            .then(response => {
                if (response.data.status === "success") {
                    setUpdateField(updateField.filter(session => session.id !== sessionId));
                } else {
                    console.error("Error deleting session:", response.data.status);
                }
            })
            .catch(error => {
                console.error("Error during API call:", error);
            });
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12">
                        <div className="row g-3">
                            <div className="col col-12">
                                <h1>Search Session</h1>
                            </div>
                            <div className="col col-12">
                                <input onChange={inputHandler} type="text" className="form-control" name="SessionSearchQuery" value={inputField.SessionSearchQuery} />
                            </div>
                            <div className="col col-12">
                                <button onClick={readValue} className="btn btn-warning">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <div className="col-12 text-center"><p>Loading...</p></div>
                ) : (
                    updateField && updateField.length > 0 ? (
                        <div className="row g-3">
                            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                                <header className="px-5 py-4 border-b border-gray-100">
                                    <h2 className="font-semibold text-2xl text-gray-800">Session Details</h2>
                                </header>
                                <div className="p-3">
                                    <div className="overflow-x-auto">
                                        <table className="table-auto w-full">
                                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                                <tr>
                                                    <th className="p-4 whitespace-nowrap">Id</th>
                                                    <th className="p-4 whitespace-nowrap">Batch Id</th>
                                                    <th className="p-4 whitespace-nowrap">Session Name</th>
                                                    <th className="p-4 whitespace-nowrap">Date</th>
                                                    <th className="p-4 whitespace-nowrap">Time</th>
                                                    <th className="p-4 whitespace-nowrap">Type</th>
                                                    <th className="p-4 whitespace-nowrap">Remarks</th>
                                                    <th className="p-4 whitespace-nowrap">Venue/Link</th>
                                                    <th className="p-4 whitespace-nowrap">Trainer Id</th>
                                                    <th className="p-4 whitespace-nowrap">Attendance Code</th>
                                                    <th className="p-4 whitespace-nowrap">Added Date</th>
                                                    <th className="p-4 whitespace-nowrap">Updated Date</th>
                                                    <th className="p-4 whitespace-nowrap">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm divide-y divide-gray-100">
                                                {updateField.map((value, index) => (
                                                    <tr key={index}>
                                                        <td className="p-4 whitespace-nowrap">{value.id}</td>
                                                        <td className="p-4 whitespace-nowrap">{value.batchId}</td>
                                                        <td className="p-4 whitespace-nowrap">{value.sessionName}</td>
                                                        <td className="p-4 whitespace-nowrap">{value.date}</td>
                                                        <td className="p-4 whitespace-nowrap">{value.time}</td>
                                                        <td className="p-4 whitespace-nowrap">{value.type}</td>
                                                        <td className="p-4 whitespace-nowrap">{value.remarks}</td>
                                                        <td className="p-4 whitespace-nowrap">{value.venueORlink}</td>
                                                        <td className="p-4 whitespace-nowrap">{value.trainerId}</td>
                                                        <td className="p-4 whitespace-nowrap">{value.attendenceCode}</td>
                                                        <td className="p-4 whitespace-nowrap">{value.addedDate}</td>
                                                        <td className="p-4 whitespace-nowrap">{value.updatedDate}</td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <button onClick={() => deleteSession(value.id)} className="btn btn-danger">Delete</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="col-12 text-center">No Sessions Found!</div>
                    )
                )}
            </div>
        </div>
    );
};

export default AdminSearchSessionDetails;
