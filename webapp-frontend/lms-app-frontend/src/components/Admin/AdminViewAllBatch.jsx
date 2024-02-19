import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminViewAllBatch = () => {
    const [batchData, setBatchData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [batchesPerPage] = useState(10); // Number of batches per page
    const navigate = useNavigate();

    const apiUrl = global.config.urls.api.server + "/api/lms/adminviewbatch";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/deletebatch";

    const getData = () => {
        let data = { "collegeId": sessionStorage.getItem("clgId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                setBatchData(response.data.data);
                console.log(response.data.data);
            }
        );
    };

    const deleteClick = (id) => {
        let deletedata = { "id": id };
        let axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        axios.post(apiUrl2, deletedata, axiosConfig2).then(
            (response) => {
                console.log(deletedata);
                if (response.data.status === "Batch Deleted.") {
                    alert("Batch Deleted Successfully!!");
                    window.location.reload();
                } else {
                    alert(response.data.status);
                }
            }
        );
    };

    const viewAllCurr = (id) => {
        sessionStorage.setItem("currbatchId", id)
    }

    const UpdateClick = (id) => {
        let data = id;
        sessionStorage.setItem("batchId", data);
        navigate("/adminupdatebatch");
    };

    const batchClick = (id) => {
        let data = id;
        sessionStorage.setItem("viewbatchId", data);
    }

    // Logic for displaying current batches
    const indexOfLastBatch = currentPage * batchesPerPage;
    const indexOfFirstBatch = indexOfLastBatch - batchesPerPage;
    const currentBatches = batchData ? batchData.slice(indexOfFirstBatch, indexOfLastBatch) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => { getData() }, []);

    return (
        <div>
            <Navbar /><br />
            <div className="flex justify-between items-center mx-4 my-4">
                <button onClick={() => navigate(-1)} className="btn bg-gray-500 text-white px-4 py-2 rounded-md">Back</button>

                <strong>View All Batches</strong>

                <div></div>
            </div>
            <br />
            <br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    {/* Table headers */}
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Batch Id</th>
                            <th scope="col" className="px-6 py-3">College Name</th>
                            <th scope="col" className="px-6 py-3">Batch Name</th>
                            <th scope="col" className="px-6 py-3">Reg Start Date</th>
                            <th scope="col" className="px-6 py-3">Reg End Date</th>
                            <th scope="col" className="px-6 py-3">Batch Description</th>
                            <th scope="col" className="px-6 py-3">Batch Amount</th>
                            <th scope="col" className="px-6 py-3">Added Date</th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Table rows */}
                        {currentBatches.length > 0 ? currentBatches.map((value, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{value.id}</td>
                                <td className="px-6 py-4">{value.collegeName}</td>
                                <td className="px-6 py-4">{value.batchName}</td>
                                <td className="px-6 py-4">{new Date(value.regStartDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{new Date(value.regEndDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{value.batchDesc}</td>
                                <td className="px-6 py-4">{value.batchAmount}</td>
                                <td className="px-6 py-4">{new Date(value.addedDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <Link to="/AdminViewAllSession" onClick={() => { batchClick(value.id) }} style={{ whiteSpace: 'nowrap' }} className="btn bg-blue-500 text-white">View Sessions</Link>
                                </td>
                                <td className="px-6 py-4">
                                    <Link to="/adminviewallstudents" onClick={() => { batchClick(value.id) }} style={{ whiteSpace: 'nowrap' }} className="btn bg-blue-500 text-white">View Students</Link>
                                </td>
                                <td className="px-6 py-4">
                                    <Link to="/adminviewallcurriculum" style={{ whiteSpace: 'nowrap' }} onClick={() => viewAllCurr(value.id)} className="btn bg-blue-500 text-white">View Curriculum</Link>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => { UpdateClick(value.id) }} className="btn btn-success">Update</button>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => deleteClick(value.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="13" className="px-6 py-4" style={{textAlign: "center"}}>
                                    No Batches Found !!!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className="flex justify-center mt-8">
                    <nav>
                        <ul className="flex list-style-none">
                            {currentPage > 1 && (
                                <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">Previous</li>
                            )}
                            {Array.from({ length: Math.ceil(batchData.length / batchesPerPage) }, (_, i) => (
                                <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>{i + 1}</li>
                            ))}
                            {currentPage < Math.ceil(batchData.length / batchesPerPage) && (
                                <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">Next</li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default AdminViewAllBatch;
