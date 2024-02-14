import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StudNavBar from './StudNavBar'
import '../../config/config'
import { Link, useNavigate } from 'react-router-dom'

const StudentViewUpcomingSession = () => {

    const [studentViewUpcomingSessionData, setStudentViewUpcomingSessionData] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const apiUrl = global.config.urls.api.server + "/api/lms/viewUpcomingSessions"

    const getData = () => {
        let data = { "batchId": sessionStorage.getItem("studBatchId") }
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
                if (response.data.status === "success") {
                    setStudentViewUpcomingSessionData(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized access!!") {
                        navigate("/studentLogin")
                        sessionStorage.removeItem("studentkey");
                        sessionStorage.removeItem("studentId");
                        sessionStorage.removeItem("studemail");
                        sessionStorage.removeItem("studBatchId");
                        sessionStorage.removeItem("studLoginToken");
                        sessionStorage.removeItem("subtaskId");
                    } else {
                        if (!response.data.data) {
                            console.log(response.data.status)
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            })
            .catch(error => {
                console.log("Error Retrieving Session : ", error);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function formatTime(timeString) {
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], options);
    }

    useEffect(() => { getData() }, [])

    return (
        <div>
            <StudNavBar />
            <div className="bg-light py-3 py-md-5">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
                            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                                <div className="row gy-3 gy-md-4 overflow-hidden">
                                    <div className="col-12 text-center">
                                        <h1>Upcoming Sessions</h1>
                                    </div>
                                    {loading ? (
                                        <div className="col-12 text-center">
                                            <div className="text-center">
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        studentViewUpcomingSessionData.length === 0 ? (
                                            <div className="col-12 text-center">No Sessions Found!</div>
                                        ) : (
                                            studentViewUpcomingSessionData.map((value, index) => {
                                                return (
                                                    <div class="max-w-2xl mx-auto">
                                                        <div key={index} className="flex mb-6">
                                                            <div className="w-2 bg-blue-500 rounded-l-xl"></div>
                                                            <div className="flex-grow bg-white rounded-r-xl shadow-lg p-6">
                                                                <div className="flex justify-between items-center mb-4">
                                                                    <h2 className="text-lg text-blue-600 font-semibold">{value.sessionName}</h2>
                                                                    <button className="text-blue-600 text-sm">
                                                                        <span>...</span>
                                                                    </button>
                                                                </div>
                                                                <p className="text-sm text-gray-600">{value.remarks}</p>
                                                                <p className="text-sm text-gray-600 mt-1">Date: {value.date}</p>
                                                                <p className="text-sm text-gray-600">Time: {formatTime(value.time)}</p>
                                                                <p className="text-sm text-gray-600">Trainer Name: {value.trainerName}</p>
                                                                <p className="text-sm text-gray-600">Type: {value.type}</p>
                                                                {!value.venueORlink.includes("meet.google.com") && (
                                                                    <p className="text-sm text-gray-600">Venue: {value.venueORlink}</p>
                                                                )}
                                                                <div className="flex gap-4 mt-4">
                                                                    {value.venueORlink.includes("meet.google.com") && (
                                                                        <a href={value.venueORlink} className="text-white bg-blue-500 px-3 py-1 rounded-full text-xs font-semibold" target='_blank' rel='noopener noreferrer'>Meeting Link</a>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })

                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentViewUpcomingSession