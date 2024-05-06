import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../config/config';
import ClgStaffNavbar from './ClgStaffNavbar';
import { useNavigate } from 'react-router-dom';


const CollegeStaffViewBatch = () => {
  const [inputField, setInputField] = useState(
    {
      "collegeId": sessionStorage.getItem("clgStaffCollegeId"),
      "clgStaffBatchSearchQuery": ""
    }
  )
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentCount, setStudentCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [batchPerPage] = useState(10); // Number of batches per page

  const rangeSize = 5; // Number of pages to display in the pagination
  const lastPage = Math.ceil(batches.length / batchPerPage); // Calculate the total number of pages
  let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
  let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

  const apiUrl = global.config.urls.api.server + "/api/lms/collegeStaffViewBatch";
  const apiLink = global.config.urls.api.server + "/api/lms/clgStaffSearchBatch"
  const token = sessionStorage.getItem("clgstaffLogintoken");
  const collegeId = sessionStorage.getItem("clgStaffCollegeId");
  const navigate = useNavigate()

  const inputHandler = (event) => {
    setInputField({ ...inputField, [event.target.name]: event.target.value })
  }

  const taskScore = (batchId, batchName) => {
    sessionStorage.setItem("viewBatchScoreBatchId", batchId);
    sessionStorage.setItem("viewBatchScoreCollegeId", collegeId);
    sessionStorage.setItem("viewBatchName", batchName);
    navigate("/adminviewoverallBatchPerformance")
  }

  const fetchBatches = () => {
    let axiosConfig = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "token": token,
        "key": sessionStorage.getItem("clgstaffkey")
      }
    };

    axios.post(apiUrl, { "collegeId": collegeId }, axiosConfig)
      .then(response => {
        if (response.data.data) {
          // Assuming response.data.data is an array of batches
          const batches = response.data.data;
          setBatches(batches);

          // Calculate the sum of verifiedStudentCount
          let totalVerifiedStudentCount = batches.reduce((accumulator, batch) => {
            return accumulator + (batch.verifiedStudentCount || 0);
          }, 0);

          // Store the sum in a variable
          setStudentCount(totalVerifiedStudentCount)
        } else {
          if (response.data.status === "Unauthorized User!!") {
            sessionStorage.clear()
            navigate("/clgStafflogin")
          } else {
            if (!response.data.data) {
              //no data found
            } else {
              alert(response.data.status)
            }
          }
        }
      })
      .catch(error => {
        console.error('Error fetching batches:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const readValue = () => {
    let axiosConfig = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "token": sessionStorage.getItem("clgstaffLogintoken"),
        "key": sessionStorage.getItem("clgstaffkey")
      }
    };
    setLoading(true)
    axios.post(apiLink, inputField, axiosConfig).then(
      (response) => {
        if (response.data.data) {
          setBatches(response.data.data)
          setInputField({
            "collegeId": sessionStorage.getItem("clgStaffCollegeId"),
            "clgStaffBatchSearchQuery": ""
          })
          setLoading(false)
        } else {
          if (response.data.status === "Unauthorized User!!") {
            sessionStorage.clear()
            navigate("/clgStafflogin")
          } else {
            if (!response.data.data) {
              setLoading(false);
              setInputField({
                "collegeId": sessionStorage.getItem("clgStaffCollegeId"),
                "clgStaffBatchSearchQuery": ""
              })
              setTimeout(() => {
                fetchBatches()
                alert("No Batches Found !!")
              }, 500)
            } else {
              setLoading(false);
              setInputField({
                "collegeId": sessionStorage.getItem("clgStaffCollegeId"),
                "clgStaffBatchSearchQuery": ""
              })
              alert(response.data.status)
            }
          }
        }
      }
    )
  }


  const attendancePDFClick = (id, batchName) => {
    navigate("/clgstaffdownloadbatchwiseattendancelist")
    sessionStorage.setItem("clgstaffattendancepdfbatchid", id)
    sessionStorage.setItem("clgstaffattendancepdfbatchName", batchName)
  }


  const batchClick = (id, batchName) => {
    navigate("/clgstaffviewsession")
    sessionStorage.setItem("clgstaffbatchId", id)
    sessionStorage.setItem("viewsessionbatchName", batchName)
  }

  const studentClick = (id, batchName) => {
    navigate("/collegeStaffViewAllStudents")
    sessionStorage.setItem("clgstaffviewbatchId", id)
    sessionStorage.setItem("viewbatchName", batchName);
  }

  const notificationClick = (id) => {
    navigate("/clgstaffviewNotifications")
    sessionStorage.setItem("clgstaffbatchId", id)
  }

  // Logic for displaying current students
  const indexOfLastBatch = currentPage * batchPerPage;
  const indexOfFirstBatch = indexOfLastBatch - batchPerPage;
  const currentBatch = batches ? batches.slice(indexOfFirstBatch, indexOfLastBatch) : [];


  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(batches.length / batchPerPage);

  useEffect(() => { fetchBatches() }, []);


  return (
    <div>
      <ClgStaffNavbar />
      <div className="bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
              <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="row">
                    <div className="col-6">
                      <h1 style={{ fontWeight: 'bold', fontSize: '40px' }}>Batch Details</h1>
                    </div>
                    <div className="col-6 text-end">
                      {!loading && currentBatch.length > 0 && <button className='btn btn-primary' onClick={() => navigate("/clgstaffdownloadbatchwisestudlist")} disabled={studentCount === 0}>
                        Download Batch-Wise Student List PDF
                      </button>}
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <input onChange={inputHandler} type="text" className="form-control" placeholder='Batch Name/Batch Description' name="clgStaffBatchSearchQuery" value={inputField.clgStaffBatchSearchQuery} />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <button onClick={readValue} className="btn btn-warning">Search</button><br /><br />
                    </div>
                  </div>
                  {loading ? (
                    <div className="col-12 text-center">Loading...</div>
                  ) : (
                    currentBatch.length === 0 ? (
                      <div className="col-12 text-center">No batches found!</div>
                    ) : (
                      currentBatch.map((batch, index) => {
                        return (
                          <div key={index} className="col-12">
                            <div className="card">
                              <div className="card-body">
                                <div className="flex justify-between items-center mx-4 my-4">
                                  <h5 className="card-title">{batch.batchName}</h5>
                                  <button onClick={() => taskScore(batch.id, batch.batchName)} className="btn btn-primary" style={{ marginRight: '20px' }}>
                                    View Batch Performance
                                  </button>
                                </div>
                                <p className="card-text">Registration Start Date: {batch.regStartDate}</p>
                                <p className="card-text">Registration End Date: {batch.regEndDate}</p>
                                <p className="card-text">Description: {batch.batchDesc}</p>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <p className="card-text" style={{ margin: 0, marginRight: '8px' }}>Amount:</p>
                                  <img src="https://www.svgrepo.com/show/389251/indian-rupee.svg" alt="rupee" style={{ marginRight: '2px', height: '14px', verticalAlign: 'middle' }} />
                                  <p className="card-text" style={{ margin: 0 }}>{batch.batchAmount}</p>
                                </div>
                                <p className="card-text">Added Date: {batch.addedDate}</p><br />
                                <button
                                  className='btn btn-primary'
                                  onClick={() => { attendancePDFClick(batch.id, batch.batchName) }}
                                  style={{ marginLeft: '5px' }}
                                  disabled={batch.sessionCount === 0} // Disable button if sessionCount is 0
                                >
                                  Download Session-Wise Attendance List PDF
                                </button>
                                <button onClick={() => batchClick(batch.id, batch.batchName)} className="btn btn-primary" style={{ marginLeft: '20px' }}>
                                  View Session
                                </button>
                                <button className="btn btn-primary" onClick={() => studentClick(batch.id, batch.batchName)} style={{ marginLeft: '20px' }}>
                                  View All Students
                                </button>
                                <button className="btn btn-primary" onClick={() => notificationClick(batch.id)} style={{ marginLeft: '20px' }}>
                                  View Notifications
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )
                  )}
                  {!loading && currentBatch.length > 0 && <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{indexOfFirstBatch + 1}</span> to <span className="font-medium">{indexOfLastBatch > batches.length ? batches.length : indexOfLastBatch}</span> of <span className="font-medium">{batches.length}</span> results
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
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeStaffViewBatch;
