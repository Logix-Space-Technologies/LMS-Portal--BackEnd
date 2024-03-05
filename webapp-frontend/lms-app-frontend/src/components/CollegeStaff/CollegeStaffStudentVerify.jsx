import React, { useEffect, useState } from 'react';
import '../../config/config';
import axios from 'axios';
import ClgStaffNavbar from './ClgStaffNavbar';
import { useNavigate } from 'react-router-dom';

const CollegeStaffStudentVerify = () => {
  const [studentData, setStudentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10); // Number of students per page

  const rangeSize = 5; // Number of pages to display in the pagination
  const lastPage = Math.ceil(studentData.length / studentsPerPage); // Calculate the total number of pages
  let startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1; // Calculate the starting page for the current range
  let endPage = Math.min(startPage + rangeSize - 1, lastPage); // Calculate the ending page for the current range

  const apiUrl = global.config.urls.api.server + "/api/lms/unverifiedStudents";
  const apiUrl2 = global.config.urls.api.server + "/api/lms/studentverificationbyCollegeStaff";

  const navigate = useNavigate();

  const getData = () => {
    let data = { "collegeId": sessionStorage.getItem("clgStaffCollegeId") };
    let axiosConfig = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "token": sessionStorage.getItem("clgstaffLogintoken"),
        "key": sessionStorage.getItem("clgstaffkey")
      }
    };
    axios.post(apiUrl, data, axiosConfig).then(
      (Response) => {
        if (Response.data.data) {
          setStudentData(Response.data.data);
        } else {
          if (Response.data.status === "Unauthorized User!!") {
            sessionStorage.clear();
            navigate("/clgStafflogin");
          } else {
            if (!Response.data.data) {
              //no data found
            } else {
              alert(Response.data.status);
            }
          }
        }
      }
    );
  };

  const handleClick = (studentId) => {
    let data = { "collegeId": sessionStorage.getItem("clgStaffCollegeId"), "studentId": studentId };
    let axiosConfig = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "token": sessionStorage.getItem("clgstaffLogintoken")
      }
    };
    axios.post(apiUrl2, data, axiosConfig).then(
      (response) => {
        if (response.data.status === "Success") {
          alert("Student verified successfully!!");
          setStudentData(studentData.filter(student => student.id !== studentId));
        } else {
          if (response.data.status === "Unauthorized User!!!") {
            sessionStorage.clear();
            navigate("/clgStafflogin");
          } else {
            alert(response.data.status);
          }
        }
      }
    );
  };

  // Logic for displaying current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = studentData ? studentData.slice(indexOfFirstStudent, indexOfLastStudent) : [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => { getData(); }, []);

  // Calculate total pages
  const totalPages = Math.ceil(studentData.length / studentsPerPage);

  const calculateSerialNumber = (index) => {
    return ((currentPage - 1) * studentsPerPage) + index + 1;
  };

  return (
    <div>
      <ClgStaffNavbar />
      <br /><br />
      <div className="flex justify-center items-center mt-2 ml-16 mb-4">
        <h2 className="text-lg font-bold">College Staff Verify Student</h2>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 w-5">
              S/L
            </th>
            <th scope="col" className="px-6 py-3 w-20">
              Name
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Department
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Course
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Admission No.
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Roll No.
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Email
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Phone
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Aadhar No
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Batch Name
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Membership No.
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Registration Date
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Validity
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((value, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">
                {calculateSerialNumber(index)}
              </td>
              <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src={value.studProfilePic} alt="" />
                <div className="ps-3 whitespace-nowrap">
                  <div className="text-base font-semibold">{value.studName}</div>
                </div>
              </th>
              <td className="px-6 py-4 whitespace-nowrap">
                {value.studDept}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {value.course}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {value.admNo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {value.rollNo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {value.studEmail}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {value.studPhNo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {value.aadharNo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {value.batchName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {value.membership_no}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {value.addedDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {value.validity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleClick(value.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Verify</button>
              </td>
            </tr>
          ))}
          {currentStudents.length === 0 && (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td colSpan="14" className="px-6 py-4" style={{ textAlign: 'center' }}>
                No Students Found !!
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div></div>
      <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstStudent + 1}</span> to <span className="font-medium">{indexOfLastStudent > studentData.length ? studentData.length : indexOfLastStudent}</span> of <span className="font-medium">{studentData.length}</span> results
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

export default CollegeStaffStudentVerify;
