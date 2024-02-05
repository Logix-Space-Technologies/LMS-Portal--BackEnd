import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../../config/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminViewAllAdminStaff = () => {
  const [clgStaffData, setClgStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const viewUrl = global.config.urls.api.server + "/api/lms/viewalladmstaff";

  const getData = () => {
    let axiosConfig = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "token": sessionStorage.getItem("admtoken"),
        "key": sessionStorage.getItem("admkey"),
      },
    };

    axios.post(viewUrl, {}, axiosConfig)
      .then((response) => {
        if (response.data.status === "Unauthorized User!!") {
          setError("Unauthorized User!!");
        } else {
          setClgStaffData(response.data);
        }
      })
      .catch((err) => {
        setError("Error fetching data. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
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
          setError("Error deleting admin staff. Please try again later.");
        }
      })
      .catch((err) => {
        setError("Error deleting admin staff. Please try again later.");
      });
  };

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
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {clgStaffData.map((value, index) => (
              <div key={index} className="bg-white shadow-lg rounded-md border border-gray-200 flex flex-col justify-between"> {/* Modified for consistent button alignment */}
                <div>
                  <header className="px-4 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Admin Staff ID: {value.id}</h2>
                  </header>
                  <div className="p-4">
                    <div className="mb-2">
                      <strong>Admin Staff Name:</strong> {value.AdStaffName}
                    </div>
                    <div className="mb-2">
                      <strong>Phone No.:</strong> {value.PhNo}
                    </div>
                    <div className="mb-2">
                      <strong>Address:</strong> {value.Address}
                    </div>
                    <div className="mb-2">
                      <strong>Aadhar No:</strong> {value.AadharNo}
                    </div>
                    <div className="mb-2">
                      <strong>Email:</strong> {value.Email}
                    </div>
                    <div>
                      <strong>Added Date:</strong> {value.addedDate}
                    </div>
                    <div>
                      <strong>Updated Date:</strong> {value.updatedDate}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 flex justify-center">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleDeleteClick(value.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => updateClick(value.id)}
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminViewAllAdminStaff;
