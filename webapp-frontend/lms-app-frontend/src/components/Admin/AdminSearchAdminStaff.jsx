import React, { useState } from 'react';
import '../../config/config';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const AdminSearchAdminStaff = () => {

    const [inputField, setInputField] = useState({
        "adminStaffSearchQuery": ""
    });

    const [updateField, setUpdateField] = useState([]);
    const [searchExecuted, setSearchExecuted] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const [deleteId, setDeleteId] = useState(null);

    const apiLink = global.config.urls.api.server + "/api/lms/searchAdminStaff";

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const handleDeleteClick = () => {
        const deleteUrl = global.config.urls.api.server + "/api/lms/deleteadmstaff";
        const axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
            },
        };

        axios.post(deleteUrl, { id: deleteId }, axiosConfig)
            .then((response) => {
                if (response.data.status === "Admin Staff Deleted.") {
                    // Refresh the data after deletion
                    alert("Deleted Successfully")
                    readValue();
                } else {
                    alert("Error deleting admin staff. Please try again later.")
                    console.error("Error deleting admin staff. Please try again later.");
                }
            })
            .catch((err) => {
                alert("Error deleting admin staff. Please try again later.")
                console.error("Error deleting admin staff. Please try again later.");
            });
    };

    const updateClick = (id) => {
        sessionStorage.setItem("admStaffId", id);
        navigate("/adminupdateadminstaff");
    };

    const readValue = () => {
        setIsLoading(true);
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };

        axios.post(apiLink, inputField, axiosConfig).then(
            (response) => {
                setUpdateField(response.data.data);
                setIsLoading(false);
                setSearchExecuted(true);
                setInputField({ "adminStaffSearchQuery": "" });
            }
        );
    };

    // Logic for displaying current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = updateField ? updateField.slice(indexOfFirstItem, indexOfLastItem) : [];

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12">
                        <br />
                        <h1>Search Admin Staff</h1>
                        <br />
                        <input onChange={inputHandler} type="text" className="form-control" name="adminStaffSearchQuery" value={inputField.adminStaffSearchQuery} placeholder='Search By Admin Staff Name/Phone No/Address/Aadhar No/Email' />
                        <br></br>
                        <button onClick={readValue} className="btn btn-warning">Search</button>
                        <br /><br />
                    </div>
                </div>
                {!isLoading && currentItems.length > 0 ? (
                    <div className="row">
                        <div className="col-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Name</th>
                                        <th>Phone No</th>
                                        <th>Address</th>
                                        <th>Aadhar No</th>
                                        <th>Email</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((value, index) => {
                                        return <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{value.AdStaffName}</td>
                                            <td>{value.PhNo}</td>
                                            <td>{value.Address}</td>
                                            <td>{value.AadharNo}</td>
                                            <td>{value.Email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setDeleteId(value.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => updateClick(value.id)}>Update</button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <nav>
                                <ul className="flex list-style-none">
                                    {currentPage > 1 && (
                                        <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">Previous</li>
                                    )}
                                    {Array.from({ length: Math.ceil(updateField.length / itemsPerPage) }, (_, i) => (
                                        <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>{i + 1}</li>
                                    ))}
                                    {currentPage < Math.ceil(updateField.length / itemsPerPage) && (
                                        <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">Next</li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                ) : (!isLoading && searchExecuted && currentItems.length === 0 ? (
                    <div className="alert alert-info" role="alert">
                        No Admin Staffs found.
                    </div>
                ) : null)}
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Are you sure you want Delete Admin Staff</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No, cancel</button>
                            <button onClick={handleDeleteClick} type="button" className="btn btn-danger" data-bs-dismiss="modal">Yes, I'm sure</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSearchAdminStaff;
