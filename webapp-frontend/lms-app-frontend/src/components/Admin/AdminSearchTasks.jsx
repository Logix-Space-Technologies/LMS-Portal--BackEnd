import React, { useState } from 'react'
import '../../config/config'
import axios from 'axios'

const AdminSearchTasks = () => {

    const [inputField, setInputField] = useState({
        "taskQuery": ""
    })

    const [updateField, setUpdateField] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const apiUrl = global.config.urls.api.server + "/api/lms/searchTasks"

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const readValue = () => {
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
                console.log(inputField)
                setUpdateField(response.data.data)
                setIsLoading(false)
                console.log(response.data)
                setInputField({
                    "taskQuery": ""
                })
            }
        )
    }


    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <h1>Search Task</h1>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">Task Title/Task Description/Task Type/Batch Name</label>
                                <input onChange={inputHandler} value={inputField.taskQuery} type="text" className="form-control" name="taskQuery" />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <button onClick={readValue} className="btn btn-warning">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoading ? (<div className="col-12 text-center">
                    <p></p>
                </div>) :
                    (updateField ? (
                        <div className="row g-3">
                            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                                <header className="px-5 py-4 border-b border-gray-100">
                                    <h2 className="font-semibold text-2xl text-gray-800">Task Details</h2>
                                </header>
                                <div className="p-3">
                                    <div className="overflow-x-auto">
                                        <table className="table-auto w-full">
                                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                                <tr>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Id</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Batch Name</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Batch Id</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Task Title</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Task Description</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Task Type</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Task File</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Total Score</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Due Date</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Added Date</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center">Updated Date</div>
                                                    </th>
                                                    <th className="p-4 whitespace-nowrap">
                                                        <div className="font-semibold text-center"></div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm divide-y divide-gray-100">
                                                {updateField.map(
                                                    (value, index) => {
                                                        return <tr key={index}>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="font-medium text-gray-800">{value.id}</div>
                                                                </div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.batchName}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.batchId}</div>
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
                                                                <div className="text-left">{value.taskFileUpload}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{value.totalScore}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{new Date(value.dueDate).toLocaleDateString()}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{new Date(value.addedDate).toLocaleDateString()}</div>
                                                            </td>
                                                            <td className="p-4 whitespace-nowrap">
                                                                <div className="text-left">{new Date(value.updatedDate).toLocaleDateString()}</div>
                                                            </td>
                                                        </tr>
                                                    }
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
        </div>

    )
}

export default AdminSearchTasks