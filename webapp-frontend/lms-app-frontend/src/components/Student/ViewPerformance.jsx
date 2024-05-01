import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../config/config';
import axios from 'axios';

const ViewPerformance = () => {
    const [scoreData, setScoreData] = useState([])
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    const apiurl = global.config.urls.api.server + "/api/lms/overallstudperformancestudwise"

    const getData = () => {
        let data = {
            "studId": sessionStorage.getItem("studentId")
        }

        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken"),
                "key": sessionStorage.getItem("studentkey")
            }
        }
        axios.post(apiurl, data, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setLoading(false)
                    setScoreData(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/studentLogin")
                        sessionStorage.clear()
                    } else {
                        if (!response.data.data) {
                            setLoading(false)
                            setScoreData([])
                        } else {
                            setLoading(false)
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
            <section className="bg-gray-100 dark:bg-dark py-20 lg:py-[120px]">
                <div className="container mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="flex justify-between items-center mt-8 ml-4 mb-4">
                                <h2 className="text-lg font-bold">Overall Performance</h2>
                                <button type='button' onClick={() => navigate(-1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginRight: '20px' }}>Back</button>
                            </div>
                            <br />
                            <div className="max-w-full overflow-x-auto">
                                {loading ? <div className="col-12 text-center">Loading...</div> : <table className="w-full table-auto">
                                    <thead>
                                        <tr className="text-center bg-primary">
                                            <th className="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Total Task Assigned
                                            </th>
                                            <th className="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Total Tasks Submitted
                                            </th>
                                            <th className="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Tasks Submitted On Time
                                            </th>
                                            <th className="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Tasks Submitted Late
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Total Score
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Score Obtained
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scoreData.length > 0 ? scoreData.map(
                                            (value, index) => {
                                                return <tr key={index}>
                                                    <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.totalTasksAssigned}
                                                    </td>
                                                    <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.totalTasksSubmitted}
                                                    </td>
                                                    <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.tasksSubmittedOnTime}
                                                    </td>
                                                    <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.tasksSubmittedLate}
                                                    </td>
                                                    <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.totalScore}
                                                    </td>
                                                    <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.score >= (value.totalScore * 0.85) ? (
                                                            <span className="flex items-center justify-center text-black-500">
                                                                {value.score.toFixed(2)}
                                                                <img src="https://www.svgrepo.com/show/475275/star.svg" alt="Excellent" style={{ width: '20px', marginLeft: '10px' }} />
                                                            </span>
                                                        ) : (
                                                            value.score.toFixed(2)
                                                        )}
                                                    </td>

                                                </tr>
                                            }
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                    No Tasks Assigned !!!
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ViewPerformance