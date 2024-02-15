import axios from 'axios';
import React, { useState } from 'react';
import Navbar from './Navbar';
import '../../config/config';

const AdminSearchCollegeStaff = () => {
    const [inputField, setInputField] = useState({
        searchQuery: ""
    });

    const [collegeStaff, setCollegeStaff] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 

    const searchApiLink = global.config.urls.api.server + "/api/lms/searchCollegeStaff";
    const deleteApiLink = global.config.urls.api.server + "/api/lms/deletecolgstaff";

    const inputHandler = (event) => {
        setInputField({ searchQuery: event.target.value });
    };

    const searchCollegeStaff = () => {
        setIsLoading(true); // Set isLoading to true when searching

        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };

        axios.post(searchApiLink, { searchQuery: inputField.searchQuery }, axiosConfig)
            .then(response => {
                setCollegeStaff(response.data.data);
                setIsLoading(false); // Set isLoading to false after the search is performed
            })
            .catch(() => setIsLoading(false)); // Set isLoading to false in case of an error
    };

    const deleteStaff = (id) => {
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
            }
        };

        axios.post(deleteApiLink, { id }, axiosConfig)
            .then(() => {
                setCollegeStaff(collegeStaff.filter(staff => staff.id !== id));
            })
            .catch(error => {
                console.error("Error deleting staff", error);
            });
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 text-center">
                        <h1>Search College Staff</h1>
                        <div className="d-flex justify-content-center align-items-center">
                            <input onChange={inputHandler} type="text" className="form-control" name="searchQuery" value={inputField.searchQuery} />
                            <button onClick={searchCollegeStaff} className="btn btn-warning ms-2">Search</button>
                        </div>
                    </div>
                </div>
                <br />
                {isLoading ? (
                    <div className="col-12 text-center">Loading...</div>
                ) : (
                    collegeStaff ? (
                        <div className="row">
                            {collegeStaff.map((staff, index) => (
                                <div key={index} className="col-md-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{staff.collegeStaffName}</h5>
                                            <p className="card-text">{staff.email}</p>
                                            <p className="card-text">{staff.phNo}</p>
                                            <p className="card-text">{staff.department}</p>
                                            <p className="card-text">{staff.collegeName}</p>
                                            <button className="btn btn-danger mt-3" onClick={() => deleteStaff(staff.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="col-12 text-center">No College Staff Found!</div>
                    )
                )}
            </div>
        </div>
    );
};

export default AdminSearchCollegeStaff;
