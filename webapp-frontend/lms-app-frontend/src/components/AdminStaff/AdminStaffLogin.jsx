import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../config/config'

const AdminStaffLogin = () => {
    const [inputField, setInputField] = useState(
        { Email: "", Password: "" }
    )

    const apiUrl = global.config.urls.api.server + "/api/lms/AdminStaffLogin"
    // const navigate=useNavigate()

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        axios.post(apiUrl,inputField).then(
            (Response)=>{
                if (Response.data.status == "success") {
                    let token = Response.data.token
                    sessionStorage.setItem("ustoken", token)
                    alert(Response.data.status)  
                } else {
                    alert(Response.data.status)
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
                            <h2>Admin Staff Login</h2>
                        </div>
                        <div class="card-body ">
                            <form>
                                <div class="mb-3 text-start">
                                    <label for="" class="form-label">Email</label>
                                    <input type="text" name="Email" value={inputField.Email} onChange={inputHandler} class="form-control" />
                                </div>
                                <div class="mb-3 text-start">
                                    <label for="" class="form-label">Password</label>
                                    <input type="password" name="Password" value={inputField.Password} onChange={inputHandler} class="form-control" />
                                </div>
                            </form>
                            <div class="mb-3">
                                <button type="button" onClick={readValue} class="btn btn-success btn-lg">Login</button>
                            </div>
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

export default AdminStaffLogin