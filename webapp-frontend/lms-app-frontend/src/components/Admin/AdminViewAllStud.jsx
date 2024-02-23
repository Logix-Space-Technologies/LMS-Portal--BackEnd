import React, { useEffect, useState } from 'react';
import '../../config/config';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const AdminViewAllStud = () => {
    const [studData, setStudData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10); // Number of students per page

    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/viewAllStudByAdmin";

    const getData = () => {
        let data = { "batchId": sessionStorage.getItem("viewbatchId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        axios.post(apiUrl, data, axiosConfig).then(
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

    const apiUrl2 = global.config.urls.api.server + "/api/lms/createCommunityManager";
    const apiUrl3 = global.config.urls.api.server + "/api/lms/deleteCommunityManager";

    // Assign Community Manager
    const assignCommunityManager = (id, batchId) => {
        let data = {"studentId": id, "batchId": batchId }; // Ensure this matches your expected backend format
        console.log(data)
        let axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"), // Your token storage method might need to match your backend expectations
                "key": sessionStorage.getItem("admkey") // Ensure your backend is expecting this key in the header
            }
        };
    
        axios.post(apiUrl2, data, axiosConfig2).then(
            (response) => {
                if (response.data.status === "success") {
                    // Assuming "Assigned to Community Manager" is a message you want to display
                    alert("Assigned to Community Manager");
                    getData(); // Ensure getData() is defined and fetches the latest data
                } else if (response.data.status === "Validation failed") {
                    // Handle validation errors
                    alert("Validation failed. Please check the following errors: " + JSON.stringify(response.data.data));
                } else {
                    // Handle other errors
                    alert(response.data.status);
                }
            }
        ).catch(error => {
            console.error("Error assigning community manager:", error);
            alert("An error occurred while assigning the community manager. Please try again.");
        });
    };

    // Remove Community Manager
    const removeCommunityManager = (id) => {
        let data = { "id": id };
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        axios.post(apiUrl3, data, axiosConfig).then(
            (response) => {
                if (response.data.status === "success") {
                    alert(`Removed from Community Manager`);
                    getData()
                } else {
                    alert(response.data.status);
                }
            }
        ).catch(error => {
            console.error("Error removing community manager:", error);
            alert("An error occurred while removing the community manager. Please try again.");
        });
    };





    useEffect(() => { getData() }, []);

    return (
        <div>
            <Navbar />
            <br />
            <div className="flex justify-between items-center mx-4 my-4">
                <button onClick={() => navigate(-1)} className="btn bg-gray-500 text-white px-4 py-2 rounded-md">Back</button>

                <strong>View All Students</strong>

                <div></div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                S/N
                            </th>
                            <th scope="col" className="px-9 py-3">

                            </th>
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
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.length > 0 ? currentStudents.map(
                            (value, index) => {
                                return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.communityManager === 1 && (
                                            <img
                                                src="https://www.svgrepo.com/show/303204/google-account-security-2-logo.svg"
                                                alt="Community Manager Image"
                                                style={{ width: '30px', height: '30px' }}
                                            />
                                        )}
                                    </td>
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
                                        {value.validity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.communityManager === 0 && (
                                            <button onClick={() => assignCommunityManager(value.id, value.batchId)} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">Assign Community Manager</button>
                                        )}
                                        {value.communityManager === 1 && (
                                            <button onClick={() => { removeCommunityManager(value.commManagerId) }} className="btn bg-red-500 text-white px-4 py-2 rounded-md">Remove Community Manager</button>
                                        )}
                                    </td>
                                </tr>
                            }
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-6 py-4" style={{ textAlign: "center" }}>
                                    No Students Found !!!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {currentStudents.length > 0 && (
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
            )}
        </div>
    );
};

export default AdminViewAllStud;
