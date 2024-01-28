import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import '../../config/config'
import axios from 'axios'

const AdminViewAllClgStaff = () => {
  const [clgStaffData, setClgStaffData] = useState([])

  const apiUrl = global.config.urls.api.server + "/api/lms/viewallcollegestaff"
  const apiUrl2 = global.config.urls.api.server + "/api/lms/deletecolgstaff"

  const getData = () => {
    let axiosConfig = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "token": sessionStorage.getItem("admtoken"),
        "key": sessionStorage.getItem("admkey")
      }
    }
    axios.post(apiUrl, {}, axiosConfig).then(
      (response) => {
        setClgStaffData(response.data)
        console.log(response.data)
      }
    )

  }

  const handleClick = (id) => {
    let data = { "id": id }
    let axiosConfigtwo = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "token": sessionStorage.getItem("admtoken"),
        "key": sessionStorage.getItem("admkey")
      }
    }
    axios.post(apiUrl2, data, axiosConfigtwo).then(
      (response) => {
        if (response.data.status === "Deleted successfully") {
          alert("College Staff Deleted!!")
          // Reload the page after clicking OK in the alert
          window.location.reload();
        } else {
          alert(response.data.status)
        }
      }
    )
  }

  useEffect(() => { getData() }, [])
  return (
    <div>
      <Navbar />
      <section className="flex flex-col justify-center antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
        <div className="h-full">
          {/* Table */}
          <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-2xl text-gray-800">Admin View All College Staff</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-4 whitespace-nowrap">
                        <div className="font-semibold text-left">College Staff ID</div>
                      </th>
                      <th className="p-4 whitespace-nowrap">
                        <div className="font-semibold text-left">College Name</div>
                      </th>
                      <th className="p-4 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="p-4 whitespace-nowrap">
                        <div className="font-semibold text-left">Department</div>
                      </th>
                      <th className="p-4 whitespace-nowrap">
                        <div className="font-semibold text-left">Address</div>
                      </th>
                      <th className="p-4 whitespace-nowrap">
                        <div className="font-semibold text-center">Email</div>
                      </th>
                      <th className="p-4 whitespace-nowrap">
                        <div className="font-semibold text-center">Phone No.</div>
                      </th>
                      <th className="p-4 whitespace-nowrap">
                        <div className="font-semibold text-center">Aadhar No</div>
                      </th>
                      <th className="p-4 whitespace-nowrap">
                        <div className="font-semibold text-center">Whether Email Verified ?</div>
                      </th>
                      <th className="p-4 whitespace-nowrap">
                        <div className="font-semibold text-center"></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {clgStaffData.map(
                      (value, index) => (
                        <tr key={index}>
                          <td className="p-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                <img
                                  className="w-18 h-14 flex-shrink-0 mr-2 sm:mr-3"
                                  src={value.profilePic}
                                  width="60px"
                                  height="64px"
                                  alt=""
                                />
                              </div>
                              <div className="font-medium text-gray-800">{value.id}</div>
                            </div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <div className="text-left">{value.collegeName}</div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <div className="text-left">{value.collegeStaffName}</div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <div className="text-left">{value.department}</div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <div className="text-left">{value.clgStaffAddress}</div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <div className="text-left">{value.email}</div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <div className="text-left">{value.phNo}</div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <div className="text-left">{value.aadharNo}</div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <div className="text-left">{value.emailVerificationStatus}</div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <button onClick={() => handleClick(value.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Delete</button>
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

export default AdminViewAllClgStaff