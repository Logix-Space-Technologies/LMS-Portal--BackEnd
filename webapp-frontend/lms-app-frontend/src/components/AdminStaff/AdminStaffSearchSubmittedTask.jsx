import React, { useState } from 'react'
import AdmStaffNavBar from './AdmStaffNavBar'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminStaffSearchSubmittedTask = () => {

    const [inputField, setInputField] = useState({
        "taskQuery": ""
    });

    const [subtasks, setSubTasks] = useState([]);
    const [searchExecuted, setSearchExecuted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [subtasksPerPage] = useState(10); // Number of tasks per page

    const apiUrl = global.config.urls.api.server + '/api/lms/admstaffsearchsubtask'

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setInputField({ ...inputField, [name]: value });
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
                setSubTasks(response.data.data);
                setInputField({ taskQuery: "" })
                setIsLoading(false);
                setSearchExecuted(true);
            })
            .catch(error => {
                console.error("Search failed:", error);
                setIsLoading(false);
            });
    };

    const indexOfLastTask = currentPage * subtasksPerPage;
    const indexOfFirstTask = indexOfLastTask - subtasksPerPage;
    const currentTasks = subtasks ? subtasks.slice(indexOfFirstTask, indexOfLastTask) : [];

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const calculateSerialNumber = (index) => {
        return ((currentPage - 1) * subtasksPerPage) + index + 1;
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
                                            <Link target="_blank" to={task.gitLink} className="btn bg-blue-500 text-white btn-sm me-2">Submission</Link>
                                        </td>
                                        <td>{task.remarks}</td>
                                        <td>{task.subDate}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm me-2">Evaluate Task</button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (searchExecuted && !subtasks ? (
                    <div className="alert alert-info" role="alert">
                        No Submitted tasks found.
                    </div>
                ) : null))}
            </div>
            {currentTasks.length > 0 && (
                <div className="flex justify-center mt-8">
                    <nav>
                        <ul className="flex list-style-none">
                            {currentPage > 1 && (
                                <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                    Previous
                                </li>
                            )}
                            {Array.from({ length: Math.ceil(subtasks.length / subtasksPerPage) }, (_, i) => (
                                <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    {i + 1}
                                </li>
                            ))}
                            {currentPage < Math.ceil(subtasks.length / subtasksPerPage) && (
                                <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                                    Next
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    )
}

export default AdminStaffSearchSubmittedTask