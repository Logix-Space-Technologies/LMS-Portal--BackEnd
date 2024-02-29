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

    useEffect(() => { getData() }, [])


    return (
        <>
            <div>
                <AdmStaffNavBar />
                <br />
                <strong>Admin Staff View Submitted Tasks</strong><br /><br />
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    College Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Batch Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Membership No.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Student Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Task Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Due Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Git Link
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Remarks
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Submitted Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Evaluated Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Late Submission Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Evaluator Remarks
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Score
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskData ? (taskData.map(
                                (value, index) => {
                                    return <tr index={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

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
                                        <td className="px-6 py-4">
                                            {value.taskTitle}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.dueDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={value.gitLink} target="_blank" rel="noopener noreferrer">
                                                {value.gitLink}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.remarks}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.subDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.evalDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.lateSubDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.evaluatorRemarks}
                                        </td>
                                        <td className="px-6 py-4">
                                            {value.score}
                                        </td>
                                        <td className="px-6 py-4">
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

                            </tr>
                            }
                        </tbody>
                    </table>
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