import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../config/config'
import ClgStaffNavbar from './ClgStaffNavbar';
import Navbar from '../Admin/Navbar';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';

const CollegeStaffViewSessionWisePerformance = () => {

    const [scoreData, setScoreData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [scoresPerPage] = useState(10); // Number of students per page
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState('')

    const rangeSize = 5; // Number of pages to display in the pagination
    const lastPage = Math.ceil(scoreData.length / scoresPerPage); // Calculate the total number of pages
    let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
    let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

    const apiurl = global.config.urls.api.server + "/api/lms/viewSessionwisePerformance"

    const navigate = useNavigate()

    const getData = () => {
        let data = {
            "sessionId": sessionStorage.getItem("ViewsessionperformanceSessionId")
        }
        // Retrieve key and token from sessionStorage without providing the key
        let currentKey, token;
        Object.entries(sessionStorage).forEach(([key, value]) => {
            if (key.includes('key')) {
                currentKey = value;
            } else if (key.includes('token')) {
                token = value;
            }
        });

        // Update the state with the current key
        setKey(currentKey);
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        }
        axios.post(apiurl, data, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setLoading(false)
                    setScoreData(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        { key === 'lmsappclgstaff' ? navigate("/clgStafflogin") : (key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin")) }
                        sessionStorage.clear()
                    } else {
                        if (!response.data.data) {
                            setLoading(false)
                            setScoreData([])
                        } else {
                            setLoading(false)
                            alert(response.data.status)
                        }
                    }
                }
            }
        )
    }

    // Logic for displaying current students
    const indexOfLastScore = currentPage * scoresPerPage;
    const indexOfFirstScore = indexOfLastScore - scoresPerPage;
    const currentScores = scoreData ? scoreData.slice(indexOfFirstScore, indexOfLastScore) : [];


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(scoreData.length / scoresPerPage);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * scoresPerPage) + index + 1;
    }

    useEffect(() => { getData() }, [])

    return (
        <div>
            {key === 'lmsappclgstaff' ? <ClgStaffNavbar /> : (key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />)}
            {/* ====== Table Section Start */}
            <section className="bg-gray-100 dark:bg-dark py-20 lg:py-[120px]">
                <div className="container mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="flex justify-between items-center mt-8 ml-4 mb-4">
                                {key === 'lmsapp' ? <h2 className="text-lg font-bold">Admin View Session Performance</h2> : (key === 'lmsappclgstaff' ? <h2 className="text-lg font-bold">College Staff View Session Performance</h2> : <h2 className="text-lg font-bold">Admin Staff View Session Performance</h2>)}
                                <div className="flex space-x-4">
                                    <button type='button' onClick={() => navigate(-1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button>
                                </div>
                            </div>
                            <br />
                            <div className="max-w-full overflow-x-auto">
                                {loading ? <div className="col-12 text-center">Loading...</div> : <table className="w-full table-auto">
                                    <thead>
                                        <tr className="text-center bg-primary">
                                            <th className="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                S/L
                                            </th>
                                            <th className="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Membership No
                                            </th>
                                            <th className="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Student Name
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Total Score
                                            </th>
                                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                                                Score Obtained
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentScores.length > 0 ? currentScores.map(
                                            (value, index) => {
                                                return <tr key={index}>
                                                    <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {calculateSerialNumber(index)}
                                                    </td>
                                                    <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.membership_no}
                                                    </td>
                                                    <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.studName}
                                                    </td>
                                                    <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.totalScore}
                                                    </td>
                                                    <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                        {value.score >= (value.totalScore * 0.85) ? (
                                                            <span className="flex items-center justify-center text-black-500">
                                                                {value.score}
                                                                <img src="https://www.svgrepo.com/show/475275/star.svg" alt="Excellent" style={{ width: '20px', marginLeft: '10px' }} />
                                                            </span>
                                                        ) : (
                                                            value.score
                                                        )}
                                                    </td>

                                                </tr>
                                            }
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                                                    No Scores Entered !!!
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>}

                                {!loading && currentScores.length > 0 && (
                                    <div className="flex items-center justify-between bg-[#C4E1E2] px-6 py-4 sm:px-6">
                                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-sm text-gray-700">
                                                    Showing <span className="font-medium">{indexOfFirstScore + 1}</span> to <span className="font-medium">{indexOfLastScore > scoreData.length ? scoreData.length : indexOfLastScore}</span> of <span className="font-medium">{scoreData.length}</span> results
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ====== Table Section End */}
        </div>
    )
}

export default CollegeStaffViewSessionWisePerformance