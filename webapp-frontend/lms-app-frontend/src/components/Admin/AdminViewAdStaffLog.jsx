import React, { useEffect, useState } from 'react'
import '../../config/config';
import axios from 'axios';
import Navbar from './Navbar';

const AdminViewAdStaffLog = () => {


    const [adStaffLog, setAdStaffLog] = useState([[]])
    // const [isloading, setIsLoading] = useState(true)

    const apiUrl = global.config.urls.api.server + "/api/lms/viewalladmstafflog";

    const getData = () => {
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken")
            }
        };
        console.log(axiosConfig)
        axios.post(apiUrl, {}, axiosConfig).then(
            (response) => {
                setAdStaffLog(response.data);
                // setIsLoading(false)
                console.log(response.data)
            }
        )
    }

    useEffect(() => { getData() }, [])


    return (
        <div>
            <Navbar />
            <div>
                {/* ====== Table Section Start */}
                <section className="bg-white dark:bg-dark py-20 lg:py-[120px]">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full px-4">
                                <h1>Admin Staff Log</h1>
                                <br />
                                <div className="max-w-full overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="text-center bg-primary">
                                                <th className="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                    Id
                                                </th>
                                                <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                    AdminStaff Id
                                                </th>
                                                <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                    AdminStaff Name
                                                </th>
                                                <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                    Action
                                                </th>
                                                <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {adStaffLog.map(
                                                (value, index) => {
                                                    return <tr key={index}>
                                                        <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                            {value.id}
                                                        </td>
                                                        <td className="text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                            {value.AdmStaffId}
                                                        </td>
                                                        <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                            {value.AdStaffName}
                                                        </td>
                                                        <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                            {value.Action}
                                                        </td>
                                                        <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                            {new Date(value.DateTime).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ====== Table Section End */}

            </div>
        </div>


    )
}

export default AdminViewAdStaffLog