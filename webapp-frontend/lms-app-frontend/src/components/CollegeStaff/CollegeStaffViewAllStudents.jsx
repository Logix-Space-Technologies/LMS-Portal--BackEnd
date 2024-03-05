import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../config/config';
import { Link, useNavigate } from 'react-router-dom';

const CollegeStaffViewAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10); // Number of students per page

  const rangeSize = 5; // Number of pages to display in the pagination
  const lastPage = Math.ceil(students.length / studentsPerPage); // Calculate the total number of pages
  let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
  let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

  const navigate = useNavigate()

  const apiUrl = global.config.urls.api.server + "/api/lms/collegeStaffViewStudent";

  const fetchStudents = () => {
    const data = { "batchId": sessionStorage.getItem("clgstaffviewbatchId") };
    let axiosConfig = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "token": sessionStorage.getItem("clgstaffLogintoken"),
        "key": sessionStorage.getItem("clgstaffkey")
      }
    }
    axios.post(apiUrl, data, axiosConfig)
      .then(response => {
        if (response.data.data) {
          setStudents(response.data.data);
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
        console.error('Error fetching students:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Logic for displaying current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students ? students.slice(indexOfFirstStudent, indexOfLastStudent) : [];


  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(students.length / studentsPerPage);

  useEffect(() => { fetchStudents() }, [])

  return (
    <div>
      <br /><br />
      <div className="flex justify-between items-center mt-8 ml-4 mb-4">
        <h2 className="text-lg font-bold">College Staff View All Students</h2>
        <Link to="/collegeStaffViewBatch" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginRight: '20px' }}>Back</Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Batch Name</th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Department</th>
              <th scope="col" className="px-6 py-3">Course</th>
              <th scope="col" className="px-6 py-3">Admission No.</th>
              <th scope="col" className="px-6 py-3">Roll No.</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Phone Number</th>
              <th scope="col" className="px-6 py-3">Aadhar No</th>
              <th scope="col" className="px-6 py-3">Membership No.</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => {
              return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{student.batchName}</td>
                <td className="px-6 py-4">
                  {student.studProfilePic && <img className="w-10 h-10 rounded-full" src={student.studProfilePic} alt={student.studName} />}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.studName}</td>
                <td className="px-6 py-4">{student.studDept}</td>
                <td className="px-6 py-4">{student.course}</td>
                <td className="px-6 py-4">{student.admNo}</td>
                <td className="px-6 py-4">{student.rollNo}</td>
                <td className="px-6 py-4">{student.studEmail}</td>
                <td className="px-6 py-4">{student.studPhNo}</td>
                <td className="px-6 py-4">{student.aadharNo}</td>
                <td className="px-6 py-4">{student.membership_no}</td>
              </tr>
            })}
            {students.length === 0 && (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td colSpan="11" className="px-6 py-4 text-center">
                  No Students Found !!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstStudent + 1}</span> to <span className="font-medium">{indexOfLastStudent > students.length ? students.length : indexOfLastStudent}</span> of <span className="font-medium">{students.length}</span> results
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
      </div>
    </div>
  );
};

export default CollegeStaffViewAllStudents;



