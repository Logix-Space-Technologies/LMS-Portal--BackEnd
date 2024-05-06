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
  const [approvefinalId, setApproveFinalId] = useState({})
  const [approveAmnt, setApproveAmnt] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showBankDetailsModal, setShowBankDetailsModal] = useState(false)
  const [bankDetails, setBankDetails] = useState({})
  const [showRejectModal, setRejectShowModal] = useState(false);
  const [showWaitingModal, setShowWaitingModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false); // New state for overlay

  const navigate = useNavigate()

  const [searchField, setSearchField] = useState(
    {
      "searchTerm": ""
    }
  )

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

  const [amountField, setAmountField] = useState({
    "approvedAmnt": ""
  })

  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10); // Number of students per page

  const apiUrl = global.config.urls.api.server + "/api/lms/getAllRefundRequests"
  const apiUrl2 = global.config.urls.api.server + "/api/lms/rejectRefund"
  const apiUrl3 = global.config.urls.api.server + "/api/lms/admStaffRefundInitiate"
  const apiUrl4 = global.config.urls.api.server + "/api/lms/admStaffRefundApprove"
  const apiUrl5 = global.config.urls.api.server + "/api/lms/searchRefundRequests"

  const closeWaitingModal = () => {
    setShowOverlay(false)
    setShowWaitingModal(false)
  }

  // Convert a date string from 'DD/MM/YYYY' to a JavaScript Date object
  const parseDateString = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day);
  };

  const readSearchValue = () => {
    setIsLoading(true)
    let currentKey = sessionStorage.getItem("admkey");
    let token = sessionStorage.getItem("admtoken");
    if (currentKey !== 'lmsapp') {
      currentKey = sessionStorage.getItem("admstaffkey");
      token = sessionStorage.getItem("admstaffLogintoken");
      setKey(currentKey); // Update the state if needed
    }
    let axiosConfig3 = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "token": token,
        "key": currentKey
      }
    }
    axios.post(apiUrl5, searchField, axiosConfig3).then(
      (response) => {
        if (response.data.status === "Search Item is required.") {
          setIsLoading(false)
          setTimeout(() => {
            alert(response.data.status)
            getData()
          }, 500)
        } else if (response.data.data) {
          setRefundRequests(response.data.data)
          setSearchField(
            {
              "searchTerm": ""
            }
          )
          setIsLoading(false)
        } else if (response.data.status === "Unauthorized User!!") {
          { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
          sessionStorage.clear()
        } else if (!response.data.data) {
          setIsLoading(false)
          setSearchField(
            {
              "searchTerm": ""
            }
          )
          setTimeout(() => {
            getData()
            alert("No Refund Request Found !!")
          }, 500)
        } else {
          setIsLoading(false)
          setSearchField(
            {
              "searchTerm": ""
            }
          )
          alert(response.data.status)
        }
      }
    )
  }

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
          setIsLoading(false)
          const activeRefundReq = response.data.data.filter(refund => refund.AmountReceivedStatus === 'Not Yet Received');
          setRefundRequests(activeRefundReq);
        } else {
          if (response.data.status === "Unauthorized User!!") {
            { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
            sessionStorage.clear()
          } else {
            if (!response.data.data) {
              setIsLoading(false)
              setRefundRequests([])
            } else {
              setIsLoading(false)
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

  const searchHandler = (event) => {
    setSearchField({ ...searchField, [event.target.name]: event.target.value })
  }

  const approveHandler = (event) => {
    setErrors({}); // Clear previous errors
    setApproveField({ ...approveField, [event.target.name]: event.target.value });
  };

  const amountHandler = (event) => {
    setErrors({}); // Clear previous errors
    setAmountField({ ...amountField, [event.target.name]: event.target.value });
  };

  const approveRefund = () => {
    let currentKey = sessionStorage.getItem("admkey");
    let token = sessionStorage.getItem("admtoken");
    let approvedBy;
    if (currentKey !== 'lmsapp') {
      currentKey = sessionStorage.getItem("admstaffkey");
      token = sessionStorage.getItem("admstaffLogintoken");
      setKey(currentKey); // Update the state if needed
    }
    if (currentKey === 'lmsapp') {
      approvedBy = 0
    } else {
      approvedBy = sessionStorage.getItem("admstaffId")
    }
    const validationErrors = validateForm3(amountField)
    if (Object.keys(validationErrors).length === 0) {
      let axiosConfig4 = {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "token": token,
          "key": currentKey
        }
      }
      let approvedata = {
        "refundId": approvefinalId.refundId,
        "admStaffId": approvedBy,
        "approvedAmnt": amountField.approvedAmnt
      }
      setShowApproveModal(false)
      setShowWaitingModal(true)
      setShowOverlay(true)
      axios.post(apiUrl4, approvedata, axiosConfig4).then(
        (response) => {
          if (response.data.status === "success") {
            closeWaitingModal()
            setTimeout(() => {
              alert("Refund Approved Successfully!!!")
              getData()
              setAmountField({
                "approvedAmnt": ""
              })
              setApproveFinalId({})
            }, 500)
          } else if (response.data.status === "Validation failed" && response.data.data.approvedAmnt) {
            closeWaitingModal()
            setTimeout(() => {
              alert(response.data.data.approvedAmnt)
              setShowApproveModal(true)
            }, 500)
          } else if (response.data.status === "Unauthorized User!!") {
            { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
            sessionStorage.clear()
          } else {
            closeWaitingModal()
            setTimeout(() => {
              alert(response.data.status)
              setAmountField({
                "approvedAmnt": ""
              })
              setApproveFinalId({})
            }, 500)
          }
        }
      )
    } else {
      setErrors(validationErrors);
    }
  }



  const validateForm = (data) => {
    let errors = {};

    if (!data.adminRemarks) {
      errors.adminRemarks = 'Remark is required';
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

  const validateForm3 = (data) => {
    let errors = {};

    if (!data.approvedAmnt) {
      errors.approvedAmnt = 'Approved Amount is required';
    } else if (data.approvedAmnt <= 0) {
      errors.approvedAmnt = 'Amount should be greater than 0';
    }

    return errors;
  }

  const rejectRefund = () => {
    const validationErrors = validateForm2(inputField)
    if (Object.keys(validationErrors).length === 0) {
      let currentKey = sessionStorage.getItem("admkey");
      let token = sessionStorage.getItem("admtoken");
      let rejectedBy;
      if (currentKey !== 'lmsapp') {
        currentKey = sessionStorage.getItem("admstaffkey");
        token = sessionStorage.getItem("admstaffLogintoken");
        setKey(currentKey); // Update the state if needed
      }
      if (currentKey === 'lmsapp') {
        rejectedBy = 0
      } else {
        rejectedBy = sessionStorage.getItem("admstaffId")
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
        "admStaffId": rejectedBy,
        "adminRemarks": inputField.adminRemarks
      }
      setRejectShowModal(false)
      setShowWaitingModal(true)
      setShowOverlay(true)
      axios.post(apiUrl2, data2, axiosConfig2).then(
        (response) => {
          if (response.data.status === "Refund Request Cancelled.") {
            closeWaitingModal()
            setTimeout(() => {
              alert("Refund Request Rejected")
              getData()
              setInputField({
                adminRemarks: ""
              });
              setReject({})
            }, 500)
          } else {
            if (response.data.status === "Unauthorized User!!") {
              { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
              sessionStorage.clear()
            } else {
              closeWaitingModal()
              setTimeout(() => {
                alert(response.data.status)
                setInputField({
                  adminRemarks: ""
                });
                setReject({})
              }, 500)
            }
          }
        }
      )
    } else {
      setErrors(validationErrors);
    }
  }

  const initiateRefund = () => {
    let currentKey = sessionStorage.getItem("admkey");
    let token = sessionStorage.getItem("admtoken");
    let initiatedBy;
    if (currentKey !== 'lmsapp') {
      currentKey = sessionStorage.getItem("admstaffkey");
      token = sessionStorage.getItem("admstaffLogintoken");
      setKey(currentKey); // Update the state if needed
    }
    if (currentKey === 'lmsapp') {
      initiatedBy = 0
    } else {
      initiatedBy = sessionStorage.getItem("admstaffId")
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
        "admStaffId": initiatedBy,
        "adminRemarks": approveField.adminRemarks,
        "transactionNo": approveField.transactionNo,
        "approvedAmnt": approveAmnt
      }
      setShowModal(false)
      setShowWaitingModal(true)
      setShowOverlay(true)
      axios.post(apiUrl3, data3, axiosConfig3).then(
        (response) => {
          if (response.data.status === "success") {
            closeWaitingModal()
            setTimeout(() => {
              alert("Refund Initiated Successfully!!!")
              getData()
              setApproveField({
                adminRemarks: "",
                refundAmnt: "",
                transactionNo: ""
              });
              setApprove({})
            }, 500)
          } else {
            if (response.data.status === "Validation failed" && response.data.data.adminRemarks) {
              closeWaitingModal()
              setTimeout(() => {
                alert(response.data.data.adminRemarks)
                setShowModal(true)
              }, 500)
            } else {
              if (response.data.status === "Validation failed" && response.data.data.transactionNo) {
                closeWaitingModal()
                setTimeout(() => {
                  alert(response.data.data.transactionNo)
                  setShowModal(true)
                }, 500)
              } else {
                if (response.data.status === "Validation failed" && response.data.data.approvedAmnt) {
                  closeWaitingModal()
                  setTimeout(() => {
                    alert(response.data.data.approvedAmnt)
                    setShowModal(true)
                  }, 500)
                } else {
                  if (response.data.status === "Unauthorized User!!") {
                    { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                    sessionStorage.clear()
                  } else {
                    closeWaitingModal()
                    setTimeout(() => {
                      alert(response.data.status)
                      setApproveField({
                        adminRemarks: "",
                        refundAmnt: "",
                        transactionNo: ""
                      });
                      setApprove({})
                    }, 500)
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
    setRejectShowModal(true)
    setShowOverlay(true)
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

  const approveValue = (refundId, approvedAmnt) => {
    setApprove(refundId);
    setApproveAmnt(approvedAmnt); // Set the approveAmnt value
    setShowModal(true); // Open the modal
    setShowOverlay(true); // Show overlay
  };

  const amountapproveValue = (refundId, refundAmnt) => {
    setApproveFinalId({ refundId, refundAmnt })
    setShowApproveModal(true)
    setShowOverlay(true)
  }



  // Function to close both modal and overlay
  const closeModal = () => {
    setShowModal(false);
    setShowOverlay(false);
    setErrors({})
    setApproveField({
      adminRemarks: "",
      refundAmnt: "",
      transactionNo: ""
    });
    setApproveAmnt(null)

  };

  // Function to close both modal and overlay
  const closeRejectModal = () => {
    setRejectShowModal(false);
    setShowOverlay(false);
    setErrors({})
    setInputField({
      adminRemarks: ""
    });
    setReject({})
  };

  const closeApproveModal = () => {
    setShowApproveModal(false);
    setShowOverlay(false);
    setErrors({})
    setAmountField({
      "approvedAmnt": ""
    })
    setApproveFinalId({})
  };

  // Function to close both modal and overlay
  const closeBankDetailsModal = () => {
    setShowBankDetailsModal(false);
    setShowOverlay(false);
  };

  const readBankDetails = (accountNo, IFSCCode, bankName, branchName, upiId) => {
    setBankDetails({ accountNo, IFSCCode, bankName, branchName, upiId })
    setShowBankDetailsModal(true)
    setShowOverlay(true)
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
                <div className="flex justify-between items-center mx-4 my-4">
                  <div></div>

                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>View Refund Requests</p>

                  <div></div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="input-group">
                      <input onChange={searchHandler} type="text" className="form-control" name="searchTerm" value={searchField.searchTerm} placeholder='College Name/Student Name' />
                    </div>
                    <br></br>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <button onClick={readSearchValue} className="btn btn-warning">Search</button>
                    </div>
                    <br />
                  </div>
                </div>
                {isLoading ? <div className="flex justify-center items-center h-full">
                  <div className="text-center py-20">
                    <div>Loading...</div>
                  </div>
                </div> : (<div className="max-w-full overflow-x-auto">
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
                          Bank Account Details
                        </th>
                        <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                          Refund Amount
                        </th>
                        <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                          Approved Amount
                        </th>
                        <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                          Approved Status
                        </th>
                        <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                          Refund Status
                        </th>
                        <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">
                          Amount Received Status
                        </th>
                        <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">

                        </th>
                        <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">

                        </th>
                        <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4">

                        </th>


                      </tr>
                    </thead>
                    <tbody>
                      {refundRequests.length > 0 ? currentStudents.map((value, index) => {
                        const requestedDate = parseDateString(value.requestedDate)
                        const currentDate = new Date()

                        const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

                        const differenceInDays = Math.abs((currentDate - requestedDate) / oneDayInMilliseconds);

                        const isGreaterThanFiveDays = differenceInDays > 5;
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
                            <button type="button" onClick={() => readBankDetails(value.accountNo, value.IFSCCode, value.bankName, value.branchName, value.upiId)} className="btn btn-primary">View Details</button>
                          </td>

                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-4 text-center text-base font-medium">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <img src="https://www.svgrepo.com/show/389251/indian-rupee.svg" alt="rupee" style={{ marginLeft: '24px', height: '14px', verticalAlign: 'middle' }} />
                              {value.refundAmnt}
                            </div>
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-8 text-center text-base font-medium">
                            {value.approvedAmnt ? (
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src="https://www.svgrepo.com/show/389251/indian-rupee.svg" alt="rupee" style={{ marginLeft: '24px', height: '14px', verticalAlign: 'middle' }} />
                                {value.approvedAmnt}
                              </div>
                            ) : <p>Not Available</p>}
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.refundApprovalStatus}
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.refundStatus}
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.AmountReceivedStatus}
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.refundApprovalStatus !== "Amount Approved" && (
                              <button type="button" onClick={() => amountapproveValue(value.refundId, value.refundAmnt)} className="btn btn-primary" disabled={isGreaterThanFiveDays === false}>Approve Refund</button>
                            )}
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.refundApprovalStatus === "Amount Approved" && value.refundStatus !== "Amount Refunded" && (
                              <button onClick={() => approveValue(value.refundId, value.approvedAmnt)} type="button" className="btn btn-primary" disabled={isGreaterThanFiveDays === false}>Initiate Refund</button>
                            )}
                          </td>
                          <td className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {value.refundApprovalStatus !== "Amount Approved" && (
                              <button type="button" onClick={() => readValue(value.refundId)} className="btn btn-primary" disabled={isGreaterThanFiveDays === false}>Reject Refund</button>
                            )}
                          </td>
                        </tr>
                      }) : <td colSpan="14" className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                        No Refund Requests Found !!!
                      </td>}
                    </tbody>
                  </table>
                </div>)}

              </div>
            </div>
          </div>
        </section>
      </div>

      {showBankDetailsModal && (
        <div className="flex justify-end">
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Bank Details</h1>
                  <button type="button" className="btn-close" onClick={closeBankDetailsModal} />
                </div>
                <div className="modal-body">
                  <p>Account No. : <b>{bankDetails.accountNo ? <p>{bankDetails.accountNo}</p> : <p>NIL</p>}</b></p>
                  <p>IFSC Code: <b>{bankDetails.IFSCCode ? <p>{bankDetails.IFSCCode}</p> : <p>NIL</p>}</b></p>
                  <p>Bank Name: <b>{bankDetails.bankName ? <p>{bankDetails.bankName}</p> : <p>NIL</p>}</b></p>
                  <p>Branch Name: <b>{bankDetails.branchName ? <p>{bankDetails.branchName}</p> : <p>NIL</p>}</b></p>
                  <p>UPI ID: <b>{bankDetails.upiId ? <p>{bankDetails.upiId}</p> : <p>NIL</p>}</b></p>
                </div>
                <div className="modal-footer">
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {showApproveModal && (
        <div className="flex justify-end">
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Approve Refund</h1>
                  <button type="button" className="btn-close" onClick={closeApproveModal} />
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label">Refund Amount<span className="text-danger">*</span></label>
                      <textarea
                        name="approvedAmnt"
                        className="form-control"
                        value={approvefinalId.refundAmnt}
                        disabled
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label">Approved Amount<span className="text-danger">*</span></label>
                      <textarea name="approvedAmnt" className="form-control" value={amountField.approvedAmnt} onChange={amountHandler} />
                      {errors.approvedAmnt && <span style={{ color: 'red' }} className="error">{errors.approvedAmnt}</span>}
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeApproveModal}>Close</button>
                  <button onClick={() => approveRefund()} type="button" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}




      {showRejectModal && (
        <div className="flex justify-end">
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Reject Refund</h1>
                  <button type="button" className="btn-close" onClick={closeRejectModal} />
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
                  <button type="button" className="btn btn-secondary" onClick={closeRejectModal}>Close</button>
                  <button onClick={() => rejectRefund()} type="button" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {!isLoading && currentStudents.length > 0 && (
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
      )}


      {showModal && <div className="flex justify-end">
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Initiate Refund</h1>
                <button type="button" className="btn-close" onClick={closeModal} />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">Refund Amount<span className="text-danger">*</span></label>
                    <textarea
                      name="approvedAmnt"
                      className="form-control"
                      value={approveAmnt}
                      disabled
                    />
                    {/* {errors.approvedAmnt && <span style={{ color: 'red' }} className="error">{errors.approvedAmnt}</span>} */}
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
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button onClick={() => initiateRefund()} type="button" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>}

      {showWaitingModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
              </div>
              <div className="modal-body">
                <>
                  <div className="mb-3">
                    <p>Processing Request. Do Not Refresh.</p>
                  </div>
                </>
              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>
      )}
      {showOverlay && (
        <div
          className="modal-backdrop fade show"
          onClick={() => {
            setShowWaitingModal(false);
            setShowOverlay(false);
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1040, // Ensure this is below your modal's z-index
          }}
        ></div>
      )}
    </div>
  );
};


export default AdminViewRefundRequests;
