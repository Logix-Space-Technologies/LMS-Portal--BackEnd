import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../config/config'

const MaterialView = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

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
          console.log(response.data)
          setLoading(false);
        } else {
          console.log(response.data.status);
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
    <div className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
              <div className="row gy-3 gy-md-4 overflow-hidden">
                <div className="col-12">
                  <h3>Batch Materials</h3>
                </div>
                {loading ? (
                  <div className="col-12 text-center">Loading...</div>
                ) : (
                  materials.length === 0 ? (
                    <div className="col-12 text-center">No materials found!</div>
                  ) : (
                    materials.map((material, index) => (
                      <div key={index} className="col-12">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{material.batchName}</h5>
                            <p className="card-text">Material ID: {material.id}</p>
                            <p className="card-text">Material Name: {material.materialName}</p>
                            <p className="card-text">Material Type: {material.materialType}</p>
                            <p className="card-text">Material Description: {material.materialDescription}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialView;
