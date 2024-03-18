import axios from 'axios'
import '../../config/config'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar'

const AdminSearchCurriculum = () => {

    const navigate = new useNavigate()

    const [inputField, setInputField] = useState(
        {
            "CurriculumSearchQuery": ""
        }
    )

    const [updateField, setUpdateField] = useState([])

    const [key, setKey] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const [searchExecuted, setSearchExecuted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [curriculumPerPage] = useState(10); // Number of curriculum per page
    const [deleteId, setDeleteId] = useState(null);

    const apiLink = global.config.urls.api.server + "/api/lms/searchCurriculum";
    const apiLink2 = global.config.urls.api.server + "/api/lms/deletecurriculum";

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        setIsLoading(true);
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };

        axios.post(apiLink, inputField, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setUpdateField(response.data.data);
                    setIsLoading(false);
                    setSearchExecuted(true);
                    setInputField({
                        "CurriculumSearchQuery": ""
                    });
                } else if (response.data.status === "Unauthorized User!!") {
                    { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                    sessionStorage.clear()
                } else if (!response.data.data) {
                    setUpdateField([]);
                    setIsLoading(false);
                    setSearchExecuted(true);
                    setInputField({
                        "CurriculumSearchQuery": ""
                    });
                } else {
                    alert(response.data.status)
                }
            }
        );
    };

    const handleClick = (id) => {
        setDeleteId(id);
    };

    const handleDeleteClick = () => {
        let data = { "id": deleteId };
        let axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };

        axios.post(apiLink2, data, axiosConfig2).then(
            (response) => {
                if (response.data.status === "success") {
                    // Remove the deleted curriculum from updateField state
                    setUpdateField(updateField.filter(curriculum => curriculum.id !== deleteId))
                } else if (response.data.status === "Unauthorized User!!") {
                    navigate("/")
                    sessionStorage.clear()
                } else {
                    alert(response.data.status);
                }
            }
        );
    };

    // Logic for displaying current curriculum
    const indexOfLastCurriculum = currentPage * curriculumPerPage;
    const indexOfFirstCurriculum = indexOfLastCurriculum - curriculumPerPage;
    const currentCurriculum = updateField ? updateField.slice(indexOfFirstCurriculum, indexOfLastCurriculum) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * curriculumPerPage) + index + 1;
    }

    let totalPages = []
    if (updateField && updateField.length > 0) {
        totalPages = Math.ceil(updateField.length / curriculumPerPage);
    }

    // Integration of new pagination logic
    const startPage = currentPage > 2 ? currentPage - 2 : 1;
    const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;

    const UpdateClick = (id) => {
        sessionStorage.setItem("curriculumId", id);
        navigate("/AdminUpdateCurriculum");
    };

    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);

    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}<br />
            <strong style={{ paddingLeft: '30px' }}>Search Curriculum</strong>

            <div className="flex justify-between items-center mx-4 my-4">
                <div className="container">
                    <div className="row g-3">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <label htmlFor="" className="form-label"></label>
                            <input onChange={inputHandler} type="text" className="form-control" name="CurriculumSearchQuery" value={inputField.CurriculumSearchQuery} placeholder='Search By Title/Description/Batch Name/College Name' />
                        </div>
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <button onClick={readValue} className="btn btn-warning">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
            {isLoading ? (
                <div className="col-12 text-center">
                    <p></p>
                </div>
            ) : (searchExecuted && updateField.length > 0 ? (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    S/N
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Batch Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Curriculum Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Curriculum Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Added By
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    File Link
                                </th>
                                {key === "lmsapp" && (
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                )}
                                <th scope="col" className="px-6 py-3">

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCurriculum.map(
                                (value, index) => {
                                    return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">
                                            {calculateSerialNumber(index)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.batchName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.curriculumTitle}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.curriculumDesc}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.addedBy}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link target="_blank" to={value.curriculumFileLink} className="font-medium text-blue-600 dark:text-blue-500">View Curriculum</Link>
                                        </td>
                                        {key === "lmsapp" && (
                                            <td className="p-4 whitespace-nowrap">
                                                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal3" onClick={() => handleClick(value.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        )}
                                        <td className="px-6 py-4">
                                            <button onClick={() => { UpdateClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500">Update Curriculum</button>
                                        </td>
                                    </tr>
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (searchExecuted && updateField.length === 0 ? (
                <div className="container">
                    <div className="row g-3">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <div className="alert alert-info" role="alert">
                                No Curriculum found.
                            </div>
                        </div>
                    </div>
                </div>
            ) : null))}
            {currentCurriculum.length > 0 && (
                <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstCurriculum + 1}</span> to <span className="font-medium">{indexOfLastCurriculum > updateField.length ? updateField.length : indexOfLastCurriculum}</span> of <span className="font-medium">{updateField.length}</span> results
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
            )}

            {/* Delete Confirmation Modal */}
            <div className="modal fade" id="deleteConfirmationModal3" tabIndex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteConfirmationModalLabel">Delete Confirmation</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this curriculum?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeleteClick}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AdminSearchCurriculum;
