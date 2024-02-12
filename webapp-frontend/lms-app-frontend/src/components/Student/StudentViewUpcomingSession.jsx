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
                    console.log(response.data)
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
                                                    <div key={index} style={{ position: 'relative', width: '700px', height: '317px', borderRadius: '10px', transition: '0.3s', fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
                                                        <div style={{ padding: '10px 16px', backgroundColor: '#AAF1F5', color: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                                            <h4><b>{value.sessionName}</b></h4>
                                                        </div>
                                                        <div style={{ padding: '2px 16px', flex: '1 0 auto', backgroundColor: '#EFF1DB', paddingTop: value.venueORlink.includes('meet.google.com') ? '60px' : '40px', }}>
                                                            <p style={{ marginBottom: '10px' }}><b>Date:</b> {value.date}</p>
                                                            <p style={{ marginBottom: '10px' }}><b>Time:</b> {formatTime(value.time)}</p>
                                                            <p style={{ marginBottom: '10px' }}><b>Type:</b> {value.type}</p>
                                                            <p style={{ marginBottom: '10px' }}><b>Trainer Name:</b> {value.trainerName}</p>
                                                            {!value.venueORlink.includes("meet.google.com") && (
                                                                <p style={{ marginBottom: '10px' }}><b>Venue:</b> {value.venueORlink}</p>
                                                            )}
                                                        </div>
                                                        <div style={{ padding: '10px 16px', backgroundColor: '#D3B5E5', color: 'white', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', display: 'flex', justifyContent: 'space-around' }}>
                                                            {value.venueORlink.includes("meet.google.com") && (
                                                                <Link to={value.venueORlink} target='_blank' rel='noopener noreferrer' style={{ color: 'white', textDecoration: 'none', backgroundColor: '#FBC740', padding: '10px', borderRadius: '5px', margin: '0 10px' }} class="text-black bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                                                    <img src="https://www.svgrepo.com/show/504419/google-meet.svg" class="w-4 h-4 me-2" aria-hidden="true" alt='' />
                                                                    Meeting Link
                                                                </Link>

                                                            )}
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