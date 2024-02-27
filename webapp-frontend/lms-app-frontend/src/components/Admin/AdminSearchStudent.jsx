import React, { useState } from 'react'
import '../../config/config'
import axios from 'axios'
import Navbar from './Navbar'

const AdminSearchStudent = () => {
    const [inputField, setInputField] = useState(
        {
            "studentSearchQuery": ""
        }
    )

    const [updateField, setUpdateField] = useState(
        []
    )

    const [isLoading, setIsLoading] = useState(true)

    const apiLink = global.config.urls.api.server + "/api/lms/searchStudentsByAdmAndAdmstf"

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
        };


        axios.post(apiLink, inputField, axiosConfig).then(
            (response) => {
                setUpdateField(response.data.data)
                setIsLoading(false)
                console.log(response.data.data)
                setInputField({
                    "studentSearchQuery": ""
                })
            }

        )

    }
    return (
        <div>
            <Navbar />
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <div className="row g-3">
                                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                    <h1>Search Student</h1>
                                </div>
                                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                    <input onChange={inputHandler} type="text" className="form-control" name="studentSearchQuery" value={inputField.studentSearchQuery} placeholder='Student Name/Phone No/Address/Aadhar No/Email' />
                                </div>
                                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                    <button onClick={readValue} className="btn btn-warning">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isLoading ? (<div className="col-12 text-center">
                        <p></p>
                    </div>) : (updateField ? (
                        <div className="row g-3">
                            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                                <header className="px-5 py-4 border-b border-gray-100">
                                    <h2 className="font-semibold text-2xl text-gray-800">List of Students</h2>
                                </header>
                                <div className="p-3">
                                    <div className="overflow-x-auto">
                                        <table className="table-auto w-full">
                                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                                <tr>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-left">S/N</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Student Name</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-left">College Name</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Admission No</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Roll No</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Department</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Course</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Email</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Phone No:</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Aadhar No</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Membership No</div>
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
                                                                <div className="text-left">{index+1}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                                        <img
                                                                            className="w-18 h-14 flex-shrink-0 mr-2 sm:mr-3"
                                                                            src={value.studProfilePic}
                                                                            width="60px"
                                                                            height="64px"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="font-medium text-gray-800">{value.studName}</div>
                                                                </div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.collegeName}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.admNo}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.rollNo}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.studDept}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.course}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.studEmail}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.studPhNo}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.aadharNo}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.membership_no}</div>
                                                            </td>
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
                        <div className="col-12 text-center">No Students Found!!</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminSearchStudent