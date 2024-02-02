import React, { useState } from 'react';
import Navbar from './Navbar';
import '../../config/config';
import axios from 'axios';

const AdminSendNotification = () => {
    const initialNotificationData = {
        batchId: '',
        message: '',
        sendby: '',
        title: ''
    };

    const [notificationData, setNotificationData] = useState(initialNotificationData);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (event) => {
        setNotificationData({ ...notificationData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const apiUrl = global.config.urls.api.server + "/api/lms/sendNotification";
        const axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };

        try {
            const response = await axios.post(apiUrl, notificationData, axiosConfig);

            if (response.data.status === 'Success') {
                setSuccessMessage(response.data.message);
                // Reset the text fields to their initial empty state
                setNotificationData(initialNotificationData);
            } else {
                setErrorMessage(response.data.message || 'Error sending notification');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Error sending notification');
        }
    };

    // Inline styles
    const styles = {
        container: {
            textAlign: 'center',
            margin: '20px',
        },
        card: {
            border: '1px solid #ddd',
            borderRadius: '5px',
            padding: '20px',
            maxWidth: '400px',
            margin: '0 auto',
        },
        input: {
            margin: '5px 0',
            padding: '10px',
            width: '100%',
            borderRadius: '5px',
            border: '1px solid #ddd'
        },
        textarea: {
            margin: '5px 0',
            padding: '10px',
            width: '100%',
            height: '100px',
            borderRadius: '5px',
            border: '1px solid #ddd'
        },
        label: {
            display: 'block',
            margin: '10px 0 5px 0',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
            width: '100%',
        },
        errorMessage: {
            color: 'red',
            margin: '10px 0',
        },
        successMessage: {
            color: 'green',
            margin: '10px 0',
        }
    };

    return (
        <div style={styles.container}>
            <Navbar />
            <h2>Send Notification</h2>
            {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
            {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
            <div style={styles.card}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label style={styles.label}>Batch ID:</label>
                        <input
                            type="text"
                            name="batchId"
                            value={notificationData.batchId}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Message:</label>
                        <textarea
                            name="message"
                            value={notificationData.message}
                            onChange={handleChange}
                            style={styles.textarea}
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Sender:</label>
                        <input
                            type="text"
                            name="sendby"
                            value={notificationData.sendby}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={notificationData.title}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Send Notification</button>
                </form>
            </div>
        </div>
    );
};

export default AdminSendNotification;
