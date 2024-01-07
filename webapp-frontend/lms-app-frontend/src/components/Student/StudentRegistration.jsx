import React, { useState } from 'react'
import axios from 'axios'
import '../../config/config'

const StudentRegistration = () => {

  const [inputField, setInputField] = useState(
    { collegeId: "", batchId: "", studName: "", admNo: "", rollNo: "", studDept: "", course: "", studEmail: "", studPhNo: "", studProfilePic: "", aadharNo: "", password: "" }
  )

  const [errors, setErrors] = useState({})

  const apiUrl = global.config.urls.api.server + "/api/lms/studentLogin/studreg"

  const inputHandler = (event) => {
    setInputField({ ...inputField, [event.target.name]: event.target.name === 'studProfilePic' ? event.target.files[0] : event.target.value });
  }

  const loadRazorpayScript = async () => {

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';

    document.body.appendChild(script)

    script.onload = () => {
      //initialize razorpay
      const rzp = new window.Razorpay({
        key: 'rzp_test_ZqcybzHd1QkWg8',
        amount: 3650 * 100,
        currency: 'INR',
        name: 'Logix Space Technologies Pvt Ltd',
        description: 'Link Ur Codes Payment',
        // image: <img src="https://www.linkurcodes.com/images/logo.png" alt="Company Logo" class="img-fluid" />,
        image: 'https://www.linkurcodes.com/images/logo.png',

        handler: function (response) {
          console.log('Payment success:', response)

          const PaymentId = response.razorpay_payment_id
          alert("Amount Paid " + PaymentId)

          // Call Registration API and pass the details to the server
          // axios.post(apiUrl).then()
          const readValue = () => {
            axios.post(apiUrl, inputField).then(
              (response) => {
                if (response.data.status === "success") {
                  alert("User Registered Successfully !!!")
                  setInputField({ collegeId: "", batchId: "", studName: "", admNo: "", rollNo: "", studDept: "", course: "", studEmail: "", studPhNo: "", studProfilePic: "", aadharNo: "", password: "", confirmpass: "" })
                } else {
                  alert("Something Went Wrong !!!")
                }
              }
            )
          }
          readValue()
        }
      })
      function GFG_Fun() {
        return Math.random().toString(36).slice(2)
      }
      const orderId = GFG_Fun()
      rzp.open({
        order_id: orderId,
      })
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Handle submit function called');
    const validationErrors = validateForm(inputField)
    console.log(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      console.log(validationErrors.length)
      loadRazorpayScript(); // Call the loadRazorpayScript function

    } else {
      setErrors(validationErrors);
    }
  }

  const validateForm = (data) => {
    let errors = {};

    if (!data.studName.trim()) {
      errors.studName = 'Name is required';
    }

    if (!data.collegeId.trim()) {
      errors.collegeId = 'College Id is required';
    }
    if (!data.batchId.trim()) {
      errors.batchId = 'Batch Id is required';
    }
    if (!data.rollNo.trim()) {
      errors.rollNo = 'Roll No is required';
    }
    if (!data.admNo.trim()) {
      errors.admNo = 'Admission No is required';
    }
    if (!data.studDept.trim()) {
      errors.studDept = 'Department is required';
    }
    if (!data.course.trim()) {
      errors.course = 'Course is required';
    }
    if (!data.confirmpass) {
      errors.confirmpass = 'Confirm password is required';
    }
    if (!data.studProfilePic) {
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
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (data.confirmpass !== data.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };
  return (
    <div class="bg-light py-3 py-md-5">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div class="bg-white p-4 p-md-5 rounded shadow-sm">
              <div class="row">
                <div class="col-12">
                  <div class="text-center mb-5">
                    <a href="#!">
                      <img src="https://www.linkurcodes.com/images/logo.png" alt="" width="175" height="57" />
                    </a><br /><br />
                    <h3>Student Registration</h3>
                  </div>
                </div>
              </div>
              <div class="row gy-3 gy-md-4 overflow-hidden">
                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label for="collegeId" class="form-label">College ID <span class="text-danger">*</span></label>
                  <input onChange={inputHandler} type="text" class="form-control" name="collegeId" value={inputField.collegeId} id="collegeId" />
                  {errors.collegeId && <span style={{ color: 'red' }} className="error">{errors.collegeId}</span>}
                </div>
                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label for="batchId" class="form-label">Batch ID <span class="text-danger">*</span></label>
                  <input onChange={inputHandler} type="text" class="form-control" name="batchId" value={inputField.batchId} id="batchId" />
                  {errors.batchId && <span style={{ color: 'red' }} className="error">{errors.batchId}</span>}
                </div>
                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label for="studName" class="form-label">Student Name <span class="text-danger">*</span></label>
                  <input onChange={inputHandler} type="text" class="form-control" name="studName" value={inputField.studName} id="studName" />
                  {errors.studName && <span style={{ color: 'red' }} className="error">{errors.studName}</span>}
                </div>
                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label for="admNo" class="form-label">Admission No <span class="text-danger">*</span></label>
                  <input onChange={inputHandler} type="text" class="form-control" name="admNo" value={inputField.admNo} id="admNo" />
                  {errors.admNo && <span style={{ color: 'red' }} className="error">{errors.admNo}</span>}
                </div>
                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label for="rollNo" class="form-label">Roll No <span class="text-danger">*</span></label>
                  <input onChange={inputHandler} type="text" class="form-control" name="rollNo" value={inputField.rollNo} id="rollNo" />
                  {errors.rollNo && <span style={{ color: 'red' }} className="error">{errors.rollNo}</span>}
                </div>
                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label for="studDept" class="form-label">Department <span class="text-danger">*</span></label>
                  <input onChange={inputHandler} type="text" class="form-control" name="studDept" value={inputField.studDept} id="studDept" />
                  {errors.studDept && <span style={{ color: 'red' }} className="error">{errors.studDept}</span>}
                </div>
                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label for="course" class="form-label">Course <span class="text-danger">*</span></label>
                  <input onChange={inputHandler} type="text" class="form-control" name="course" value={inputField.course} id="course" />
                  {errors.course && <span style={{ color: 'red' }} className="error">{errors.course}</span>}
                </div>
                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label for="studEmail" class="form-label">Email <span class="text-danger">*</span></label>
                  <input onChange={inputHandler} type="text" class="form-control" name="studEmail" value={inputField.studEmail} id="studEmail" />
                  {errors.studEmail && <span style={{ color: 'red' }} className="error">{errors.studEmail}</span>}
                </div>
                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label for="studPhNo" class="form-label">Phone No <span class="text-danger">*</span></label>
                  <input onChange={inputHandler} type="text" class="form-control" required="" name="studPhNo" id="studPhNo" value={inputField.studPhNo} />
                  {errors.studPhNo && <span style={{ color: 'red' }} className="error">{errors.studPhNo}</span>}
                </div>
                <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label for="studProfilePic" className="form-label">
                    Profile Image <span className="text-danger">*</span>
                  </label>
                  <input onChange={inputHandler} type="file" className="form-control" name="studProfilePic" id="studProfilePic" accept="image/*" />
                  {errors.studProfilePic && <span style={{ color: 'red' }} className="error">{errors.studProfilePic}</span>}
                </div>

                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label for="aadharNo" class="form-label">AadharNo <span class="text-danger">*</span></label>
                  <input onChange={inputHandler} type="text" class="form-control" name="aadharNo" value={inputField.aadharNo} id="aadharNo" />
                  {errors.aadharNo && <span style={{ color: 'red' }} className="error">{errors.aadharNo}</span>}
                </div>
                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label for="password" class="form-label">Password <span class="text-danger">*</span></label>
                  <div class="input-group">
                    <input onChange={inputHandler} type="password" class="form-control" name="password" value={inputField.password} id="password" />
                    
                  </div>
                  {errors.password && <span style={{ color: 'red' }} className="error">{errors.password}</span>}
                </div>
                <div class="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <label for="password" class="form-label">Confirm Password <span class="text-danger">*</span></label>
                  <div class="input-group">
                    <input onChange={inputHandler} type="password" class="form-control" name="confirmpass" value={inputField.confirmpass} id="confirmpass" />
                    
                  </div>
                  {errors.confirmpass && <span style={{ color: 'red' }} className="error">{errors.confirmpass}</span>}
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
                    <a href="/studentLogin" class="link-secondary text-decoration-none">Already have an account? Log In</a>
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

export default StudentRegistration

