import React, { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ClgStaffNavbar from './ClgStaffNavbar';

const CollegeStaffDownloadBatchWiseStudentList = () => {
    const pdfContentRef = useRef(null);
    const [batchPDFData, setBatchPDFData] = useState([]);
    const navigate = useNavigate();

    const apiUrl = global.config.urls.api.server + "/api/lms/generatePdf";

    const collegeId = sessionStorage.getItem("clgStaffCollegeId");
    const token = sessionStorage.getItem("clgstaffLogintoken");

    const getBatchPDFData = () => {
        const data = {
            "collegeId": collegeId
        };
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
                console.log(response.data.data);
                setBatchPDFData(response.data.data);
            } else if (response.data.status === "Unauthorized User!!") {
                sessionStorage.clear();
                navigate("/clgStafflogin");
            } else if (!response.data.data) {
                setBatchPDFData([]);
                alert("No Data Available !!!");
            } else {
                alert(response.data.status);
            }
        });
    };

    const generatePDF = async () => {
        const element = pdfContentRef.current;

        // Fetch image data asynchronously
        const imageUrl = '/logo.png';
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
            margin: 0.4,
            filename: 'batch_wise_students_list.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true }, // Add useCORS: true option here
            jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
        };

        // Generate PDF with content
        html2pdf().set(opt).from(element).toPdf().get('pdf').then(function (pdf) {
            pdf.addImage(imageData, 'JPEG', 10, 10, 50, 50); // Add the image at specified coordinates

            // Add Generated on information
            const generatedDate = new Date();
            const generatedOnText = 'Generated on: ' + generatedDate.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Kolkata' }) + ' ' + generatedDate.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
            const fontSize = 10; // Font size
            const textWidth = pdf.getStringUnitWidth(generatedOnText) * fontSize / pdf.internal.scaleFactor;
            const textHeight = pdf.internal.getLineHeight() / pdf.internal.scaleFactor;
            const pageSize = pdf.internal.pageSize;
            const textX = (pageSize.width - textWidth) / 2;
            const textY = pageSize.height - textHeight - 10;

            // Calculate content height
            const contentHeight = element.clientHeight / pdf.internal.scaleFactor;

            // Set the position of the "Generated on" information
            const positionY = Math.max(contentHeight, textY);

            // Set font size
            pdf.setFontSize(fontSize);

            pdf.text(generatedOnText, textX, positionY);

            // Save PDF with specified filename
            pdf.save('batch_wise_students_list.pdf');
        });
    };






    const groupedData = {};
    batchPDFData.forEach(student => {
        if (!groupedData[student.batchName]) {
            groupedData[student.batchName] = [];
        }
        groupedData[student.batchName].push(student);
    });

    useEffect(() => { getBatchPDFData() }, []);

    return (
        <div>
            <ClgStaffNavbar />
            <div className="bg-light py-3 py-md-5">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
                            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                                <div className="row gy-3 gy-md-4 overflow-hidden">
                                    <div className="flex justify-between items-center mx-4 my-4">
                                        <div className="flex space-x-4">
                                            <button onClick={() => navigate(-1)} className="btn bg-gray-500 text-white px-4 py-2 rounded-md">Back</button>
                                        </div>
                                        <strong style={{ textAlign: "center", fontSize: "24px" }}>Download Preview Of Batch-Wise Student List</strong>
                                        <div>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{marginRight: "30px"}} onClick={generatePDF}>Download PDF</button>
                                        </div>
                                    </div>
                                    <div></div><div></div>
                                    <div ref={pdfContentRef}>
                                        <img width="200px" src='/logo.png' alt="" />
                                        <p style={{ textAlign: "center", fontSize: "24px", fontWeight: 'bold', marginBottom: '10px', textDecoration: "underline" }}>Batch-Wise List Of Students</p>
                                        <br />
                                        {Object.keys(groupedData).map(batchName => (
                                            <div key={batchName}>
                                                <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold", marginBottom: '10px', textDecoration: "underline" }}>{batchName}</p>
                                                <br />
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
                                                        {groupedData[batchName].map((student, index) => (
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
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegeStaffDownloadBatchWiseStudentList;
