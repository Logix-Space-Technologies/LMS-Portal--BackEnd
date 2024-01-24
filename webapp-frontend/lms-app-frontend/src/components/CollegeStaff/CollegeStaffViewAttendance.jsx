import React, { useEffect, useState } from 'react';
import '../../config/config';
import axios from 'axios';

const CollegeStaffViewAttendance = () => {
    const [clgStaffViewAttendance, setClgStaffViewAttendance] = useState([]);

    const apiUrl = global.config.urls.api.server + '/api/lms/colgstaffviewattendance';

    const getData = () => {
        const data = { "clgStaffId": sessionStorage.getItem('clgStaffId'), "collegeId": sessionStorage.getItem('clgStaffCollegeId') };
        console.log(data)
        const axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": sessionStorage.getItem("clgstaffLogintoken"),
                "key": sessionStorage.getItem("clgstaffkey")
                
            },
        };
        console.log(axiosConfig)

        axios.post(apiUrl, data, axiosConfig).then((response) => {
            setClgStaffViewAttendance(response.data.data);
            console.log(response.data.data);
            console.log("first")
        });
    };

    useEffect(() => { getData() }, []);
    return (
        <div>
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
                            {clgStaffViewAttendance && clgStaffViewAttendance.map((value, index) => {
                                const isPresent = value.attendence_status.toLowerCase() === 'present';
                                const buttonClassName = isPresent ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700';

                                console.log('attendence_status:', value.attendence_status);
                                return (
                                    <tr key={index}>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{value.sessionName}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{new Date(value.date).toLocaleDateString()}</p>
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
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CollegeStaffViewAttendance