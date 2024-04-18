import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const CollegeStaffDownloadAttendancePDF = () => {
    const pdfContentRef = useRef(null);
    const [sessionPDFData, setSessionPDFData] = useState([]);
    const navigate = useNavigate();

    const apiUrl = global.config.urls.api.server + "/api/lms/GenerateSessionWiseAttendancePdf"

    const batchName = sessionStorage.getItem("clgstaffattendancepdfbatchName");
    const sessionId = sessionStorage.getItem("clgstaffattendancepdfbatchid");
    const token = sessionStorage.getItem("clgstaffLogintoken");

    const getSessionPDFData = () => {
        const data = {
            "batchId": batchId
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
                setSessionPDFData(response.data.data);
            } else if (response.data.status === "Unauthorized User!!") {
                sessionStorage.clear();
                navigate("/clgStafflogin");
            } else if (!response.data.data) {
                setSessionPDFData([]);
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
            filename: 'batch_wise_attendance_list.pdf',
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
            pdf.save('batch_wise_attendance_list.pdf');
        });
    };


    const groupedData = {};
    sessionPDFData.forEach(student => {
        if (!groupedData[student.sessionName]) {
            groupedData[student.sessionName] = [];
        }
        groupedData[student.sessionName].push(student);
    });

    useEffect(() => { getSessionPDFData() }, []);
    return (
        <div>CollegeStaffDownloadAttendancePDF</div>
    )
}

export default CollegeStaffDownloadAttendancePDF