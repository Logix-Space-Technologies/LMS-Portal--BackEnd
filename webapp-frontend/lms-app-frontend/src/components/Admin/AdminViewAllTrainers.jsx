import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../../config/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';

const AdminViewAllTrainers = () => {
    const [trainerData, setTrainerData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [trainersPerPage] = useState(10); // Number of trainers per page
    const navigate = useNavigate();
    const [key, setKey] = useState('');

    const apiUrl = global.config.urls.api.server + "/api/lms/viewAllTrainer";
    const apiUrlTwo = global.config.urls.api.server + "/api/lms/deleteTrainer";

    const getData = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };
        axios.post(apiUrl, {}, axiosConfig).then(
            (response) => {
                setTrainerData(response.data.Trainers);
                console.log(response.data.Trainers);
            }
        );
    };

    // Logic for displaying current trainers
    const indexOfLastTrainer = currentPage * trainersPerPage;
    const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
    const currentTrainers = trainerData ? trainerData.slice(indexOfFirstTrainer, indexOfLastTrainer) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleClick = (id) => {
        let data = { "id": id };
        let axiosConfigTwo = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        axios.post(apiUrlTwo, data, axiosConfigTwo).then(
            (response) => {
                if (response.data.status === "success") {
                    // Reload the page after deleting trainer
                    window.location.reload();
                } else {
                    alert(response.data.status);
                }
            }
        );

    };

    const UpdateClick = (id) => {
        let data = id;
        sessionStorage.setItem("trainerId", data);
        navigate("/AdminUpdateTrainer");

    };

    useEffect(() => { getData() }, []);
    
    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);
    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}<br />
            <strong>View All Trainers</strong>
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
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            {key === "lmsapp" && (
                                <th scope="col" className="px-6 py-3">

                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentTrainers.map(
                            (value, index) => {
                                return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                                        {value.email}
                                    </td>
                                    {key === "lmsapp" && (
                                        <td className="px-6 py-4">
                                            <a onClick={() => { handleClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete Trainer</a>
                                        </td>
                                    )}
                                    <td className="px-6 py-4">
                                        <a onClick={() => { UpdateClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update Trainer</a>
                                    </td>
                                </tr>
                            }
                        )}
                    </tbody>
                </table>

            </div>
            <div className="flex justify-center mt-8">
                <nav>
                    <ul className="flex list-style-none">
                        {currentPage > 1 && (
                            <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                Previous
                            </li>
                        )}
                        {Array.from({ length: Math.ceil(trainerData.length / trainersPerPage) }, (_, i) => (
                            <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                {i + 1}
                            </li>
                        ))}
                        {currentPage < Math.ceil(trainerData.length / trainersPerPage) && (
                            <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                Next
                            </li>
                        )}
                    </ul>
                </nav>
            </div>

        </div>
    );
};

export default AdminViewAllTrainers;
