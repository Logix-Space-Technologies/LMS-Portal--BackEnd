import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StudNavBar from './StudNavBar'
import '../../config/config'

const StudentViewCommunityManager = () => {
    const [communityManagerData, setcommunityManagerData] = useState([])
    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/viewCommunityManager"
    const getData = () => {
        let batchId = { "batchId": sessionStorage.getItem("studBatchId") }
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken"),
                "key": sessionStorage.getItem("studentkey")
            }
        }
        axios.post(apiUrl, batchId, axiosConfig).then(
            (response) => {
                if (response.data.status === "success") {
                    setcommunityManagerData(response.data.data)
                } else {
                    if (response.data.status === "Unauthorized User!!") {
                        navigate("/studentLogin")
                        sessionStorage.clear()
                    } else {
                        alert(response.data.status)
                    }
                }
            }
        )
    }

    useEffect(() => { getData() }, [])
    return (
        <div>
            <StudNavBar />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-4 mb-sm-5">
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <center><h1 className="text-4xl font-bold text-gray-800 mb-8">Community Managers List</h1></center>
                            <div className="h-full">
                                {/* Cards */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-2">
                                    {communityManagerData.map((value, index) => {
                                        return (
                                            <div key={index} className="bg-white shadow-lg rounded-lg p-8">
                                                <div className="row align-items-center">
                                                    <div className="col-lg-6 mb-6 mb-lg-6">
                                                        <img height="300px" src={value.studProfilePic} alt="" />
                                                    </div>
                                                    <div className="col-lg-6 px-xl-10">
                                                        <div className="d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                                            <h3 className="h2 text-black mb-4">{value.studName}</h3>
                                                        </div>
                                                        <ul className="list-unstyled mb-4">
                                                            <li className="mb-2 display-28"><span className="text-secondary me-2 font-weight-600">Batch Name : {value.batchName}</span></li>
                                                            <li className="mb-2 display-28"><span className="text-secondary me-2 font-weight-600">Email : {value.studEmail}</span></li>
                                                            <li className="mb-2 display-28"><span className="text-secondary me-2 font-weight-600">Phone No : {value.studPhNo}</span></li>
                                                            <li className="mb-2 display-28"><span className="text-secondary me-2 font-weight-600">Aadhar No : {value.aadharNo}</span></li>
                                                            <li className="mb-2 display-28"><span className="text-secondary me-2 font-weight-600">Membership No : {value.membership_no}</span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
    
    
    
    
    
}

export default StudentViewCommunityManager