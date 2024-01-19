import axios from 'axios'
import React, { useEffect, useState } from 'react'

const StudentViewTasks = () => {

    const [studViewTaskData, setStudViewTaskData] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/studViewTask"

    const getData = () => {
        let data = { "id": sessionStorage.getItem("studentId") }
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken"),
                "key": sessionStorage.getItem("studentkey")
            }
        }
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                setStudViewTaskData(response.data.data)
                console.log(response.data)
            }
        )
    }

    useEffect(() => { getData() }, [])

    return (
        <div>
            <section className="flex flex-col justify-center antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
                <div className="h-full">
                    {/* Cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {studViewTaskData.map(
                            (task, index) => {
                                return <div className="bg-white shadow-lg rounded-md p-4">
                                    <h2 className="text-lg font-semibold mb-2">{task.taskTitle}</h2>
                                    <p className="text-gray-500 mb-4">{task.taskDesc}</p>
                                    <p className="text-gray-700 mb-2">
                                        <strong>Task Type:</strong> {task.taskType}
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        <strong>Total Score:</strong> {task.totalScore}
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        <strong>Added Date:</strong> {new Date(task.addedDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
                                    </p>
                                    <tr>
                                        <td>
                                            <div className="flex justify-start" >
                                                <a target = "_blank" href={task.taskFileUpload} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View Material</a>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex justify-end">
                                                <button className="bg-green-500 text-white px-4 py-2 rounded-md">Submit Task</button>
                                            </div>
                                        </td>

                                    </tr>
                                </div>
                            })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default StudentViewTasks