import React, { useEffect, useState } from 'react'
import '../../config/config'
import axios from 'axios'

const CollegeStaffStudentVerify = () => {

    const [studentData, setStudentData] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/unverifiedStudents"

    const getData = () => {
        let axiosConfig = {
            headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem('clgstafftoken'),
                "key": "lmsappclgstaff"
            }
        }
        axios.post(apiUrl, axiosConfig).then(
            (Response) => {
                console.log(axiosConfig)
                setStudentData(Response.data)
                console.log(Response.data)
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
                            <h2 className="font-semibold text-gray-800">Student Verification</h2>
                        </header>
                        <div className="p-3">
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                        <tr>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Name</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Department</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Course</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Admission No.</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Roll No.</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Email</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Phone</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Aadhar No</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Batch Id</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Membership No.</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {[studentData].map((student, index) => (
                                            <tr key={index}>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                            <img
                                                                className="rounded-full"
                                                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                                                                width={40}
                                                                height={40}
                                                                alt={student.name}
                                                            />
                                                        </div>
                                                        <div className="font-medium text-gray-800">{student.name}</div>
                                                    </div>
                                                </td>
                                                {/* Add the rest of your table data here */}
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left">{student.email}</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-medium text-green-500">{/* Add your data here */}</div>
                                                </td>
                                                {/* Add the rest of your table data here */}
                                                <td className="p-2 whitespace-nowrap">
                                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Verify</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* More components */}
            {/* <div x-show="open" className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60" x-data="{ open: true }">
    <div className="bg-gray-800 text-gray-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
      <div>👉 <a className="hover:underline ml-1" href="https://cruip.com/?ref=codepen-cruip-customers-table" target="_blank">More components on Cruip.com</a></div>
      <button className="text-gray-500 hover:text-gray-400 ml-5" >
        <span className="sr-only">Close</span>
        <svg className="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 16 16">
          <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
        </svg>
      </button>
    </div>
  </div> */}
        </div>


    )
}

export default CollegeStaffStudentVerify