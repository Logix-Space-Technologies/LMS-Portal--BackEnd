import React, { useEffect, useState } from 'react';
import '../../config/config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CollegeStaffViewAttendance = () => {
    const [clgStaffViewAttendance, setClgStaffViewAttendance] = useState([]);

    const apiUrl = global.config.urls.api.server + '/api/lms/colgstaffviewattendance';

    const navigate = useNavigate()

    const getData = () => {
        const data = { "sessionId": sessionStorage.getItem("viewattendanceid") };
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
                setClgStaffViewAttendance(response.data.data);
            } else {

                if (response.data.status === "Unauthorized User!!") {
                    sessionStorage.clear()
                    navigate("/clgStafflogin")
                } else {
                    if (!response.data.data) {
                        //no data found
                    } else {
                        alert(response.data.status)
                    }
                }
            }

        });
    };

    useEffect(() => { getData() }, []);
    return (
        <div>
            <div className="flex justify-between items-center mt-8 ml-4 mb-4">
                <h2 className="text-lg font-bold">College Staff View Attendance</h2>
                <Link to="/clgstaffviewsession" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginRight: '20px' }}>Back</Link>
            </div>
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="p-6 overflow-scroll px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <p className="block antialiased font-sans text-sm text-black font-bold leading-none opacity-70">Session Name</p>
                                </th>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <p className="block antialiased font-sans text-sm text-black font-bold leading-none opacity-70">Date</p>
                                </th>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <p className="block antialiased font-sans text-sm text-black font-bold leading-none opacity-70">Membership_no</p>
                                </th>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <p className="block antialiased font-sans text-sm text-black font-bold leading-none opacity-70">Student Name</p>
                                </th>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <p className="block antialiased font-sans text-sm text-black font-bold leading-none opacity-70">Status</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {clgStaffViewAttendance ? (clgStaffViewAttendance.map((value, index) => {
                                const isPresent = value.attendence_status.toLowerCase() === 'present';
                                const buttonClassName = isPresent ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700';

                                console.log('attendence_status:', value.attendence_status);
                                return (
                                    <tr key={index}>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{value.sessionName}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{value.date}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{value.membership_no}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{value.studName}</p>
                                        </td>

                                        <td className={`p-4 border-b border-blue-gray-50`}>
                                            <div className="w-max">
                                                <button className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none py-0.5 px-1 text-xs rounded-md ${buttonClassName}`} style={{ opacity: 1 }}>
                                                    {isPresent ? 'Present' : 'Absent'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })) : (
                                <td colSpan="8" className="px-6 py-4">
                                    No Attendance Record Found !!!
                                </td>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CollegeStaffViewAttendance