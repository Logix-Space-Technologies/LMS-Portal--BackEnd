import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import '../../config/config';
import { Link, useNavigate } from 'react-router-dom';

const AdminViewAllAdminStaff = () => {

  const [admStaffData, setAdmStaffData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [adminStaffPerPage] = useState(10); // Number of admin staff per page
  const navigate = useNavigate();
  const [deleteClgStaff, setDeleteClgStaff] = useState({})

  const apiUrl = global.config.urls.api.server + "/api/lms/viewalladmstaff";
  const deleteUrl = global.config.urls.api.server + "/api/lms/deleteadmstaff";

  const getData = () => {
    let axiosConfig = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "token": sessionStorage.getItem("admtoken"),
        "key": sessionStorage.getItem("admkey"),
      },
    };

    axios.post(apiUrl, {}, axiosConfig)
      .then((response) => {
        if (response.data) {
          setAdmStaffData(response.data);
        } else {
          if (response.data.status === "Unauthorized User!!") {
            navigate("/")
            sessionStorage.clear()
          } else {
            if (!response.data) {
              setAdmStaffData([])
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

  const handleDeleteClick = () => {
    let id = deleteClgStaff
    const axiosConfig = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "token": sessionStorage.getItem("admtoken"),
      },
    };
    axios.post(deleteUrl, { id }, axiosConfig)
      .then((response) => {
        if (response.data.status === "Admin Staff Deleted.") {
          alert("Admin staff deleted!")
          // Refresh the data after deletion
          getData();
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
        console.error("Error deleting admin staff. Please try again later.");
      });
  };

  // Logic for displaying current admin staff
  const indexOfLastAdminStaff = currentPage * adminStaffPerPage;
  const indexOfFirstAdminStaff = indexOfLastAdminStaff - adminStaffPerPage;
  const currentAdminStaff = admStaffData ? admStaffData.slice(indexOfFirstAdminStaff, indexOfLastAdminStaff) : [];

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Total pages
  let totalPages = []
  if (admStaffData && admStaffData.length > 0) {
    totalPages = Math.ceil(admStaffData.length / adminStaffPerPage);
  }

  const calculateSerialNumber = (index) => {
    return ((currentPage - 1) * adminStaffPerPage) + index + 1;
  }


  // Integration of new pagination logic
  const startPage = currentPage > 2 ? currentPage - 2 : 1;
  const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;


  const updateClick = (id) => {
    let data = id;
    sessionStorage.setItem("admStaffId", data)
    navigate("/adminupdateadminstaff")
  }

  const readValue = (id) => {
    setDeleteClgStaff(id)
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <section className="bg-gray-100 min-h-screen p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Staff List</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No.</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aadhar No.</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentAdminStaff.length > 0 ? currentAdminStaff.map((value, index) => {
                return <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{calculateSerialNumber(index)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.AdStaffName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.PhNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.Address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.AadharNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.Email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { readValue(value.id) }}>Delete</button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => updateClick(value.id)}>Update</button>
                  </td>
                </tr>
              }) : (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td colSpan="15" className="px-6 py-4" style={{ textAlign: "center" }}>
                    No Admin Staff Found !!!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="row">
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to delete this AdminStaff?</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <p>This action cannot be undone.</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No, cancel</button>
                    <button onClick={() => handleDeleteClick()} type="button" className="btn btn-danger" data-bs-dismiss="modal">Yes, I'm sure</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstAdminStaff + 1}</span> to <span className="font-medium">{indexOfLastAdminStaff > admStaffData.length ? admStaffData.length : indexOfLastAdminStaff}</span> of <span className="font-medium">{admStaffData.length}</span> results
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

export default AdminViewAllAdminStaff



