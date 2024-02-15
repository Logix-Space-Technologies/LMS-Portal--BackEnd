import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import '../../config/config'
import { useNavigate } from 'react-router-dom'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar'

const AdminSearchCollege = () => {

    const [inputField, setInputField] = useState(
        {
            "collegeSearchQuery": ""
        }
    )

    const [updateField, setUpdateField] = useState([])

    const [key, setKey] = useState('');

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)

    const apiUrl = global.config.urls.api.server + "/api/lms/searchCollege"

    const apiUrlTwo = global.config.urls.api.server + "/api/lms/deleteCollege"

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
        console.log(inputField)
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        }
        console.log(currentKey)
        axios.post(apiUrl, inputField, axiosConfig).then(
            (response) => {
                setUpdateField(response.data.data)
                setIsLoading(false)
                console.log(response.data)
                setInputField(
                    {
                        "collegeSearchQuery": ""
                    }
                )
            }
        )
    }

    const handleClick = (id) => {
        let data = { "id": id }
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
                    // Reload the page after deleting college
                    window.location.reload();
                } else {
                    alert(response.data.status)
                }
            }
        )
    }

    const UpdateClick = (id) => {
        let data = id
        sessionStorage.setItem("clgId", data)
        navigate("/adminUpdateclg")
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
                                <h1>Search College</h1>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">College Name/College Address/Website/Email/College Contact Number</label>
                                <input onChange={inputHandler} type="text" className="form-control" name="collegeSearchQuery" value={inputField.collegeSearchQuery} />
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
                    <div className="row g-3">
                        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                            <header className="px-5 py-4 border-b border-gray-100">
                                <h2 className="font-semibold text-2xl text-gray-800">List of Colleges</h2>
                            </header>
                            <div className="p-3">
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full">
                                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                            <tr>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center"></div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">College Name</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">College Address</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Website</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Email</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">College Phone No.</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">College Mobile No.</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center"></div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center"></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm divide-y divide-gray-100">
                                            {updateField.map(
                                                (value, index) => (
                                                    <tr key={index}>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                                    <img
                                                                        className="rounded mx-auto d-block"
                                                                        src={value.collegeImage}
                                                                        width="150px"
                                                                        height="140px"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-center">{value.collegeName}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-center">{value.collegeAddress}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-center">{value.website}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-center">{value.email}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-center">{value.collegePhNo}</div>
                                                        </td>
                                                        <td className="">
                                                            <div className="text-center">{value.collegeMobileNumber}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <button onClick={() => { UpdateClick(value.id) }} className="btn btn-success p-3 font-medium text-white-600 hover:text-blue-500 shadow-lg">Update</button>
                                                        </td>
                                                        {key === 'lmsapp' && (
                                                            <td className="p-4 whitespace-nowrap">
                                                                <button onClick={() => { handleClick(value.id) }} className="btn btn-danger p-3 font-medium text-white-600 hover:text-blue-500 shadow-lg">Delete</button>
                                                            </td>
                                                        )}


                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                ) : (
                    <div className="col-12 text-center">No Colleges Found!!</div>
                ))}
            </div>
        </div >
    )
}

export default AdminSearchCollege