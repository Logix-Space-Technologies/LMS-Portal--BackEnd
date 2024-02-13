import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../config/config';
import StudNavBar from './StudNavBar';
import { Link, useNavigate } from 'react-router-dom';

const MaterialView = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMaterials();
  }, []);

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
        if (response.data.status === "success") {
          setMaterials(response.data.data);
          setLoading(false);
        } else {
          if (response.data.status === "Unauthorized User!!") {
            navigate("/studentLogin");
            sessionStorage.clear();
          } else {
            alert(response.data.status);
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

  return (
    <div>
      <StudNavBar />
      <div className="bg-light py-3 py-md-5">
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
                            Material ID
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
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="6" className="text-center">Loading...</td>
                          </tr>
                        ) : (
                          materials.length === 0 ? (
                            <tr>
                              <td colSpan="6" className="text-center">No materials found!</td>
                            </tr>
                          ) : (
                            materials.map((material, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900 border-b dark:border-gray-700'}>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {material.batchName}
                                </td>
                                <td className="px-6 py-4">
                                  {material.id}
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
                                  <Link target="_blank" to={material.uploadFile} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">View Material</Link>
                                </td>
                              </tr>
                            ))
                          )
                        )}
                      </tbody>
                    </table>
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
