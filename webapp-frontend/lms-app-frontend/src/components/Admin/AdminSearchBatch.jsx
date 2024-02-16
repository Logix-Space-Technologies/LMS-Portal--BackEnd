import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import '../../config/config'
import { useNavigate } from 'react-router-dom'

const AdminSearchBatch = () => {

    const navigate = useNavigate()

    const [inputField, setInputField] = useState(
        {
            "batchQuery": ""
        }
    )

    const [updateField, setUpdateField] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [collegesPerPage] = useState(1); // Number of students per page

    const [isLoading, setIsLoading] = useState(true)

    const apiUrl = global.config.urls.api.server + "/api/lms/searchBatch"

    const apiUrl2 = global.config.urls.api.server + "/api/lms/deletebatch"

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        console.log(inputField)
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        }
        axios.post(apiUrl, inputField, axiosConfig).then(
            (response) => {
                setUpdateField(response.data.data)
                setIsLoading(false)
                console.log(response.data.data)
                setInputField(
                    {
                        "batchQuery": ""
                    }
                )
            }
        )
    }

    const deleteClick = (id) => {
        let deletedata = { "id": id }
        let axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        }
        axios.post(apiUrl2, deletedata, axiosConfig2).then(
            (response) => {
                console.log(deletedata)
                if (response.data.status === "Batch Deleted.") {
                    alert("Batch Deleted Successfully!!")
                    window.location.reload();
                } else {
                    alert(response.data.status)
                }
            }
        )
    }

    // Logic for displaying current students
    const indexOfLastStudent = currentPage * collegesPerPage;
    const indexOfFirstStudent = indexOfLastStudent - collegesPerPage;
    const currentBatches = updateField ? updateField.slice(indexOfFirstStudent, indexOfLastStudent) : [];


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Total pages
    const pageNumbers = [];
    if (updateField && updateField.length > 0) {
        updateField.forEach((student, index) => {
            const pageNumber = index + 1;
            pageNumbers.push(pageNumber);
        });
    }

    const UpdateClick = (id) => {
        let data = id
        sessionStorage.setItem("batchId", data)
        navigate("/adminupdatebatch")

    }

    return (
        <div>
            <Navbar /><br />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <h1>Search Batches</h1>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">Batch Name/College Name/Batch Description</label>
                                <input onChange={inputHandler} type="text" className="form-control" name="batchQuery" value={inputField.batchQuery} />
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
                        <br /><br />
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                {/* Table headers */}
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">College Name</th>
                                        <th scope="col" className="px-6 py-3">Batch Name</th>
                                        <th scope="col" className="px-6 py-3">Batch Description</th>
                                        <th scope="col" className="px-6 py-3">Registration Start</th>
                                        <th scope="col" className="px-6 py-3">Registration End</th>
                                        <th scope="col" className="px-6 py-3">Batch Amount</th>
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Table rows */}
                                    {/* Table rows */}
                                    {currentBatches.map((value, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">{value.collegeName}</td> {/* Corrected closing tag */}
                                            <td className="px-6 py-4">{value.batchName}</td>
                                            <td className="px-6 py-4">{value.batchDesc}</td>
                                            <td className="px-6 py-4">{value.email}</td>
                                            <td className="px-6 py-4">{new Date(value.regStartDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">{new Date(value.regEndDate).toLocaleDateString()}</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <button onClick={() => { UpdateClick(value.id) }} className="btn btn-success p-3 font-medium text-white-600 hover:text-blue-500 shadow-lg">Update</button>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <button onClick={() => deleteClick(value.id)} className="btn btn-danger p-3 font-medium text-white-600 hover:text-blue-500 shadow-lg">Delete</button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    //end

                ) : (
                    <div className="col-12 text-center">No Batches Found!!</div>
                ))}

                <div className="flex justify-center mt-8">
                    <nav>
                        <ul className="flex list-style-none">
                            {currentPage > 1 && (
                                <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">Previous</li>
                            )}
                            {Array.from({ length: Math.ceil(updateField.length / collegesPerPage) }, (_, i) => (
                                <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>{i + 1}</li>
                            ))}
                            {currentPage < Math.ceil(updateField.length / collegesPerPage) && (
                                <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">Next</li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </div >
    )
}

export default AdminSearchBatch