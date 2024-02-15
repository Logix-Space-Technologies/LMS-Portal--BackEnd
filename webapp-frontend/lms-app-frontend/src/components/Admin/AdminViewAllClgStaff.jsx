import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminViewAllClgStaff = () => {
  const [clgStaffData, setClgStaffData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clgStaffPerPage] = useState(10); // Number of college staff per page
  const navigate = useNavigate();
  const apiUrl = global.config.urls.api.server + "/api/lms/viewallcollegestaff";

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
        setClgStaffData(response.data);
      })
      .catch((err) => {
        console.error("Error fetching data. Please try again later.");
      });
  };

  const handleDeleteClick = (id) => {
    const deleteUrl = global.config.urls.api.server + "/api/lms/deletecolgstaff";
    const axiosConfig = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "token": sessionStorage.getItem("admtoken"),
      },
    };

    axios.post(deleteUrl, { id }, axiosConfig)
      .then((response) => {
        if (response.data.status === "Deleted successfully") {
          // Refresh the data after deletion
          getData();
          alert("College Staff Deleted!!");
        } else {
          console.error("Error deleting college staff. Please try again later.");
        }
      })
      .catch((err) => {
        console.error("Error deleting college staff. Please try again later.");
      });
  };

  // Logic for displaying current college staff
  const indexOfLastClgStaff = currentPage * clgStaffPerPage;
  const indexOfFirstClgStaff = indexOfLastClgStaff - clgStaffPerPage;
  const currentClgStaff = clgStaffData ? clgStaffData.slice(indexOfFirstClgStaff, indexOfLastClgStaff) : [];

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const updateClick = (id) => {
    let data = id;
    sessionStorage.setItem("clgStaffId", data);
    navigate("/adminupdatecollegestaff");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <section className="bg-gray-100 min-h-screen p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">College Staff List</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Pic</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No.</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aadhar No.</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Verified</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentClgStaff.map((value, index) => (
                <tr key={index}>
                  <td><img className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3" src={value.profilePic} alt=""/></td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.collegeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.collegeStaffName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.clgStaffAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.phNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.aadharNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.emailVerificationStatus}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleDeleteClick(value.id)}>Delete</button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => updateClick(value.id)}>Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav>
              <ul className="flex list-style-none">
                {currentPage > 1 && (
                  <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">Previous</li>
                )}
                {Array.from({ length: Math.ceil(clgStaffData.length / clgStaffPerPage) }, (_, i) => (
                  <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>{i + 1}</li>
                ))}
                {currentPage < Math.ceil(clgStaffData.length / clgStaffPerPage) && (
                  <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">Next</li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminViewAllClgStaff;
