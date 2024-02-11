import React, { useEffect, useState } from 'react';
import '../../config/config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const StudentViewAttendance = () => {
    const [studentViewAttendance, setStudentViewAttendance] = useState([]);
    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + '/api/lms/studentViewAttendance';

    const getData = () => {
        const data = { "studId": sessionStorage.getItem('studentId'), "sessionId": sessionStorage.getItem("SessionId") };
        console.log(data)
        const axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": sessionStorage.getItem("studLoginToken")
            },
        };

        axios.post(apiUrl, data, axiosConfig).then((response) => {
            if (response.data.data) {
                setStudentViewAttendance(response.data.data);
                console.log(response.data);
            } else {
                if (response.data.status === "Unauthorized User!!") {
                    navigate("/studentLogin")
                    sessionStorage.clear("studentkey");
                    sessionStorage.removeItem("studentId");
                    sessionStorage.removeItem("studemail");
                    sessionStorage.removeItem("studBatchId");
                    sessionStorage.removeItem("studLoginToken");
                    sessionStorage.removeItem("subtaskId");
                    sessionStorage.removeItem("SessionId")
                } else {
                    alert(response.data.status)
                }
            }
        });
    };


    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <br />
            <br />
            <div className="flex justify-between items-center mt-8 ml-4 mb-4">
                <h2 className="text-lg font-bold">Student View Attendance</h2>
                <Link to="/studSessionView" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginRight: '20px' }}>Back</Link>
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
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentViewAttendance && studentViewAttendance.map((value, index) => {
                            const isPresent = value.attendence_status.toLowerCase() === 'present';
                            const buttonClassName = isPresent ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700';

                            // Function to format the current date as dd/mm/yyyy
                            const getCurrentDateFormatted = () => {
                                const currentDate = new Date();
                                const day = String(currentDate.getDate()).padStart(2, '0');
                                const month = String(currentDate.getMonth() + 1); // January is 0!
                                const year = currentDate.getFullYear();
                                return `${day}/${month}/${year}`;
                            };

                            const currentDate = getCurrentDateFormatted()
                            console.log(currentDate)
                            console.log(value.date)
                            // Check if session date matches current date
                            const isSessionCurrentDate = value.date === currentDate;
                            console.log(isSessionCurrentDate)

                            console.log('attendence_status:', value.attendence_status);
                            return (
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">
                                        {value.sessionName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none py-0.5 px-1 text-xs rounded-md ${buttonClassName}`} style={{ opacity: 1 }}>
                                            {isPresent ? 'Present' : 'Absent'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        {isSessionCurrentDate && !isPresent && (
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Mark Attendance</a>
                                        )}
                                    </td>
                                </tr>

                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default StudentViewAttendance