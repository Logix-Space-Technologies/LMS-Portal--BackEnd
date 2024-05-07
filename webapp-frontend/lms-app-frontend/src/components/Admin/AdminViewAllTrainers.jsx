import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../../config/config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';

const AdminViewAllTrainers = () => {

    const [trainerData, setTrainerData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [trainersPerPage] = useState(10); // Number of trainers per page
    const navigate = useNavigate();
    const [key, setKey] = useState('');
    const [deleteTrainer, setDeleteTrainer] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [showWaitingModal, setShowWaitingModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay
    const [inputField, setInputField] = useState(
        {
            "TrainerSearchQuery": ""
        }
    )

    const apiUrl = global.config.urls.api.server + "/api/lms/viewAllTrainer";
    const apiUrlTwo = global.config.urls.api.server + "/api/lms/deleteTrainer";
    const apiUrl3 = global.config.urls.api.server + "/api/lms/searchTrainer"

    const closeWaitingModal = () => {
        setShowOverlay(false)
        setShowWaitingModal(false)
    }

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const searchValue = () => {
        // Retrieve key and token from sessionStorage without providing the key
        let currentKey, token;
        Object.entries(sessionStorage).forEach(([key, value]) => {
            if (key.includes('key')) {
                currentKey = value;
            } else if (key.includes('token')) {
                token = value;
            }
        });

        // Update the state with the current key
        setKey(currentKey);
        setIsLoading(true)
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        }
        axios.post(apiUrl3, inputField, axiosConfig).then(
            (response) => {
                if (response.data.status === "Search Item is required.") {
                    setIsLoading(false)
                    setTimeout(() => {
                        alert(response.data.status)
                        getData()
                    }, 500)
                } else if (response.data.data) {
                    setTrainerData(response.data.data)
                    setIsLoading(false)
                    setInputField(
                        {
                            "TrainerSearchQuery": ""
                        }
                    )
                } else if (response.data.status === "Unauthorized User!!") {
                    { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                    sessionStorage.clear()
                } else if (!response.data.data) {
                    setIsLoading(false)
                    setInputField(
                        {
                            "TrainerSearchQuery": ""
                        }
                    )
                    setTimeout(() => {
                        alert("No Trainers Found")
                        getData();
                    }, 500)
                } else {
                    alert(response.data.status)
                }
            }
        )
    }

    const getData = () => {
        // Retrieve key and token from sessionStorage without providing the key
        let currentKey, token;
        Object.entries(sessionStorage).forEach(([key, value]) => {
            if (key.includes('key')) {
                currentKey = value;
            } else if (key.includes('token')) {
                token = value;
            }
        });

        // Update the state with the current key
        setKey(currentKey);
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };
        axios.post(apiUrl, {}, axiosConfig).then(
            (response) => {
                if (response.data.Trainers) {
                    setIsLoading(false)
                    setTrainerData(response.data.Trainers);
                } else {
                    if (response.data.status === "Unauthorized access!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear()
                    } else {
                        if (!response.data.Trainers) {
                            setIsLoading(false)
                            setTrainerData([])
                        } else {
                            setIsLoading(false)
                            alert(response.data.status)
                        }
                    }
                }
            }
        );
    };

    // Logic for displaying current trainers
    const indexOfLastTrainer = currentPage * trainersPerPage;
    const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
    const currentTrainers = trainerData ? trainerData.slice(indexOfFirstTrainer, indexOfLastTrainer) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Total pages
    let totalPages = []
    if (trainerData && trainerData.length > 0) {
        totalPages = Math.ceil(trainerData.length / trainersPerPage);
    }

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * trainersPerPage) + index + 1;
    }

    // Integration of new pagination logic
    const startPage = currentPage > 2 ? currentPage - 2 : 1;
    const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;


    const handleClick = () => {
        let data = { "id": deleteTrainer };
        let axiosConfigTwo = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        setShowWaitingModal(true)
        setShowOverlay(true)
        axios.post(apiUrlTwo, data, axiosConfigTwo).then(
            (response) => {
                if (response.data.status === "success") {
                    closeWaitingModal()
                    setTimeout(() => {
                        alert("Trainer deleted!")
                        // Refresh the data after deletion
                        getData();
                    }, 500)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear()
                    } else {
                        closeWaitingModal()
                        setTimeout(() => {
                            alert(response.data.status)
                        }, 500)
                    }
                }
            }
        );

    };

    const UpdateClick = (id) => {
        let data = id;
        sessionStorage.setItem("trainerId", data);
        navigate("/AdminUpdateTrainer");

    };

    const readValue = (id) => {
        setDeleteTrainer(id)
    };

    useEffect(() => getData(), []);

    return (
        <div>
            {key === 'lmsappadmstaff' ? <AdmStaffNavBar /> : <Navbar />}<br />
            <div className="flex justify-between items-center mx-4 my-4">
                <div></div>

                <strong>View All Trainers</strong>

                <div></div>
            </div>
            <div className="row">
                <div className="col col-12">
                    <div className="row g-3">
                        <div className="col col-md-6 mx-auto"> {/* Center-align the search bar */}
                            <div className="input-group mb-3"> {/* Use an input group */}
                                <input onChange={inputHandler} type="text" className="form-control" name="TrainerSearchQuery" value={inputField.TrainerSearchQuery} placeholder='Trainer Name/Email/Contact No.' />
                                <button onClick={searchValue} className="btn btn-warning ms-2">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading ? <div className="flex justify-center items-center h-full">
                <div className="text-center py-20">
                    <div>Loading...</div>
                </div>
            </div> : (<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S/N
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Profile
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            {key === "lmsapp" && (
                                <th scope="col" className="px-6 py-3">

                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentTrainers.length > 0 ? currentTrainers.map((value, index) => {
                            return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">
                                    {calculateSerialNumber(index)}
                                </td>
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={value.profilePicture} alt="" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{value.trainerName}</div>
                                        <div className="font-normal text-gray-500">{value.email}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {value.about}
                                </td>
                                <td className="px-6 py-4">
                                    {value.phoneNumber}
                                </td>
                                <td className="px-6 py-4">
                                    {value.email}
                                </td>
                                {key === "lmsapp" && (
                                    <td className="px-6 py-4">
                                        <Link onClick={() => { readValue(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete Trainer</Link>
                                    </td>
                                )}
                                <td className="px-6 py-4">
                                    <button onClick={() => UpdateClick(value.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update Trainer</button>
                                </td>
                            </tr>
                        }
                        ) : (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td colSpan="15" className="px-6 py-4" style={{ textAlign: "center" }}>
                                    No Trainers Found !!!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>)}

            <div className="row">
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to delete this Trainer?</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>This action cannot be undone.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No, cancel</button>
                                <button onClick={() => { handleClick() }} type="button" className="btn btn-danger" data-bs-dismiss="modal">Yes, I'm sure</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {!isLoading && currentTrainers.length > 0 && (
                <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstTrainer + 1}</span> to <span className="font-medium">{indexOfLastTrainer > trainerData.length ? trainerData.length : indexOfLastTrainer}</span> of <span className="font-medium">{trainerData.length}</span> results
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
            {showWaitingModal && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
                            </div>
                            <div className="modal-body">
                                <>
                                    <div className="mb-3">
                                        <p>Processing Request. Do Not Refresh.</p>
                                    </div>
                                </>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showOverlay && (
                <div
                    className="modal-backdrop fade show"
                    onClick={() => {
                        setShowWaitingModal(false);
                        setShowOverlay(false);
                    }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 1040, // Ensure this is below your modal's z-index
                    }}
                ></div>
            )}
        </div>
    );
};

export default AdminViewAllTrainers;
