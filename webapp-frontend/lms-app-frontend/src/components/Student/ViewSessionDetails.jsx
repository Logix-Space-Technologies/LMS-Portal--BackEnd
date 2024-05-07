import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../config/config'
import StudNavBar from './StudNavBar';
import { Link, useNavigate } from 'react-router-dom';

const SessionView = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCriteria, setFilterCriteria] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage] = useState(2); // Number of sessions per page
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
            sessionStorage.clear()
          } else {
            if (response.data.status === "No Session found!") {
              setSessions([]) //setSessions made empty
            } else {
              alert(response.data.status);
            }
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

  // Function to filter sessions based on date criteria
  const filterSessionsByDate = () => {
    if (!filterCriteria) {
      return sessions; // If no filter is selected, return all sessions
    }

    // Calculate date range based on filter criteria
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setMonth(startDate.getMonth() - filterCriteria);

    // Convert session dates to Date objects for comparison
    const filteredSessions = sessions.filter(session => {
      const sessionDateParts = session.date.split('/');
      const sessionDate = new Date(`${sessionDateParts[1]}/${sessionDateParts[0]}/${sessionDateParts[2]}`);
      return sessionDate >= startDate && sessionDate <= currentDate;
    });

    return filteredSessions;
  };


  // Function to handle filter criteria change
  const handleFilterChange = (event) => {
    const selectedCriteria = parseInt(event.target.value);
    setFilterCriteria(selectedCriteria);
  };

  // Logic for displaying current sessions
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const filteredSessions = filterSessionsByDate();
  const currentSessions = filteredSessions.slice(indexOfFirstSession, indexOfLastSession);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Total pages
  let totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);

  // Integration of new pagination logic
  const startPage = currentPage > 2 ? currentPage - 2 : 1;
  const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;

  // Update total results to reflect filtered sessions
  let totalResults = filteredSessions.length;

  return (

    <div>
      <StudNavBar />
      <br />
      <h1 style={{ marginLeft: '20px', textAlign: 'center' }}>View All Sessions</h1>
      <br />
      {loading ? (
        <div className="col-12 text-center">Loading...</div>
      ) : (
        currentSessions.length === 0 ? (
          <div className="col-12 text-center">No sessions found!</div>
        ) : (
          currentSessions.map((session, index) => (
            <div className="max-w-2xl mx-auto">
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
                  <p className="text-sm text-gray-600">Trainer Name: {session.trainerName}</p>
                  {!session.venueORlink.includes("meet.google.com") && !session.venueORlink.includes("zoom.us") && !session.venueORlink.includes("youtube.com") && !session.venueORlink.includes("vimeo.com") && !session.venueORlink.includes("teams.microsoft.com") && (
                    <p className="text-sm text-gray-600">Venue: {session.venueORlink}</p>
                  )}
                  <div className="flex gap-4 mt-4">
                    {session.venueORlink.includes("meet.google.com") && (
                      <Link to={session.venueORlink} target='_blank' rel='noopener noreferrer' className="text-white bg-blue-500 px-3 py-1 rounded-full text-xs font-semibold">Meeting Link</Link>
                    )}
                    {session.venueORlink.includes("zoom.us") && (
                      <Link to={session.venueORlink} target='_blank' rel='noopener noreferrer' className="text-white bg-blue-500 px-3 py-1 rounded-full text-xs font-semibold">Meeting Link</Link>
                    )}
                    {session.venueORlink.includes("youtube.com") && (
                      <Link to={session.venueORlink} target='_blank' rel='noopener noreferrer' className="text-white bg-blue-500 px-3 py-1 rounded-full text-xs font-semibold">Video Link</Link>
                    )}
                    {session.venueORlink.includes("vimeo.com") && (
                      <Link to={session.venueORlink} target='_blank' rel='noopener noreferrer' className="text-white bg-blue-500 px-3 py-1 rounded-full text-xs font-semibold">Video Link</Link>
                    )}
                    {session.venueORlink.includes("teams.microsoft.com") && (
                      <Link to={session.venueORlink} target='_blank' rel='noopener noreferrer' className="text-white bg-blue-500 px-3 py-1 rounded-full text-xs font-semibold">Meeting Link</Link>
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
      {/* Pagination */}
      {!loading && currentSessions.length > 0 && (
        <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstSession + 1}</span> to <span className="font-medium">{indexOfLastSession > totalResults  ? totalResults  : indexOfLastSession}</span> of <span className="font-medium">{totalResults }</span> results
              </p>
            </div>
            <div>
              <div className="flex items-center">
                <label htmlFor="filterCriteria" className="mr-2" style={{ whiteSpace: 'nowrap' }}>Filter by Date:</label>
                <select style={{ marginRight: '20px' }} id="filterCriteria" className="form-select" value={filterCriteria || ''} onChange={handleFilterChange}>
                  <option value="">Select Filter</option>
                  <option value="1">Within 1 month</option>
                  <option value="2">Within 2 months</option>
                  <option value="3">Within 3 months</option>
                  <option value="4">Within 4 months</option>
                  <option value="5">Within 5 months</option>
                </select>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button onClick={() => currentPage > 1 && paginate(currentPage - 1)} className={`relative inline-flex items-center px-2 py-2 text-sm font-medium ${currentPage === 1 ? 'cursor-not-allowed text-gray-500' : 'text-gray-700 hover:bg-gray-50'} disabled:opacity-50`} disabled={currentPage === 1}>
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {/* Dynamically generate Link components for each page number based on filtered sessions */}
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
      )}
    </div >
  );
};

export default SessionView;
