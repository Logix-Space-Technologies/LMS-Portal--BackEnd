import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminViewAllAdminStaff = () => {
  const [clgStaffData, setClgStaffData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [adminStaffPerPage] = useState(10); // Number of admin staff per page
  const navigate = useNavigate();
  const apiUrl = global.config.urls.api.server + "/api/lms/viewalladmstaff";

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
    const deleteUrl = global.config.urls.api.server + "/api/lms/deleteadmstaff";
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
          // Refresh the data after deletion
          getData();
        } else {
          console.error("Error deleting admin staff. Please try again later.");
        }
      })
      .catch((err) => {
        console.error("Error deleting admin staff. Please try again later.");
      });
  };

  // Logic for displaying current admin staff
  const indexOfLastAdminStaff = currentPage * adminStaffPerPage;
  const indexOfFirstAdminStaff = indexOfLastAdminStaff - adminStaffPerPage;
  const currentAdminStaff = clgStaffData ? clgStaffData.slice(indexOfFirstAdminStaff, indexOfLastAdminStaff) : [];

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);


  const updateClick = (id) => {
    let data = id;
    sessionStorage.setItem("admStaffId", data)
    navigate("/adminupdateadminstaff")
  }

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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentAdminStaff.map((value, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.AdStaffName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.PhNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.Address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.AadharNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.Email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.addedDate}</td>
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
                {Array.from({ length: Math.ceil(clgStaffData.length / adminStaffPerPage) }, (_, i) => (
                  <li key={i} onClick={() => paginate(i + 1)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>{i + 1}</li>
                ))}
                {currentPage < Math.ceil(clgStaffData.length / adminStaffPerPage) && (
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

export default AdminViewAllAdminStaff
