import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../../config/config'
import axios from 'axios';

const StudentViewOneTask = () => {
    const [studViewTaskData, setStudViewTaskData] = useState([]);
    const [errors, setErrors] = useState({});
    const [inputField, setInputField] = useState({
        "gitLink": "",
        "remarks": ""
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(3);

    let [taskId, setTaskId] = useState({})
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay

    const apiUrl = global.config.urls.api.server + "/api/lms/studViewTaskOfSessions";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/tasksubmissionByStudent";

    const getData = () => {
        let data = { "id": sessionStorage.getItem("studentId"), "sessionId": sessionStorage.getItem("SessionId") };
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
                        alert(response.data.status)
                    }
                }
            }
        ).catch(error => console.error("Error:", error));
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
        axios.post(apiUrl2, data2, axiosConfig).then(
            (response) => {
                if (response.data.status === "success") {
                    alert("Task Submitted Successfully !!");
                    getData()
                    setInputField({
                        "gitLink": "",
                        "remarks": ""
                    });
                    setShowModal(false)
                    setShowOverlay(false); // Close the overlay
                } else {
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
                                alert(response.data.status);
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
            <div className="flex justify-between items-center mt-4 ml-4 mb-4">
                <h2 className="text-lg font-bold">Student View Tasks</h2>
                <Link to="/studSessionView" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginRight: '20px' }}>Back</Link>
            </div>
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
                                            <h2 className="text-lg font-semibold mb-2">{task.taskTitle}</h2>
                                            <p className="text-gray-500 mb-4">{task.taskDesc}</p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Task Type:</strong> {task.taskType}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Total Score:</strong> {task.totalScore}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Submitted Git Link:</strong> {task.gitLink}
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
                                            <p className="text-gray-700 mb-8">
                                                <strong>Evaluated By:</strong> {task.evaluatorName}
                                            </p>
                                            <td>
                                                <div className="flex justify-start pl-40" >
                                                    <Link target="_blank" rel='noreferrer' to={task.taskFileUpload} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View Material</Link>
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
                                                <strong>Task Type:</strong> {task.taskType}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Total Score:</strong> {task.totalScore}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Submitted Git Link:</strong> {task.gitLink}
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
                                                <div className="flex justify-start pl-28 pt-24" >
                                                    <Link target="_blank" rel='noreferrer' to={task.taskFileUpload} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View Material</Link>
                                                </div>

                                            </td>
                                            <td>
                                                <button onClick={() => { updateSubTask(task.submitTaskId) }} className="btn btn-primary" style={{ marginLeft: "20px" }}>Update</button>
                                            </td>
                                        </>
                                    )}
                                    {task.taskStatus === "Task Not Submitted" && (
                                        <>
                                            <span className="text-red-500 font-semibold">[Assigned]</span>
                                            <h2 className="text-lg font-semibold mb-2">{task.taskTitle}</h2>
                                            <p className="text-gray-500 mb-8">{task.taskDesc}</p>
                                            <p className="text-gray-700 mb-8">
                                                <strong>Task Type:</strong> {task.taskType}
                                            </p>
                                            <p className="text-gray-700 mb-8">
                                                <strong>Total Score:</strong> {task.totalScore}
                                            </p>
                                            <p className="text-gray-700 mb-4">
                                                <strong>Due Date:</strong> {task.dueDate}
                                            </p>
                                            <p className="text-gray-700 mb-4">

                                            </p><br /><br />
                                            <td>
                                                <div className="flex justify-start pl-16 pt-20" >
                                                    <Link target="_blank" rel='noreferrer' to={task.taskFileUpload} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View Material</Link>
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
                            })) : <p>No Tasks Found !!!!</p>}
                    </div>
                </div>
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
            </section>
            <div>
                {currentTask.length > 0 && (
                    <div className="flex flex-col items-center mt-4">
                        <span className="text-sm text-gray-700 dark:text-gray-400">
                            Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstTask + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{indexOfLastTask > studViewTaskData.length ? studViewTaskData.length : indexOfLastTask}</span> of <span className="font-semibold text-gray-900 dark:text-white">{studViewTaskData.length}</span> Entries
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                            {currentPage > 1 && (
                                <button onClick={() => paginate(currentPage - 1)} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    Prev
                                </button>
                            )}
                            {currentPage < totalPages && (
                                <button onClick={() => paginate(currentPage + 1)} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StudentViewOneTask