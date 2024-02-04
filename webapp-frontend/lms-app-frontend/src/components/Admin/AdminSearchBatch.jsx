import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

const AdminSearchBatch = () => {

    const [inputField, setInputField] = useState(
        {
            "batchQuery" : ""
        }
    )

    const [updateField, setUpdateField] = useState([])

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
        let deletedata = { "id" : id }
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
                    <div className="row g-3">
                        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                            <header className="px-5 py-4 border-b border-gray-100">
                                <h2 className="font-semibold text-2xl text-gray-800">List of Batches</h2>
                            </header>
                            <div className="p-3">
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full">
                                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                            <tr>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">College Name</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Batch Name</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Batch Description</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Registration Start</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Registration End</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Batch Amount</div>
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
                                                            <div className="text-center">{value.collegeName}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-center">{value.batchName}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-center">{value.batchDesc}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-center">{value.regStartDate}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-center">{value.regEndDate}</div>
                                                        </td>
                                                        <td className="">
                                                            <div className="text-center">{value.batchAmount}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <button onClick="#" className="btn btn-success p-3 font-medium text-white-600 hover:text-blue-500 shadow-lg">Update</button>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <button onClick={() => deleteClick(value.id)} className="btn btn-danger p-3 font-medium text-white-600 hover:text-blue-500 shadow-lg">Delete</button>
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
                    <div className="col-12 text-center">No Batches Found!!</div>
                ))}
            </div>
        </div >
  )
}

export default AdminSearchBatch