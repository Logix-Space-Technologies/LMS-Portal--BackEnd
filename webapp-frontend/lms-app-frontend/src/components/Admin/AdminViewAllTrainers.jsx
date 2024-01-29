import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import '../../config/config'
import axios from 'axios'

const AdminViewAllTrainers = () => {
    const [trainerData, setTrainerData] = useState([])

    const apiUrl = global.config.urls.api.server + "/api/lms/viewAllTrainer"

    const apiUrlTwo = global.config.urls.api.server + "/api/lms/deleteTrainer"

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
                setTrainerData(response.data.Trainers)
                console.log(response.data.Trainers)
            }
        )
    }

    const handleClick = (id) => {
        let data = { "id": id }
        let axiosConfigTwo = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        }
        axios.post(apiUrlTwo, data, axiosConfigTwo).then(
            (response) => {
                if (response.data.status === "success") {
                    // Reload the page after deleting trainer
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
            <Navbar /><br />
            <strong>Admin View All Trainers</strong>
            <br /><br />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Profile
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone Number
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainerData ? (trainerData.map(
                            (value, index) => {
                                return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className="w-10 h-10 rounded-full" src={value.profilePicture} alt="" />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{value.trainerName}</div>
                                            <div className="font-normal text-gray-500">{value.email}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        {value.about}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.phoneNumber}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a onClick={() => { handleClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete Trainer</a>
                                    </td>
                                </tr>
                            }
                        )) : <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4">

                            </td>
                            <td className="px-6 py-4">
                                No Trainers Found !!
                            </td>
                            <td className="px-6 py-4">

                            </td>
                            <td className="px-6 py-4">

                            </td>
                        </tr>}
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default AdminViewAllTrainers