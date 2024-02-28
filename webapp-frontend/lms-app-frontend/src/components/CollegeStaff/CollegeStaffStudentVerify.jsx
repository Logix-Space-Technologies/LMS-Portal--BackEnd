import React, { useEffect, useState } from 'react'
import '../../config/config'
import axios from 'axios'
import ClgStaffNavbar from './ClgStaffNavbar'
import { useNavigate } from 'react-router-dom'

const CollegeStaffStudentVerify = () => {

    const [studentData, setStudentData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10); // Number of students per page


    const apiUrl = global.config.urls.api.server + "/api/lms/unverifiedStudents"
    const apiUrl2 = global.config.urls.api.server + "/api/lms/studentverificationbyCollegeStaff"

    const navigate = useNavigate()

    const getData = () => {
        let data = { "collegeId": sessionStorage.getItem("clgStaffCollegeId") }
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("clgstaffLogintoken"),
                "key": sessionStorage.getItem("clgstaffkey")
            }
        }
        axios.post(apiUrl, data, axiosConfig).then(
            (Response) => {
                if (Response.data.data) {
                    setStudentData(Response.data.data)
                } else {
                    if (Response.data.status === "Unauthorized User!!") {
                        sessionStorage.clear()
                        navigate("/clgStafflogin")
                    } else {
                        if (!Response.data.data) {
                            //no data found
                        } else {
                            alert(Response.data.status)
                        }
                    }
                }
            }
        )
    }

    const handleClick = (studentId) => {
        let data = { "collegeId": sessionStorage.getItem("clgStaffCollegeId"), "studentId": studentId }
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("clgstaffLogintoken")
            }
        }
        axios.post(apiUrl2, data, axiosConfig).then(
            (response) => {
                if (response.data.status === "Success") {
                    alert("Student verified successfully!!")
                    setStudentData(studentData.filter(student => student.id !== studentId));
                    
                } else {
                    if (response.data.status === "Unauthorized User!!!") {
                        sessionStorage.clear()
                        navigate("/clgStafflogin")
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    // Logic for displaying current students
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = studentData ? studentData.slice(indexOfFirstStudent, indexOfLastStudent) : [];


    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => { getData(); }, []);

    // Calculate total pages
    const totalPages = Math.ceil(studentData.length / studentsPerPage);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * studentsPerPage) + index + 1;
    }


    return (

        <div>
            <ClgStaffNavbar />
            <br /><br />
            <div className="flex justify-between items-center mt-16 ml-16 mb-16">
                <h2 className="text-lg font-bold">College Staff Verify Student</h2>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                
                            </th>
                            <th scope="col" className="px-6 py-3">
                                S/L
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Department
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Course
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Admission No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Roll No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Aadhar No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Batch Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Membership No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date Of Registartion
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Validity
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map((value, index) => {
                            return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={value.studProfilePic} alt="" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{value.studName}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {calculateSerialNumber(index)}
                                </td>
                                <td className="px-6 py-4">
                                    {value.studDept}
                                </td>
                                <td className="px-6 py-4">
                                    {value.course}
                                </td>
                                <td className="px-6 py-4">
                                    {value.admNo}
                                </td>
                                <td className="px-6 py-4">
                                    {value.rollNo}
                                </td>
                                <td className="px-6 py-4">
                                    {value.studEmail}
                                </td>
                                <td className="px-6 py-4">
                                    {value.studPhNo}
                                </td>
                                <td className="px-6 py-4">
                                    {value.aadharNo}
                                </td>
                                <td className="px-6 py-4">
                                    {value.batchName}
                                </td>
                                <td className="px-6 py-4">
                                    {value.membership_no}
                                </td>
                                <td className="px-6 py-4">
                                    {value.addedDate}
                                </td>
                                <td className="px-6 py-4">
                                    {value.validity}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleClick(value.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Verify</button>
                                </td>
                            </tr>
                        })}
                        {currentStudents.length === 0 && (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td colSpan="13" className="px-6 py-4" style={{ textAlign: 'center' }}>
                                    No Students Found !!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstStudent + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{indexOfLastStudent > studentData.length ? studentData.length : indexOfLastStudent}</span> of <span className="font-semibold text-gray-900 dark:text-white">{studentData.length}</span> Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                    {currentPage > 1 && (
                        <button onClick={() => paginate(currentPage - 1)} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Prev
                        </button>
                    )}
                    {currentPage < totalPages && (
                        <button onClick={() => paginate(currentPage + 1)} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CollegeStaffStudentVerify