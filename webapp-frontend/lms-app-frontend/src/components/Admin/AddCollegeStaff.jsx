import React, { useEffect, useState } from 'react'
import '../../config/config'
import axios from 'axios'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar'

const AddCollegeStaff = () => {

  const [inputField, setInputField] = useState({
    "collegeId": "",
    "collegeStaffName": "",
    "department": "",
    "clgStaffAddress": "",
    "email": "",
    "phNo": "",
    "aadharNo": "",
    "password": "",
    "confirmpassword": "",
  })

  const [file, setFile] = useState(null)

  const [key, setKey] = useState('');

  const [fileType, setFileType] = useState("");

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
  const [outputField, setOutputField] = useState([])
  const apiUrl = global.config.urls.api.server + "/api/lms/addclgstaff"
  const apiUrl2 = global.config.urls.api.server + "/api/lms/viewallcolleges"


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
        'content-type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*",
        "token": token,
        "key": currentKey
      }
    };
    axios.post(apiUrl2, {}, axiosConfig).then(
      (response) => {
        // console.log(axiosConfig)
        setOutputField(response.data.data)
        // console.log(response.data.data)
      }
    )
  }



  const inputHandler = (event) => {
    setErrors({})
    setInputField({ ...inputField, [event.target.name]: event.target.value })
  };


  const readValue = (e) => {
    let currentKey = sessionStorage.getItem("admkey");
    let token = sessionStorage.getItem("admtoken");
    if (currentKey !== 'lmsapp') {
      currentKey = sessionStorage.getItem("admstaffkey");
      token = sessionStorage.getItem("admstaffLogintoken");
      setKey(currentKey); // Update the state if needed
    }
    e.preventDefault();
    const validationErrors = validateForm(inputField);
    console.log(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      let axiosConfig = {
        headers: {
          'content-type': 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
          "token": token,
          "key": currentKey
        }
      };
      let data = {
        "collegeId": inputField.collegeId,
        "collegeStaffName": inputField.collegeStaffName,
        "department": inputField.department,
        "clgStaffAddress": inputField.clgStaffAddress,
        "email": inputField.email,
        "phNo": inputField.phNo,
        "aadharNo": inputField.aadharNo,
        "password": inputField.password,
        "confirmpassword": inputField.confirmpassword,
        "profilePic": file
      }
      axios.post(apiUrl, data, axiosConfig).then(
        (response) => {
          if (response.data.status === "success") {
            alert("College Staff Added Successfully !!")
            setInputField({
              collegeId: '',
              collegeStaffName: '',
              department: '',
              clgStaffAddress: '',
              email: '',
              phNo: '',
              aadharNo: '',
              password: '',
              confirmpassword: '',
              profilePic: ''
            })
            window.location.reload()
          } else {
            if (response.data.status === "Validation failed" && response.data.data.dept) {
              alert(response.data.data.dept)
            } else {
              if (response.data.status === "Validation failed" && response.data.data.name) {
                alert(response.data.data.name)
              } else {
                if (response.data.status === "Validation failed" && response.data.data.address) {
                  alert(response.data.data.address)
                } else {
                  if (response.data.status === "Validation failed" && response.data.data.email) {
                    alert(response.data.data.email)
                  } else {
                    if (response.data.status === "Validation failed" && response.data.data.mobile) {
                      alert(response.data.data.mobile)
                    } else {
                      if (response.data.status === "Validation failed" && response.data.data.aadharnumber) {
                        alert(response.data.data.aadharnumber)
                      } else {
                        if (response.data.status === "Validation failed" && response.data.data.password) {
                          alert(response.data.data.password)
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
      ).catch(error => {
        if (error.response) {
          // Extract the status code from the response
          const statusCode = error.response.status;

          if (statusCode === 400) {
            alert(error.response.data.status)
            // Additional logic for status 400
          } else if (statusCode === 500) {
            alert(error.response.data.status)
            // Additional logic for status 500
          } else {
            alert(error.response.data.status)
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
    } else {
      setErrors(validationErrors);
    }
  }



  const validateForm = (data) => {
    let errors = {};

    if (!data.collegeStaffName.trim()) {
      errors.collegeStaffName = 'Name is required';
    }

    if (!data.collegeId.trim()) {
      errors.collegeId = 'College Name is required';
    }
    if (!data.department.trim()) {
      errors.department = 'Department is required';
    }
    if (!data.clgStaffAddress.trim()) {
      errors.clgStaffAddress = 'Address is required';
    }
    if (!data.confirmpassword) {
      errors.confirmpassword = 'Confirm password is required';

    }
    if (fileType !== "jpg" && fileType !== "jpeg" && fileType !== "png" && fileType !== "webp" && fileType !== "heif") {
      errors.file = "File must be in jpg/jpeg/png/webp/heif format";
    }
    if (!data.phNo.trim()) {
      errors.phNo = 'Phone No is required';
    }

    if (!data.aadharNo.trim()) {
      errors.aadharNo = 'Aadhar No is required';
    }


    if (!data.email.trim()) {
      errors.email = 'Email is required';
    }

    if (!data.password.trim()) {
      errors.password = 'Password is required';
    }

    if (data.confirmpassword !== data.password) {
      console.log(data.password)
      console.log(data.confirmpassword)
      errors.confirmpassword = 'Passwords do not match';
    }
    return errors;
  };

  useEffect(() => { getData() }, [])

  // Update key state when component mounts
  useEffect(() => {
    setKey(sessionStorage.getItem("admkey") || '');
  }, []);

  return (
    <div>
      {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
      <div className="container">
        <div class="bg-light py-3 py-md-5">
          <div class="container">
            <div class="row justify-content-md-center">
              <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
                <div class="bg-white p-4 p-md-5 rounded shadow-sm">
                  <div class="row">
                    <div class="col-12">
                      <div class="text-center mb-5">
                        <Link to="#!">
                          <img src="https://www.linkurcodes.com/images/logo.png" alt="" width="175" height="57" />
                        </Link><br /><br />
                        <h3>Add College Staff</h3>
                      </div>
                    </div>
                  </div>
                  <div class="row gy-3 gy-md-4 overflow-hidden">
                    <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="" class="form-label">College Name <span class="text-danger">*</span></label>
                      <select name="collegeId" value={inputField.collegeId} id="collegeId" className="form-control" onChange={inputHandler}>
                        <option value="">Select</option>
                        {outputField.map((value) => {
                          return <option value={value.id}> {value.collegeName} </option>
                        })}
                      </select>
                      {errors.collegeId && <span style={{ color: 'red' }} className="error">{errors.collegeId}</span>}
                    </div>
                    <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="department" class="form-label">Department <span class="text-danger">*</span></label>
                      <input type="text" class="form-control" name="department" id="department" onChange={inputHandler} value={inputField.department} />
                      {errors.department && <span style={{ color: 'red' }} className="error">{errors.department}</span>}
                    </div>
                    <div class="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label for="collegeStaffName" class="form-label">College Staff Name <span class="text-danger">*</span></label>
                      <input type="text" class="form-control" name="collegeStaffName" onChange={inputHandler} value={inputField.collegeStaffName} id="collegeStaffName" />
                      {errors.collegeStaffName && <span style={{ color: 'red' }} className="error">{errors.collegeStaffName}</span>}
                    </div>
                    <div class="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label for="clgStaffAddress" class="form-label">Address <span class="text-danger">*</span></label>
                      <textarea onChange={inputHandler} name="clgStaffAddress" id="clgStaffAddress" cols="30" rows="5" className="input form-control" value={inputField.clgStaffAddress} ></textarea>
                      {errors.clgStaffAddress && <span style={{ color: 'red' }} className="error">{errors.clgStaffAddress}</span>}
                    </div>
                    <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                      <input type="text" class="form-control" name="email" id="email" onChange={inputHandler} value={inputField.email} />
                      {errors.email && <span style={{ color: 'red' }} className="error">{errors.email}</span>}
                    </div>
                    <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="PhNo" class="form-label">Mobile No <span class="text-danger">*</span></label>
                      <input type="text" class="form-control" required="" name="phNo" id="phNo" onChange={inputHandler} value={inputField.phNo} />
                      {errors.phNo && <span style={{ color: 'red' }} className="error">{errors.phNo}</span>}
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label htmlFor="profilePic" className="form-label">
                        Profile Image <span className="text-danger">*</span>
                      </label>
                      <input type="file" className="form-control" name="profilePic" id="profilePic" accept="image/*" onChange={fileUploadHandler} />
                      {errors.file && <span style={{ color: 'red' }} className="error">{errors.file}</span>}
                    </div>
                    <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="aadharNo" class="form-label">AadharNo <span class="text-danger">*</span></label>
                      <input type="text" class="form-control" name="aadharNo" id="aadharNo" onChange={inputHandler} value={inputField.aadharNo} />
                      {errors.aadharNo && <span style={{ color: 'red' }} className="error">{errors.aadharNo}</span>}
                    </div>
                    <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="password" class="form-label">Password <span class="text-danger">*</span></label>
                      <div class="input-group">
                        <input type="password" class="form-control" name="password" id="password" onChange={inputHandler} value={inputField.password} />

                      </div>
                      {errors.password && <span style={{ color: 'red' }} className="error">{errors.password}</span>}
                    </div>
                    <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      <label for="password" class="form-label">Confirm Password <span class="text-danger">*</span></label>
                      <div class="input-group">
                        <input type="password" class="form-control" name="confirmpassword" id="confirmpassword" onChange={inputHandler} value={inputField.confirmpassword} />

                      </div>
                      {errors.confirmpassword && <span style={{ color: 'red' }} className="error">{errors.confirmpassword}</span>}
                    </div>
                    <div class="col-12">
                      <div class="d-grid">
                        <button class="btn btn-primary btn-lg" onClick={readValue} type="submit">Register</button>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <hr class="mt-5 mb-4 border-secondary-subtle" />
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

export default AddCollegeStaff



