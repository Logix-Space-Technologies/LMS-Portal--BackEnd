import React, { useEffect, useRef, useState } from 'react'
import html2pdf from 'html2pdf.js'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CollegeStaffDownloadBatchWiseStudentList = () => {
    const pdfContentRef = useRef(null);
    const [batchPDFData, setBatchPDFData] = useState([])
    const navigate = useNavigate()

    const apiUrl = global.config.urls.api.server + "/api/lms/generatePdf";

    const collegeId = sessionStorage.getItem("clgStaffCollegeId");
    const token = sessionStorage.getItem("clgstaffLogintoken");

    const getBatchPDFData = () => {
        const data = {
            "collegeId": collegeId
        }
        let axiosConfig2 = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": token,
                "key": sessionStorage.getItem("clgstaffkey")
            }
        };

        axios.post(apiUrl, data, axiosConfig2).then((response) => {
            if (response.data.data) {
                console.log(response.data.data)
                setBatchPDFData(response.data.data)
            } else if (response.data.status === "Unauthorized User!!") {
                sessionStorage.clear()
                navigate("/clgStafflogin")
            } else if (!response.data.data) {
                setBatchPDFData([])
                alert("No Data Available !!!")
            } else {
                alert(response.data.status)
            }
        })

    }

    const generatePDF = async () => {
        const element = pdfContentRef.current;

        // Fetch image data asynchronously
        const imageUrl = "https://linkurcodes.com/images/logo.png";
        const imageData = await fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }));

        // Ensure imageData is available
        if (!imageData) {
            console.error("Image data is not available");
            return;
        }

        // Options for PDF generation
        const opt = {
            margin: 1,
            filename: 'batch_wise_students_list.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true }, // Add useCORS: true option here
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Generate PDF with content
        html2pdf().set(opt).from(element).toPdf().get('pdf').then(function (pdf) {
            pdf.addImage(imageData, 'JPEG', 10, 10, 50, 50); // Add the image at specified coordinates
            pdf.save();
        });
    };

    useEffect(() => { getBatchPDFData() }, [])

    return (
        <div>
            <div className="bg-light py-3 py-md-5">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
                            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                                <div className="row gy-3 gy-md-4 overflow-hidden">
                                    <div className="flex justify-between items-center mt-8 ml-4 mb-4">
                                        <h2 className="text-lg font-bold">College Staff View Students Batch Wise List</h2>
                                        <div className="flex space-x-4">
                                            <Link to="/collegeStaffViewBatch" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginRight: '20px' }}>Back</Link>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePDF}>Download PDF</button>
                                        </div>
                                    </div>
                                    <div ref={pdfContentRef}>
                                        <img src="https://linkurcodes.com/images/logo.png" alt="" />
                                        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ border: '1px solid black', padding: '8px' }}>Membership No</th>
                                                    <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                                                    <th style={{ border: '1px solid black', padding: '8px' }}>Roll No</th>
                                                    <th style={{ border: '1px solid black', padding: '8px' }}>Department</th>
                                                    <th style={{ border: '1px solid black', padding: '8px' }}>Course</th>
                                                    <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {batchPDFData.map((student, index) => (
                                                    <tr key={index}>
                                                        <td style={{ border: '1px solid black', padding: '8px' }}>{student.membership_no}</td>
                                                        <td style={{ border: '1px solid black', padding: '8px' }}>{student.studName}</td>
                                                        <td style={{ border: '1px solid black', padding: '8px' }}>{student.rollNo}</td>
                                                        <td style={{ border: '1px solid black', padding: '8px' }}>{student.studDept}</td>
                                                        <td style={{ border: '1px solid black', padding: '8px' }}>{student.course}</td>
                                                        <td style={{ border: '1px solid black', padding: '8px' }}>{student.studEmail}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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

export default CollegeStaffDownloadBatchWiseStudentList