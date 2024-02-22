import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../../config/config';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';
import { useNavigate } from 'react-router-dom';

const AdminSearchCollegeStaff = () => {
    const [inputField, setInputField] = useState({
        searchQuery: ""
    });

    const [collegeStaff, setCollegeStaff] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1);
    const [staffPerPage] = useState(1); // Number of staff per page

    const [searchPerformed, setSearchPerformed] = useState(false); // Added state to track search

    const [key, setKey] = useState('');

    const searchApiLink = global.config.urls.api.server + "/api/lms/searchCollegeStaff";
    const deleteApiLink = global.config.urls.api.server + "/api/lms/deletecolgstaff";

    const inputHandler = (event) => {
        setInputField({ searchQuery: event.target.value });
    };

    const searchCollegeStaff = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        setIsLoading(true);

        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };

        axios.post(searchApiLink, { searchQuery: inputField.searchQuery }, axiosConfig)
            .then(response => {
                setCollegeStaff(response.data.data);
                setIsLoading(false);
                setCurrentPage(1); // Reset to the first page after the search
                setSearchPerformed(true); // Set searchPerformed to true
            })
            .catch(() => setIsLoading(false));
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

    const updateClick = (id) => {
        let data = id;
        sessionStorage.setItem("clgStaffId", data);
        navigate("/adminupdatecollegestaff");
    };

    // Logic for displaying current staff
    const indexOfLastStaff = currentPage * staffPerPage;
    const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
    const currentStaff = collegeStaff ? collegeStaff.slice(indexOfFirstStaff, indexOfLastStaff) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Total pages
    const pageNumbers = [];
    if (collegeStaff && collegeStaff.length > 0) {
        collegeStaff.forEach((staff, index) => {
            const pageNumber = index + 1;
            pageNumbers.push(pageNumber);
        });
    }

    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);
    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
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
                {searchPerformed && !isLoading && collegeStaff && collegeStaff.length > 0 && (
                    <div>
                        <strong>College Staff Details</strong>
                        <br /><br />
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Phone Number</th>
                                        <th scope="col" className="px-6 py-3">Department</th>
                                        <th scope="col" className="px-6 py-3">College Name</th>
                                        <th scope="col" className="px-6 py-3"></th>
                                        {key === "lmsapp" && (
                                            <th scope="col" className="px-6 py-3"></th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentStaff.map((staff, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">{staff.collegeStaffName}</td>
                                            <td className="px-6 py-4">{staff.email}</td>
                                            <td className="px-6 py-4">{staff.phNo}</td>
                                            <td className="px-6 py-4">{staff.department}</td>
                                            <td className="px-6 py-4">{staff.collegeName}</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <button className="btn btn-primary mt-3" onClick={() => updateClick(staff.id)}>Update</button>
                                            </td>
                                            {key === "lmsapp" && (
                                                <td className="p-4 whitespace-nowrap">
                                                    <button className="btn btn-danger mt-3" onClick={() => deleteStaff(staff.id)}>Delete</button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center mt-8">
                            <nav>
                                <ul className="flex list-style-none">
                                    {currentPage > 1 && (
                                        <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">Previous</li>
                                    )}
                                    {Array.from({ length: Math.ceil(collegeStaff.length / staffPerPage) }, (_, i) => (
                                        <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>{i + 1}</li>
                                    ))}
                                    {currentPage < Math.ceil(collegeStaff.length / staffPerPage) && (
                                        <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">Next</li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
                {searchPerformed && !isLoading && collegeStaff && collegeStaff.length === 0 && (
                    <div className="col-12 text-center">No College Staff Found!</div>
                )}
                {isLoading && (
                    <div className="col-12 text-center">Loading...</div>
                )}
            </div>
        </div>
    );
};

export default AdminSearchCollegeStaff;
