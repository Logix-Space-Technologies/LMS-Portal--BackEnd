import axios from 'axios';
import React, { useState } from 'react';
import Navbar from './Navbar';
import '../../config/config';

const AdminSearchSessionDetails = () => {
    const [inputField, setInputField] = useState({ "SessionSearchQuery": "" });
    const [updateField, setUpdateField] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Assign the API links as searchApiLink and deleteApiLink
    const searchApiLink = global.config.urls.api.server + "/api/lms/searchSession";
    const deleteApiLink = global.config.urls.api.server + "/api/lms/deleteSessions";

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        setIsLoading(true)
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };

        axios.post(searchApiLink, inputField, axiosConfig).then((response) => {
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

        axios.post(deleteApiLink, { id: sessionId }, axiosConfig)
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
                            <div className="col col-12 text-center">
                                <h1>Search Session</h1>
                            </div>
                            <div className="col col-md-6 mx-auto"> {/* Center-align the search bar */}
                                <div className="input-group mb-3"> {/* Use an input group */}
                                    <input onChange={inputHandler} type="text" className="form-control" name="SessionSearchQuery" value={inputField.SessionSearchQuery} />
                                    <button onClick={readValue} className="btn btn-warning ms-2">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-3 mt-3">
                    {isLoading ? (
                        <div className="col-12 text-center"><p>Loading...</p></div>
                    ) : (
                        updateField ? (
                            updateField.map((value, index) => (
                                <div key={index} className="col-md-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{value.sessionName}</h5>
                                            <p className="card-text">ID: {value.id}</p>
                                            <p className="card-text">Date: {value.date}</p>
                                            <p className="card-text">Time: {value.time}</p>
                                            <p className="card-text">Type: {value.type}</p>
                                            <p className="card-text">Remarks: {value.remarks}</p>
                                            <p className="card-text">Venue/Link: {value.venueORlink}</p>
                                            <p className="card-text">Trainer ID: {value.trainerId}</p>
                                            <p className="card-text">Attendance Code: {value.attendenceCode}</p>
                                            <p className="card-text">Added Date: {value.addedDate}</p>
                                            <p className="card-text">Updated Date: {value.updatedDate}</p>
                                            <button onClick={() => deleteSession(value.id)} className="btn btn-danger mt-3">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">No Sessions Found!</div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSearchSessionDetails;
