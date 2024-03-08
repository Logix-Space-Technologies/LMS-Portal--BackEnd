import React, { useState } from 'react';
import '../../config/config';
import axios from 'axios';
import Navbar from './Navbar';

const AdminSearchStudent = () => {
    const [inputField, setInputField] = useState({ studentSearchQuery: '' });
    const [updateField, setUpdateField] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10);
    const [searched, setSearched] = useState(false);

    const apiLink = global.config.urls.api.server + "/api/lms/searchStudentsByAdmAndAdmstf";

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        setIsLoading(true);
        setSearched(true);
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        axios.post(apiLink, inputField, axiosConfig).then((response) => {
            setUpdateField(response.data.data);
            setIsLoading(false);
            setInputField({ "studentSearchQuery": "" });
        });
    };

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = updateField ? updateField.slice(indexOfFirstStudent, indexOfLastStudent) : [];
    

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * studentsPerPage) + index + 1;
    };

    const paginate = pageNumber => setCurrentPage(pageNumber);

    let totalPages = []
    if (updateField && updateField.length > 0) {
        totalPages = Math.ceil(updateField.length / studentsPerPage);
    }

    // Integration of new pagination logic
    const startPage = currentPage > 2 ? currentPage - 2 : 1;
    const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h5>Search Student</h5>
                        <br />
                        <input
                            onChange={inputHandler}
                            type="text"
                            className="form-control"
                            name="studentSearchQuery"
                            value={inputField.studentSearchQuery}
                            placeholder="Student Name/Phone No/Address/Aadhar No/Email"
                        />
                        <br />
                        <button onClick={readValue} className="btn btn-warning">
                            Search
                        </button>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        {searched && isLoading ? (
                            <p>Loading...</p>
                        ) : searched && !isLoading && updateField && updateField.length ? (
                            <div>
                                <br />
                                <strong>List of Students</strong>
                                <br /><br />
                                <div className="relative overflow-x shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">S/N</th>
                                                <th scope="col" className="px-6 py-3"></th>
                                                <th scope="col" className="px-6 py-3">Student Name</th>
                                                <th scope="col" className="px-6 py-3">College Name</th>
                                                <th scope="col" className="px-6 py-3">Admission No</th>
                                                <th scope="col" className="px-6 py-3">Roll No</th>
                                                <th scope="col" className="px-6 py-3">Department</th>
                                                <th scope="col" className="px-6 py-3">Course</th>
                                                <th scope="col" className="px-6 py-3">Email</th>
                                                <th scope="col" className="px-6 py-3">Phone No</th>
                                                <th scope="col" className="px-6 py-3">Aadhar No</th>
                                                <th scope="col" className="px-6 py-3">Membership No</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentStudents.map((value, index) => (
                                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-6 py-4">{calculateSerialNumber(index)}</td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                                <img
                                                                    className="rounded mx-auto d-block"
                                                                    src={value.studProfilePic}
                                                                    width="150px"
                                                                    height="140px"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">{value.studName}</td>
                                                    <td className="px-6 py-4">{value.collegeName}</td>
                                                    <td className="px-6 py-4">{value.admNo}</td>
                                                    <td className="px-6 py-4">{value.rollNo}</td>
                                                    <td className="px-6 py-4">{value.studDept}</td>
                                                    <td className="px-6 py-4">{value.course}</td>
                                                    <td className="px-6 py-4">{value.studEmail}</td>
                                                    <td className="px-6 py-4">{value.studPhNo}</td>
                                                    <td className="px-6 py-4">{value.aadharNo}</td>
                                                    <td className="px-6 py-4">{value.membership_no}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <br />
                                <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{indexOfFirstStudent + 1}</span> to <span className="font-medium">{indexOfLastStudent > updateField.length ? updateField.length : indexOfLastStudent}</span> of <span className="font-medium">{updateField.length}</span> results
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
                        ) : searched && !isLoading && (!updateField || !updateField.length>0) ? (
                            <div className="col-12 text-center">No Students Found!!</div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSearchStudent;