import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../config/config';

const CollegeStaffViewBatch = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = global.config.urls.api.server + "/api/lms/collegeStaffViewBatch";
  const apiUrl2 = global.config.urls.api.server + "/api/lms/generatePdf";
  const apiUrl3 = global.config.urls.api.server + "/api/lms/generateAttendancePdf"
  const token = sessionStorage.getItem("clgstaffLogintoken");
  const collegeId = sessionStorage.getItem("clgStaffCollegeId");


  const fetchBatches = () => {
    let axiosConfig = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "token": token,
        "key": sessionStorage.getItem("clgstaffkey")
      }
    };

    axios.post(apiUrl, { "collegeId": collegeId }, axiosConfig)
      .then(response => {
        if (response.data.status === "success") {
          setBatches(response.data.data);
          console.log(response.data)
        } else {
          console.log(response.data.status);
        }
      })
      .catch(error => {
        console.error('Error fetching batches:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const pdfGenerate = async () => {
    try {
      const axiosConfig2 = {
        headers: {
          "Content-Type": "application/json",
          "token": token,
          "key": sessionStorage.getItem("clgstaffkey")
        },
        responseType: 'blob', // Set responseType to 'blob' for PDF
      };

      const response = await axios.post(apiUrl2, {}, axiosConfig2);

      if (response.data) {
        // Use window.open directly with response.data
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        window.open(URL.createObjectURL(pdfBlob), '_blank');
        window.location.reload();
      } else {
        alert(response.data.status);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF.');
    }
  };

  const attendancePdfGenerate = async (id) => {
    try {
      const data = { "batchId": id }
      const axiosConfig3 = {
        headers: {
          "Content-Type": "application/json",
          "token": token,
          "key": sessionStorage.getItem("clgstaffkey")
        },
        responseType: 'blob', // Set responseType to 'blob' for PDF
      };

      const response = await axios.post(apiUrl3, data, axiosConfig3);

      if (response.data) {
        // Use window.open directly with response.data
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        window.open(URL.createObjectURL(pdfBlob), '_blank');
        window.location.reload();
      } else {
        alert(response.data.status);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF.');
    }
  }

  useEffect(() => { fetchBatches() }, []);

  return (
    <div className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
              <div className="row gy-3 gy-md-4 overflow-hidden">
                <div className="row">
                  <div className="col-6">
                    <h1 style={{ fontWeight: 'bold', fontSize: '40px' }}>Batch Details</h1>
                  </div>
                  <div className="col-6 text-end">
                    <button className='btn btn-primary' onClick={pdfGenerate}>
                      Download PDF
                    </button>
                  </div>
                </div>
                {loading ? (
                  <div className="col-12 text-center">Loading...</div>
                ) : (
                  batches.length === 0 ? (
                    <div className="col-12 text-center">No batches found!</div>
                  ) : (
                    batches.map((batch, index) => (
                      <div key={index} className="col-12">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{batch.batchName}</h5>
                            <p className="card-text">Registration Start Date: {batch.regStartDate}</p>
                            <p className="card-text">Registration End Date: {batch.regEndDate}</p>
                            <p className="card-text">Description: {batch.batchDesc}</p>
                            <p className="card-text">Amount: {batch.batchAmount}</p>
                            <p className="card-text">Added Date: {batch.addedDate}</p><br />
                            <button className='btn btn-primary' onClick={() => { attendancePdfGenerate(batch.id) }}>
                              Download Attendance List PDF
                            </button>
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

export default CollegeStaffViewBatch;
