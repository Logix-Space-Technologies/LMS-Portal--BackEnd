import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../config/config';
import ClgStaffNavbar from './ClgStaffNavbar';
import { useNavigate } from 'react-router-dom';

const CollegeStaffViewBatch = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentCount, setStudentCount] = useState(0);

  const apiUrl = global.config.urls.api.server + "/api/lms/collegeStaffViewBatch";
  const apiUrl2 = global.config.urls.api.server + "/api/lms/generatePdf";
  const apiUrl3 = global.config.urls.api.server + "/api/lms/generateAttendancePdf"
  const token = sessionStorage.getItem("clgstaffLogintoken");
  const collegeId = sessionStorage.getItem("clgStaffCollegeId");
  const navigate = useNavigate()


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

  const pdfGenerate = async () => {
    try {
      const axiosConfig2 = {
        headers: {
          "Content-Type": "application/json",
          "token": token,
          "key": sessionStorage.getItem("clgstaffkey")
        },
        responseType: 'blob', // Set responseType to 'blob' for PDF
      };

      const response = await axios.post(apiUrl2, {}, axiosConfig2);

      if (response.data) {
        // Use window.open directly with response.data
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        window.open(URL.createObjectURL(pdfBlob), '_blank');
      } else {
        if (response.data.status === "Unauthorized User!!") {
          sessionStorage.clear()
          navigate("/clgStafflogin")
        } else {
          if (!response.data) {
            alert("No Data Found!!")
          } else {
            alert(response.data.status);
          }
        }
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF.');
    }
  };

  const attendancePdfGenerate = async (id) => {
    try {
      const data = { "batchId": id }
      const axiosConfig3 = {
        headers: {
          "Content-Type": "application/json",
          "token": token,
          "key": sessionStorage.getItem("clgstaffkey")
        },
        responseType: 'blob', // Set responseType to 'blob' for PDF
      };

      const response = await axios.post(apiUrl3, data, axiosConfig3);

      if (response.data) {
        // Use window.open directly with response.data
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        window.open(URL.createObjectURL(pdfBlob), '_blank');
      } else {
        if (response.data.status === "Unauthorized User!!") {
          sessionStorage.clear()
          navigate("/clgStafflogin")
        } else {
          if (!response.data) {
            alert("No Data Found !!")
          } else {
            alert(response.data.status);
          }
        }
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF.');
    }
  }

  const batchClick = (id) => {
    navigate("/clgstaffviewsession")
    sessionStorage.setItem("clgstaffbatchId", id)
  }

  const studentClick = (id) => {
    navigate("/collegeStaffViewAllStudents")
    sessionStorage.setItem("clgstaffviewbatchId", id)
  }

  const notificationClick = (id) => {
    navigate("/clgstaffviewNotifications")
    sessionStorage.setItem("clgstaffbatchId", id)
  }

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
                      <button className='btn btn-primary' onClick={pdfGenerate} disabled={studentCount === 0}>
                        Download Batch-Wise Student List PDF
                      </button>
                    </div>
                  </div>
                  {loading ? (
                    <div className="col-12 text-center">Loading...</div>
                  ) : (
                    batches.length === 0 ? (
                      <div className="col-12 text-center">No batches found!</div>
                    ) : (
                      batches.map((batch, index) => {
                        return (
                          <div key={index} className="col-12">
                            <div className="card">
                              <div className="card-body">
                                <h5 className="card-title">{batch.batchName}</h5>
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
                                  onClick={() => { attendancePdfGenerate(batch.id) }}
                                  style={{ marginLeft: '5px' }}
                                  disabled={batch.sessionCount === 0} // Disable button if sessionCount is 0
                                >
                                  Download Session-Wise Attendance List PDF
                                </button>
                                <button onClick={() => batchClick(batch.id)} className="btn btn-primary" style={{ marginLeft: '20px' }}>
                                  View Session
                                </button>
                                <button className="btn btn-primary" onClick={() => studentClick(batch.id)} style={{ marginLeft: '20px' }}>
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
