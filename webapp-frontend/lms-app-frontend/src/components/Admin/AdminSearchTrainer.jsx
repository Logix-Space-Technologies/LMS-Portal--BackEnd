import axios from 'axios'
import React, { useState } from 'react'
import Navbar from './Navbar'

const AdminSearchTrainer = () => {

    const [inputField, setInputField] = useState(
        {
            "TrainerSearchQuery": ""
        }
    )

    const [updateField, setUpdateField] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const apiUrl = global.config.urls.api.server + "/api/lms/searchTrainer"

    const apiUrl2 = global.config.urls.api.server + "/api/lms/deleteTrainer"

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
                        "TrainerSearchQuery": ""
                    }
                )
            }
        )
    }

    //Delete Function
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
                if (response.data.status === "success") {
                    alert("Trainer Deleted Successfully!!")
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
                                <h1>Search Trainers</h1>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">Trainer Name/Email/Contact No.</label>
                                <input onChange={inputHandler} type="text" className="form-control" name="TrainerSearchQuery" value={inputField.TrainerSearchQuery} />
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
                                <h2 className="font-semibold text-2xl text-gray-800">List of Trainers</h2>
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
                                                    <div className="font-semibold text-center">Trainer Name</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">About</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Email</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Contact No.</div>
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
                                                                        src={value.profilePicture}
                                                                        width="150px"
                                                                        height="140px"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-center">{value.trainerName}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-center">{value.about}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-center">{value.email}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-center">{value.phoneNumber}</div>
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
                    <div className="col-12 text-center">No Trainers Found!!</div>
                ))}
            </div>
        </div >
    )
}

export default AdminSearchTrainer