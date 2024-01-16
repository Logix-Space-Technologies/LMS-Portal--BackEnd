import React, { useEffect, useState } from 'react'
import '../../config/config'
import axios from 'axios'

const CollegeStaffStudentVerify = () => {

    const [studentData, setStudentData] = useState([])


    const apiUrl = global.config.urls.api.server + "/api/lms/unverifiedStudents"
    const apiUrl2 = global.config.urls.api.server + "/api/lms/studentverificationbyCollegeStaff"

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
                console.log(axiosConfig)
                setStudentData(Response.data.data)
                console.log(Response.data.data)
            }
        )
    }

    const handleClick = (studentId) => {
        let data = { "collegeId": sessionStorage.getItem("clgStaffCollegeId"), "studentId": studentId }
        console.log(data)
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("clgstaffLogintoken")
            }
        }
        axios.post(apiUrl2, data, axiosConfig).then(
            (response)=>{
                if (response.data.status === "Success") {
                    alert("Student verified successfully!!")
                } else {
                    alert(response.data.status)
                }
            }
        )
    }

    useEffect(() => { getData() }, [])

    return (
        <div>
            <section className="flex flex-col justify-center antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
                <div className="h-full">
                    {/* Table */}
                    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                        <header className="px-5 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-2xl text-gray-800">Student Verification</h2>
                        </header>
                        <div className="p-3">
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                        <tr>
                                            <th className="p-4 whitespace-nowrap">
                                                <div className="font-semibold text-left">Name</div>
                                            </th>
                                            <th className="p-4 whitespace-nowrap">
                                                <div className="font-semibold text-left">Department</div>
                                            </th>
                                            <th className="p-4 whitespace-nowrap">
                                                <div className="font-semibold text-left">Course</div>
                                            </th>
                                            <th className="p-4 whitespace-nowrap">
                                                <div className="font-semibold text-center">Admission No.</div>
                                            </th>
                                            <th className="p-4 whitespace-nowrap">
                                                <div className="font-semibold text-center">Roll No.</div>
                                            </th>
                                            <th className="p-4 whitespace-nowrap">
                                                <div className="font-semibold text-center">Email</div>
                                            </th>
                                            <th className="p-4 whitespace-nowrap">
                                                <div className="font-semibold text-center">Phone</div>
                                            </th>
                                            <th className="p-4 whitespace-nowrap">
                                                <div className="font-semibold text-center">Aadhar No</div>
                                            </th>
                                            <th className="p-4 whitespace-nowrap">
                                                <div className="font-semibold text-center">Batch Id</div>
                                            </th>
                                            <th className="p-4 whitespace-nowrap">
                                                <div className="font-semibold text-center">Membership No.</div>
                                            </th>
                                            <th className="p-4 whitespace-nowrap">
                                                <div className="font-semibold text-center"></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {studentData.map(
                                            (value, index) => (
                                                <tr key={index}>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                                <img
                                                                    className="w-18 h-14 flex-shrink-0 mr-2 sm:mr-3"
                                                                    src={value.studProfilePic}
                                                                    width="60px"
                                                                    height="64px"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="font-medium text-gray-800">{value.studName}</div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <div className="text-left">{value.studDept}</div>
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <div className="text-left">{value.course}</div>
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <div className="text-left">{value.admNo}</div>
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <div className="text-left">{value.rollNo}</div>
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <div className="text-left">{value.studEmail}</div>
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <div className="text-left">{value.studPhNo}</div>
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <div className="text-left">{value.aadharNo}</div>
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <div className="text-left">{value.batchId}</div>
                                                    </td>
                                                    <td className="p-4 whitespace-nowrap">
                                                        <div className="text-left">{value.membership_no}</div>
                                                    </td>

                                                    <td className="p-4 whitespace-nowrap">
                                                        <button onClick={()=> handleClick(value.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Verify</button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    )
}

export default CollegeStaffStudentVerify