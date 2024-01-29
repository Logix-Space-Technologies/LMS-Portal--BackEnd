import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StudNavBar from './StudNavBar'

const StudentViewUpcomingSession = () => {

    const [studentViewUpcomingSessionData, setStudentViewUpcomingSessionData] = useState([])
    const [loading, setLoading] = useState(true)

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
                    console.log(response.data)
                } else {
                    console.log(response.data.status)
                }
            })
            .catch(error => {
                console.log("Error Retrieving Session : ", error);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => { getData() }, [])

    return (
        <div>
            <StudNavBar/>
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
                                            <div class="text-center">
                                                <div class="spinner-border" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        studentViewUpcomingSessionData.length === 0 ? (
                                            <div className="col-12 text-center">No Sessions Found!</div>
                                        ) : (
                                            studentViewUpcomingSessionData.map((value, index) => {
                                                return (
                                                    <div key={index} className="col-12">
                                                        <div className="card shadow"> {/* Add "shadow" class here */}
                                                            <div className="card-body rounded shadow-sm">
                                                                <h5 className="card-title">Session Name: {value.sessionName}</h5>
                                                                <p className="card-text">Date: {new Date(value.date).toDateString()}</p>
                                                                <p className="card-text">Time: {value.time}</p>
                                                                <p className="card-text">Type: {value.type}</p>
                                                                <p className="card-text">Remarks: {value.remarks}</p>
                                                                <p className="card-text">Venue/Link: {value.venueORlink}</p>
                                                                <p className="card-text">Trainer Name: {value.trainerName}</p>
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