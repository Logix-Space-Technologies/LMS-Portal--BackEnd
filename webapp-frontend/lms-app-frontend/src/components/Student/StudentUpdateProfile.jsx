import React from 'react'

const StudentUpdateProfile = () => {

    const [updateFields, setUpdateFields] = useState({
        collegeId: "",
        batchId: "",
        studName: "",
        admNo: "",
        rollNo: "",
        studDept: "",
        course: "",
        studPhNo: "",
        aadharNo: ""
    });

    const apiUrl = global.config.urls.api.server + "/api/lms/studentUpdateProfile";

    const getData = () => {
    };

    const inputHandler = (event) => {
        setUpdateFields({ ...updateFields, [event.target.name]: event.target.value });
    };

    const updateProfile = () => {
        let axiosConfig = {
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "token": sessionStorage.getItem("studLoginToken"),
                "key": sessionStorage.getItem("studKey")
            }
        };

        axios.post(apiUrl, updateFields, axiosConfig).then(
            (response) => {
                if (response.data.status === "success") {
                    alert("Profile updated successfully");
                    getData();
                } else {
                    alert(response.data.status);
                }
            }
        ).catch((error) => {
            console.error("Error updating profile:", error);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container">
            <div class="row">
                <div class="col-12">
                  <div class="text-center mb-5">
                    <a href="/">
                      <center><img src="https://www.linkurcodes.com/images/logo.png" alt="" width="175" height="57" /></center>
                    </a><br /><br />
                    <h5>Student Update Profile</h5>
                  </div>
                </div>
              </div>
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col col-12 col-sm-8 col-md-12 col-lg-8">
                    <form>
                        <div className="mb-3 text-start">
                            <label htmlFor="collegeId" className="form-label">College ID</label>
                            <input
                                type="text"
                                name="collegeId"
                                value={updateFields.collegeId}
                                onChange={inputHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="batchId" className="form-label">Batch ID</label>
                            <input
                                type="text"
                                name="batchId"
                                value={updateFields.batchId}
                                onChange={inputHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="studName" className="form-label">Student Name</label>
                            <input
                                type="text"
                                name="studName"
                                value={updateFields.studName}
                                onChange={inputHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="admNo" className="form-label">Admission No:</label>
                            <input
                                type="text"
                                name="admNo"
                                value={updateFields.admNo}
                                onChange={inputHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="rollNo" className="form-label">Roll No:</label>
                            <input
                                type="text"
                                name="rollNo"
                                value={updateFields.rollNo}
                                onChange={inputHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="studDept" className="form-label">Department</label>
                            <input
                                type="text"
                                name="studDept"
                                value={updateFields.studDept}
                                onChange={inputHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="course" className="form-label">Course</label>
                            <input
                                type="text"
                                name="course"
                                value={updateFields.course}
                                onChange={inputHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="studPhNo" className="form-label">Phone No:</label>
                            <input
                                type="text"
                                name="studPhNo"
                                value={updateFields.studPhNo}
                                onChange={inputHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="aadharNo" className="form-label">Aadhar No:</label>
                            <input
                                type="text"
                                name="aadharNo"
                                value={updateFields.aadharNo}
                                onChange={inputHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <button type="button" onClick={updateProfile} className="btn btn-primary btn-lg">Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default StudentUpdateProfile;
