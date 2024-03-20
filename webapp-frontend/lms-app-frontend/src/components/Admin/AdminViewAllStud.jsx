import React, { useEffect, useState } from 'react';
import '../../config/config';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';

const AdminViewAllStud = () => {
    const [studData, setStudData] = useState([]);
    const [key, setKey] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10); // Number of students per page

    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/viewAllStudByAdmin";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/createCommunityManager";
    const apiUrl3 = global.config.urls.api.server + "/api/lms/deleteCommunityManager";
    const apiUrl4 = global.config.urls.api.server + "/api/lms/sendRenewalReminderEmail";

    const getData = () => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let data = { "batchId": sessionStorage.getItem("viewbatchId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setStudData(response.data.data);
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear()
                    } else {
                        if (!response.data.data) {
                            setStudData([])
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            }
        );
    };

    // Logic for displaying current students
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = studData ? studData.slice(indexOfFirstStudent, indexOfLastStudent) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Total pages
    let totalPages = []
    if (studData && studData.length > 0) {
        totalPages = Math.ceil(studData.length / studentsPerPage);
    }

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * studentsPerPage) + index + 1;
    }

    // Integration of new pagination logic
    const startPage = currentPage > 2 ? currentPage - 2 : 1;
    const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;


    // Assign Community Manager
    const assignCommunityManager = (id, batchId) => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let data = { "studentId": id, "batchId": batchId };
        let axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };

        axios.post(apiUrl2, data, axiosConfig2).then(
            (response) => {
                if (response.data.status === "success") {
                    // Assuming "Assigned to Community Manager" is a message you want to display
                    getData(); // Ensure getData() is defined and fetches the latest data
                } else if (response.data.status === "Validation failed") {
                    // Handle validation errors
                    alert("Validation failed. Please check the following errors: " + JSON.stringify(response.data.data));
                } else if (response.data.status === "Unauthorized User !!!") {
                    { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                    sessionStorage.clear()
                } else {
                    // Handle other errors
                    alert(response.data.status);
                }
            }
        )
    };

    // Remove Community Manager
    const removeCommunityManager = (id) => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let data = { "id": id };
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };
        axios.post(apiUrl3, data, axiosConfig).then(
            (response) => {
                if (response.data.status === "success") {
                    getData()
                } else {
                    if (response.data.status === "Unauthorized User !!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status);
                    }
                }
            }
        )
    };

    const sendRenewalRemainderMail = (id) => {
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        let data = { "id": id };
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        };
        axios.post(apiUrl4, data, axiosConfig).then(
            (response) => {
                if (response.data.status === "success") {
                    alert(response.data.message)
                } else if (response.data.status === "Unauthorized User!!") {
                    { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                    sessionStorage.clear()
                } else if (response.data.status === "error") {
                    alert(response.data.message)
                } else {
                    alert(response.data.status);
                }

            }
        )

    }

    const isRenewalDue = (validityDate) => {
        const currentDate = new Date();
        // Parse the validity date in DD/MM/YYYY format
        const [day, month, year] = validityDate.split('/');
        const parsedValidityDate = new Date(`${year}-${month}-${day}`);

        const differenceInMilliseconds = parsedValidityDate - currentDate;
        const differenceInDays = differenceInMilliseconds / (24 * 60 * 60 * 1000);
        return differenceInDays <= 45;
    };



    useEffect(() => { getData() }, []);

    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);
    return (
        <div>
            {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
            <br />
            <div className="flex justify-between items-center mx-4 my-4">
                <button onClick={() => navigate(-1)} className="btn bg-gray-500 text-white px-4 py-2 rounded-md">Back</button>

                <strong>View All Students</strong>

                <div></div>
            </div>
            <div className="relative overflow-x shadow-md sm:rounded-lg">
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
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.length > 0 ? currentStudents.map(
                            (value, index) => {
                                return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                        {calculateSerialNumber(index)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.communityManager === 1 && (
                                            <img
                                                src="https://www.svgrepo.com/show/303204/google-account-security-2-logo.svg"
                                                alt="Community Manager Image"
                                                style={{ width: '30px', height: '25px' }}
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
                                            <button onClick={() => assignCommunityManager(value.id, value.batchId)} style={{ fontSize: '12px' }} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">Assign Community Manager</button>
                                        )}
                                        {value.communityManager === 1 && (
                                            <button onClick={() => { removeCommunityManager(value.commManagerId) }} style={{ fontSize: '12px' }} className="btn bg-red-500 text-white px-4 py-2 rounded-md">Remove Community Manager</button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.validity && isRenewalDue(value.validity) && (
                                            <button onClick={() => sendRenewalRemainderMail(value.id)} className="btn bg-blue-500 text-white px-4 py-2 rounded-md" style={{ fontSize: '12px' }}>Send Renewal Remainder Mail</button>
                                        )}
                                    </td>
                                </tr>
                            }
                        ) : (
                            <tr>
                                <td colSpan="12" className="px-6 py-4" style={{ textAlign: "center" }}>
                                    No Students Found !!!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{indexOfFirstStudent + 1}</span> to <span className="font-medium">{indexOfLastStudent > studData.length ? studData.length : indexOfLastStudent}</span> of <span className="font-medium">{studData.length}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button onClick={() => currentPage > 1 && paginate(currentPage - 1)} className={`relative inline-flex items-center px-2 py-2 text-sm font-medium ${currentPage === 1 ? 'cursor-not-allowed text-gray-500' : 'text-gray-700 hover:bg-gray-50'} disabled:opacity-50`} disabled={currentPage === 1}>
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {/* Dynamically generate Link components for each page number */}
                            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                                <button key={startPage + index} onClick={() => paginate(startPage + index)} className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === startPage + index ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                                    {startPage + index}
                                </button>
                            ))}
                            <button onClick={() => currentPage < totalPages && paginate(currentPage + 1)} className={`relative inline-flex items-center px-2 py-2 text-sm font-medium ${currentPage === totalPages ? 'cursor-not-allowed text-gray-500' : 'text-gray-700 hover:bg-gray-50'} disabled:opacity-50`} disabled={currentPage === totalPages}>
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminViewAllStud;
