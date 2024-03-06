import React, { useState } from 'react'
import AdmStaffNavBar from './AdmStaffNavBar'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminStaffSearchSubmittedTask = () => {

    const [inputField, setInputField] = useState({
        "subTaskSearchQuery": ""
    });

    const [outputField, setOutputField] = useState({
        "adminstaffId": "",
        "evaluatorRemarks": "",
        "score": ""
    });

    const outputHandler = (event) => {
        setErrors({}); // Clear previous errors
        setOutputField({ ...outputField, [event.target.name]: event.target.value });
    };

    const [subtasks, setSubTasks] = useState([]);
    const [errors, setErrors] = useState({});
    let [submittedTaskId, setSubmittedTaskId] = useState("")
    const [searchExecuted, setSearchExecuted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [subtasksPerPage] = useState(10); // Number of tasks per page

    const apiUrl = global.config.urls.api.server + '/api/lms/admstaffsearchsubtask'
    const apiUrl2 = global.config.urls.api.server + "/api/lms/evaluateTask"

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    };

    const searchSubmittedTasks = () => {
        setIsLoading(true);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admstaffLogintoken"),
                "key": sessionStorage.getItem("admstaffkey")
            }
        };
        axios.post(apiUrl, inputField, axiosConfig)
            .then(response => {
                setInputField({ "subTaskSearchQuery": "" });
                setSubTasks(response.data.data);
                setIsLoading(false);
                setSearchExecuted(true);
            })
            .catch(error => {
                console.error("Search failed:", error);
                setIsLoading(false);
            });
    };

    const evaluateTask = () => {
        let newErrors = {};
        if (!outputField.evaluatorRemarks.trim()) {
            newErrors.evaluatorRemarks = "Remarks required!";
        }

        if (!outputField.score.trim()) {
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
            "evaluatorRemarks": outputField.evaluatorRemarks,
            "score": outputField.score
        }
        axios.post(apiUrl2, data2, axiosConfig).then(
            (response) => {
                if (response.data.status === "Task evaluated successfully") {
                    alert("Task evaluated successfully")
                    searchSubmittedTasks()
                    setOutputField({
                        evaluatorRemarks: "",
                        score: ""
                    });
                } else {
                    if (response.data.status === "Validation failed" && response.data.data.evaluatorRemarks) {
                        alert(response.data.data.evaluatorRemarks);
                        setOutputField({
                            evaluatorRemarks: "",
                            score: ""
                        });
                    } else {
                        if (response.data.status === "Validation failed" && response.data.data.score) {
                            alert(response.data.data.score);
                            setOutputField({
                                evaluatorRemarks: "",
                                score: ""
                            });
                        } else {
                            if (response.data.status === "Unauthorized access!!") {
                                navigate("/admstafflogin")
                                sessionStorage.clear()
                            } else {
                                alert(response.data.status);
                                setOutputField({
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

    const indexOfLastTask = currentPage * subtasksPerPage;
    const indexOfFirstTask = indexOfLastTask - subtasksPerPage;
    const currentTasks = subtasks ? subtasks.slice(indexOfFirstTask, indexOfLastTask) : [];

    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(subtasks.length / subtasksPerPage);

    const rangeSize = 5; // Number of pages to display in the pagination
    const lastPage = Math.ceil(subtasks.length / subtasksPerPage); // Calculate the total number of pages
    let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
    let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * subtasksPerPage) + index + 1;
    }

    const readValue = (id) => {
        setSubmittedTaskId(id)
    }

    return (
        <div>
            <AdmStaffNavBar /> <br />
            <div className="container py-5">
                <div className="row">
                    <div className="col col-12">
                        <div className="row g-3">
                            <div className="col col-12 text-center">
                                <h1>Search Submitted Tasks</h1>
                            </div>
                            <div className="col col-md-6 mx-auto"> {/* Center-align the search bar */}
                                <div className="input-group mb-3"> {/* Use an input group */}
                                    <input onChange={inputHandler} type="text" className="form-control" name="subTaskSearchQuery" value={inputField.subTaskSearchQuery} placeholder='Batch Name/College Name/Task Title' />
                                    <button onClick={searchSubmittedTasks} className="btn btn-warning ms-2">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (searchExecuted && subtasks ? (
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>S.No.</th>
                                    <th>College Name</th>
                                    <th>Batch Name</th>
                                    <th>Membership No.</th>
                                    <th>Student Name</th>
                                    <th>Task Title</th>
                                    <th>Due Date</th>
                                    <th>Git Link</th>
                                    <th>Remarks</th>
                                    <th>Submitted Date</th>
                                    <th>Evaluated Date</th>
                                    <th>Evaluator Remarks</th>
                                    <th>Score</th>
                                    <th>Total Score</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTasks.map((task, index) => {
                                    return <tr key={task.id}>
                                        <td>{calculateSerialNumber(index)}</td>
                                        <td>{task.collegeName}</td>
                                        <td>{task.batchName}</td>
                                        <td>{task.membership_no}</td>
                                        <td>{task.studName}</td>
                                        <td>{task.taskTitle}</td>
                                        <td>{task.dueDate}</td>
                                        <td>
                                            <Link target="_blank" to={task.gitLink} className="btn bg-blue-500 text-white btn-sm me-2">Link</Link>
                                        </td>
                                        <td>{task.remarks}</td>
                                        <td>{task.subDate}</td>
                                        {task.evalDate !== null && (
                                            <td>
                                                {task.evalDate}
                                            </td>
                                        )}
                                        {task.evalDate === null && (
                                            <td>
                                                NIL
                                            </td>
                                        )}
                                        {task.evaluatorRemarks !== null && (
                                            <td>
                                                {task.evaluatorRemarks}
                                            </td>
                                        )}
                                        {task.evaluatorRemarks === null && (
                                            <td>
                                                NIL
                                            </td>
                                        )}
                                        {task.score !== null && (
                                            <td>
                                                {task.score}
                                            </td>
                                        )}
                                        {task.score === null && (
                                            <td>
                                                NIL
                                            </td>
                                        )}
                                        <td>{task.totalScore}</td>
                                        <td>
                                            <button onClick={() => readValue(task.submitTaskId)} type="button" className="btn btn-primary btn-sm me-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" disabled={task.evalDate !== null}>Evaluate Task</button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{indexOfFirstTask + 1}</span> to <span className="font-medium">{indexOfLastTask > subtasks.length ? subtasks.length : indexOfLastTask}</span> of <span className="font-medium">{subtasks.length}</span> results
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
                ) : (searchExecuted && !subtasks ? (
                    <div className="alert alert-info" role="alert">
                        No Submitted tasks found.
                    </div>
                ) : null))}
            </div>
            <div>
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
                                            <input type="text" name="score" className="form-control" value={outputField.score} onChange={outputHandler} />
                                            {errors.score && <span style={{ color: 'red' }} className="error">{errors.score}</span>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message-text" className="col-form-label">Evaluator Remarks:</label>
                                            <textarea name="evaluatorRemarks" className="form-control" value={outputField.evaluatorRemarks} onChange={outputHandler} />
                                            {errors.evaluatorRemarks && <span style={{ color: 'red' }} className="error">{errors.evaluatorRemarks}</span>}
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={() => evaluateTask()} type="button" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminStaffSearchSubmittedTask