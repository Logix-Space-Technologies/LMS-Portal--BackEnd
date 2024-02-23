import React, { useEffect, useState } from 'react'
import '../../config/config'
import axios from 'axios'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar'

const AdminViewAllCollege = () => {
    const [collegeData, setCollegeData] = useState([])
    const [key, setKey] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [collegesPerPage] = useState(10); // Number of colleges per page
    const [deleteCollege, setDeleteCollege] = useState({})

    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/viewallcolleges"

    const apiUrlTwo = global.config.urls.api.server + "/api/lms/deleteCollege"

    const getData = () => {
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
        axios.post(apiUrl, {}, axiosConfig).then(
            (response) => {
                setCollegeData(response.data.data)
                console.log(response.data.data)
            }
        )
    }

    const handleClick = () => {
        let data = { "id": deleteCollege }
        let axiosConfigTwo = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        }
        axios.post(apiUrlTwo, data, axiosConfigTwo).then(
            (response) => {
                if (response.data.status === "College deleted.") {
                    alert("College Deleted Successfully!!!")
                    getData();
                } else {
                    alert(response.data.status)
                }
            }
        )
    }

    const UpdateClick = (id) => {
        let data = id
        sessionStorage.setItem("clgId", data)
    }

    const readValue = (id) => {
        setDeleteCollege(id)
        console.log(id)
    };

    // Logic for displaying current colleges
    const indexOfLastCollege = currentPage * collegesPerPage;
    const indexOfFirstCollege = indexOfLastCollege - collegesPerPage;
    const currentColleges = collegeData ? collegeData.slice(indexOfFirstCollege, indexOfLastCollege) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Total pages
    const pageNumbers = [];
    if (collegeData && collegeData.length > 0) {
        for (let i = 1; i <= Math.ceil(collegeData.length / collegesPerPage); i++) {
            pageNumbers.push(i);
        }
    }

    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);

    useEffect(() => { getData() }, [])

    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
            <br />
            <div className="flex justify-between items-center mx-4 my-4">

                <strong>View All Colleges</strong>

                <div></div>
            </div>
            <br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            <th scope="col" className="px-6 py-3">
                                College Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                College Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Website
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone No:
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mobile No:
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            {key === 'lmsapp' && (
                                <th scope="col" className="px-6 py-3">

                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentColleges.map((value, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={value.collegeImage} alt="" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{value.collegeName}</div>
                                        <div className="font-normal text-gray-500">{value.email}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {value.collegeCode}
                                </td>
                                <td className="px-6 py-4">
                                    {value.collegeAddress}
                                </td>
                                <td className="px-6 py-4">
                                    {value.website}
                                </td>
                                <td className="px-6 py-4">
                                    {value.collegePhNo}
                                </td>
                                <td className="px-6 py-4">
                                    {value.collegeMobileNumber}
                                </td>
                                <td className="px-6 py-4">
                                    <Link to="/adminviewallbatches" onClick={() => { UpdateClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View Batches</Link>
                                </td>
                                <td className="px-6 py-4">
                                    <Link to="/adminUpdateclg" onClick={() => { UpdateClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update College</Link>
                                </td>
                                {key === 'lmsapp' && (
                                    <td className="px-6 py-4">
                                        <Link onClick={()=> {readValue(value.id)}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete College</Link>
                                    </td>
                                )}
                            </tr>
                        ))}

                        {currentColleges.length === 0 && (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td colSpan="8" className="px-6 py-4" style={{ textAlign: 'center' }}>
                                    No Colleges Found !!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to delete this college?</h5>
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
        </div >

    )
}

export default AdminViewAllCollege
