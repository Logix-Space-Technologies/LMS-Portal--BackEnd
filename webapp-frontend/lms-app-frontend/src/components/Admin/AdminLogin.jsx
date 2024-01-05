import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../config/config'

const AdminLogin = () => {
    const [inputField, setInputField] = useState(
        { userName: "", Password: "" }
    )
    const apiUrl = global.config.urls.api.server + "/api/lms/"
    const navigate = useNavigate()

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        axios.post(apiUrl, inputField).then(
            (Response) => {
                if (Response.data.status === "Success") {
                    let admtoken = Response.data.token
                    sessionStorage.setItem("admtoken", admtoken)
                    navigate("/admdashboard")
                }
                else {
                    if (Response.data.status === "Validation failed" && Response.data.data.username) {
                        alert(Response.data.data.username)
                    } else {
                        if (Response.data.status === "Validation failed" && Response.data.data.password) {
                            alert(Response.data.data.password)
                        } else {
                            alert(Response.data.status)
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
                            <h2>Admin Login</h2>
                        </div>
                        <div class="card-body ">
                            <form>
                                <div class="mb-3 text-start">
                                    <label for="" class="form-label">Username</label>
                                    <input type="text" name="userName" value={inputField.userName} onChange={inputHandler} class="form-control" />
                                </div>
                                <div class="mb-3 text-start">
                                    <label for="" class="form-label">Password</label>
                                    <input type="password" name="Password" value={inputField.Password} onChange={inputHandler} class="form-control" />
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

export default AdminLogin