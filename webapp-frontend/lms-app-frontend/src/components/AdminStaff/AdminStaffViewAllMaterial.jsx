import React, { useEffect, useState } from 'react';
import '../../config/config';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdmStaffNavBar from './AdmStaffNavBar';

const AdminStaffViewAllMaterial = () => {
    const [materialData, setMaterialData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [materialPerPage] = useState(10);

    const rangeSize = 5; // Number of pages to display in the pagination
    const lastPage = Math.ceil(materialData.length / materialPerPage); // Calculate the total number of pages
    let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
    let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

    const apiUrl = global.config.urls.api.server + "/api/lms/AdmViewAllMaterial";
    const navigate = useNavigate();

    const getData = () => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Token": sessionStorage.getItem("admstaffLogintoken"),
                "Key": sessionStorage.getItem("admstaffkey")
            }
        };
        axios.post(apiUrl, {}, axiosConfig).then((response) => {
            if (response.data) {
                setMaterialData(response.data);
            } else {
                if (response.data.status === "Unauthorized User!!") {
                    navigate("/admstafflogin");
                    sessionStorage.clear();
                } else {
                    if (!response.data) {
                        setMaterialData([]);
                    } else {
                        alert(response.data.status);
                    }
                }
            }
        });
    };

    const updateClick = (id) => {
        let data = id;
        sessionStorage.setItem("materialId", data);
    };

    // Logic for displaying current curriculum
    const indexOfLastMaterial = currentPage * materialPerPage;
    const indexOfFirstMaterial = indexOfLastMaterial - materialPerPage;
    const currentMaterial = materialData ? materialData.slice(indexOfFirstMaterial, indexOfLastMaterial) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(materialData.length / materialPerPage);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * materialPerPage) + index + 1;
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <AdmStaffNavBar />
            <br />
            <strong>AdminStaff View All Materials</strong>
            <br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {currentMaterial.length > 0 ? (
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">College Name</th>
                                <th scope="col" className="px-6 py-3">Batch Name</th>
                                <th scope="col" className="px-6 py-3">File Name</th>
                                <th scope="col" className="px-6 py-3">Material Description</th>
                                <th scope="col" className="px-6 py-3">Remark</th>
                                <th scope="col" className="px-6 py-3">Material Type</th>
                                <th scope="col" className="px-6 py-3"></th>
                                <th scope="col" className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMaterial.map((value, index) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                    <td className="px-6 py-4">{value.collegeName}</td>
                                    <td className="px-6 py-4">{value.batchName}</td>
                                    <td className="px-6 py-4">{value.fileName}</td>
                                    <td className="px-6 py-4">{value.materialDesc}</td>
                                    <td className="px-6 py-4">{value.remarks}</td>
                                    <td className="px-6 py-4">{value.materialType}</td>
                                    <td className="px-6 py-4">
                                        <Link target="_blank" to={value.uploadFile} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View Material</Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to="/AdminStaffUpdateMaterial" onClick={() => { updateClick(value.id); }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update Material</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <table>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4" colSpan="7" style={{ textAlign: "center" }}>No Materials Found !!</td>
                            </tr>
                        </tbody>
                    </table>
                )}
                <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstMaterial + 1}</span> to <span className="font-medium">{indexOfLastMaterial > materialData.length ? materialData.length : indexOfLastMaterial}</span> of <span className="font-medium">{materialData.length}</span> results
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
        </div>
    );
};

export default AdminStaffViewAllMaterial;
