import axios from 'axios'
import React, { useState } from 'react'
import ClgStaffNavbar from './ClgStaffNavbar'
import '../../config/config'
import { useNavigate } from 'react-router-dom'

const CollegeStaffSearchTask = () => {

    const [inputField, setInputField] = useState(
        {
            "collegeId": sessionStorage.getItem("clgStaffCollegeId"),
            "taskQuery": ""
        }
    )

    const [updateField, setUpdateField] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const apiLink = global.config.urls.api.server + "/api/lms/collegeStaffSearchTasks"

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        console.log(inputField)
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("clgstaffLogintoken"),
                "key": sessionStorage.getItem("clgstaffkey")
            }
        };
        axios.post(apiLink, inputField, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setUpdateField(response.data.data)
                    setIsLoading(false)
                    setInputField({
                        "collegeId": sessionStorage.getItem("clgStaffCollegeId"),
                        "taskQuery": ""
                    })
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        sessionStorage.clear()
                        navigate("/clgStafflogin")
                    } else {
                        if (!response.data.data) {
                            //no data found
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            }
        )
    }

    return (
        <div>
            <ClgStaffNavbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <h1>Search Task</h1>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">Task Name/Task Description/Task Type/Batch Name</label>
                                <input onChange={inputHandler} type="text" className="form-control" name="taskQuery" value={inputField.taskQuery} />
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
                                <h2 className="font-semibold text-2xl text-gray-800">List of Tasks</h2>
                            </header>
                            <div className="p-3">
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full">
                                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                            <tr>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Batch Name</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Task Title</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Task Description</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Task Type</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Task Material</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Total Score</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Due Date</div>
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
                                                            <div className="text-left">{value.batchName}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-left">{value.taskTitle}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-left">{value.taskDesc}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-left">{value.taskType}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <a target="_blank" href={value.taskFileUpload} className="btn bg-blue-500 text-white px-4 py-2 shadow rounded-md hover:bg-blue-500">View Material</a>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-left">{value.totalScore}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-left">{value.dueDate}</div>
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
                    <div className="col-12 text-center">No Tasks Found!!</div>
                ))}
            </div>
        </div >
    )
}

export default CollegeStaffSearchTask