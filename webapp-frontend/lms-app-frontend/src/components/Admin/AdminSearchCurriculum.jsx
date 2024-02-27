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
                setUpdateField(response.data.data);
                setIsLoading(false);
                setInputField({
                    "CurriculumSearchQuery": ""
                });
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
                    alert("Curriculum deleted!!");
                    // Reload the page after clicking OK in the alert
                    window.location.reload();
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

    // Total pages
    const pageNumbers = [];
    if (updateField && updateField.length > 0) {
        updateField.forEach((curriculum, index) => {
            const pageNumber = index + 1;
            pageNumbers.push(pageNumber);
        });
    }

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
            ) : (updateField ? (
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
                                            {index + 1}
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
                                                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal" onClick={() => handleClick(value.id)}>
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
            ) : (
                <div className="col-12 text-center">No Curriculum Found!!</div>
            ))}
            <div className="flex justify-center mt-8">
                <nav>
                    <ul className="flex list-style-none">
                        {currentPage > 1 && (
                            <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                Previous
                            </li>
                        )}
                        {pageNumbers.map(number => (
                            <li key={number} onClick={() => paginate(number)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                {number}
                            </li>
                        ))}
                        {currentPage < pageNumbers.length && (
                            <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                Next
                            </li>
                        )}
                    </ul>
                </nav>
            </div>

            {/* Delete Confirmation Modal */}
            <div className="modal fade" id="deleteConfirmationModal" tabIndex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
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
