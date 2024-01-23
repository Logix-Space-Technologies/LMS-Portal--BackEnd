import React, { useState } from 'react'
import '../../config/config'
import axios from 'axios'

const CollegeStaffSearchStudent = () => {
    const [inputField, setInputField] = useState(
        { collegeId: "" }
    )

    const apiLink = global.config.urls.api.server + "/api/lms/searchStudent"

    const inputHandler = (event) => {
        setInputField({ ...inputField, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        console.log(inputField)
        axios.post(apiLink, inputField).then(
            (Response) => {
                setInputField({ collegeId: "" })
            }

        )

    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <h1>Search Student</h1>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">College Id</label>
                                <input onChange={inputHandler} type="text" className="form-control" name="collegeId" value={inputField.collegeId} />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <button onClick={readValue} className="btn btn-warning">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollegeStaffSearchStudent


