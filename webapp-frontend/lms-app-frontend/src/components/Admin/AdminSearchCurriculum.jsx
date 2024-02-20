import axios from 'axios'
import '../../config/config'
import React, { useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'

const AdminSearchCurriculum = () => {

    const navigate = new useNavigate()

    const [inputField, setInputField] = useState(
        {
            "CurriculumSearchQuery": ""
        }
    )

    const [updateField, setUpdateField] = useState(
        []
    )

    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [curriculumPerPage] = useState(10); // Number of students per page

    const apiLink = global.config.urls.api.server + "/api/lms/searchCurriculum"
    const apiLink2 = global.config.urls.api.server + "/api/lms/deletecurriculum"

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        console.log(inputField)
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        console.log(axiosConfig)
        console.log(inputField)

        axios.post(apiLink, inputField, axiosConfig).then(
            (response) => {
                setUpdateField(response.data.data)
                setIsLoading(false)
                console.log(response.data.data)
                setInputField({
                    "CurriculumSearchQuery": ""
                })
            }

        )

    }

    const handleClick = (id) => {
        let data = { "id": id }
        let axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        }

        axios.post(apiLink2, data, axiosConfig2).then(
            (response) => {
                console.log(data)
                console.log(axiosConfig2)
                if (response.data.status === "success") {
                    alert("Curriculum deleted!!")
                    // Reload the page after clicking OK in the alert
                    window.location.reload();
                } else {
                    alert(response.data.status)
                }
            }
        )
    }

    // Logic for displaying current students
    const indexOfLastStudent = currentPage * curriculumPerPage;
    const indexOfFirstStudent = indexOfLastStudent - curriculumPerPage;
    const currentCurriculum = updateField ? updateField.slice(indexOfFirstStudent, indexOfLastStudent) : [];


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
        sessionStorage.setItem("curriculumId", data)
        navigate("/AdminUpdateCurriculum")

    }



    return (
        <div>
            <Navbar /><br />
            <strong style={{ paddingLeft: '30px'}}>Search Curriculum</strong>

            <div className="flex justify-between items-center mx-4 my-4">
                <div className="container">
                    <div className="row g-3">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <label htmlFor="" className="form-label"></label>
                            <input onChange={inputHandler} type="text" className="form-control" name="CurriculumSearchQuery" value={inputField.CurriculumSearchQuery} />
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
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Batch Id
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
                                <th scope="col" className="px-6 py-3">
    
                                </th>
                                <th scope="col" className="px-6 py-3">
    
                                </th>
                                <th scope="col" className="px-6 py-3">
    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCurriculum.map(
                                (value, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">
                                            {value.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.batchId}
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
                                            {value.curriculumFileLink}
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <button onClick={() => handleClick(value.id)} className="btn btn-danger">Delete</button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link onClick={() => { UpdateClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500">Update Curriculum</Link>
                                        </td>
                                    </tr>
                                )
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
        </div>
    );
    
}

export default AdminSearchCurriculum