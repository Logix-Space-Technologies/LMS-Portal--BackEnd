import axios from 'axios';
import React, { useState } from 'react';
import '../../config/config'
import { Link, useNavigate } from 'react-router-dom';

const StudentLogin = () => {
    const [inputField, setInputField] = useState({
        studEmail: "",
        password: "",
        type: 'web'
    });

    const [errors, setErrors] = useState({});

    const apiUrl = global.config.urls.api.server + "/api/lms/studentLogin"
    const navigate = useNavigate()

    const inputHandler = (event) => {
        setInputField((prevInputField) => ({
            ...prevInputField,
            [event.target.name]: event.target.value
        }));
    };


    const readValue = () => {
        let newErrors = {};
        if (!inputField.studEmail.trim()) {
            newErrors.studEmail = "Email is required!";
        }
        if (!inputField.password.trim()) {
            newErrors.password = "Password is required!";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        console.log(inputField)
        axios.post(apiUrl, inputField).then(
            (Response) => {
                if (Response.data.status === "Success") {
                    let studtoken = Response.data.token;
                    let studId = Response.data.data.id;
                    let studemail = Response.data.data.studEmail;
                    let batchId = Response.data.data.batchId;
                    let key = "lmsappstud"
                    sessionStorage.setItem("studentkey", key);
                    sessionStorage.setItem("studentId", studId);
                    sessionStorage.setItem("studemail", studemail);
                    sessionStorage.setItem("studBatchId", batchId);
                    sessionStorage.setItem("studLoginToken", studtoken);

                    navigate("/studdashboard")


                } else {
                    if (Response.data.status === "Validation failed" && Response.data.data.email) {
                        alert(Response.data.data.email)
                    } else {
                        if (Response.data.status === "Validation failed" && Response.data.data.password) {
                            alert(Response.data.data.password)
                        } else {
                            if (Response.data.status === "Student does not Exist.") {
                                alert(Response.data.status)
                            } else {
                                alert(Response.data.status)
                            }
                        }

                    }
                }
            }
        );
    };

    return (
        <div className="dark:text-slate-400 c3jt4 c6w4h c6vqo c0ndv csf1w">

            <main className="bg-white c3jt4">
                <div className="flex c4ijw">
                    {/* Content */}
                    <div className="c52db c3ff8">
                        <div className="flex cbz56 cfwm1 chmlm crszu">
                            {/* Header */}
                            <div className="cy6kd">
                                <div className="flex items-center cmgwo clpyc cj3hv ciqso c9r0z">
                                    {/* Logo */}
                                    <Link className="block" to="index.html">
                                        <img width={150} height={100} src="https://www.linkurcodes.com/images/logo.png" alt />
                                    </Link>
                                </div>
                            </div>
                            <div className="ciiqv cofxq c3ff8 c9r0z c0ycj">
                                <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold crkc7"> Student Portal</h1>
                                {/* Form */}
                                <>
                                    <div className="cxebx">
                                        <div>
                                            <label className="block text-sm cw92y ci4cg" htmlFor="email">Email Address</label>
                                            <input id="studEmail" name="studEmail" className="c03gb c3ff8" value={inputField.studEmail} onChange={inputHandler} type="email" />
                                            {errors.studEmail && <span style={{ color: 'red' }} className="error">{errors.studEmail}</span>}
                                        </div>
                                        <div>
                                            <label className="block text-sm cw92y ci4cg" htmlFor="password">Password</label>
                                            <input id="password" name="password" className="c03gb c3ff8" type="password" value={inputField.password} onChange={inputHandler} autoComplete="on" />
                                            {errors.password && <span style={{ color: 'red' }} className="error">{errors.password}</span>}
                                        </div>
                                    </div>
                                    <div className="flex items-center cmgwo cro1p">
                                        <div className="mr-1">
                                            <Link className="text-sm ck3o7 cn69j" to="#">Forgot Password?</Link>
                                        </div>
                                        <button className="btn ml-3 cfeqx cf1ce ceqwg" onClick={readValue}>Sign In</button>
                                    </div>
                                </>
                                {/* Footer */}
                                <div className="border-slate-200 dark:border-slate-700 c87xd cro1p cc5dk">
                                    <div className="text-sm">
                                        Don’t you have an account? <Link className="text-indigo-500 cuv1l cdi3j cw92y" to="/studentregistration">Sign Up</Link>
                                    </div>
                                    <div className="text-sm">
                                        Are you the Batch Co-ordinator? <Link className="text-indigo-500 cuv1l cdi3j cw92y" to="#">Click Here</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Image */}
                    <div className="hidden c52db c108j csmh2 csp9v cke32 cvqv9" aria-hidden="true">
                        {/* Image Carousel */}
                        {/* <div class="hidden carousel c52db c108j csmh2 csp9v cke32 cvqv9" aria-hidden="true">
                  <div class="carousel-slide" style="background-image: url('./portrait-hacker.jpg');"></div>
                  <div class="carousel-slide" style="background-image: url('./portrait-hacker.jpg');"></div>
                  <div class="carousel-slide" style="background-image: url('./portrait-hacker.jpg');"></div>
              </div> */}
                        <img className="cq1k0 cbq5m crszu c3ff8" src="https://media.istockphoto.com/id/1310896133/photo/happy-smiling-afro-businessman-using-laptop-at-the-desk-in-office.jpg?s=612x612&w=0&k=20&c=QUQpwqaaPswBIJB6_lk5xU6HY_RevWNSwcqAErPZsOc=" width={760} height={1024} alt />
                    </div>
                </div>
            </main>
        </div>

    );
};

export default StudentLogin;