import React, { useEffect, useState } from 'react';
import '../../config/config';
import axios from 'axios';
import Navbar from './Navbar';

const AdminViewAllStud = () => {
    const [studData, setStudData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10); // Number of students per page

    const apiUrl = global.config.urls.api.server + "/api/lms/viewAllStudByAdmin";

    const getData = () => {
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        axios.post(apiUrl, {}, axiosConfig).then(
            (response) => {
                setStudData(response.data.data);
                console.log(response.data.data);
            }
        );
    };

    // Logic for displaying current students
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = studData ? studData.slice(indexOfFirstStudent, indexOfLastStudent) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => { getData() }, []);

    return (
        <div>
            <Navbar />
            <br />
            <strong>Admin View All Students</strong><br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Membership No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                College Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Batch Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Admission No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Roll No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Department
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Course
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Aadhar No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Valid Upto
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map(
                            (value, index) => {
                                return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className="w-10 h-10 rounded-full" src={value.studProfilePic} alt="" />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{value.studName}</div>
                                            <div className="font-normal text-gray-500">{value.studEmail}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        {value.membership_no}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.collegeName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.batchName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.admNo}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.rollNo}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.studDept}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.course}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.aadharNo}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.studPhNo}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(value.validity).toLocaleDateString()}
                                    </td>
                                </tr>
                            }
                        )}
                    </tbody>
                </table>
                <div className="flex justify-center mt-8">
                    <nav>
                        <ul className="flex list-style-none">
                            {currentPage > 1 && (
                                <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                    Previous
                                </li>
                            )}
                            {Array.from({ length: Math.ceil(studData.length / studentsPerPage) }, (_, i) => (
                                <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    {i + 1}
                                </li>
                            ))}
                            {currentPage < Math.ceil(studData.length / studentsPerPage) && (
                                <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                    Next
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default AdminViewAllStud;
