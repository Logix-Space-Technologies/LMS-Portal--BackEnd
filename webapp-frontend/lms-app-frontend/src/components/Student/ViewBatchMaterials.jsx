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
              {currentMaterials.length > 0 && (
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstMaterial + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{indexOfLastMaterial > materials.length ? materials.length : indexOfLastMaterial}</span> of <span className="font-semibold text-gray-900 dark:text-white">{materials.length}</span> Entries
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    {currentPage > 1 && (
                      <button onClick={() => paginate(currentPage - 1)} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Prev
                      </button>
                    )}
                    {currentPage < totalPages && (
                      <button onClick={() => paginate(currentPage + 1)} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialView;
