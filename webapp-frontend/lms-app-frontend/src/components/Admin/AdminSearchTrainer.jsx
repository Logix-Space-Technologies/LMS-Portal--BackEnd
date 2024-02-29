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
                setUpdateField(response.data.data)
                setIsLoading(false)
                setInputField(
                    {
                        "TrainerSearchQuery": ""
                    }
                )
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
                token: sessionStorage.getItem('admtoken'),
                key: sessionStorage.getItem('admkey')
            }
        };
        axios.post(apiUrl2, deletedata, axiosConfig2).then((response) => {
            if (response.data.status === 'success') {
                alert('Trainer Deleted Successfully!!');
                // Remove the deleted Trainer from updateField state
                setUpdateField(updateField.filter(trainer => trainer.id !== deleteId))
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

    // Total pages
    const pageNumbers = [];
    if (updateField && updateField.length > 0) {
        updateField.forEach((student, index) => {
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
                    <div className="flex justify-center mt-8">
                        <nav>
                            <ul className="flex list-style-none">
                                {currentPage > 1 && (
                                    <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">Previous</li>
                                )}
                                {Array.from({ length: Math.ceil(updateField.length / TrainerPerPage) }, (_, i) => (
                                    <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>{i + 1}</li>
                                ))}
                                {currentPage < Math.ceil(updateField.length / TrainerPerPage) && (
                                    <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">Next</li>
                                )}
                            </ul>
                        </nav>
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
