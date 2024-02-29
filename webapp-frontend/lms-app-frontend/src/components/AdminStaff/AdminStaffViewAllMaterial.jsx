import React, { useEffect, useState } from 'react'
import '../../config/config'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AdmStaffNavBar from './AdmStaffNavBar'



const AdminStaffViewAllMaterial = () => {
    const [materialData, setmaterialData] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/AdmViewAllMaterial"
    const navigate = useNavigate();

    const getData = () => {
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admstaffLogintoken"),
                "key": sessionStorage.getItem("admstaffkey")
            }
        }
        axios.post(apiUrl, {}, axiosConfig).then(
            (response) => {
                if (response.data) {
                    setmaterialData(response.data)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/admstafflogin")
                        sessionStorage.clear()
                    } else {
                        if (!response.data) {
                            setmaterialData([])
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            }
        )
    }

    const UpdateClick = (id) => {
        let data = id
        sessionStorage.setItem("materialId", data)
        navigate("/AdminStaffUpdateMaterial")

    }

    useEffect(() => { getData() }, [])
    return (
        <div>
            <AdmStaffNavBar />
            <br />
            <strong>AdminStaff View All Materials</strong>
            <br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                File Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Material Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Remark
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Material Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Added Date
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {materialData.length > 0 ? ( // Check if materialData array is not empty
                            materialData.map((value, index) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                        <td className="px-6 py-4">{value.fileName}</td>
                                        <td className="px-6 py-4">{value.materialDesc}</td>
                                        <td className="px-6 py-4">{value.remarks}</td>
                                        <td className="px-6 py-4">{value.materialType}</td>
                                        <td className="px-6 py-4">{value.addedDate}</td>
                                        <td className="px-6 py-4">
                                            <Link target="_blank" to={value.uploadFile} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View Material</Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link onClick={() => { UpdateClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update Material</Link>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4" colSpan="7" style={{ textAlign: "center" }}>No Materials Found !!</td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default AdminStaffViewAllMaterial


