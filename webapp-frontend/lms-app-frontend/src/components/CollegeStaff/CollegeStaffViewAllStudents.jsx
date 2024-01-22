import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../config/config';

const CollegeStaffViewAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = global.config.urls.api.server + "/api/lms/collegeStaffViewStudent";
  const token = sessionStorage.getItem("clgstaffLogintoken");
  const collegeId = sessionStorage.getItem("clgStaffCollegeId");

  useEffect(() => {
    if (!token || !collegeId) {
      console.error("Token or College ID is missing.");
    } else {
      fetchStudents();
    }
  }, [token, collegeId]);

  const fetchStudents = () => {
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
        console.log("Response from Backend:", response.data);

        if (response.data.status === "success") {
          setStudents(response.data.data);
        } else {
          console.log(response.data.status);
        }
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
              <div className="row gy-3 gy-md-4 overflow-hidden">
                <div className="col-12">
                  <h3>Student Details</h3>
                </div>
                {loading ? (
                  <div className="col-12 text-center">Loading...</div>
                ) : (
                  students.length === 0 ? (
                    <div className="col-12 text-center">No students found!</div>
                  ) : (
                    students.map((student, index) => (
                      <div key={index} className="col-12">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{student.studName}</h5>
                            <p className="card-text">Batch ID: {student.batchId}</p>
                            <p className="card-text">Admission Number: {student.admNo}</p>
                            <p className="card-text">Roll Number: {student.rollNo}</p>
                            <p className="card-text">Department: {student.studDept}</p>
                            <p className="card-text">Course: {student.course}</p>
                            <p className="card-text">Email: {student.studEmail}</p>
                            <p className="card-text">Phone Number: {student.studPhNo}</p>
                          </div>
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
  );
};

export default CollegeStaffViewAllStudents;
