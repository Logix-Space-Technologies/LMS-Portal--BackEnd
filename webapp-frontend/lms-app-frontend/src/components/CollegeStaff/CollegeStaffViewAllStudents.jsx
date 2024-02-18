import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../config/config';
import { Link } from 'react-router-dom';

const CollegeStaffViewAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10); // Number of students per page

  const apiUrl = global.config.urls.api.server + "/api/lms/collegeStaffViewStudent";
  const token = sessionStorage.getItem("clgstaffLogintoken");
  const batchId = sessionStorage.getItem("clgstaffviewstudId");

  useEffect(() => {
    if (!token || !batchId) {
      console.error("Token or College ID is missing.");
    } else {
      fetchStudents();
    }
  }, [token, batchId]);

  const fetchStudents = () => {
    let axiosConfig = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "token": token,
        "key": sessionStorage.getItem("clgstaffkey")
      }
    };

    axios.post(apiUrl, { "batchId": batchId }, axiosConfig)
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

  // Logic for displaying current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students ? students.slice(indexOfFirstStudent, indexOfLastStudent) : [];


  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Total pages
  const pageNumbers = [];
  if (students && students.length > 0) {
    students.forEach((student, index) => {
      const pageNumber = index + 1;
      pageNumbers.push(pageNumber);
    });
  }

  return (
    <div>
      <br /><br />
      <div className="flex justify-between items-center mt-8 ml-4 mb-4">
        <h2 className="text-lg font-bold">College Staff View All Students</h2>
        <Link to="/collegeStaffViewBatch" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginRight: '20px' }}>Back</Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Batch Name
              </th>
              <th scope="col" className="px-6 py-3">
                Admission Number
              </th>
              <th scope="col" className="px-6 py-3">
                Roll Number
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Course
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="ps-3">
                    <div className="text-base font-semibold">{student.studName}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {student.batchName}
                </td>
                <td className="px-6 py-4">
                  {student.admNo}
                </td>
                <td className="px-6 py-4">
                  {student.rollNo}
                </td>
                <td className="px-6 py-4">
                  {student.studDept}
                </td>
                <td className="px-6 py-4">
                  {student.course}
                </td>
                <td className="px-6 py-4">
                  {student.studEmail}
                </td>
                <td className="px-6 py-4">
                  {student.studPhNo}
                </td>
              </tr>
            ))}
            {currentStudents.length === 0 && (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td colSpan="11" className="px-6 py-4" style={{ textAlign: 'center' }}>
                  No Students Found !!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex list-style-none">
            {currentPage > 1 && (
              <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                Previous
              </li>
            )}
            {pageNumbers.map(number => (
              <li key={number} onClick={() => paginate(number)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {number}
              </li>
            ))}
            {currentPage < pageNumbers.length && (
              <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                Next
              </li>
            )}
          </ul>
        </nav>
      </div>

    </div>
  );
};

export default CollegeStaffViewAllStudents;



