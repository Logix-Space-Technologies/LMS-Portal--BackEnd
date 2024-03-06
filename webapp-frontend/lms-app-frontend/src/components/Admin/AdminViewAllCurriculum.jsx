import React, { useEffect, useState } from 'react';
import '../../config/config';
import Navbar from './Navbar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';

const AdminViewAllCurriculum = () => {
    const [curriculumData, setCurriculumData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [curriculumPerPage] = useState(10); // Number of students per page
    const [deleteCurriculumId, setDeleteCurriculumId] = useState(null);
    const [showModal, setShowModal] = useState(false);


    const navigate = useNavigate();
    const [key, setKey] = useState('');

    const apiUrl = global.config.urls.api.server + "/api/lms/curriculumview";
    const apiLink2 = global.config.urls.api.server + "/api/lms/deletecurriculum";

    const getData = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let data2 = { "batchId": sessionStorage.getItem("currbatchId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        }
        axios.post(apiUrl, data2, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setCurriculumData(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/")
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    const handleClick = (id) => {
        setDeleteCurriculumId(id);
        setShowModal(true);
    }

    const handleConfirmDelete = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let data = { "id": deleteCurriculumId }
        let axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        }

        axios.post(apiLink2, data, axiosConfig2).then(
            (response) => {
                if (response.data.status === "success") {
                    alert("Curriculum deleted!!");
                    getData();
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/")
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status);
                    }
                }
            }
        );

        setShowModal(false);
    }

    const UpdateClick = (id) => {
        let data = id;
        sessionStorage.setItem("curriculumId", data);
        navigate("/AdminUpdateCurriculum");
    }

    // Logic for displaying current students
    const indexOfLastCurriculum = currentPage * curriculumPerPage;
    const indexOfFirstCurriculum = indexOfLastCurriculum - curriculumPerPage;
    const currentCurriculum = curriculumData ? curriculumData.slice(indexOfFirstCurriculum, indexOfLastCurriculum) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Total pages
    let totalPages = []
    if (curriculumData && curriculumData.length > 0) {
        totalPages = Math.ceil(curriculumData.length / curriculumPerPage);
    }

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * curriculumPerPage) + index + 1;
    }

    // Integration of new pagination logic
    const startPage = currentPage > 2 ? currentPage - 2 : 1;
    const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;

    useEffect(() => { getData() }, [])

    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);

    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />} <br />
            <div className="flex justify-between items-center mx-4 my-4">
                <button onClick={() => navigate(-1)} className="btn bg-gray-500 text-white px-4 py-2 rounded-md">Back</button>
                <strong>View All Curriculum</strong>
                <div></div>
            </div>
            <br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">S/L</th>
                            <th scope="col" className="px-6 py-3">Batch Name</th>
                            <th scope="col" className="px-6 py-3">Curriculum Title</th>
                            <th scope="col" className="px-6 py-3">Curriculum Description</th>
                            <th scope="col" className="px-6 py-3">Added Date</th>
                            <th scope="col" className="px-6 py-3">Added By</th>
                            <th scope="col" className="px-6 py-3">Updated By</th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCurriculum && currentCurriculum.length > 0 ? (
                            currentCurriculum.map((value, index) => {
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">{calculateSerialNumber(index)}</td>
                                        <td className="px-6 py-4">{value.batchName}</td>
                                        <td className="px-6 py-4">{value.curriculumTitle}</td>
                                        <td className="px-6 py-4">{value.curriculumDesc}</td>
                                        <td className="px-6 py-4">{value.addedDate}</td>
                                        <td className="px-6 py-4">{value.addedBy}</td>
                                        {value.updatedBy !== null && (
                                            <td className="px-6 py-4">{value.updatedBy}</td>
                                        )}
                                        {value.updatedBy === null && (
                                            <td className="px-6 py-4">NIL</td>
                                        )}
                                        <td className="px-6 py-4">
                                            <Link target="_blank" to={value.curriculumFileLink} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View Curriculum</Link>
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            {key === "lmsapp" && (
                                                <button onClick={() => handleClick(value.id)} className="btn btn-danger">Delete</button>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a onClick={() => { UpdateClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update Curriculum</a>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td colSpan="11" className="px-6 py-4 text-center">No Curriculum Found !!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to delete this curriculum?</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>This action cannot be undone.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>No, cancel</button>
                                <button onClick={() => { handleConfirmDelete() }} type="button" className="btn btn-danger" data-bs-dismiss="modal">Yes, I'm sure</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{indexOfFirstCurriculum + 1}</span> to <span className="font-medium">{indexOfLastCurriculum > curriculumData.length ? curriculumData.length : indexOfLastCurriculum}</span> of <span className="font-medium">{curriculumData.length}</span> results
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
    );
}

export default AdminViewAllCurriculum;
