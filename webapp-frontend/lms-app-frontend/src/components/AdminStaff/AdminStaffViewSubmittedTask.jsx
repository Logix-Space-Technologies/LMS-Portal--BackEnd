import React, { useEffect, useState } from 'react'
import AdmStaffNavBar from './AdmStaffNavBar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../../config/config'
import Navbar from '../Admin/Navbar'


const AdminStaffViewSubmittedTask = () => {

    const [updateField, setUpdateField] = useState({
        "subTaskSearchQuery": ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [key, setKey] = useState('')

    let [submittedTaskId, setSubmittedTaskId] = useState("")
    let [updateSubmittedTaskId, setUpdateSubmittedTaskId] = useState({})

    const [taskData, setTaskData] = useState([])

    const [inputField, setInputField] = useState({
        "adminstaffId": "",
        "evaluatorRemarks": "",
        "score": ""
    });

    const [changeScoreField, setChangeScoreField] = useState({
        "adminstaffId": "",
        "evaluatorRemarks": "",
        "score": ""
    })

    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10); // Number of students per page

    const [showUpdateScoreModal, setShowUpdateScoreModal] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [showWaitingModal, setShowWaitingModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay

    const TaskTitle = sessionStorage.getItem('taskTitle')
    const TaskDueDate = sessionStorage.getItem('taskdueDate')

    const rangeSize = 5; // Number of pages to display in the pagination
    const lastPage = Math.ceil(taskData.length / tasksPerPage); // Calculate the total number of pages
    let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
    let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

    const apiUrl = global.config.urls.api.server + "/api/lms/adSfViewSubmittedTask"
    const apiUrl3 = global.config.urls.api.server + '/api/lms/admstaffsearchsubtask'
    const apiUrl2 = global.config.urls.api.server + "/api/lms/evaluateTask"
    const apiUrl4 = global.config.urls.api.server + "/api/lms/updateSubmittedTaskScore"

    const closeModal = () => {
        setShowModal(false);
        setShowOverlay(false);
        setErrors({})
        setInputField({
            "evaluatorRemarks": "",
            "score": ""
        });
    };

    const closeUpdateScoreModal = () => {
        setShowUpdateScoreModal(false);
        setShowOverlay(false);
        setErrors({})
        setChangeScoreField({
            "evaluatorRemarks": "",
            "score": ""
        });
        setUpdateSubmittedTaskId({})
    };

    const changeScoreHandler = (event) => {
        setChangeScoreField({ ...changeScoreField, [event.target.name]: event.target.value });
    };

    const updateHandler = (event) => {
        setUpdateField({ ...updateField, [event.target.name]: event.target.value });
    };

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
        }
        axios.post(apiUrl, { taskId: sessionStorage.getItem("taskId") }, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setLoading(false)
                    setTaskData(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized access!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear()
                    } else {
                        if (!response.data.data) {
                            setLoading(false)
                            setTaskData([])
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            }
        )
    }

    const searchSubmittedTasks = () => {
        setLoading(true);
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
        }
        let data = { "taskId": sessionStorage.getItem("taskId"), "subTaskSearchQuery": updateField.subTaskSearchQuery }
        axios.post(apiUrl3, data, axiosConfig)
            .then(response => {
                if (response.data.status === "Search Item is required.") {
                    setLoading(false)
                    setTimeout(() => {
                        alert(response.data.status)
                        getData()
                    }, 500)
                } else if (response.data.data) {
                    setTaskData(response.data.data);
                    setLoading(false);
                    setUpdateField({ "subTaskSearchQuery": "" });
                } else if (response.data.status === "Unauthorized access!!") {
                    { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                    sessionStorage.clear()
                } else if (!response.data.data) {
                    setLoading(false);
                    setUpdateField({ "subTaskSearchQuery": "" });
                    setTimeout(() => {
                        alert("No Submitted Tasks Found")
                        getData()
                    }, 500)
                } else {
                    alert(response.data.status)
                }
            })
    };

    const closeWaitingModal = () => {
        setShowOverlay(false)
        setShowWaitingModal(false)
    }

    const inputHandler = (event) => {
        setErrors({}); // Clear previous errors
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const evaluateTask = () => {
        let newErrors = {};
        let addedBy;

        if (!inputField.score.trim()) {
            newErrors.score = "Score required!";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setShowModal(true)
            setShowOverlay(true)
            return;
        }
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        if (currentKey === 'lmsapp') {
            addedBy = 0
        } else {
            addedBy = sessionStorage.getItem("admstaffId")
        }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        }
        let data2 = {
            "id": submittedTaskId,
            "adminstaffId": addedBy,
            "evaluatorRemarks": inputField.evaluatorRemarks ? inputField.evaluatorRemarks : null,
            "score": inputField.score
        }
        setShowModal(false)
        setShowWaitingModal(true)
        setShowOverlay(true)
        axios.post(apiUrl2, data2, axiosConfig).then(
            (response) => {
                if (response.data.status === "Task evaluated successfully") {
                    closeWaitingModal()
                    setInputField({
                        evaluatorRemarks: "",
                        score: ""
                    });
                    setTimeout(() => {
                        alert("Task evaluated successfully")
                        getData()
                    }, 500)

                } else if (response.data.status === "Validation failed" && response.data.data.evaluatorRemarks) {
                    closeWaitingModal()
                    setTimeout(() => {
                        alert(response.data.data.evaluatorRemarks);
                        setShowModal(true)
                        setShowOverlay(true)
                    }, 500)
                } else if (response.data.status === "Validation failed" && response.data.data.score) {
                    closeWaitingModal()
                    setTimeout(() => {
                        alert(response.data.data.score);
                        setShowModal(true)
                        setShowOverlay(true)
                    }, 500)
                } else if (response.data.status === "Unauthorized access!!") {
                    { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                    sessionStorage.clear()
                } else {
                    closeWaitingModal()
                    setInputField({
                        evaluatorRemarks: "",
                        score: ""
                    });
                    setTimeout(() => {
                        alert(response.data.status);
                        setShowModal(true)
                        setShowOverlay(true)
                    }, 500)
                }

            }
        )
    }

    const updateEvaluatedTask = () => {
        let newErrors = {};
        let updatedBy;

        if (!changeScoreField.score.trim()) {
            newErrors.updateScore = "Score required!";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setShowUpdateScoreModal(true)
            setShowOverlay(true)
            return;
        }
        let currentKey = sessionStorage.getItem("admkey");
        let token = sessionStorage.getItem("admtoken");
        if (currentKey !== 'lmsapp') {
            currentKey = sessionStorage.getItem("admstaffkey");
            token = sessionStorage.getItem("admstaffLogintoken");
            setKey(currentKey); // Update the state if needed
        }
        if (currentKey === 'lmsapp') {
            updatedBy = 0
        } else {
            updatedBy = sessionStorage.getItem("admstaffId")
        }
        let axiosConfig4 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": currentKey
            }
        }
        let data4 = {
            "id": updateSubmittedTaskId.id,
            "adminstaffId": updatedBy,
            "evaluatorRemarks": changeScoreField.evaluatorRemarks ? changeScoreField.evaluatorRemarks : null,
            "score": changeScoreField.score
        }
        setShowUpdateScoreModal(false)
        setShowWaitingModal(true)
        setShowOverlay(true)
        axios.post(apiUrl4, data4, axiosConfig4).then(
            (response) => {
                if (response.data.status === "Task score updated successfully") {
                    closeWaitingModal()
                    setChangeScoreField({
                        "evaluatorRemarks": "",
                        "score": ""
                    });
                    setTimeout(() => {
                        alert("Task score updated successfully")
                        getData()
                        setUpdateSubmittedTaskId({})
                    }, 500)

                } else if (response.data.status === "Validation failed" && response.data.data.evaluatorRemarks) {
                    closeWaitingModal()
                    setTimeout(() => {
                        alert(response.data.data.evaluatorRemarks);
                        setShowUpdateScoreModal(true)
                        setShowOverlay(true)
                    }, 500)
                } else if (response.data.status === "Validation failed" && response.data.data.score) {
                    closeWaitingModal()
                    setTimeout(() => {
                        alert(response.data.data.score);
                        setShowUpdateScoreModal(true)
                        setShowOverlay(true)
                    }, 500)
                } else if (response.data.status === "Unauthorized access!!") {
                    { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                    sessionStorage.clear()
                } else {
                    closeWaitingModal()
                    setChangeScoreField({
                        "evaluatorRemarks": "",
                        "score": ""
                    });
                    setTimeout(() => {
                        alert(response.data.status);
                        setShowUpdateScoreModal(true)
                        setShowOverlay(true)
                    }, 500)
                }

            }
        )
    }

    const readValue = (id) => {
        setSubmittedTaskId(id)
        setShowModal(true)
        setShowOverlay(true)
    }

    const UpdateScoreValue = (id, score) => {
        setUpdateSubmittedTaskId({ id, score })
        setShowUpdateScoreModal(true)
        setShowOverlay(true)
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

    // Update key state when component mounts
    useEffect(() => {
        setKey(sessionStorage.getItem("admkey") || '');
    }, []);


    return (
        <>
            <div>
                {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
                <br />
                <div className="flex justify-between items-center mx-4 my-4">
                    <button onClick={() => navigate(-1)} className="btn bg-gray-500 text-white px-4 py-2 rounded-md">Back</button>

                    <strong>
                        View All Submitted Tasks ( Task Name: {TaskTitle} ,
                        Due Date: <span style={{ color: '#BA0F30' }}> {TaskDueDate} </span>)
                    </strong>

                    <div></div>
                </div>
                <div className="col col-md-6 mx-auto">
                    <div className="input-group mb-3">
                        <input onChange={updateHandler} type="text" className="form-control" name="subTaskSearchQuery" value={updateField.subTaskSearchQuery} placeholder='Student Name/Membership No' />
                        <button onClick={searchSubmittedTasks} className="btn btn-warning ms-2">Search</button>
                    </div>
                </div>
                <br /><br />

                {loading && <div className="col-12 text-center">Loading...</div>}
                {!loading && <div className="relative overflow-x shadow-md sm:rounded-lg"> <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>
                                S/L
                            </th>
                            <th scope="col" className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>
                                Membership No.
                            </th>
                            <th scope="col" className="px-6 py-3" style={{ whiteSpace: 'nowrap' }}>
                                Student Name
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
                                        {calculateSerialNumber(index)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.membership_no}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.studName}
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
                                    <td className="px-6 py-4">
                                        {value.evalDate !== null ? (value.evalDate) : "NIL"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.evaluatorRemarks !== null ? (value.evaluatorRemarks) : "NIL"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.score !== null ? (value.score) : "NIL"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.totalScore}
                                    </td>
                                    <td className="px-6 py-4" style={{ whiteSpace: 'nowrap' }}>
                                        {value.evalDate === null && (
                                            <button onClick={() => readValue(value.submitTaskId)} type="button" className="btn bg-blue-500 text-white px-4 py-2 rounded-md">Evaluate Task</button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4" style={{ whiteSpace: 'nowrap' }}>
                                        {value.evalDate !== null && (
                                            <button onClick={() => UpdateScoreValue(value.submitTaskId, value.score)} type="button" className="btn bg-blue-500 text-white px-4 py-2 rounded-md">Update Evaluation</button>
                                        )}
                                    </td>
                                </tr>
                            }
                        )) : !loading && <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                </table></div>}
            </div>
            {!loading && <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
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
            </div>}
            {showModal && <div className="flex justify-end">
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Evaluate Task</h1>
                                <button type="button" className="btn-close" onClick={closeModal} />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">Score:</label>
                                        <input type="text" name="score" className="form-control" value={inputField.score} onChange={inputHandler} />
                                        {errors.score && <span style={{ color: 'red' }} className="error">{errors.score}</span>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Evaluator Remarks (Optional):</label>
                                        <textarea name="evaluatorRemarks" className="form-control" value={inputField.evaluatorRemarks} onChange={inputHandler} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                <button onClick={() => evaluateTask()} type="button" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            {/* Update Score Modal */}

            {showUpdateScoreModal && <div className="flex justify-end">
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Evaluated Task Score</h1>
                                <button type="button" className="btn-close" onClick={closeUpdateScoreModal} />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">Score:</label>
                                        <input type="text" name="score" className="form-control" value={updateSubmittedTaskId.score} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">New Score:</label>
                                        <input type="text" name="score" className="form-control" value={changeScoreField.score} onChange={changeScoreHandler} />
                                        {errors.updateScore && <span style={{ color: 'red' }} className="error">{errors.updateScore}</span>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Evaluator Remarks:</label>
                                        <textarea name="evaluatorRemarks" className="form-control" value={changeScoreField.evaluatorRemarks} onChange={changeScoreHandler} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeUpdateScoreModal}>Close</button>
                                <button onClick={() => updateEvaluatedTask()} type="button" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            {showWaitingModal && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
                            </div>
                            <div className="modal-body">
                                <>
                                    <div className="mb-3">
                                        <p>Processing Request. Do Not Refresh.</p>
                                    </div>
                                </>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showOverlay && (
                <div
                    className="modal-backdrop fade show"
                    onClick={() => {
                        setShowWaitingModal(false);
                        setShowOverlay(false);
                    }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 1040, // Ensure this is below your modal's z-index
                    }}
                ></div>
            )}
        </>
    )
}

export default AdminStaffViewSubmittedTask