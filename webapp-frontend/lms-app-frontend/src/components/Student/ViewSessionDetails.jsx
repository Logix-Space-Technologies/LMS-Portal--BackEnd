import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../config/config';

const StudentViewSession = () => {
    const [sessionData, setSessionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = global.config.urls.api.server + '/api/lms/studentViewSession';

    const getData = () => {
        let data = { "id": sessionStorage.getItem("batchId") };
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'token': sessionStorage.getItem('studLoginToken'),
                'key': sessionStorage.getItem('studentkey')
            }
        };

        axios.post(apiUrl, data, axiosConfig)
            .then((response) => {
                setLoading(false);

                if (response.data.status === 'success') {
                    setSessionData(response.data.data);
                } else {
                    setError(response.data.status);
                }
            })
            .catch((error) => {
                setLoading(false);
                setError('An error occurred while fetching data.');
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container mt-4">
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">Error: {error}</p>}

            {sessionData.map((session, index) => (
                <div key={index} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{session.sessionName}</h5>
                        <p className="card-text">Date: {session.date}</p>
                        <p className="card-text">Time: {session.time}</p>
                        <p className="card-text">Type: {session.type}</p>
                        <p className="card-text">Remarks: {session.remarks}</p>
                        <p className="card-text">Venue/Link: {session.venueORlink}</p>
                        <p className="card-text">Attendance Code: {session.attendenceCode}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StudentViewSession;
