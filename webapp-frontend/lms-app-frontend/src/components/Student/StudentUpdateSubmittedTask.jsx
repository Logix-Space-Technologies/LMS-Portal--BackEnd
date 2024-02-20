import React, { useEffect, useState } from 'react'
import StudNavBar from './StudNavBar'
import '../../config/config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const StudentUpdateSubmittedTask = () => {
    const [submitTaskData, setSubmitTaskData] = useState([])
    const [updateSubTaskField, setUpdateSubTaskField] = useState({
        "id": sessionStorage.getItem("subtaskId"),
        "gitLink": "",
        "remarks": ""
    });

    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/studentviewsubmittedtask"
    const apiUrl2 = global.config.urls.api.server + "/api/lms/studupdatesubmittedtask"

    const updateSubTaskHandler = (event) => {
        setUpdateSubTaskField({ ...updateSubTaskField, [event.target.name]: event.target.value })
    }

    const getData = () => {
        let data = { "id": sessionStorage.getItem("subtaskId") }
        console.log(data)
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken"),
                "key": sessionStorage.getItem("studentkey")
            }
        };
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                if (response.data) {
                    setSubmitTaskData(response.data[0])
                    setUpdateSubTaskField(response.data[0])
                } else {
                    if (response.data.status === "Unauthorized access!!") {
                        navigate("/studentLogin")
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    const updateSubmittedTask = (e) => {
        e.preventDefault();
        console.log(updateSubTaskField)
        let axiosConfig2 = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken"),
                "key": sessionStorage.getItem("studentkey")
            }
        };
        let data = {
            "id": sessionStorage.getItem("subtaskId"),
            "gitLink": updateSubTaskField.gitLink,
            "remarks": updateSubTaskField.remarks
        }
        axios.post(apiUrl2, data, axiosConfig2).then(
            (response) => {
                console.log(response.data.status)
                if (response.data.status === "success") {
                    alert("Task Updated Successfully!!!")
                    navigate("/studentViewTask")
                } else {
                    if (response.data.status === "Unauthorized access!!") {
                        navigate("/studentLogin")
                        sessionStorage.clear()
                    } else {
                        if (response.data.status === "Validation failed" && response.data.data.gitLink) {
                            alert(response.data.data.gitLink)
                        } else if (response.data.status === "Validation failed" && response.data.data.Remarks) {
                            alert(response.data.data.Remarks)
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            }
        )

    }

    useEffect(() => { getData() }, [])
    return (
        <div>
            <StudNavBar />
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Submitted Task</h2>
                    <form action="#">
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GitHub Link</label>
                                <input type="text" name="gitLink" value={updateSubTaskField.gitLink} onChange={updateSubTaskHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type GitHub Link" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Remarks</label>
                                <textarea name="remarks" value={updateSubTaskField.remarks} onChange={updateSubTaskHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Remarks" required></textarea>

                            </div>
                        </div>
                        <br />
                        <button onClick={updateSubmittedTask} className="btn btn-primary">Update</button>
                    </form>
                </div>
            </section>


        </div>
    )
}

export default StudentUpdateSubmittedTask