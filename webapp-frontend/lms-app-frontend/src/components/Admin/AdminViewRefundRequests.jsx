import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../../config/config'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';
import { useNavigate } from 'react-router-dom';


const AdminViewRefundRequests = () => {
  const [refundRequests, setRefundRequests] = useState([]);
  const [key, setKey] = useState('');
  const [errors, setErrors] = useState({});
  const [reject, setReject] = useState({})
  const [approve, setApprove] = useState({})

  const navigate = useNavigate()

  const [inputField, setInputField] = useState({
    "admStaffId": "",
    "adminRemarks": "",
    "refundId": ""
  });
  const [approveField, setApproveField] = useState({
    "admStaffId": "",
    "approvedAmnt": "",
    "transactionNo": "",
    "adminRemarks": "",
    "refundId": ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10); // Number of students per page

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
        if (response.data.data) {
          setRefundRequests(response.data.data);
        } else {
          if (response.data.status === "Unauthorized User!!") {
            navigate("/")
            sessionStorage.clear()
          } else {
            if (!response.data.data) {
              setRefundRequests([])
            } else {
              alert(response.data.status)
            }
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
    if (!data.approvedAmnt) {
      errors.approvedAmnt = 'Amount is required';
    }
    if (!data.transactionNo) {
      errors.transactionNo = 'Transaction No. is required';
    }
    return errors;
  }

  const validateForm2 = (data) => {
    let errors = {};

    if (!data.adminRemarks) {
      errors.adminRemarks = 'Remark is required';
    }

    return errors;
  }

  const rejectRefund = () => {
    const validationErrors = validateForm2(inputField)
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
      axios.post(apiUrl2, data2, axiosConfig2).then(
        (response) => {
          if (response.data.status === "Refund Request Cancelled.") {
            alert("Refund Request Rejected")
            getData()
            setInputField({
              adminRemarks: ""
            });
          } else {
            if (response.data.status === "Unauthorized User!!") {
              navigate("/")
              sessionStorage.clear()
            } else {
              alert(response.data.status)
            }
          }
        }
      )
    } else {
      setErrors(validationErrors);
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
        "approvedAmnt": approveField.approvedAmnt
      }
      axios.post(apiUrl3, data3, axiosConfig3).then(
        (response) => {
          if (response.data.status === "success") {
            alert("Refund Request Approved Successfully")
            getData()
            setApproveField({
              adminRemarks: "",
              refundAmnt: "",
              transactionNo: ""
            });
          } else {
            if (response.data.status === "Validation failed" && response.data.data.adminRemarks) {
              alert(response.data.data.adminRemarks)
            } else {
              if (response.data.status === "Validation failed" && response.data.data.transactionNo) {
                alert(response.data.data.transactionNo)
              } else {
                if (response.data.status === "Validation failed" && response.data.data.approvedAmnt) {
                  alert(response.data.data.approvedAmnt)
                } else {
                  if (response.data.status === "Unauthorized User!!") {
                    {key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin")}
                    sessionStorage.clear()
                  } else {
                    alert(response.data.status)
                  }
                }
              }
            }
          }
        }
      )
    } else {
      setErrors(validationErrors);
    }
  }

  const readValue = (id) => {
    setReject(id)
  };

  // Logic for displaying current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = refundRequests ? refundRequests.slice(indexOfFirstStudent, indexOfLastStudent) : [];


  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Total pages
  let totalPages = []
  if (refundRequests && refundRequests.length > 0) {
    totalPages = Math.ceil(refundRequests.length / studentsPerPage);
  }

  const calculateSerialNumber = (index) => {
    return ((currentPage - 1) * studentsPerPage) + index + 1;
  }

  // Integration of new pagination logic
  const startPage = currentPage > 2 ? currentPage - 2 : 1;
  const endPage = startPage + 4 <= totalPages ? startPage + 4 : totalPages;

  const approveValue = (id) => {
    setApprove(id)
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
                          S/L
                        </th>
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
                        <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                          Approved Amount
                        </th>
                        <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                          Refund Status
                        </th>
                        <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                          Amount Received Status
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
                      {refundRequests.length > 0 ? currentStudents.map((value, index) => {
                        return <tr key={index}>
                          <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {calculateSerialNumber(index)}
                          </td>
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
                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.approvedAmnt}
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.refundApprovalStatus}
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.AmountReceivedStatus}
                          </td>
                          {key !== 'lmsapp' && value.refundApprovalStatus !== "Amount Refunded" && (
                            <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                              {/* <Link to="#" onClick={() => handleClick(value.refundId)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Approve Refund</Link> */}
                              <button onClick={() => approveValue(value.refundId)} type="button" className="btn bg-blue-500 text-white px-4 py-2 rounded-md" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@mdo" disabled={value.refundApprovalStatus === "Amount Refunded"}>Approve Refund</button>
                            </td>
                          )}
                          {key !== 'lmsapp' && value.refundApprovalStatus !== "Amount Refunded" && (
                            <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                              {/* <Link to="#" onClick={() => handleClick(value.refundId)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Reject Refund</Link> */}
                              <button type="button" onClick={() => readValue(value.refundId)} className="btn bg-blue-500 text-white px-4 py-2 rounded-md" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" disabled={value.refundApprovalStatus === "Amount Refunded"}>Reject Refund</button>
                            </td>
                          )}
                        </tr>
                      }) : <td colSpan="10" className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                        No Refund Requests Found !!!
                      </td>}
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
                  <button onClick={() => rejectRefund()} type="button" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between bg-white px-6 py-4 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstStudent + 1}</span> to <span className="font-medium">{indexOfLastStudent > refundRequests.length ? refundRequests.length : indexOfLastStudent}</span> of <span className="font-medium">{refundRequests.length}</span> results
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
              {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                <button key={startPage + index} onClick={() => paginate(startPage + index)} className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === startPage + index ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                  {startPage + index}
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
                      <textarea name="approvedAmnt" className="form-control" value={approveField.approvedAmnt} onChange={approveHandler} />
                      {errors.approvedAmnt && <span style={{ color: 'red' }} className="error">{errors.approvedAmnt}</span>}
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
                  <button onClick={() => approveRefund()} type="button" className="btn btn-primary">
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
