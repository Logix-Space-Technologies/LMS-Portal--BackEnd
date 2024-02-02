import axios from 'axios'
import React, { useState } from 'react'
import '../../config/config'
import ClgStaffNavbar from './ClgStaffNavbar'

const CollegeStaffSearchBatch = () => {
    const [inputField, setInputField] = useState(
        {
            "collegeId": sessionStorage.getItem("clgStaffCollegeId"),
            "clgStaffBatchSearchQuery": ""
        }
    )

    const [updateField, setUpdateField] = useState(
        []
    )

    const [isLoading, setIsLoading] = useState(true)

    const apiLink = global.config.urls.api.server + "/api/lms/clgStaffSearchBatch"

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
                setUpdateField(response.data.data)
                setIsLoading(false)
                console.log(response.data)
                setInputField({
                    "collegeId": sessionStorage.getItem("clgStaffCollegeId"),
                    "clgStaffBatchSearchQuery": ""
                })
            }

        )

    }
  return (
    <div>
        <ClgStaffNavbar/>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <h1>Search Batch</h1>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">Batch Name/Batch Description/College Name</label>
                                <input onChange={inputHandler} type="text" className="form-control" name="clgStaffBatchSearchQuery" value={inputField.clgStaffBatchSearchQuery} />
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
                                <h2 className="font-semibold text-2xl text-gray-800">List of Batches</h2>
                            </header>
                            <div className="p-3">
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full">
                                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                            <tr>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-left">College Name</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Batch Name</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Batch Description</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Batch Amount</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Registration Start Date</div>
                                                </th>
                                                <th className="p-4 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Registration End Date</div>
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
                                                                {/* <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                                    <img
                                                                        className="w-18 h-14 flex-shrink-0 mr-2 sm:mr-3"
                                                                        src={value.studProfilePic}
                                                                        width="60px"
                                                                        height="64px"
                                                                        alt=""
                                                                    />
                                                                </div> */}
                                                                <div className="font-medium text-gray-800">{value.batchName}</div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-left">{value.collegeName}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-left">{value.batchDesc}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-left">{value.batchAmount}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-left">{new Date(value.regStartDate).toLocaleDateString()}</div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="text-left">{new Date(value.regEndDate).toLocaleDateString()}</div>
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
                    <div className="col-12 text-center">No Batch Found!!</div>
                ))}
            </div>
        </div>
  )
}

export default CollegeStaffSearchBatch