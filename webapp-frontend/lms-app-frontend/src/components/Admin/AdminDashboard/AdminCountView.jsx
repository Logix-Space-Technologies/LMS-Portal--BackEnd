import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../../config/config'

const AdminCountView = () => {
    const [collegeData, setCollegeData] = useState([])

    // const apiLink = "http://localhost:8080/api/lms/adminDashboard"
    const apiUrl = global.config.urls.api.server + "/api/lms/adminDashboard"

    const getData = () => {
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("admtoken"),
                "key": sessionStorage.getItem("admkey")
            }
        };
        axios.post(apiUrl, {}, axiosConfig).then(
            (Response) => {
                setCollegeData(Response.data.data)
            }
        )
    }

    useEffect(() => { getData() }, [])
    return (

        <div class="container-fluid pt-4 px-4">
            <div class="row g-4">
                <div class="col-sm-6 col-xl-3">
                    <div class="shadow p-3 mb-5 text-dark rounded bg-info-subtle rounded d-flex align-items-stretch justify-content-between p-4" >
                        {/* <i class="fa fa-chart-line fa-3x text-primary"></i> */}
                        <div class="ms-3">
                            <p class="mb-2">Total Colleges</p>
                            {[collegeData].map(
                                (value, index) => {
                                    return <h6 class="mb-0">{value.totalColleges}</h6>
                                })}
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                    <div class="shadow p-3 mb-5 text-dark rounded bg-info-subtle rounded d-flex align-items-stretch justify-content-between p-4" >
                        {/* <i class="fa fa-chart-bar fa-3x text-primary"></i> */}
                        <div class="ms-3">
                            <p class="mb-2">Total Batches</p>
                            {[collegeData].map(
                                (value, index) => {
                                    return <h6 class="mb-0">{value.totalBatches}</h6>
                                })}

                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                    <div class="shadow p-3 mb-5 text-dark rounded bg-info-subtle rounded d-flex align-items-stretch justify-content-between p-4" >
                        {/* <i class="fa fa-chart-area fa-3x text-primary"></i> */}
                        <div class="ms-3">
                            <p class="mb-2">Total Tasks</p>
                            {[collegeData].map(
                                (value, index) => {
                                    return <h6 class="mb-0">{value.totalTasks}</h6>
                                })}
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                    <div class="shadow p-3 mb-5 text-dark rounded bg-info-subtle rounded d-flex align-items-stretch justify-content-between p-4" >
                        {/* <i class="fa fa-chart-pie fa-3x text-primary"></i> */}
                        <div class="ms-3">
                            <p class="mb-2">Total Students</p>
                            {[collegeData].map(
                                (value, index) => {
                                    return <h6 class="mb-0">{value.totalStudents}</h6>
                                })}
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                    <div class="shadow p-3 mb-5 text-dark rounded bg-info-subtle rounded d-flex align-items-stretch justify-content-between p-4" >
                        {/* <i class="fa fa-chart-line fa-3x text-primary"></i> */}
                        <div class="ms-3">
                            <p class="mb-2">Total Admin Staff</p>
                            {[collegeData].map(
                                (value, index) => {
                                    return <h6 class="mb-0">{value.totalAdminStaff}</h6>
                                })}
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                    <div class="shadow p-3 mb-5 text-dark rounded bg-info-subtle rounded d-flex align-items-stretch justify-content-between p-4" >
                        {/* <i class="fa fa-chart-bar fa-3x text-primary"></i> */}
                        <div class="ms-3">
                            <p class="mb-2">Total College Staff</p>
                            {[collegeData].map(
                                (value, index) => {
                                    return <h6 class="mb-0">{value.totalCollegeStaff}</h6>
                                })}
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                    <div class="shadow p-3 mb-5 text-dark rounded bg-info-subtle rounded d-flex align-items-stretch justify-content-between p-4" >
                        {/* <i class="fa fa-chart-area fa-3x text-primary"></i> */}
                        <div class="ms-3">
                            <p class="mb-2">Total Amount Paid</p>
                            {[collegeData].map(
                                (value, index) => {
                                    return <h6 class="mb-0">{value.totalAmountPaid}</h6>
                                })}
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                    <div class="shadow p-3 mb-5 text-dark rounded bg-info-subtle rounded d-flex align-items-stretch justify-content-between p-4" >
                        {/* <i class="fa fa-chart-pie fa-3x text-primary"></i> */}
                        <div class="ms-3">
                            <p class="mb-2">Total Refunds</p>
                            {[collegeData].map(
                                (value, index) => {
                                    return <h6 class="mb-0">{value.totalRefunds}</h6>
                                })}
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-6">
                    <div class="shadow p-3 mb-5 text-dark rounded bg-info-subtle rounded d-flex align-items-stretch justify-content-between p-4" >
                        {/* <i class="fa fa-chart-line fa-3x text-primary"></i> */}
                        <div class="ms-3">
                            <p class="mb-2">Total Amount Refunded</p>
                            {[collegeData].map(
                                (value, index) => {
                                    return <h6 class="mb-0">{value.totalAmountRefunded}</h6>
                                })}
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-6">
                    <div class="shadow p-3 mb-5 text-dark rounded bg-info-subtle rounded d-flex align-items-stretch justify-content-between p-4" >
                        {/* <i class="fa fa-chart-bar fa-3x text-primary"></i> */}
                        <div class="ms-3">
                            <p class="mb-2">Total Materials Added</p>
                            {[collegeData].map(
                                (value, index) => {
                                    return <h6 class="mb-0">{value.totalMaterials}</h6>
                                })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminCountView
