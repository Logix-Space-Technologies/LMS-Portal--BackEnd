import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StudNavBar from './StudNavBar';
import '../../config/config'
import { Link, useNavigate } from 'react-router-dom';

const StudentViewTasks = () => {
    const [studViewTaskData, setStudViewTaskData] = useState([]);
    const [errors, setErrors] = useState({});
    const [inputField, setInputField] = useState({
        "gitLink": "",
        "remarks": ""
    });

    let [taskId, setTaskId] = useState({})
    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/studViewTask";
    const apiUrl2 = global.config.urls.api.server + "/api/lms/tasksubmissionByStudent";

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
                    console.log(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/studentLogin")
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status)
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
        console.log(data2)
        axios.post(apiUrl2, data2, axiosConfig).then(
            (response) => {
                if (response.data.status === "success") {
                    alert("Task Submitted Successfully !!");
                    window.location.reload();
                    setInputField({
                        "gitLink": "",
                        "remarks": ""
                    });
                } else {
                    if (response.data.status === "Validation failed" && response.data.data.gitLink) {
                        alert(response.data.data.gitLink);
                    } else {
                        if (response.data.status === "Validation failed" && response.data.data.remarks) {
                            alert(response.data.data.remarks);
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

    const readValue = (taskId) => {
        setTaskId(taskId)
        console.log(taskId)
    };

    useEffect(() => { getData(); }, []);

    return (
        <div>
            <StudNavBar />
            <br />
            <h1 style={{marginLeft:"20px", marginBottom: "0px", textAlign:"center"}}>Student View Tasks</h1>
            <section className="flex flex-col justify-center antialiased bg-gray-100 text-gray-600 min-h-screen p-4 pt-0 pb-0">
                <div className="h-full">
                    {/* Cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {studViewTaskData ? (studViewTaskData.map(
                            (task, index) => {
                                return <div className="bg-white shadow-lg rounded-md p-4" key={index}>
                                    {task.taskStatus === "Task Submitted" && task.evaluateStatus === "Evaluated" && (
                                        <>
                                            <span className="text-green-500 font-semibold">[Evaluated]</span>
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
                                                <strong>Submitted Git Link:</strong> {task.gitLink}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Score Obtained:</strong> {task.score}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Due Date:</strong> {task.dueDate}
                                            </p>
                                            {task.updatedDate && (
                                                <p className="text-gray-700 mb-2">
                                                    <strong>Submission Date:</strong> {task.updatedDate}
                                                </p>
                                            )}
                                            {!task.updatedDate && task.subDate > task.dueDate && (
                                                <p className="text-gray-700 mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <strong style={{ marginRight: '8px' }}>Submission Date: </strong> {task.lateSubDate}
                                                    <img src="https://www.svgrepo.com/show/451892/task-past-due.svg" alt="Late Submission" style={{ width: '20px', marginLeft: '5px' }} />
                                                </p>
                                            )}
                                            {!task.updatedDate && task.subDate <= task.dueDate && (
                                                <p className="text-gray-700 mb-2">
                                                    <strong>Submission Date:</strong> {task.subDate}
                                                </p>
                                            )}
                                            <p className="text-gray-700 mb-2">
                                                <strong>Evaluator Remarks:</strong> {task.evaluatorRemarks}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Evaluated By:</strong> {task.evaluatorName}
                                            </p>
                                            <td>
                                                <div className="flex justify-start pl-24" >
                                                    <Link target="_blank" href={task.taskFileUpload} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View Material</Link>
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
                                                <strong>Submitted Git Link:</strong> {task.gitLink}
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <strong>Due Date:</strong> {task.dueDate}
                                            </p>
                                            {task.updatedDate && (
                                                <p className="text-gray-700 mb-2">
                                                    <strong>Submission Date:</strong> {task.updatedDate}
                                                </p>
                                            )}
                                            {!task.updatedDate && task.subDate > task.dueDate && (
                                                <p className="text-gray-700 mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <strong style={{ marginRight: '8px' }}>Submission Date: </strong> {task.lateSubDate}
                                                    <img src="https://www.svgrepo.com/show/451892/task-past-due.svg" alt="Late Submission" style={{ width: '20px', marginLeft: '5px' }} />
                                                </p>
                                            )}
                                            {!task.updatedDate && task.subDate <= task.dueDate && (
                                                <p className="text-gray-700 mb-2">
                                                    <strong>Submission Date:</strong> {task.subDate}
                                                </p>
                                            )}
                                            <p className="text-gray-700 mb-2">
                                                <p><strong>Submission Status: </strong>Submitted</p>
                                            </p>
                                            <p className="text-gray-700 mb-2">
                                                <p><strong>Evaluation Status: </strong>Not Evaluated</p><br />
                                            </p>
                                            <td>
                                                <div className="flex justify-start pl-8" >
                                                    <Link target="_blank" to={task.taskFileUpload} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View Material</Link>
                                                </div>

                                            </td>
                                            <td>
                                                <button onClick={() => { updateSubTask(task.submitTaskId) }} className="btn btn-primary" style={{marginLeft:"30px"}}>Update</button>
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
                                                <div className="flex justify-start pl-4 pt-28" >
                                                    <Link target="_blank" to={task.taskFileUpload} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View Material</Link>
                                                </div>

                                            </td>
                                            <td>
                                                <div className="flex justify-end">
                                                    <button onClick={() => readValue(task.taskId)} style={{marginLeft:"20px"}} type="button" className="btn bg-blue-500 text-white px-4 py-2 rounded-md" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Submit Task</button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </div>
                            })) : <p>No Tasks Found !!!!</p>}
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Submit Task</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
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
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" onClick={() => submitTask()} className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudentViewTasks;
