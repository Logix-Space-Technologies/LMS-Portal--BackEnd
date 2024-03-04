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
    const totalPages =  updateField ? Math.ceil(updateField.length / studentsPerPage): [];

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * studentsPerPage) + index + 1;
    };

    const paginate = pageNumber => setCurrentPage(pageNumber);

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
                                <div className="flex flex-col items-center">
                                    <span className="text-sm text-gray-700 dark:text-gray-400">
                                        Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstStudent + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{indexOfLastStudent > updateField.length ? updateField.length : indexOfLastStudent}</span> of <span className="font-semibold text-gray-900 dark:text-white">{updateField.length}</span> Entries
                                    </span>
                                    <div className="inline-flex mt-2 xs:mt-0">
                                        {currentPage > 1 && (
                                            <button onClick={() => paginate(currentPage - 1)} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                Prev
                                            </button>
                                        )}
                                        {currentPage < totalPages && (
                                            <button onClick={() => paginate(currentPage + 1)} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                Next
                                            </button>
                                        )}
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