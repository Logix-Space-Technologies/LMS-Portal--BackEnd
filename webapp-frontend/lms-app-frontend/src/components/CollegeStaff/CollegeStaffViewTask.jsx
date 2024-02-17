import React, { useEffect, useState } from 'react'
import '../../config/config';
import axios from 'axios';
import ClgStaffNavbar from './ClgStaffNavbar';
import { Link } from 'react-router-dom';

const CollegeStaffViewTask = () => {
    const [taskData, setTaskData] = useState([])

    const apiurl = global.config.urls.api.server + "/api/lms/clgstaffviewtask"

    const getData = () => {
        let data = { "batchId": sessionStorage.getItem("taskviewid") }
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("clgstaffLogintoken"),
                "key": sessionStorage.getItem("clgstaffkey")
            }
        }
        axios.post(apiurl, data, axiosConfig).then(
            (response) => {
                setTaskData(response.data.data)
                console.log(response.data)
            }
        )
    }

    // Determine if any task has a dueDate not equal to "Past Due Date"
    const hasFutureDueDate = taskData.some(task => task.dueDate !== "Past Due Date");

    useEffect(() => { getData() }, [])
    return (
        <div>
            {/* ====== Table Section Start */}
            <section className="bg-white dark:bg-dark py-20 lg:py-[120px]">
                <div className="container mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="flex justify-between items-center mt-8 ml-4 mb-4">
                                <h2 className="text-lg font-bold">College Staff View Tasks</h2>
                                <Link to="/clgstaffviewsession" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginRight: '20px' }}>Back</Link>
                            </div>
                            <br />
                            <div className="max-w-full overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="text-center bg-primary">
                                            <th className="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Batch ID
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Title
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Description
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Task Type
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Total Score
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Due Date
                                            </th>
                                            {hasFutureDueDate && (
                                                <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">

                                                </th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {taskData.map(
                                            (value, index) => {
                                                return <tr>
                                                    <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.batchId}
                                                    </td>
                                                    <td className="text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.taskTitle}
                                                    </td>
                                                    <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.taskDesc}
                                                    </td>
                                                    <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.taskType}
                                                    </td>
                                                    <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.totalScore}
                                                    </td>
                                                    {value.dueDate === "Past Due Date" && (
                                                        <>
                                                            <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                                {value.dueDate}
                                                            </td>
                                                        </>
                                                    )}
                                                    {value.dueDate !== "Past Due Date" && (
                                                        <>
                                                            <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                                {value.dueDate}
                                                            </td>
                                                            <td class="text-dark border-b border-r border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                                <a target='_blank' href={value.taskFileUpload} class="inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium">
                                                                    View Material
                                                                </a>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ====== Table Section End */}
        </div>
    )
}

export default CollegeStaffViewTask