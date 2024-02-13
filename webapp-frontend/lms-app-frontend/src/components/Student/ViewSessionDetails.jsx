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
      <div className="bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
              <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col-12">
                    <h3>Session Details</h3>
                  </div>
                  {loading ? (
                    <div className="col-12 text-center">Loading...</div>
                  ) : (
                    sessions.length === 0 ? (
                      <div className="col-12 text-center">No sessions found!</div>
                    ) : (
                      sessions.map((session, index) => (
                        <div key={index} style={{ position: 'relative', width: '700px', height: '317px', borderRadius: '10px', transition: '0.3s', fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
                          <div style={{ width: '10px', height: '100%', backgroundColor: getSessionStatusColor(session.date, formatTime(session.time)), position: 'absolute', left: 0, borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}></div>
                          <div style={{ padding: '10px 16px', backgroundColor: '#AAF1F5', color: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            <h4><b>{session.sessionName}</b></h4>
                          </div>
                          <div style={{ padding: '2px 16px', flex: '1 0 auto', backgroundColor: '#EFF1DB', paddingTop: session.venueORlink.includes('meet.google.com') ? '60px' : '40px', }}>
                            <p style={{ marginBottom: '10px' }}><b>Date:</b> {session.date}</p>
                            <p style={{ marginBottom: '10px' }}><b>Time:</b> {formatTime(session.time)}</p>
                            <p style={{ marginBottom: '10px' }}><b>Type:</b> {session.type}</p>
                            {!session.venueORlink.includes("meet.google.com") && (
                              <p style={{ marginBottom: '10px' }}><b>Venue:</b> {session.venueORlink}</p>
                            )}
                          </div>
                          <div style={{ padding: '10px 16px', backgroundColor: '#D3B5E5', color: 'white', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', display: 'flex', justifyContent: 'space-around' }}>
                            {session.venueORlink.includes("meet.google.com") && (
                              <Link to={session.venueORlink} target='_blank' rel='noopener noreferrer' style={{ color: 'white', textDecoration: 'none', backgroundColor: '#FBC740', padding: '10px', borderRadius: '5px', margin: '0 10px' }} className="text-black bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                <img src="https://www.svgrepo.com/show/504419/google-meet.svg" className="w-4 h-4 me-2" aria-hidden="true" alt='' />
                                Meeting Link
                              </Link>

                            )}
                            {isSessionAccessible(session.date) ? (
                              <>
                                <Link to="/studentviewattendance" onClick={() => sessionClick(session.id)} style={{ color: 'white', textDecoration: 'none', backgroundColor: '#009534', padding: '10px', borderRadius: '5px', margin: '0 10px' }} className="text-black bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                  <img src="https://www.svgrepo.com/show/305294/people.svg" className="w-4 h-4 me-2" aria-hidden="true" alt='' />
                                  Attendance
                                </Link>
                                <Link to="/studviewtasksessionwise" onClick={()=> sessionClick(session.id)} style={{ color: 'white', textDecoration: 'none', backgroundColor: '#3498DB', padding: '10px', borderRadius: '5px', margin: '0 10px' }} className="text-black bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                  <img src="https://www.svgrepo.com/show/332592/unordered-list.svg" className="w-4 h-4 me-2" aria-hidden="true" alt='' />
                                  Tasks
                                </Link>
                              </>
                            ) : (
                              <>
                                <div style={{ color: 'grey', padding: '10px', borderRadius: '5px', margin: '0 10px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
                                  Attendance (Unavailable)
                                </div>
                                <div style={{ color: 'grey', padding: '10px', borderRadius: '5px', margin: '0 10px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
                                  Tasks (Unavailable)
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))


                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionView;
