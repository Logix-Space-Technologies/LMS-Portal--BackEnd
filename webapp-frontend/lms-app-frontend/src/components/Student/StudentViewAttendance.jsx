import React, { useEffect, useState } from 'react';
import '../../config/config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const StudentViewAttendance = () => {
    const [studentViewAttendance, setStudentViewAttendance] = useState([]);
    const [inputField, setInputField] = useState(
        {
            "attendenceCode": "",
            "studId": ""
        }
    )

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showWaitingModal, setShowWaitingModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay

    const navigate = useNavigate()

    const attendanceHandler = (event) => {
        setErrors({}); // Clear previous errors
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const apiUrl = global.config.urls.api.server + '/api/lms/studentViewSessionWiseAttendance';
    const apiUrl2 = global.config.urls.api.server + '/api/lms/studmarkattendance'

    const getData = () => {
        const data = { "studId": sessionStorage.getItem('studentId'), "sessionId": sessionStorage.getItem("SessionId") };
        const axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "token": sessionStorage.getItem("studLoginToken")
            },
        };

        axios.post(apiUrl, data, axiosConfig).then((response) => {
            if (response.data.data) {
                setStudentViewAttendance(response.data.data);
            } else {
                if (response.data.status === "Unauthorized User!!") {
                    navigate("/studentLogin")
                    sessionStorage.clear()
                } else {
                    alert(response.data.status)
                }
            }
        });
    };

    const closeWaitingModal = () => {
        setShowOverlay(false)
        setShowWaitingModal(false)
    }

    const submitAttendance = () => {
        let newErrors = {};
        if (!inputField.attendenceCode.trim()) {
            newErrors.attendenceCode = "Attendance Code is  required!";
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
            "attendenceCode": inputField.attendenceCode,
            "studId": sessionStorage.getItem('studentId')
        }

        axios.post(apiUrl2, data2, axiosConfig).then(
            (response) => {
                if (response.data.status === "success") {
                    closeWaitingModal()
                    setTimeout(() => {
                        alert("Attendance Marked Successfully!!!")
                        getData()
                        setInputField({
                            "attendenceCode": "",
                            "studId": ""
                        }, 500)
                    })
                    setShowModal(false)
                    setShowOverlay(false); // Close the overlay
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/studentLogin")
                        sessionStorage.clear()
                    } else {
                        if (response.data.status === "Invalid Attendance Code") {
                            alert(response.data.status)
                        } else {
                            closeWaitingModal()
                            setTimeout(() => {
                                alert(response.data.status)
                            }, 500)
                        }
                    }
                }
            }
        )
    }


    const openModal = () => {
        setShowModal(true);
        setShowOverlay(true);
    }

    // Function to close both modal and overlay
    const closeModal = () => {
        setShowModal(false);
        setShowOverlay(false);
        setErrors({})
        setInputField({
            "attendenceCode": ""
        })
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <br />
            <br />
            <div className="flex justify-between items-center mt-8 ml-4 mb-4">
                <h2 className="text-lg font-bold">Student View Attendance</h2>
                <Link to="/studSessionView" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginRight: '20px' }}>Back</Link>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Session Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentViewAttendance && studentViewAttendance.map((value, index) => {
                            const isPresent = value.attendence_status.toLowerCase() === 'present';
                            const buttonClassName = isPresent ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700';

                            const getCurrentDateFormatted = () => {
                                const currentDate = new Date();
                                const day = String(currentDate.getDate()).padStart(2, '0');
                                const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // January is 0!
                                const year = currentDate.getFullYear();
                                return `${day}/${month}/${year}`;
                            };


                            const currentDate = getCurrentDateFormatted()
                            // Check if session date matches current date
                            const isSessionCurrentDate = value.date === currentDate;

                            return (
                                <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">
                                        {value.sessionName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none py-0.5 px-1 text-xs rounded-md ${buttonClassName}`} style={{ opacity: 1 }}>
                                            {isPresent ? 'Present' : 'Absent'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        {isSessionCurrentDate && !isPresent && (
                                            <Link type="button" class="btn btn-primary" onClick={openModal}>
                                                Mark Attendance
                                            </Link>
                                        )}
                                    </td>
                                </tr>

                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                {/* Modal */}
                <div>
                    {showModal && (
                        <div className="modal show d-block" tabIndex={-1}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Mark Attendance</h1>
                                        <button type="button" className="btn-close" onClick={closeModal} />
                                    </div>
                                    <div className="modal-body">
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <label htmlFor="" className="form-label">Attendance Code</label>
                                            <input type="text" className="form-control" onChange={attendanceHandler} name="attendenceCode" value={inputField.attendenceCode} />
                                            {errors.attendenceCode && <span style={{ color: 'red' }} className="error">{errors.attendenceCode}</span>}
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                        <button type="button" onClick={submitAttendance} className="btn btn-primary">Submit</button>
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

    )
}

export default StudentViewAttendance