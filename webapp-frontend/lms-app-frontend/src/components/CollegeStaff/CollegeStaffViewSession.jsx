import React, { useEffect, useState } from 'react'
import '../../config/config';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CollegeStaffViewSession = () => {
    const [sessionData, setSessionData] = useState([])
    const [loading, setLoading] = useState(true);

    const apiUrl = global.config.urls.api.server + "/api/lms/ClgStaffViewSession";

    const getData = () => {
        const data = { "batchId": sessionStorage.getItem("clgstaffbatchId") };
        console.log(data)
        const axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": sessionStorage.getItem("clgstaffLogintoken"),
                "key": sessionStorage.getItem("clgstaffkey")

            },
        };

        axios.post(apiUrl, data, axiosConfig).then((response) => {
            setSessionData(response.data.data);
            console.log(response.data.data);
            setLoading(false)
        });
    };

    function formatTime(timeString) {
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], options);
    }

    const viewsessionId = (attendanceid) => {
        sessionStorage.setItem("viewattendanceid", attendanceid)
    }

    useEffect(() => { getData() }, []);


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

                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessionData && sessionData.map((value, index) => {
                                return (
                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
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
                                            <Link to="/clgstaffviewtask" onClick={() => viewsessionId(value.id)} type="button" class="btn btn-primary">
                                                View Tasks
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to="/clgstaffviewattendance" onClick={() => viewsessionId(value.id)} type="button" class="btn btn-primary">
                                                View Attendance
                                            </Link>
                                        </td>
                                    </tr>

                                );
                            })}
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