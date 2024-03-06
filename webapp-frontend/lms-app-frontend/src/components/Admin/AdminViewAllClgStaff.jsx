import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';
import '../../config/config';

const AdminViewAllClgStaff = () => {

  const [clgStaffData, setClgStaffData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clgStaffPerPage] = useState(10); // Number of college staff per page
  const navigate = useNavigate();
  const [key, setKey] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const apiUrl = global.config.urls.api.server + "/api/lms/viewallcollegestaff";
  const deleteUrl = global.config.urls.api.server + "/api/lms/deletecolgstaff";

  const getData = () => {
    let currentKey = sessionStorage.getItem("admkey");
    let token = sessionStorage.getItem("admtoken");
    if (currentKey !== 'lmsapp') {
      currentKey = sessionStorage.getItem("admstaffkey");
      token = sessionStorage.getItem("admstaffLogintoken");
      setKey(currentKey); // Update the state if needed
    }
    let axiosConfig = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "token": token,
        "key": currentKey,
      },
    };

    axios.post(apiUrl, {}, axiosConfig)
      .then((response) => {
        if (response.data) {
          setClgStaffData(response.data);
        } else {
          if (response.data.status === "Unauthorized User!!") {
            navigate("/")
            sessionStorage.clear()
          } else {
            if (!response.data) {
              setClgStaffData([])
            } else {
              alert(response.data.status)
            }
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching data. Please try again later.");
      });
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    const axiosConfig = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "token": sessionStorage.getItem("admtoken"),
      },
    };

    axios.post(deleteUrl, { id: deleteId }, axiosConfig)
      .then((response) => {
        if (response.data.status === "Deleted successfully") {
          // Refresh the data after deletion
          getData();
          alert("College Staff Deleted!!");
        } else {
          if (response.data.status === "Unauthorized User!!") {
            navigate("/")
            sessionStorage.clear()
          } else {
            alert(response.data.status)
          }
        }
      })
      .catch((err) => {
        console.error("Error deleting college staff. Please try again later.");
      });

    setShowConfirmation(false);
  };

  // Logic for displaying current college staff
  const indexOfLastClgStaff = currentPage * clgStaffPerPage;
  const indexOfFirstClgStaff = indexOfLastClgStaff - clgStaffPerPage;
  const currentClgStaff = clgStaffData ? clgStaffData.slice(indexOfFirstClgStaff, indexOfLastClgStaff) : [];

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Total pages
  let totalPages = []
  if (clgStaffData && clgStaffData.length > 0) {
    totalPages = Math.ceil(clgStaffData.length / clgStaffPerPage);
  }

  const calculateSerialNumber = (index) => {
    return ((currentPage - 1) * clgStaffPerPage) + index + 1;
  }

  // Integration of new pagination logic
  const startPage = currentPage > 2 ? currentPage - 2 : 1;
  const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;


  const updateClick = (id) => {
    let data = id;
    sessionStorage.setItem("clgStaffId", data);
    navigate("/adminupdatecollegestaff");
  };

  useEffect(() => {
    getData();
  }, []);

  // Update key state when component mounts
  useEffect(() => {
    setKey(sessionStorage.getItem("admkey") || '');
  }, []);

  return (
    <div>
      {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
      <section className="bg-gray-100 min-h-screen p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">College Staff List</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No.</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aadhar No.</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Verified</th>
                {key === "lmsapp" && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                )}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentClgStaff.map((value, index) => {
                return <tr key={index}>
                  <td><img className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3" src={value.profilePic} alt="" /></td>
                  <td className="px-6 py-4 whitespace-nowrap">{calculateSerialNumber(index)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.collegeStaffName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.collegeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.clgStaffAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.phNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.aadharNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.emailVerificationStatus}</td>
                  {key === "lmsapp" && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleDeleteClick(value.id)}>Delete</button>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => updateClick(value.id)}>Update</button>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
          {/* Delete Confirmation */}
          {showConfirmation && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-lg font-semibold text-gray-800">Are you sure you want to delete this college staff?</p>
                <div className="flex justify-end mt-4">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-4" onClick={confirmDelete}>Delete</button>
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full" onClick={() => setShowConfirmation(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
          {/* Pagination */}
          <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstClgStaff + 1}</span> to <span className="font-medium">{indexOfLastClgStaff > clgStaffData.length ? clgStaffData.length : indexOfLastClgStaff}</span> of <span className="font-medium">{clgStaffData.length}</span> results
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
      </section>
    </div>
  );
};

export default AdminViewAllClgStaff;
