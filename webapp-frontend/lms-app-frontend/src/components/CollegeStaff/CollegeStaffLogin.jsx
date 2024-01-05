import axios from 'axios'
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import '../../config/config'

const CollegeStaffLogin = () => {
    const [inputField, setInputField] = useState(
        {
            email: "",
            password: ""
        }
    )

    const apiUrl = global.config.urls.api.server + "/api/lms/clgStaffLogin"
    // const navigate = useNavigate()

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        axios.post(apiUrl, inputField).then(
            (response) => {
                if (response.data.status === "Success") {
                    let token = response.data.token
                    sessionStorage.setItem("clgstaffLogintoken", token)
                    alert(response.data.status)
                } else {
                    if (response.data.status === "Validation failed" && response.data.data.email) {
                        alert(response.data.data.email)
                    } else {
                        if (response.data.status === "Validation failed" && response.data.data.password) {
                            alert(response.data.data.password)
                        } else {
                            alert(response.data.status)
                        }
                        
                    }
                }
            }
        )
    }

    return (
        <div class="container">
            <div class="row justify-content-center align-items-center min-vh-100">
                <div class="col col-12 col-sm-8 col-md-12 col-lg-8">
                    <div class="text-center mb-4">
                        <img src="https://www.linkurcodes.com/images/logo.png" alt="Company Logo" class="img-fluid" />
                    </div>
                    <br></br>
                    <div class="card text-center shadow p-3 mb-5 bg-white rounded">
                        <div class="card-header bg-info-subtle mb-3">
                            <h2>College-Staff Login</h2>
                        </div>
                        <div class="card-body ">
                            <form>
                                <div class="mb-3 text-start">
                                    <label for="" class="form-label">Email</label>
                                    <input type="text" name="email" value={inputField.email} onChange={inputHandler} class="form-control" />
                                </div>
                                <div class="mb-3 text-start">
                                    <label for="" class="form-label">Password</label>
                                    <input type="password" name="password" value={inputField.password} onChange={inputHandler} class="form-control" />
                                </div>
                            </form>
                            <div class="mb-3">
                                <button type="button" onClick={readValue} class="btn btn-success btn-lg">Login</button>
                            </div>
                            {/* <div class="mb-3">
                                <p class="lead ">Don't have an account? <a href="/register">Register here</a></p>
                            </div> */}
                        </div>

                        <div class="card-footer text-muted">
                            &copy; 2024 Link Ur Codes. All rights reserved.
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollegeStaffLogin