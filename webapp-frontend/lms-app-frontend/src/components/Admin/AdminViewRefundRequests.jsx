import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../../config/config'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';


const AdminViewRefundRequests = () => {
  const [refundRequests, setRefundRequests] = useState([]);
  const [key, setKey] = useState('');
  const [errors, setErrors] = useState({});
  const [reject, setReject] = useState({})
  const [approve, setApprove] = useState({})

  const [inputField, setInputField] = useState({
    "admStaffId": "",
    "adminRemarks": "",
    "refundId": ""
  });
  const [approveField, setApproveField] = useState({
    "admStaffId": "",
    "refundAmnt": "",
    "transactionNo": "",
    "adminRemarks": "",
    "refundId": ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(2); // Number of students per page

  const apiUrl = global.config.urls.api.server + "/api/lms/getAllRefundRequests"
  const apiUrl2 = global.config.urls.api.server + "/api/lms/rejectRefund"
  const apiUrl3 = global.config.urls.api.server + "/api/lms/admStaffRefundApproval"

  const getData = () => {
    let currentKey = sessionStorage.getItem("admkey");
    let token = sessionStorage.getItem("admtoken");
    if (currentKey !== 'lmsapp') {
      currentKey = sessionStorage.getItem("admstaffkey");
      token = sessionStorage.getItem("admstaffLogintoken");
      setKey(currentKey); // Update the state if needed
    }
    let axiosConfig = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "token": token,
        "key": currentKey
      }
    }
    axios.post(apiUrl, {}, axiosConfig)
      .then((response) => {
        if (response.data.status === "success") {
          setRefundRequests(response.data.data);
        } else {
          if (!response.data.data) {
            console.log("No Refund Requests Found!!")
          } else {
            alert(response.data.status)
          }
        }
      })
  };

  const inputHandler = (event) => {
    setErrors({}); // Clear previous errors
    setInputField({ ...inputField, [event.target.name]: event.target.value });
  };

  const approveHandler = (event) => {
    setErrors({}); // Clear previous errors
    setApproveField({ ...approveField, [event.target.name]: event.target.value });
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.adminRemarks) {
      errors.adminRemarks = 'Remark is required';
    }
    if (!data.refundAmnt) {
      errors.refundAmnt = 'Amount is required';
    }
    if (!data.transactionNo) {
      errors.transactionNo = 'Transaction No. is required';
    }
    return errors;
  }

  const rejectRefund = () => {
    const validationErrors = validateForm(inputField)
    if (Object.keys(validationErrors).length === 0) {
      let currentKey = sessionStorage.getItem("admkey");
      let token = sessionStorage.getItem("admtoken");
      if (currentKey !== 'lmsapp') {
        currentKey = sessionStorage.getItem("admstaffkey");
        token = sessionStorage.getItem("admstaffLogintoken");
        setKey(currentKey); // Update the state if needed
      }
      let axiosConfig2 = {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "token": token,
          "key": currentKey
        }
      }
      let data2 = {
        "refundId": reject,
        "admStaffId": sessionStorage.getItem("admstaffId"),
        "adminRemarks": inputField.adminRemarks
      }
      console.log(data2)
      axios.post(apiUrl2, data2, axiosConfig2).then(
        (response) => {
          if (response.data.status === "Refund Request Cancelled.") {
            alert("Refund Request Rejected")
            window.location.reload() // Refresh the data
            setInputField({
              adminRemarks: ""
            });
          } else {
            alert(response.data.status);
          }
        }
      )
    }
  }

  const approveRefund = () => {
    let currentKey = sessionStorage.getItem("admkey");
    let token = sessionStorage.getItem("admtoken");
    if (currentKey !== 'lmsapp') {
      currentKey = sessionStorage.getItem("admstaffkey");
      token = sessionStorage.getItem("admstaffLogintoken");
      setKey(currentKey); // Update the state if needed
    }
    const validationErrors = validateForm(approveField)
    if (Object.keys(validationErrors).length === 0) {
      let axiosConfig3 = {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "token": token,
          "key": currentKey
        }
      }
      let data3 = {
        "refundId": approve,
        "admStaffId": sessionStorage.getItem("admstaffId"),
        "adminRemarks": approveField.adminRemarks,
        "transactionNo": approveField.transactionNo,
        "refundAmnt": approveField.refundAmnt
      }
      console.log(data3)
      axios.post(apiUrl3, data3, axiosConfig3).then(
        (response) => {
          if (response.data.status === "success") {
            alert("Refund Request Approved Successfully")
            window.location.reload() // Refresh the data
            setApproveField({
              adminRemarks: "",
              refundAmnt: "",
              transactionNo: ""
            });
          } else {
            alert(response.data.status);
          }
        }
      )
    }
  }

  const readValue = (id) => {
    setReject(id)
    console.log(id)
  };

  // Logic for displaying current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = refundRequests ? refundRequests.slice(indexOfFirstStudent, indexOfLastStudent) : [];


  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Total pages
  const pageNumbers = [];
  if (refundRequests && refundRequests.length > 0) {
    refundRequests.forEach((student, index) => {
      const pageNumber = index + 1;
      pageNumbers.push(pageNumber);
    });
  }
  
  const approveValue = (id) => {
    setApprove(id)
    console.log(id)
  }

  // Update key state when component mounts
  useEffect(() => {
    setKey(sessionStorage.getItem("admkey") || '');
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
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
                        {key !== 'lmsapp' && (
                          <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">

                          </th>
                        )}
                        {key !== 'lmsapp' && (
                          <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">

                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {currentStudents.map((value, index) => {
                        return <tr key={index}>
                          <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.studName}
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.collegeName}
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.requestedDate}
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.reason}
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.refundAmnt}
                          </td>
                          {key !== 'lmsapp' && (
                            <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                              {/* <Link to="#" onClick={() => handleClick(value.refundId)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Approve Refund</Link> */}
                              <button onClick={() => approveValue(value.refundId)} type="button" className="btn bg-blue-500 text-white px-4 py-2 rounded-md" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@mdo">Approve Refund</button>
                            </td>
                          )}
                          {key !== 'lmsapp' && (
                            <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                              {/* <Link to="#" onClick={() => handleClick(value.refundId)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Reject Refund</Link> */}
                              <button type="button" onClick={() => readValue(value.refundId)} className="btn bg-blue-500 text-white px-4 py-2 rounded-md" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Reject Refund</button>
                            </td>
                          )}
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

      {key !== 'lmsapp' && (
        <div className="flex justify-end">
          <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Reject Refund</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label">Remarks<span className="text-danger">*</span></label>
                      <textarea name="adminRemarks" className="form-control" value={inputField.adminRemarks} onChange={inputHandler} />
                      {errors.adminRemarks && <span style={{ color: 'red' }} className="error">{errors.adminRemarks}</span>}
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button data-bs-dismiss="modal" onClick={() => rejectRefund()} type="button" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex list-style-none">
            {currentPage > 1 && (
              <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                Previous
              </li>
            )}
            {pageNumbers.map(number => (
              <li key={number} onClick={() => paginate(number)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {number}
              </li>
            ))}
            {currentPage < pageNumbers.length && (
              <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                Next
              </li>
            )}
          </ul>
        </nav>
      </div>


      {key !== 'lmsapp' && (
        <div className="flex justify-end">
          <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Approve Refund</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label">Refund Amount<span className="text-danger">*</span></label>
                      <textarea name="refundAmnt" className="form-control" value={approveField.refundAmnt} onChange={approveHandler} />
                      {errors.refundAmnt && <span style={{ color: 'red' }} className="error">{errors.refundAmnt}</span>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label">Transaction No<span className="text-danger">*</span></label>
                      <textarea name="transactionNo" className="form-control" value={approveField.transactionNo} onChange={approveHandler} />
                      {errors.transactionNo && <span style={{ color: 'red' }} className="error">{errors.transactionNo}</span>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label">Remarks<span className="text-danger">*</span></label>
                      <textarea name="adminRemarks" className="form-control" value={approveField.adminRemarks} onChange={approveHandler} />
                      {errors.adminRemarks && <span style={{ color: 'red' }} className="error">{errors.adminRemarks}</span>}
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button data-bs-dismiss="modal" onClick={() => approveRefund()} type="button" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default AdminViewRefundRequests;
