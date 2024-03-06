import React, { useEffect, useState } from 'react'
import AdmStaffNavBar from './AdmStaffNavBar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../../config/config'


const AdminStaffViewSubmittedTask = () => {

    const [errors, setErrors] = useState({});

    const navigate = useNavigate()

    let [submittedTaskId, setSubmittedTaskId] = useState("")

    const [taskData, setTaskData] = useState([])

    const [inputField, setInputField] = useState({
        "adminstaffId": "",
        "evaluatorRemarks": "",
        "score": ""
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10); // Number of students per page

    const rangeSize = 5; // Number of pages to display in the pagination
    const lastPage = Math.ceil(taskData.length / tasksPerPage); // Calculate the total number of pages
    let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
    let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

    const apiUrl = global.config.urls.api.server + "/api/lms/adSfViewSubmittedTask"
    const apiUrl2 = global.config.urls.api.server + "/api/lms/evaluateTask"

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
                if (response.data.data) {
                    setTaskData(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized access!!") {
                        navigate("/admstafflogin")
                        sessionStorage.clear()
                    } else {
                        if (!response.data.data) {
                            setTaskData([])
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            }
        )
    }

    const inputHandler = (event) => {
        setErrors({}); // Clear previous errors
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const evaluateTask = () => {
        let newErrors = {};
        if (!inputField.evaluatorRemarks.trim()) {
            newErrors.evaluatorRemarks = "Remarks required!";
        }

        if (!inputField.score.trim()) {
            newErrors.score = "Score required!";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admstaffLogintoken"),
                "key": sessionStorage.getItem("admstaffkey")
            }
        }
        let data2 = {
            "id": submittedTaskId,
            "adminstaffId": sessionStorage.getItem("admstaffId"),
            "evaluatorRemarks": inputField.evaluatorRemarks,
            "score": inputField.score
        }
        axios.post(apiUrl2, data2, axiosConfig).then(
            (response) => {
                if (response.data.status === "Task evaluated successfully") {
                    alert("Task evaluated successfully")
                    getData()
                    setInputField({
                        evaluatorRemarks: "",
                        score: ""
                    });
                } else {
                    if (response.data.status === "Validation failed" && response.data.data.evaluatorRemarks) {
                        alert(response.data.data.evaluatorRemarks);
                        setInputField({
                            evaluatorRemarks: "",
                            score: ""
                        });
                    } else {
                        if (response.data.status === "Validation failed" && response.data.data.score) {
                            alert(response.data.data.score);
                            setInputField({
                                evaluatorRemarks: "",
                                score: ""
                            });
                        } else {
                            if (response.data.status === "Unauthorized access!!") {
                                navigate("/admstafflogin")
                                sessionStorage.clear()
                            } else {
                                alert(response.data.status);
                                setInputField({
                                    evaluatorRemarks: "",
                                    score: ""
                                });
                            }
                        }
                    }
                }
            }
        )
    }

    const readValue = (id) => {
        setSubmittedTaskId(id)
    }

    // Convert a date string from 'DD/MM/YYYY' to a JavaScript Date object
    const parseDateString = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(year, month - 1, day);
    };


    // Logic for displaying current students
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = taskData ? taskData.slice(indexOfFirstTask, indexOfLastTask) : [];


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(taskData.length / tasksPerPage);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * tasksPerPage) + index + 1;
    }


    useEffect(() => { getData() }, [])


    return (
        <>
            <div>
                <AdmStaffNavBar />
                <br />
                <strong>Admin Staff View Submitted Tasks</strong><br /><br />
                <div className="relative overflow-x shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>
                                    College Name
                                </th>
                                <th scope="col" className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>
                                    Batch Name
                                </th>
                                <th scope="col" className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>
                                    Membership No.
                                </th>
                                <th scope="col" className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>
                                    Student Name
                                </th>
                                <th scope="col" className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>
                                    Task Title
                                </th>
                                <th scope="col" className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>
                                    Due Date
                                </th>
                                <th scope="col" className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>
                                    Git Link
                                </th>
                                <th scope="col" className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>
                                    Remarks
                                </th>
                                <th scope="col" className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>
                                    Submitted Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Evaluated Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Evaluator Remarks
                                </th>
                                <th scope="col" className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>
                                    Score
                                </th>
                                <th scope="col" className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>
                                    Total Score
                                </th>
                                <th scope="col" className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTasks && currentTasks.length > 0 ? (currentTasks.map(
                                (value, index) => {
                                    // Convert dueDate and subDate to Date objects for comparison
                                    const dueDateObj = parseDateString(value.dueDate);
                                    const submissionDateObj = parseDateString(value.subDate);

                                    // Determine if the task was submitted late
                                    const isLateSubmission = submissionDateObj > dueDateObj;
                                    return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                        <td className="px-6 py-4">
                                            {value.collegeName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.batchName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.membership_no}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.studName}
                                        </td>
                                        <td className="px-6 py-4" style={{ whiteSpace: 'nowrap' }}>
                                            {value.taskTitle}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.dueDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={value.gitLink} className='btn btn-primary' target="_blank" rel="noopener noreferrer">
                                                Link
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.remarks}
                                        </td>
                                        <td className="px-6 py-12" style={{ display: 'flex', alignItems: 'center' }}>
                                            {value.subDate}
                                            {isLateSubmission && (
                                                <img src="https://www.svgrepo.com/show/451892/task-past-due.svg" alt="Late Submission" style={{ width: '20px', marginLeft: '10px' }} />
                                            )}
                                        </td>
                                        {!value.evalDate === null && (
                                            <td className="px-6 py-4">
                                                {value.evalDate}
                                            </td>
                                        )}
                                        {value.evalDate === null && (
                                            <td className="px-6 py-4">
                                                NIL
                                            </td>
                                        )}
                                        {!value.evaluatorRemarks === null && (
                                            <td className="px-6 py-4">
                                                {value.evaluatorRemarks}
                                            </td>
                                        )}
                                        {value.evaluatorRemarks === null && (
                                            <td className="px-6 py-4">
                                                NIL
                                            </td>
                                        )}
                                        {!value.score === null && (
                                            <td className="px-6 py-4">
                                                {value.score}
                                            </td>
                                        )}
                                        {value.score === null && (
                                            <td className="px-6 py-4">
                                                NIL
                                            </td>
                                        )}
                                        <td className="px-6 py-4">
                                            {value.totalScore}
                                        </td>
                                        <td className="px-6 py-4" style={{ whiteSpace: 'nowrap' }}>
                                            <button onClick={() => readValue(value.submitTaskId)} type="button" className="btn bg-blue-500 text-white px-4 py-2 rounded-md" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Evaluate Task</button>
                                        </td>
                                    </tr>
                                }
                            )) : <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4">
                                    No Tasks Are Submitted !!
                                </td>
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4">

                                </td>
                            </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{indexOfFirstTask + 1}</span> to <span className="font-medium">{indexOfLastTask > taskData.length ? taskData.length : indexOfLastTask}</span> of <span className="font-medium">{taskData.length}</span> results
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
            <div className="flex justify-end">
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Evaluate Task</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">Score:</label>
                                        <input type="text" name="score" className="form-control" value={inputField.score} onChange={inputHandler} />
                                        {errors.score && <span style={{ color: 'red' }} className="error">{errors.score}</span>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Evaluator Remarks:</label>
                                        <textarea name="evaluatorRemarks" className="form-control" value={inputField.evaluatorRemarks} onChange={inputHandler} />
                                        {errors.evaluatorRemarks && <span style={{ color: 'red' }} className="error">{errors.evaluatorRemarks}</span>}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button data-bs-dismiss="modal" onClick={() => evaluateTask()} type="button" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminStaffViewSubmittedTask