import React, { useEffect, useState } from 'react';
import StudNavBar from './StudNavBar';
import '../../config/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentUpdateSubmittedTask = () => {
    const [submitTaskData, setSubmitTaskData] = useState([]);
    const [updateSubTaskField, setUpdateSubTaskField] = useState({
        id: sessionStorage.getItem('subtaskId'),
        gitLink: '',
        remarks: ''
    });

    const [showWaitingModal, setShowWaitingModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // New state for overlay

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const apiUrl = global.config.urls.api.server + '/api/lms/studentviewsubmittedtask';
    const apiUrl2 = global.config.urls.api.server + '/api/lms/studupdatesubmittedtask';

    const closeWaitingModal = () => {
        setShowOverlay(false)
        setShowWaitingModal(false)
    };

    const updateSubTaskHandler = (event) => {
        setErrors({})
        setUpdateSubTaskField({ ...updateSubTaskField, [event.target.name]: event.target.value });
    };


    const getData = () => {
        let data = { id: sessionStorage.getItem('subtaskId') };
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                token: sessionStorage.getItem('studLoginToken'),
                key: sessionStorage.getItem('studentkey')
            }
        };
        axios.post(apiUrl, data, axiosConfig).then((response) => {
            if (response.data) {
                setSubmitTaskData(response.data[0]);
                setUpdateSubTaskField(response.data[0]);
            } else {
                if (response.data.status === 'Unauthorized access!!') {
                    navigate('/studentLogin');
                    sessionStorage.clear();
                } else {
                    alert(response.data.status);
                }
            }
        });
    };

    const updateSubmittedTask = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(updateSubTaskField);
        setShowWaitingModal(true)
        setShowOverlay(true)
        let axiosConfig2 = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                token: sessionStorage.getItem('studLoginToken'),
                key: sessionStorage.getItem('studentkey')
            }
        };
        let data = {
            id: sessionStorage.getItem('subtaskId'),
            gitLink: updateSubTaskField.gitLink,
            remarks: updateSubTaskField.remarks
        };
        axios.post(apiUrl2, data, axiosConfig2).then((response) => {
            if (Object.keys(validationErrors).length === 0) {
                if (response.data.status === 'success') {
                    closeWaitingModal()
                    setTimeout(() => {
                        alert('Task Updated Successfully!!!');
                        navigate('/studentViewTask');
                    }, 500)
                } else {
                    if (response.data.status === 'Unauthorized access!!') {
                        navigate('/studentLogin');
                        sessionStorage.clear();
                    } else {
                        setShowWaitingModal()
                        if (response.data.status === 'Validation failed' && response.data.data.gitLink) {
                            alert(response.data.data.gitLink);
                        } else if (response.data.status === 'Validation failed' && response.data.data.Remarks) {
                            alert(response.data.data.Remarks);
                        } else {
                            closeWaitingModal()
                            setTimeout(() => {
                                alert(response.data.status)
                            }, 500)
                        }
                    }
                }
            } else {
                setErrors(validationErrors);
            }
        });
    };

    const validateForm = (data) => {
        let errors = {};

        if (!data.gitLink.trim()) {
            errors.gitLink = 'Git Link is required.';
        } else if (!/^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/i.test(data.gitLink)) {
            errors.gitLink = "Invalid Git Link."
        }

        if (!data.remarks.trim()) {
            errors.remarks = 'Remarks is required!';
        }

        return errors;
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <StudNavBar />
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Submitted Task</h2>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                GitHub Link
                            </label>
                            <input
                                type="text"
                                name="gitLink"
                                value={updateSubTaskField.gitLink}
                                onChange={updateSubTaskHandler}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type GitHub Link"
                                required
                            />
                            {errors.gitLink && <span style={{ color: 'red' }} className="error">{errors.gitLink}</span>}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Remarks
                            </label>
                            <textarea
                                name="remarks"
                                value={updateSubTaskField.remarks}
                                onChange={updateSubTaskHandler}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type Remarks"
                                required
                            ></textarea>
                            {errors.remarks && <span style={{ color: 'red' }} className="error">{errors.remarks}</span>}
                        </div>
                    </div>
                    <br />
                    <div className="flex justify-start gap-4">
                        <button onClick={updateSubmittedTask} className="btn btn-primary">
                            Update
                        </button>
                        <button onClick={() => navigate(-1)} className="btn btn-secondary">
                            Back
                        </button>
                    </div>
                </div>
                </section>
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

export default StudentUpdateSubmittedTask;

