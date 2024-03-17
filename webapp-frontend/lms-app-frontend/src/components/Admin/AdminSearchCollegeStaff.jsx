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
    const [staffPerPage] = useState(10); // Number of staff per page
    const [searchPerformed, setSearchPerformed] = useState(false); // Added state to track search
    const [key, setKey] = useState('');
    const [deleteCollegeStaff, setDeleteCollegeStaff] = useState(null)

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

        axios.post(searchApiLink, { searchQuery: inputField.searchQuery }, axiosConfig).then(response => {
            setCollegeStaff(response.data.data);
            setIsLoading(false);
            setInputField(
                {
                    searchQuery: ""
                }
            )
            setCurrentPage(1); // Reset to the first page after the search
            setSearchPerformed(true); // Set searchPerformed to true
        })
    };

    const deleteStaff = () => {
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };

        axios.post(deleteApiLink, { id: deleteCollegeStaff }, axiosConfig).then((response) => {
            if (response.data.status === "Deleted successfully") {
                // Remove the deleted Trainer from updateField state
                setCollegeStaff(collegeStaff.filter(clgstaff => clgstaff.id !== deleteCollegeStaff))
            } else if (response.data.status === "Unauthorized User!!") {
                navigate("/")
                sessionStorage.clear()
            } else {
                alert(response.data.status);
            }
        })
};


const updateClick = (id) => {
    let data = id;
    sessionStorage.setItem("clgStaffId", data);
    navigate("/adminupdatecollegestaff");
};

const readValue = (id) => {
    setDeleteCollegeStaff(id)
};

// Logic for displaying current staff
const indexOfLastStaff = currentPage * staffPerPage;
const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
const currentStaff = collegeStaff ? collegeStaff.slice(indexOfFirstStaff, indexOfLastStaff) : [];

// Change page
const paginate = pageNumber => setCurrentPage(pageNumber);

const calculateSerialNumber = (index) => {
    return ((currentPage - 1) * staffPerPage) + index + 1;
}

// Total pages
let totalPages = []
if (collegeStaff && collegeStaff.length > 0) {
    totalPages = Math.ceil(collegeStaff.length / staffPerPage);
}

// Integration of new pagination logic
const startPage = currentPage > 2 ? currentPage - 2 : 1;
const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;

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
                                    <th scope="col" className="px-6 py-3">S.No.</th>
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
                                {currentStaff.length > 0 && currentStaff.map((staff, index) => {
                                    return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">{calculateSerialNumber(index)}</td>
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

                                                <button className="btn btn-danger mt-3" onClick={() => { readValue(staff.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>

                                            </td>
                                        )}
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to delete this college staff?</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>This action cannot be undone.</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No, cancel</button>
                                        <button onClick={() => { deleteStaff() }} type="button" className="btn btn-danger" data-bs-dismiss="modal">Yes, I'm sure</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{indexOfFirstStaff + 1}</span> to <span className="font-medium">{indexOfLastStaff > collegeStaff.length ? collegeStaff.length : indexOfLastStaff}</span> of <span className="font-medium">{collegeStaff.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <button onClick={() => currentPage > 1 && paginate(currentPage - 1)} className={`relative inline-flex items-center px-2 py-2 text-sm font-medium ${currentPage === 1 ? 'cursor-not-allowed text-gray-500' : 'text-gray-700 hover:bg-gray-50'} disabled:opacity-50`} disabled={currentPage === 1}>
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {/* Dynamically generate Link components for each page number */}
                                    {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                                        <button key={startPage + index} onClick={() => paginate(startPage + index)} className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === startPage + index ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                                            {startPage + index}
                                        </button>
                                    ))}
                                    <button onClick={() => currentPage < totalPages && paginate(currentPage + 1)} className={`relative inline-flex items-center px-2 py-2 text-sm font-medium ${currentPage === totalPages ? 'cursor-not-allowed text-gray-500' : 'text-gray-700 hover:bg-gray-50'} disabled:opacity-50`} disabled={currentPage === totalPages}>
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isLoading && (
                <div className="col-12 text-center">Loading...</div>
            )}
            {searchPerformed && !isLoading && currentStaff && currentStaff.length === 0 && (
                <div className="col-12 text-center">No College Staff Found!</div>
            )}
        </div>
    </div>
)
}


export default AdminSearchCollegeStaff;
