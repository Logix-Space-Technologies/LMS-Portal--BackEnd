import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../../config/config'


const AdminViewRefundRequests = () => {
  const [refundRequests, setRefundRequests] = useState([]);
  const apiUrl = global.config.urls.api.server + "/api/lms/getAllRefundRequests"
  const getData = () => {
    let axiosConfig = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "token": sessionStorage.getItem("admtoken"),
        "key": sessionStorage.getItem("admkey")
      }
    }

    axios.post(apiUrl, {}, axiosConfig)
      .then((response) => {
        setRefundRequests(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving refund requests:', error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {/* ====== Table Section Start */}
        <section className="bg-white dark:bg-dark py-20 lg:py-[120px]">
          <div className="container mx-auto">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4">
                <h1>Refund Requests</h1>
                <br />
                <div className="max-w-full overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="text-center bg-primary">
                        <th className="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                          Student Name
                        </th>
                        <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                          College Name
                        </th>
                        <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                          Requested Date
                        </th>
                        <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                          Reason
                        </th>
                        <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                          Refund Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {refundRequests.map((value, index) => {
                        return <tr key={index}>
                          <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.studName}
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.collegeName}
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {new Date(value.requestedDate).toLocaleDateString()}
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.reason}
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.refundAmnt}
                          </td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminViewRefundRequests;
