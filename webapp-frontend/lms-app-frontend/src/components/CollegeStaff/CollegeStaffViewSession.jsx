import React, { useEffect, useState } from 'react'
import '../../config/config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CollegeStaffViewSession = () => {
    const [sessionData, setSessionData] = useState([])
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/ClgStaffViewSession";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/GenerateSessionWiseAttendancePdf";

    const getData = () => {
        const data = { "batchId": sessionStorage.getItem("clgstaffbatchId") };
        const axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": sessionStorage.getItem("clgstaffLogintoken"),
                "key": sessionStorage.getItem("clgstaffkey")
            },
        };

        axios.post(apiUrl, data, axiosConfig).then((response) => {
            if (response.data.data) {
                setSessionData(response.data.data);
                setLoading(false)
            } else {
                if (response.data.status === "Unauthorized access!!") {
                    sessionStorage.clear()
                    navigate("/clgStafflogin")
                } else {
                    if (!response.data.data) {
                        //No Data Found !!!
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        });
    };

    const attendancePdfGenerate = async (id) => {
        try {
            const data = { "sessionId": id }
            const axiosConfig2 = {
                headers: {
                    "Content-Type": "application/json",
                    "token": sessionStorage.getItem("clgstaffLogintoken"),
                    "key": sessionStorage.getItem("clgstaffkey")
                },
                responseType: 'blob', // Set responseType to 'blob' for PDF
            };

            const response = await axios.post(apiUrl2, data, axiosConfig2);

            if (response.data) {
                // Use window.open directly with response.data
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                window.open(URL.createObjectURL(pdfBlob), '_blank');
            } else {
                if (response.data.status === "Unauthorized User!!") {
                    sessionStorage.clear()
                    navigate("/clgStafflogin")
                } else {
                    if (!response.data) {
                        alert("No Data Found !!")
                    } else {
                        alert(response.data.status);
                    }
                }
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF.');
        }
    }

    function formatTime(timeString) {
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], options);
    }

    const viewsessionId = (attendanceid) => {
        sessionStorage.setItem("viewattendanceid", attendanceid)
    }

    useEffect(() => { getData() }, []);

    const isSessionPast = (sessionDate, sessionTime) => {
        // Split sessionDate and sessionTime strings
        const dateParts = sessionDate.split('/');
        const timeParts = sessionTime.split(':');

        // Parse date and time components
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Adjust month to be zero-indexed
        const year = parseInt(dateParts[2], 10);
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);

        // Create a Date object for the session's date and time
        const sessionDateTime = new Date(year, month, day, hours, minutes);

        // Get the current date and time
        const currentTime = new Date();

        // Return true if the session date-time is in the past
        return sessionDateTime < currentTime;
    };


    return (
        <div>
            <div>
                <br />
                <br />
                <div className="flex justify-between items-center mt-8 ml-4 mb-4">
                    <h2 className="text-lg font-bold">College Staff View Session</h2>
                    <Link to="/collegeStaffViewBatch" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginRight: '20px' }}>Back</Link>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Session Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Remarks
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Venue Or Link
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessionData.length > 0 ? sessionData.map((value, index) => {
                                // Check if the session is in the past
                                const sessionIsPast = isSessionPast(value.date, value.time);
                                return (
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <td className="px-6 py-4">
                                            {value.sessionName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.date}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatTime(value.time)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.type}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.remarks}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.venueORlink}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.cancelStatus}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.cancelStatus === "ACTIVE" && (
                                                <button className="btn btn-primary" onClick={() => attendancePdfGenerate(value.id)} disabled={!sessionIsPast}>
                                                    Download Attendance List PDF
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.cancelStatus === "ACTIVE" && (
                                                <Link to="/clgstaffviewattendance" onClick={() => viewsessionId(value.id)} type="button" class="btn btn-primary">
                                                    View Attendance List
                                                </Link>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.cancelStatus === "ACTIVE" && (
                                                <Link to="/clgstaffviewtask" onClick={() => viewsessionId(value.id)} type="button" class="btn btn-primary">
                                                    View Tasks
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                );
                            }) : (<td colSpan="8" className="px-6 py-4" style={{ textAlign: "center" }}>
                                No Sessions Found !!!
                            </td>)}
                        </tbody>
                    </table>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export default CollegeStaffViewSession