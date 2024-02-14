import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../config/config'
import StudNavBar from './StudNavBar';
import { Link, useNavigate } from 'react-router-dom';

const SessionView = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = () => {
    const apiUrl = global.config.urls.api.server + "/api/lms/studentViewSession";
    const batchId = sessionStorage.getItem("studBatchId");
    const token = sessionStorage.getItem("studLoginToken");

    let axiosConfig = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "token": token,
        "key": sessionStorage.getItem("studentkey")
      }
    };

    axios.post(apiUrl, { "batchId": batchId }, axiosConfig)
      .then(response => {
        if (response.data.status === "success") {
          setSessions(response.data.data);
        } else {
          if (response.data.status === "Unauthorized access!!") {
            navigate("/studentLogin")
            sessionStorage.removeItem("studentkey");
            sessionStorage.removeItem("studentId");
            sessionStorage.removeItem("studemail");
            sessionStorage.removeItem("studBatchId");
            sessionStorage.removeItem("studLoginToken");
            sessionStorage.removeItem("subtaskId");
          } else {
            alert(response.data.status);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function formatTime(timeString) {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], options);
  }

  function getSessionStatusColor(sessionDate, sessionTime) {
    // Split the date into parts
    const dateParts = sessionDate.split('/');

    // Reformat the date from dd/mm/yyyy to yyyy-mm-dd
    const formattedDate = `${dateParts[2]}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}`;

    // Convert the 12-hour time to 24-hour time
    const timeParts = sessionTime.match(/(\d+):(\d+) (\w+)/);
    let hours = parseInt(timeParts[1], 10);
    const minutes = timeParts[2];
    const ampm = timeParts[3];

    if (ampm === 'PM' && hours < 12) {
      hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
      hours = 0;
    }

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes}`;

    // Combine the reformatted date with the reformatted time
    const sessionDateTime = new Date(`${formattedDate}T${formattedTime}`);

    const now = new Date();
    if (sessionDateTime > now) {
      return '#28a745'; // Green color for upcoming sessions
    } else {
      return '#dc3545'; // Red color for past sessions
    }
  }

  const sessionClick = (id) => {
    sessionStorage.setItem("SessionId", id);
  }

  // Function to determine if the session date is current or past (enabling attendance)
  const isSessionAccessible = (sessionDate) => {
    const [day, month, year] = sessionDate.split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    // Convert session date to a Date object
    const sessionDateTime = new Date(formattedDate);

    // Get the current date
    const now = new Date();

    // Check if the session date is on or after the current date
    return now >= sessionDateTime;
  };



  return (

    <div>
      <StudNavBar />
      <br />
      <h1 style={{ marginLeft: '20px', textAlign:'center' }}>View All Sessions</h1>
      <br />
      {loading ? (
        <div className="col-12 text-center">Loading...</div>
      ) : (
        sessions.length === 0 ? (
          <div className="col-12 text-center">No sessions found!</div>
        ) : (
          sessions.map((session, index) => (
            <div class="max-w-2xl mx-auto">
              <div key={index} className="flex mb-6">
                <div className="w-2 rounded-l-xl" style={{ backgroundColor: getSessionStatusColor(session.date, formatTime(session.time)) }}></div>
                <div className="flex-grow bg-white rounded-r-xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg text-blue-600 font-semibold">{session.sessionName}</h2>
                    <button className="text-blue-600 text-sm">
                      <span>...</span>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">{session.remarks}</p>
                  <p className="text-sm text-gray-600 mt-1">Date: {session.date}</p>
                  <p className="text-sm text-gray-600">Time: {formatTime(session.time)}</p>
                  <p className="text-sm text-gray-600">Type: {session.type}</p>

                  <div className="flex gap-4 mt-4">
                    {session.venueORlink.includes("meet.google.com") && (
                      <a href={session.venueORlink} target='_blank' rel='noopener noreferrer' className="text-white bg-blue-500 px-3 py-1 rounded-full text-xs font-semibold">Meeting Link</a>
                    )}
                    {isSessionAccessible(session.date) ? (
                      <>
                        <Link to="/studentviewattendance" onClick={() => sessionClick(session.id)} className="text-blue-500 border border-blue-500 px-3 py-1 rounded-full text-xs font-semibold" style={{ margin: '0 10px' }}>
                          Attendance
                        </Link>
                        <Link to="/studviewtasksessionwise" onClick={() => sessionClick(session.id)} className="text-blue-500 border border-blue-500 px-3 py-1 rounded-full text-xs font-semibold" style={{ margin: '0 10px' }}>
                          Tasks
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="#" className="text-blue-500 border border-blue-500 px-3 py-1 rounded-full text-xs font-semibold" style={{ margin: '0 10px' }}>
                          Attendance (Unavailable)
                        </Link>
                        <Link to="#" className="text-blue-500 border border-blue-500 px-3 py-1 rounded-full text-xs font-semibold" style={{ margin: '0 10px' }}>
                          Tasks (Unavailable)
                        </Link>
                      </>
                    )}

                  </div>
                </div>
              </div>
            </div>
          ))
        )
      )}

    </div>
  );
};

export default SessionView;
