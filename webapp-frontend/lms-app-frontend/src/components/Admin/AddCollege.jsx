import axios from 'axios'
import '../../config/config'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar'
import { Link, useNavigate } from 'react-router-dom'

const AddCollege = () => {

  const [inputField, setInputField] = useState(
    {
      "collegeName": "",
      "collegeCode": "",
      "collegeAddress": "",
      "website": "",
      "email": "",
      "collegePhNo": "",
      "collegeMobileNumber": ""
    }
  )

  const [file, setFile] = useState(null)
  const [key, setKey] = useState('');
  const [fileType, setFileType] = useState("");
  const navigate = useNavigate()
  const [showWaitingModal, setShowWaitingModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false); // New state for overlay


  const fileUploadHandler = (event) => {
    setErrors({});
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setErrors({});
      setFile(uploadedFile);
      const extension = uploadedFile.name.split('.').pop().toLowerCase();
      setFileType(extension);
    } else {
      setFile(null);
      setFileType("");
    }
  }

  const [errors, setErrors] = useState({})

  const apiUrl = global.config.urls.api.server + "/api/lms/addCollege"

  const inputHandler = (event) => {
    setErrors({})
    setInputField({ ...inputField, [event.target.name]: event.target.value });
  }

  const closeWaitingModal = () => {
    setShowOverlay(false)
    setShowWaitingModal(false)
}

  const handleSubmit = (e) => {
    let currentKey = sessionStorage.getItem("admkey");
    let token = sessionStorage.getItem("admtoken");
    let addedBy;
    if (currentKey !== 'lmsapp') {
      currentKey = sessionStorage.getItem("admstaffkey");
      token = sessionStorage.getItem("admstaffLogintoken");
      setKey(currentKey); // Update the state if needed
    }
    if (currentKey === 'lmsapp') {
      addedBy = 0
    } else {
      addedBy = sessionStorage.getItem("admstaffId")
    }
    e.preventDefault()
    const validationErrors = validateForm(inputField)
    if (Object.keys(validationErrors).length === 0) {
      let axiosConfig = {
        headers: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          "token": token,
          "key": currentKey
        }
      }
      let data = {
        "collegeName": inputField.collegeName,
        "collegeCode": inputField.collegeCode,
        "collegeAddress": inputField.collegeAddress,
        "website": inputField.website,
        "email": inputField.email,
        "collegePhNo": inputField.collegePhNo,
        "collegeMobileNumber": inputField.collegeMobileNumber,
        "collegeImage": file,
        "addedby": addedBy
      }
      setShowWaitingModal(true)
      setShowOverlay(true)
      axios.post(apiUrl, data, axiosConfig).then(
        (response) => {
          if (response.data.status === "success") {
            closeWaitingModal()
            setTimeout(()=>{
              alert("College Details Added Successfully.")
            setInputField({
              collegeName: '',
              collegeCode: '',
              collegeAddress: '',
              website: '',
              email: '',
              collegePhNo: '',
              collegeMobileNumber: '',
              collegeImage: ''
            })
            }, 500)
          } else if (response.data.status === "Validation failed" && response.data.data.name) {
            closeWaitingModal()
            setTimeout(()=>{
              alert(response.data.data.name)
            }, 500)
          } else if (response.data.status === "Validation failed" && response.data.data.address) {
            closeWaitingModal()
            setTimeout(()=>{
              alert(response.data.data.address)
            }, 500)
          } else if (response.data.status === "Validation failed" && response.data.data.website) {
            closeWaitingModal()
            setTimeout(()=>{
              alert(response.data.data.website)
            }, 500)
          } else if (response.data.status === "Validation failed" && response.data.data.email) {
            closeWaitingModal()
            setTimeout(()=>{
              alert(response.data.data.email)
            }, 500)
          } else if (response.data.status === "Validation failed" && response.data.data.phone) {
            closeWaitingModal()
            setTimeout(()=>{
              alert(response.data.data.phone)
            }, 500)
          } else if (response.data.status === "Validation failed" && response.data.data.mobile) {
            closeWaitingModal()
            setTimeout(()=>{
              alert(response.data.data.mobile)
            }, 500)
          } else if (response.data.status === "Validation failed" && response.data.data.code) {
            closeWaitingModal()
            setTimeout(()=>{
              alert(response.data.data.code)
            }, 500)
          } else if (response.data.status === "Unauthorized User!!") {
            { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
            sessionStorage.clear()
          } else {
            closeWaitingModal()
            setTimeout(() => {
                alert(response.data.status)
            }, 500)
          }
        }
      ).catch(error => {
        closeWaitingModal()
        if (error.response) {
          // Extract the status code from the response
          const statusCode = error.response.status;

          if (statusCode === 400) {
            console.log("Status 400:", error.response.data);
            setTimeout(()=>{
              alert(error.response.data.status)
            }, 500)
            // Additional logic for status 400
          } else if (statusCode === 500) {
            console.log("Status 500:", error.response.data);
            setTimeout(()=>{
              alert(error.response.data.status)
            }, 500)
            // Additional logic for status 500
          } else {
            setTimeout(()=>{
              alert(error.response.data.status)
            }, 500)
          }
        } else if (error.request) {
          console.log(error.request);
          setTimeout(()=>{
            alert(error.request);
          }, 500)
        } else if (error.message) {
          console.log('Error', error.message);
          setTimeout(()=>{
            alert('Error', error.message);
          }, 500)
        } else {
          console.log(error.config);
          setTimeout(()=>{
            alert(error.config);
          }, 500)
        }
      })
    } else {
      setErrors(validationErrors);
    }
  }

  const validateForm = (data) => {
    let errors = {};

    if (!data.collegeName.trim()) {
      errors.collegeName = 'College Name is required';
    }
    if (!data.collegeCode.trim()) {
      errors.collegeCode = 'College Code is required';
    }
    if (!data.collegeAddress.trim()) {
      errors.collegeAddress = 'College Address is required';
    }
    if (!data.website.trim()) {
      errors.website = 'Website is required';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!data.collegeMobileNumber.trim()) {
      errors.collegeMobileNumber = 'Mobile Number is required';
    }
    if (fileType !== "jpg" && fileType !== "jpeg" && fileType !== "png" && fileType !== "webp" && fileType !== "heif") {
      errors.file = "File must be in jpg/jpeg/png/webp/heif format";
    }
    return errors;
  };

  // Update key state when component mounts
  useEffect(() => {
    setKey(sessionStorage.getItem("admkey") || '');
  }, []);

  return (
    <div>
      {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
      <div className="bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
              <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                <div className="row">
                  <div className="col-12">
                    <div className="text-center mb-5">
                      <Link to="#!">
                        <img src="https://www.linkurcodes.com/images/logo.png" alt="" width="175" height="57" />
                      </Link><br /><br />
                      <h3>Add College Details</h3>
                    </div>
                  </div>
                </div>
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label htmlFor="" className="form-label">College Name <span className="text-danger">*</span></label>
                    <input onChange={inputHandler} type="text" className="form-control" name="collegeName" value={inputField.collegeName} id="collegeName" />
                    {errors.collegeName && <span style={{ color: 'red' }} className="error">{errors.collegeName}</span>}
                  </div>
                  <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label htmlFor="" className="form-label">College Code <span className="text-danger">*</span></label>
                    <input onChange={inputHandler} type="text" className="form-control" name="collegeCode" value={inputField.collegeCode} id="collegeCode" />
                    {errors.collegeCode && <span style={{ color: 'red' }} className="error">{errors.collegeCode}</span>}
                  </div>
                  <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <label htmlFor="" className="form-label">College Address <span className="text-danger">*</span></label>
                    <textarea onChange={inputHandler} name="collegeAddress" id="collegeAddress" cols="30" rows="5" className="input form-control" value={inputField.collegeAddress} ></textarea>
                    {errors.collegeAddress && <span style={{ color: 'red' }} className="error">{errors.collegeAddress}</span>}
                  </div>
                  <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label htmlFor="" className="form-label">College Website <span className="text-danger">*</span></label>
                    <input onChange={inputHandler} type="text" className="form-control" name="website" value={inputField.website} id="website" />
                    {errors.website && <span style={{ color: 'red' }} className="error">{errors.website}</span>}
                  </div>
                  <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label htmlFor="" className="form-label">College Email <span className="text-danger">*</span></label>
                    <input onChange={inputHandler} type="text" className="form-control" name="email" value={inputField.email} id="email" />
                    {errors.email && <span style={{ color: 'red' }} className="error">{errors.email}</span>}
                  </div>
                  <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label htmlFor="" className="form-label">College Phone No. </label>
                    <input onChange={inputHandler} type="text" className="form-control" name="collegePhNo" value={inputField.collegePhNo} id="collegePhNo" />
                    {errors.collegePhNo && <span style={{ color: 'red' }} className="error">{errors.collegePhNo}</span>}
                  </div>
                  <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label htmlFor="" className="form-label">College Mobile No. <span className="text-danger">*</span></label>
                    <input onChange={inputHandler} type="text" className="form-control" name="collegeMobileNumber" value={inputField.collegeMobileNumber} id="collegeMobileNumber" />
                    {errors.collegeMobileNumber && <span style={{ color: 'red' }} className="error">{errors.collegeMobileNumber}</span>}
                  </div>
                  <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <label htmlFor="collegeImage" className="form-label">
                      College Image <span className="text-danger">*</span>
                    </label>
                    <input type="file" className="form-control" name="collegeImage" id="collegeImage" accept="image/*" onChange={fileUploadHandler} />
                    {errors.file && (<span style={{ color: 'red' }} className="error">{errors.file}</span>)}
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button onClick={handleSubmit} className="btn btn-primary btn-lg" type="submit">Register</button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <hr className="mt-5 mb-4 border-secondary-subtle" />
                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center">
                      &copy; 2024 Link Ur Codes. All rights reserved.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  )
}

export default AddCollege