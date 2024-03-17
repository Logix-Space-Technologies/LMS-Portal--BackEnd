import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import '../../config/config'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar'
import { useNavigate } from 'react-router-dom'

const AdminSearchTrainer = () => {

    const [inputField, setInputField] = useState(
        {
            "TrainerSearchQuery": ""
        }
    )

    const [updateField, setUpdateField] = useState([])

    const [key, setKey] = useState('');

    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1);
    const [TrainerPerPage] = useState(10); // Number of students per page

    const [isLoading, setIsLoading] = useState(true)
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const apiUrl = global.config.urls.api.server + "/api/lms/searchTrainer"

    const apiUrl2 = global.config.urls.api.server + "/api/lms/deleteTrainer"

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        }
        axios.post(apiUrl, inputField, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setUpdateField(response.data.data)
                    setIsLoading(false)
                    setInputField(
                        {
                            "TrainerSearchQuery": ""
                        }
                    )
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear()
                    } else {
                        if (!response.data.data) {
                            setUpdateField([])
                            setIsLoading(false)
                            setInputField(
                                {
                                    "TrainerSearchQuery": ""
                                }
                            )
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            }
        )
    }

    const UpdateClick = (id) => {
        let data = id;
        sessionStorage.setItem("trainerId", data);
        navigate("/AdminUpdateTrainer");

    };

    //Delete Function
    const deleteClick = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {

        const deletedata = { id: deleteId };
        const axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'token': sessionStorage.getItem('admtoken'),
                'key': sessionStorage.getItem('admkey')
            }
        };
        axios.post(apiUrl2, deletedata, axiosConfig2).then((response) => {
            if (response.data.status === 'success') {
                // Remove the deleted Trainer from updateField state
                setUpdateField(updateField.filter(trainer => trainer.id !== deleteId))
            } else if (response.data.status === "Unauthorized User!!") {
                navigate("/")
                sessionStorage.clear()
            } else {
                alert(response.data.status);
            }
        });

        setShowDeleteModal(false);
    };

    const handleDeleteCancel = () => {
        setDeleteId(null);
        setShowDeleteModal(false);
    };

    // Logic for displaying current students
    const indexOfLastStudent = currentPage * TrainerPerPage;
    const indexOfFirstStudent = indexOfLastStudent - TrainerPerPage;
    const currentTrainers = updateField ? updateField.slice(indexOfFirstStudent, indexOfLastStudent) : [];


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * TrainerPerPage) + index + 1;
    }

    let totalPages = []
    if (updateField && updateField.length > 0) {
        totalPages = Math.ceil(updateField.length / TrainerPerPage);
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
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}<br />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <h1>Search Trainers</h1>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <input onChange={inputHandler} type="text" className="form-control" name="TrainerSearchQuery" value={inputField.TrainerSearchQuery} placeholder='Trainer Name/Email/Contact No.' />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <button onClick={readValue} className="btn btn-warning">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <div className="col-12 text-center">
                        <p></p>
                    </div>
                ) : (updateField ? (

                    //start
                    <div>
                        <br />
                        <strong>List of Trainers</strong>
                        <br /><br />
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                {/* Table headers */}
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">S/N</th>
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3">Trainer Name</th>
                                        <th scope="col" className="px-6 py-3">About</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Contact No.</th>
                                        <th scope="col" className="px-6 py-3"></th>
                                        {key === "lmsapp" && (
                                            <th scope="col" className="px-6 py-3"></th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Table rows */}
                                    {currentTrainers.map((value, index) => {
                                        return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">{calculateSerialNumber(index)}</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                        <img
                                                            className="rounded mx-auto d-block"
                                                            src={value.profilePicture}
                                                            width="150px"
                                                            height="140px"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{value.trainerName}</td> {/* Corrected closing tag */}
                                            <td className="px-6 py-4">{value.about}</td>
                                            <td className="px-6 py-4">{value.email}</td>
                                            <td className="px-6 py-4">{value.phoneNumber}</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <button onClick={() => UpdateClick(value.id)} className="btn btn-success p-3 font-medium text-white-600 hover:text-blue-500 shadow-lg">Update</button>
                                            </td>
                                            {key === "lmsapp" && (
                                                <td className="p-4 whitespace-nowrap">
                                                    <button onClick={() => deleteClick(value.id)} className="btn btn-danger p-3 font-medium text-white-600 hover:text-blue-500 shadow-lg">Delete</button>
                                                </td>
                                            )}
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    //end

                ) : (

                    <div className="col-12 text-center">No Trainers Found!!</div>

                )
                )}

                {currentTrainers.length > 0 && (
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
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <div className={`modal ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete Confirmation</h5>
                            <button type="button" className="btn-close" onClick={handleDeleteCancel}></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this trainer?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleDeleteCancel}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSearchTrainer
