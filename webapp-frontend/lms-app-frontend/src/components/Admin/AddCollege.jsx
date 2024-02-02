import axios from 'axios'
import '../../config/config'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar'

const AddCollege = () => {

  const [inputField, setInputField] = useState(
    {
      "collegeName": "",
      "collegeCode": "",
      "collegeAddress": "",
      "website": "",
      "email": "",
      "collegePhNo": "",
      "collegeMobileNumber": "",
    }
  )

  const [file, setFile] = useState(null)
  const [key, setKey] = useState('');


  const fileUploadHandler = (event) => {
    setFile(event.target.files[0])
  }

  const [errors, setErrors] = useState({})

  const apiUrl = global.config.urls.api.server + "/api/lms/addCollege"

  const inputHandler = (event) => {
    setInputField({ ...inputField, [event.target.name]: event.target.value });
  }

  const handleSubmit = (e) => {
    let currentKey = sessionStorage.getItem("admkey");
    let token = sessionStorage.getItem("admtoken");
    if (currentKey !== 'lmsapp') {
      currentKey  = sessionStorage.getItem("admstaffkey");
      token = sessionStorage.getItem("admstaffLogintoken");
      setKey(currentKey); // Update the state if needed
    }
    console.log("key: ",key)
    console.log("token: ",token)
    console.log(inputField)
    console.log(file)
    e.preventDefault()
    const validationErrors = validateForm(inputField)
    console.log(validationErrors)
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
        "collegeImage": file
      }
      console.log(data)
      axios.post(apiUrl, data, axiosConfig).then(
        (response) => {
          if (response.data.status === "success") {
            alert(response.data.status)
            setInputField({ "collegeName": "", "collegeCode": "", "collegeAddress": "", "website": "", "email": "", "collegePhNo": "", "collegeMobileNumber": "" })
            setFile(null)
          } else {
            if (response.data.status === "Validation failed" && response.data.data.image) {
              alert(response.data.data.image)
            } else {
              if (response.data.status === "Validation failed" && response.data.data.name) {
                alert(response.data.data.name)
              } else {
                if (response.data.status === "Validation failed" && response.data.data.address) {
                  alert(response.data.data.address)
                } else {
                  if (response.data.status === "Validation failed" && response.data.data.website) {
                    alert(response.data.data.website)
                  } else {
                    if (response.data.status === "Validation failed" && response.data.data.email) {
                      alert(response.data.data.email)
                    } else {
                      if (response.data.status === "Validation failed" && response.data.data.phone) {
                        alert(response.data.data.phone)
                      } else {
                        if (response.data.status === "Validation failed" && response.data.data.mobile) {
                          alert(response.data.data.mobile)
                        } else {
                          if (response.data.status === "Validation failed" && response.data.data.code) {
                            alert(response.data.data.code)
                          } else {
                            alert(response.data.status)
                          }
                        }
                      }
                    }
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
    } else if (!/^www\.[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(data.website)) {
      errors.website = 'Invalid Website Format';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[a-z0-9._!#$%&'*+/=?^_`{|}~-]+@[a-z]+(\.[a-z]+)+$/.test(data.email)) {
      errors.email = 'Invalid Email address Format';
    }
    if (!data.collegeMobileNumber.trim()) {
      errors.collegeMobileNumber = 'Mobile Number is required';
    } else if (!/^\+91[6-9]\d{9}$|^\+91\s?[6-9]\d{9}$|^[6-9]\d{9}$/.test(data.collegeMobileNumber)) {
      errors.collegeMobileNumber = 'Invalid Mobile Number Format';
    }
    // if (!data.collegeImage) {
    //   errors.collegeImage = 'College Image Field is required';
    // }
    return errors;
  };

  // Update key state when component mounts
  useEffect(() => {
    setKey(sessionStorage.getItem("admkey") || '');
  }, []);
  return (
    <div>
      {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
      <div class="bg-light py-3 py-md-5">
        <div class="container">
          <div class="row justify-content-md-center">
            <div class="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
              <div class="bg-white p-4 p-md-5 rounded shadow-sm">
                <div class="row">
                  <div class="col-12">
                    <div class="text-center mb-5">
                      <a href="#!">
                        <img src="https://www.linkurcodes.com/images/logo.png" alt="" width="175" height="57" />
                      </a><br /><br />
                      <h3>Add College Details</h3>
                    </div>
                  </div>
                </div>
                <div class="row gy-3 gy-md-4 overflow-hidden">
                  <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label for="" class="form-label">College Name <span class="text-danger">*</span></label>
                    <input onChange={inputHandler} type="text" class="form-control" name="collegeName" value={inputField.collegeName} id="collegeName" />
                    {errors.collegeName && <span style={{ color: 'red' }} className="error">{errors.collegeName}</span>}
                  </div>
                  <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label for="" class="form-label">College Code <span class="text-danger">*</span></label>
                    <input onChange={inputHandler} type="text" class="form-control" name="collegeCode" value={inputField.collegeCode} id="collegeCode" />
                    {errors.collegeCode && <span style={{ color: 'red' }} className="error">{errors.collegeCode}</span>}
                  </div>
                  <div class="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <label for="" class="form-label">College Address <span class="text-danger">*</span></label>
                    <textarea onChange={inputHandler} name="collegeAddress" id="collegeAddress" cols="30" rows="5" className="input form-control" value={inputField.collegeAddress} ></textarea>
                    {errors.collegeAddress && <span style={{ color: 'red' }} className="error">{errors.collegeAddress}</span>}
                  </div>
                  <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label for="" class="form-label">College Website <span class="text-danger">*</span></label>
                    <input onChange={inputHandler} type="text" class="form-control" name="website" value={inputField.website} id="website" />
                    {errors.website && <span style={{ color: 'red' }} className="error">{errors.website}</span>}
                  </div>
                  <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label for="" class="form-label">College Email <span class="text-danger">*</span></label>
                    <input onChange={inputHandler} type="text" class="form-control" name="email" value={inputField.email} id="email" />
                    {errors.email && <span style={{ color: 'red' }} className="error">{errors.email}</span>}
                  </div>
                  <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label for="" class="form-label">College Phone No. </label>
                    <input onChange={inputHandler} type="text" class="form-control" name="collegePhNo" value={inputField.collegePhNo} id="collegePhNo" />
                    {errors.collegePhNo && <span style={{ color: 'red' }} className="error">{errors.collegePhNo}</span>}
                  </div>
                  <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label for="" class="form-label">College Mobile No. <span class="text-danger">*</span></label>
                    <input onChange={inputHandler} type="text" class="form-control" name="collegeMobileNumber" value={inputField.collegeMobileNumber} id="collegeMobileNumber" />
                    {errors.collegeMobileNumber && <span style={{ color: 'red' }} className="error">{errors.collegeMobileNumber}</span>}
                  </div>
                  <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <label htmlFor="collegeImage" className="form-label">
                      College Image <span className="text-danger">*</span>
                    </label>
                    <input type="file" className="form-control" name="collegeImage" id="collegeImage" accept="image/*" onChange={fileUploadHandler} />
                    {errors.collegeImage && <span style={{ color: 'red' }} className="error">{errors.collegeImage}</span>}
                  </div>
                  <div class="col-12">
                    <div class="d-grid">
                      <button onClick={handleSubmit} class="btn btn-primary btn-lg" type="submit">Register</button>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <hr class="mt-5 mb-4 border-secondary-subtle" />
                    <div class="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center">
                      &copy; 2024 Link Ur Codes. All rights reserved.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCollege