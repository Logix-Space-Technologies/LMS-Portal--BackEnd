import axios from 'axios'
import React, { useEffect, useState } from 'react'

const StudentRegistration = () => {

  const [inputField, setInputField] = useState({
    "collegeId": "",
    "batchId": "",
    "studName": "",
    "admNo": "",
    "rollNo": "",
    "studDept": "",
    "course": "",
    "studEmail": "",
    "studPhNo": "",
    "aadharNo": "",
    "password": "",
    "confirmpassword": ""
  })


  const [file, setFile] = useState(null)

  const fileUploadHandler = (event) => {
    setFile(event.target.files[0])
  }


  const [outputField, setOutputField] = useState([])

  const [errors, setErrors] = useState({})

  const [batches, setBatches] = useState([])

  const apiUrl = global.config.urls.api.server + "/api/lms/studreg"
  const apiUrl2 = global.config.urls.api.server + "/api/lms/studentregviewcollege"
  const batchUrl = global.config.urls.api.server + "/api/lms/studregviewbatch";
  // const batchAmountUrl = global.config.urls.api.server + "/api/lms/studregviewbatchamount"

  var batchAmount = {}

  const getData = () => {
    axios.post(apiUrl2).then(
      (response) => {
        setOutputField(response.data.data)
        console.log(response.data.data)
      }
    )
  }
 

  // Add a new function to fetch batches based on the selected college
  const getBatches = (collegeId) => {
    console.log(collegeId)
    axios.post(batchUrl, { collegeId }).then((response) => {
      setBatches(response.data);
    });
  };

  {batches.data && batches.data.map(
    (value, index) =>{
      return batchAmount = value.batchAmount
    }
  )}
  console.log(batchAmount)


  // Call getBatches whenever the college selection changes
  const handleCollegeChange = (event) => {
    const selectedCollegeId = event.target.value;
    setInputField(prevState => ({ ...prevState, collegeId: selectedCollegeId }));
    getBatches(selectedCollegeId);
  };


  const inputHandler = (event) => {
    setInputField({ ...inputField, [event.target.name]: event.target.value });
  };

  const loadRazorpayScript = async () => {
    const script = document.createElement('script')
    script.src = "https://checkout.razorpay.com/v1/checkout.js"

    document.body.appendChild(script)

    script.onload = () => {
      //initialize razorpay
      const rzp = new window.Razorpay({
        key: 'rzp_test_ZqcybzHd1QkWg8',
        amount: batchAmount * 100,
        name: 'Logix Space Technologies Pvt Ltd',
        description: 'Link Ur Codes Payment',
        // image: <img src="https://www.linkurcodes.com/images/logo.png" alt="Company Logo" class="img-fluid" />,
        image: 'https://www.linkurcodes.com/images/logo.png',


        handler: function (response) {
          console.log('Payment success:', response)

          const PaymentId = response.razorpay_payment_id
          alert("Amount Paid " + PaymentId)


          // Call Registration API and pass the details to the server
          let data = {
            "collegeId": inputField.collegeId,
            "batchId": inputField.batchId,
            "studName": inputField.studName,
            "admNo": inputField.admNo,
            "rollNo": inputField.rollNo,
            "studDept": inputField.studDept,
            "course": inputField.course,
            "studEmail": inputField.studEmail,
            "studPhNo": inputField.studPhNo,
            "aadharNo": inputField.aadharNo,
            "password": inputField.password,
            "studProfilePic": file,  // Updated this line
            "rpPaymentId": PaymentId,
            "rpOrderId": orderId,
            "rpAmount": batchAmount
          };
          let axiosConfig = {
            headers: {
              'content-type': 'multipart/form-data',
              "Access-Control-Allow-Origin": "*"
            }
          };
          console.log(data)
          axios.post(apiUrl, data, axiosConfig).then(
            (response) => {
              if (response.data.status === "success") {
                alert("User Registered Successfully !!!")

                setInputField({ "collegeId": "", "batchId": "", "studName": "", "admNo": "", "rollNo": "", "studDept": "", "course": "", "studEmail": "", "studPhNo": "", "studProfilePic": "", "aadharNo": "", "password": "", "confirmpassword": "" })
              } else {
                if (response.data.status === "Validation failed" && response.data.data.college) {
                  alert(response.data.data.college)
                } else {
                  if (response.data.status === "Validation failed" && response.data.data.batch) {
                    alert(response.data.data.batch)
                  } else {
                    if (response.data.status === "Validation failed" && response.data.data.name) {
                      alert(response.data.data.name)
                    } else {
                      if (response.data.status === "Validation failed" && response.data.data.admNo) {
                        alert(response.data.data.admNo)
                      } else {
                        if (response.data.status === "Validation failed" && response.data.data.rollNo) {
                          alert(response.data.data.rollNo)
                        } else {
                          if (response.data.status === "Validation failed" && response.data.data.department) {
                            alert(response.data.data.department)
                          } else {
                            if (response.data.status === "Validation failed" && response.data.data.course) {
                              alert(response.data.data.course)
                            } else {
                              if (response.data.status === "Validation failed" && response.data.data.email) {
                                alert(response.data.data.email)
                              } else {
                                if (response.data.status === "Validation failed" && response.data.data.phone) {
                                  alert(response.data.data.phone)
                                } else {
                                  if (response.data.status === "Validation failed" && response.data.data.aadharNo) {
                                    alert(response.data.data.aadharNo)
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
                  }
                }
              }
            }
          )
        }
      })
      function GFG_Fun() {
        return Math.random().toString(36).slice(2)
      }
      const orderId = GFG_Fun()
      rzp.open({
        order_id: orderId
      })
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(inputField);
    if (Object.keys(validationErrors).length === 0) {
      loadRazorpayScript();
    } else {
      setErrors(validationErrors);
    }
  };



  const validateForm = (data) => {
    let errors = {};

    if (!data.collegeId.trim()) {
      errors.collegeId = 'College is required';
    }

    if (!data.batchId.trim()) {
      errors.batchId = 'Batch is required';
    }
    if (!data.studName.trim()) {
      errors.studName = 'Name is required';
    }
    if (!data.admNo.trim()) {
      errors.admNo = 'Admission number is required';
    }
    if (!data.rollNo.trim()) {
      errors.rollNo = 'Roll number is required';
    }
    if (!data.course.trim()) {
      errors.course = 'Course is required';
    }
    if (!data.studDept.trim()) {
      errors.studDept = 'Department is required';
    }
    if (!data.confirmpassword) {
      errors.confirmpassword = 'Confirm password is required';
    }
    if (!file) {
      errors.studProfilePic = 'Profile Image is required';
    }
    if (!data.studPhNo.trim()) {
      errors.studPhNo = 'Phone No is required';
    } else if (!/^\+91[6-9]\d{9}$|^\+91\s?[6-9]\d{9}$|^[6-9]\d{9}$/.test(data.studPhNo)) {
      errors.studPhNo = 'Invalid phone number';
    }

    if (!data.aadharNo.trim()) {
      errors.aadharNo = 'Aadhar No is required';
    } else if (!/^\d{12}$/.test(data.aadharNo)) {
      errors.aadharNo = 'Invalid Aadhar number';
    }


    if (!data.studEmail.trim()) {
      errors.studEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.studEmail)) {
      errors.studEmail = 'Invalid email address';
    }

    if (!data.password.trim()) {
      errors.password = 'Password is required';
    } else if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,12}$/.test(data.password)) {
      errors.password = 'Password must be at least 8 characters and should not exceed 12 characters and should include one uppercase letter, one lowercase letter, numbers and special characters';
    }

    if (data.confirmpassword !== data.password) {
      console.log(data.password)
      console.log(data.confirmpassword)
      errors.confirmpassword = 'Passwords do not match';
    }
    return errors;
  };

  useEffect(() => { getData() }, [])

  return (
    <div className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
              <div className="row">
                <div className="col-12">
                  <div className="text-center mb-5">
                    <a href="#!">
                      <img
                        src="https://www.linkurcodes.com/images/logo.png"
                        alt=""
                        width="175"
                        height="57" />
                    </a>
                    <br />
                    <br />
                    <h3>Student Registration</h3>
                  </div>
                </div>
              </div>
              <div className="row gy-3 gy-md-4 overflow-hidden">
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label htmlFor="" className="form-label">
                    College Name <span className="text-danger">*</span>
                  </label>
                  <select
                    name="collegeId"
                    value={inputField.collegeId}
                    onChange={handleCollegeChange}
                    id="collegeId"
                    className="form-control">
                    <option value="">Select</option>
                    {outputField.map((value) => {
                      return <option value={value.id}> {value.collegeName} </option>
                    })}
                  </select>
                  {errors.collegeId && <span style={{ color: 'red' }} className="error">{errors.collegeId}</span>}
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label htmlFor="batchId" className="form-label">
                    Batch Name <span className="text-danger">*</span>
                  </label>
                  <select
                    name="batchId"
                    id="batchId"
                    className="form-control"
                    value={inputField.batchId}
                    onChange={inputHandler}>
                    <option value="">Select</option>
                    {batches.data && batches.data.map((value) => {
                      return <option key={value.id} value={value.id}> {value.batchName} </option>;
                    })}
                  </select>
                  {/* <select
                    name="batchId"
                    id="batchId"
                    className="form-control"
                    value={inputField.batchId}
                    onChange={inputHandler}
                  >
                    {batches.length === 0 ? (
                      <option value="" disabled>
                        No Batches Found
                      </option>
                    ) : (
                      <>
                        <option value="">Select</option>
                        {batches.data.map((value) => (
                          <option key={value.batchName} value={value.id}>
                            {value.batchName}
                          </option>
                        ))}
                      </>
                    )}
                  </select> */}
                  {errors.batchId && <span style={{ color: 'red' }} className="error">{errors.batchId}</span>}
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label htmlFor="studName" className="form-label">
                    Student Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="studName"
                    value={inputField.studName} onChange={inputHandler}
                    id="studName" />
                  {errors.studName && <span style={{ color: 'red' }} className="error">{errors.studName}</span>}
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label htmlFor="admNo" className="form-label">
                    Admission No <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="admNo"
                    value={inputField.admNo} onChange={inputHandler}
                    id="admNo" />
                  {errors.admNo && <span style={{ color: 'red' }} className="error">{errors.admNo}</span>}
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label htmlFor="rollNo" className="form-label">
                    Roll No <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="rollNo"
                    value={inputField.rollNo} onChange={inputHandler}
                    id="rollNo" />
                  {errors.rollNo && <span style={{ color: 'red' }} className="error">{errors.rollNo}</span>}
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label htmlFor="studDept" className="form-label">
                    Department <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="studDept"
                    value={inputField.studDept} onChange={inputHandler}
                    id="studDept" />
                  {errors.studDept && <span style={{ color: 'red' }} className="error">{errors.studDept}</span>}
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label htmlFor="course" className="form-label">
                    Course <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="course"
                    value={inputField.course} onChange={inputHandler}
                    id="course" />
                  {errors.course && <span style={{ color: 'red' }} className="error">{errors.course}</span>}
                </div>

                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label htmlFor="studEmail" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="studEmail"
                    value={inputField.studEmail} onChange={inputHandler}
                    id="studEmail" />
                  {errors.studEmail && <span style={{ color: 'red' }} className="error">{errors.studEmail}</span>}
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label htmlFor="studPhNo" className="form-label">
                    Phone No <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required=""
                    name="studPhNo"
                    id="studPhNo"
                    value={inputField.studPhNo} onChange={inputHandler} />
                  {errors.studPhNo && <span style={{ color: 'red' }} className="error">{errors.studPhNo}</span>}
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label htmlFor="studProfilePic" className="form-label">
                    Profile Image <span className="text-danger">*</span>
                  </label>
                  <input type="file" className="form-control" name="studProfilePic" id="studProfilePic" accept="image/*" onChange={fileUploadHandler} />
                  {errors.studProfilePic && <span style={{ color: 'red' }} className="error">{errors.studProfilePic}</span>}
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label htmlFor="aadharNo" className="form-label">
                    AadharNo <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="aadharNo"
                    value={inputField.aadharNo} onChange={inputHandler}
                    id="aadharNo" />
                  {errors.aadharNo && <span style={{ color: 'red' }} className="error">{errors.aadharNo}</span>}
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label htmlFor="password" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={inputField.password} onChange={inputHandler}
                      id="password" /><br />
                    <span className="input-group-text">
                      <i className="bi bi-eye-slash" id="togglePassword"></i>
                    </span><br />
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
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-3"
                    onClick={handleSubmit}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default StudentRegistration