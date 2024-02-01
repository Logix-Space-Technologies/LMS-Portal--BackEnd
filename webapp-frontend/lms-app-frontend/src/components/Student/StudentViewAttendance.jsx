import React, { useEffect, useState } from 'react';
import '../../config/config';
import axios from 'axios';
import StudNavBar from './StudNavBar';

const StudentViewAttendance = () => {
    const [studentViewAttendance, setStudentViewAttendance] = useState([]);

    const apiUrl = global.config.urls.api.server + '/api/lms/studentViewAttendance';

    const getData = () => {
        const data = { "studId": sessionStorage.getItem('studentId') };
        console.log(data)
        const axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": sessionStorage.getItem("studLoginToken")
            },
        };

        axios.post(apiUrl, data, axiosConfig).then((response) => {
            setStudentViewAttendance(response.data.data);
            console.log(response.data);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <StudNavBar/>
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
                                    <p className="block antialiased font-sans text-sm text-black font-bold leading-none opacity-70">Status</p>
                                </th>


                            </tr>
                        </thead>
                        <tbody>
    {studentViewAttendance && studentViewAttendance.map((value, index) => {
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

export default StudentViewAttendance