import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StudNavBar from './StudNavBar';
import '../../config/config'
import { Link, useNavigate } from 'react-router-dom';

const StudentViewTasks = () => {
    const [studViewTaskData, setStudViewTaskData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(3);

    const rangeSize = 5; // Number of pages to display in the pagination
    const lastPage = Math.ceil(studViewTaskData.length / tasksPerPage); // Calculate the total number of pages
    let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
    let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

    const [errors, setErrors] = useState({});
    const [inputField, setInputField] = useState({
        "gitLink": "",
        "remarks": ""
    });

    let [taskId, setTaskId] = useState({})
    const navigate = useNavigate()
    const [showWaitingModal, setShowWaitingModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay

    const apiUrl = global.config.urls.api.server + "/api/lms/studViewTask";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/tasksubmissionByStudent";

    const closeWaitingModal = () => {
        setShowOverlay(false)
        setShowWaitingModal(false)
    }

    const getData = () => {
        let data = { "id": sessionStorage.getItem("studentId") };
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken"),
                "key": sessionStorage.getItem("studentkey")
            }
        };
        axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
                if (response.data.data) {
                    setStudViewTaskData(response.data.data);
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/studentLogin")
                        sessionStorage.clear()
                    } else {
                        if (response.data.status === "No tasks found!") {
                            setStudViewTaskData([])
                        } else {
                            alert(response.data.status)
                        }
                    }
                }
            }
        );
    };

    const updateSubTask = (id) => {
        let data = id
        sessionStorage.setItem("subtaskId", data)
        navigate("/studupdatesubtask")
    }

    const inputHandler = (event) => {
        setErrors({}); // Clear previous errors
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const submitTask = () => {
        let newErrors = {};
        if (!inputField.remarks.trim()) {
            newErrors.remarks = "Remarks are required!";
        }
        if (!inputField.gitLink.trim()) {
            newErrors.gitLink = "GitHub link is required!";
        } else if (!/^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/i.test(inputField.gitLink)) {
            newErrors.gitLink = 'Invalid GitHub Link';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setShowModal(true)
            setShowOverlay(true);
            return;
        }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken"),
                "key": sessionStorage.getItem("studentkey")
            }
        };
        let data2 = {
            "studId": sessionStorage.getItem("studentId"),
            "taskId": taskId,
            "gitLink": inputField.gitLink,
            "remarks": inputField.remarks
        };
        setShowModal(false)
        setShowWaitingModal(true)
        setShowOverlay(true)
        axios.post(apiUrl2, data2, axiosConfig).then(
            (response) => {
                if (response.data.status === "success") {
                    closeWaitingModal()
                    setTimeout(()=>{
                        alert("Task Submitted Successfully !!");
                    getData()
                    setInputField({
                        "gitLink": "",
                        "remarks": ""
                    }, 500);
                    })
                    setShowModal(false)
                    setShowOverlay(false); // Close the overlay
                } else {
                    setShowWaitingModal()
                    if (response.data.status === "Validation failed" && response.data.data.gitLink) {
                        alert(response.data.data.gitLink);
                        setShowModal(true)
                        setShowOverlay(true);
                    } else {
                        if (response.data.status === "Validation failed" && response.data.data.remarks) {
                            alert(response.data.data.remarks);
                            setShowModal(true)
                            setShowOverlay(true);
                        } else {
                            if (response.data.status === "Unauthorized Access!!") {
                                navigate("/studentLogin")
                                sessionStorage.clear()
                            } else {
                                closeWaitingModal()
                                setTimeout(() => {
                                    alert(response.data.status)
                                }, 500)
                            }
                        }
                    }
                }
            }
        );
    }

    // Function to close both modal and overlay
    const closeModal = () => {
        setShowModal(false);
        setShowOverlay(false);
        setErrors({})
        setInputField({
            "gitLink": "",
            "remarks": ""
        });
    };


    const readValue = (taskId) => {
        setTaskId(taskId)
        setShowModal(true)
        setShowOverlay(true);
    };

    // Convert a date string from 'DD/MM/YYYY' to a JavaScript Date object
    const parseDateString = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(year, month - 1, day);
    };

    // Logic for displaying current logs
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTask = studViewTaskData ? studViewTaskData.slice(indexOfFirstTask, indexOfLastTask) : [];

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(studViewTaskData.length / tasksPerPage);

    useEffect(() => { getData(); }, []);

    return (
        <div>
            <StudNavBar />
            <br />
            <h1 style={{ marginLeft: "20px", marginBottom: "32px", textAlign: "center" }}>Student View Tasks</h1>
            <section className="flex flex-col justify-center items-center antialiased bg-gray-100 text-gray-600 p-4 pt-2 pb-2">
                <div className="h-full">
                    {/* Cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {currentTask && currentTask.length > 0 ? (currentTask.map(
                            (task, index) => {
                                // Convert dueDate and subDate/lateSubDate to Date objects for comparison
                                const dueDateObj = parseDateString(task.dueDate);
                                const submissionDateObj = task.lateSubDate ? parseDateString(task.lateSubDate) : task.subDate ? parseDateString(task.subDate) : null;

                                // Determine if the task was submitted late
                                const isLateSubmission = submissionDateObj && submissionDateObj > dueDateObj;
                                return <div className="bg-white shadow-lg rounded-md p-4" key={index}>
                                    {task.taskStatus === "Task Submitted" && task.evaluateStatus === "Evaluated" && (
                                        <>
                                            <span className="text-green-500 font-semibold">[Evaluated]</span>
                                            <h2 className="text-lg font-semibold mb-1">{task.taskTitle}</h2>
                                            <p className="text-gray-500 mb-4">{task.taskDesc}</p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Session Name:</strong> {task.sessionName}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Task Type:</strong> {task.taskType}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Total Score:</strong> {task.totalScore}
                                            </p>
                                            <p className="text-gray-700 mb-1">
                                                <strong>Submitted Git Link:</strong> <span style={{ fontSize: "14px" }}>{task.gitLink}</span>
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Score Obtained:</strong> {task.score}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Due Date:</strong> {task.dueDate}
                                            </p>
                                            {task.updatedDate ? (
                                                <p className="text-gray-700 mb-2">
                                                    <strong>Submission Date:</strong> {task.updatedDate}
                                                </p>
                                            ) : (
                                                <p className="text-gray-700 mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <strong style={{ marginRight: '8px' }}>Submission Date:</strong> {task.subDate}
                                                    {isLateSubmission && (
                                                        <img src="https://www.svgrepo.com/show/451892/task-past-due.svg" alt="Late Submission" style={{ width: '20px', marginLeft: '5px' }} />
                                                    )}
                                                </p>
                                            )}
                                            <p className="text-gray-700 mb-2">
                                                <strong>Evaluator Remarks:</strong> {task.evaluatorRemarks}
                                            </p>
                                            <p className="text-gray-700 mb-4">
                                                <strong>Evaluated By:</strong> {task.evaluatorName}
                                            </p>
                                            <td>
                                                <div className="flex justify-start pl-36" >
                                                    <Link target="_blank" to={task.taskFileUpload} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View Material</Link>
                                                </div>

                                            </td>
                                        </>
                                    )}
                                    {task.taskStatus === "Task Submitted" && task.evaluateStatus === "Not Evaluated" && (
                                        <>
                                            <span className="text-yellow-500 font-semibold">[To Be Evaluated]</span>
                                            <h2 className="text-lg font-semibold mb-2">{task.taskTitle}</h2>
                                            <p className="text-gray-500 mb-4">{task.taskDesc}</p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Session Name:</strong> {task.sessionName}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Task Type:</strong> {task.taskType}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Total Score:</strong> {task.totalScore}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Submitted Git Link:</strong> <span style={{ fontSize: "14px" }}>{task.gitLink}</span>
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Due Date:</strong> {task.dueDate}
                                            </p>
                                            {task.updatedDate ? (
                                                <p className="text-gray-700 mb-2">
                                                    <strong>Submission Date:</strong> {task.updatedDate}
                                                </p>
                                            ) : (
                                                <p className="text-gray-700 mb-4" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <strong style={{ marginRight: '8px' }}>Submission Date:</strong> {task.subDate}
                                                    {isLateSubmission && (
                                                        <img src="https://www.svgrepo.com/show/451892/task-past-due.svg" alt="Late Submission" style={{ width: '20px', marginLeft: '5px' }} />
                                                    )}
                                                </p>
                                            )}
                                            <td>
                                                <div className="flex justify-start pl-32 pt-20" >
                                                    <Link target="_blank" to={task.taskFileUpload} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View Material</Link>
                                                </div>

                                            </td>
                                            <td>
                                                <button onClick={() => { updateSubTask(task.submitTaskId) }} className="btn btn-primary" style={{ marginLeft: "30px" }}>Update</button>
                                            </td>
                                        </>
                                    )}
                                    {task.taskStatus === "Task Not Submitted" && (
                                        <>
                                            <span className="text-red-500 font-semibold">[Assigned]</span>
                                            <h2 className="text-lg font-semibold mb-2">{task.taskTitle}</h2>
                                            <p className="text-gray-500 mb-4">{task.taskDesc}</p>
                                            <p className="text-gray-700 mb-3">
                                                <strong>Session Name:</strong> {task.sessionName}
                                            </p>
                                            <p className="text-gray-700 mb-3">
                                                <strong>Task Type:</strong> {task.taskType}
                                            </p>
                                            <p className="text-gray-700 mb-3">
                                                <strong>Total Score:</strong> {task.totalScore}
                                            </p>
                                            <p className="text-gray-700 mb-3">
                                                <strong>Due Date:</strong> {task.dueDate}
                                            </p>
                                            <p className="text-gray-700 mb-6">

                                            </p><br /><br />
                                            <td>
                                                <div className="flex justify-start pl-16 pt-28" >
                                                    <Link target="_blank" to={task.taskFileUpload} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View Material</Link>
                                                </div>

                                            </td>
                                            <td>
                                                <div className="flex justify-end">
                                                    <button onClick={() => readValue(task.taskId)} style={{ marginLeft: "20px" }} type="button" className="btn bg-blue-500 text-white px-4 py-2 rounded-md">Submit Task</button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </div>
                            })) : (
                            <div className="flex justify-center items-center w-full h-full">
                                <p className="text-xl text-gray-800">No Tasks Found !!!!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <div className="flex justify-end">
                {showModal && (
                    <div className="modal show d-block" tabIndex={-1}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Submit Task</h1>
                                    <button type="button" className="btn-close" onClick={closeModal} />
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">GitHub Link:</label>
                                            <input type="text" name="gitLink" className="form-control" value={inputField.gitLink} onChange={inputHandler} />
                                            {errors.gitLink && <span style={{ color: 'red' }} className="error">{errors.gitLink}</span>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message-text" className="col-form-label">Remarks:</label>
                                            <textarea name="remarks" className="form-control" value={inputField.remarks} onChange={inputHandler} />
                                            {errors.remarks && <span style={{ color: 'red' }} className="error">{errors.remarks}</span>}
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                    <button type="button" onClick={() => submitTask()} className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {showOverlay && (
                    <div
                        className="modal-backdrop fade show"
                        onClick={() => {
                            setShowModal(false);
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
            </div>
            <div>
                <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstTask + 1}</span> to <span className="font-medium">{indexOfLastTask > studViewTaskData.length ? studViewTaskData.length : indexOfLastTask}</span> of <span className="font-medium">{studViewTaskData.length}</span> results
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
        </div>
    );
};

export default StudentViewTasks;