import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../config/config';
import StudNavBar from './StudNavBar';
import { Link, useNavigate } from 'react-router-dom';

const MaterialView = () => {
  const [materials, setMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [materialsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMaterials = () => {
    const apiUrl = global.config.urls.api.server + "/api/lms/viewBatchMaterials";
    const batchId = sessionStorage.getItem("studBatchId");
    const token = sessionStorage.getItem("studLoginToken");

    let axiosConfig = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "token": token,
        "key": sessionStorage.getItem("studentkey")
      }
    };

    axios.post(apiUrl, { "batchId": batchId }, axiosConfig)
      .then(response => {
        if (response.data.data) {
          setMaterials(response.data.data);
          setLoading(false);
        } else {
          if (response.data.status === "Unauthorized User!!") {
            navigate("/studentLogin");
            sessionStorage.clear();
          } else {
            if (!response.data.data) {
              setMaterials([])
              setLoading(false)
            } else {
              alert(response.data.status);
            }
          }
        }
      })
      .catch(error => {
        console.error('Error fetching materials:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Logic for displaying current logs
  const indexOfLastMaterial = currentPage * materialsPerPage;
  const indexOfFirstMaterial = indexOfLastMaterial - materialsPerPage;
  const currentMaterials = materials ? materials.slice(indexOfFirstMaterial, indexOfLastMaterial) : [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => { fetchMaterials(); }, []);

  // Calculate total pages
  const totalPages = Math.ceil(materials.length / materialsPerPage);

  return (
    <div>
      <StudNavBar />
      <div className="bg-light py-2 py-md-3">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
              <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col-12">
                    <h3>Batch Materials</h3>
                    {/* View Batch Materials Table */}
                  </div>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Batch Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Material Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Material Type
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Material Description
                          </th>
                          <th scope="col" className="px-6 py-3">

                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <br />
                        {loading ? (
                          <tr>
                            <td colSpan="6" className="text-center">Loading...</td>
                          </tr>
                        ) : (
                          currentMaterials.length === 0 ? (
                            <tr>
                              <td colSpan="5" className="text-center">No materials found!</td>
                            </tr>
                          ) : (
                            currentMaterials.map((material, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900 border-b dark:border-gray-700'}>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {material.batchName}
                                </td>
                                <td className="px-6 py-4">
                                  {material.fileName}
                                </td>
                                <td className="px-6 py-4">
                                  {material.materialType}
                                </td>
                                <td className="px-6 py-4">
                                  {material.materialDesc}
                                </td>
                                <td className="px-6 py-4">
                                  {material.materialType.toLowerCase() === 'video' && material.uploadFile.toLowerCase().endsWith('.mp4') ? (
                                    <Link to={material.uploadFile} target="_blank" rel="noreferrer" className="btn bg-blue-500 text-white px-4 py-2 rounded-md">Watch Video</Link>
                                  ) : (
                                    <Link to={material.uploadFile} target="_blank" rel="noreferrer" className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View Material</Link>
                                  )}
                                </td>

                              </tr>
                            ))
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div><br />
              <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstTask + 1}</span> to <span className="font-medium">{indexOfLastTask > studViewTaskData.length ? studViewTaskData.length : indexOfLastTask}</span> of <span className="font-medium">{studViewTaskData.length}</span> results
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
                      {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)} className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`} disabled={currentPage === index + 1}>
                          {index + 1}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialView;
