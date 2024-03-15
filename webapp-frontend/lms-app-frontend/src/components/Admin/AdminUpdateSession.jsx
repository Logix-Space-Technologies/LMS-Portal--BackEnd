import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../config/config';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';
import Navbar from './Navbar';

const AdminUpdateSession = () => {

  const [sessionData, setSessionData] = useState([]);
  const [trainers, setTrainers] = useState([])
  const [updateField, setUpdateField] = useState({
    "id": sessionStorage.getItem('sessionId'),
    "sessionName": '',
    "date": '',
    "time": '',
    "type": '',
    "remarks": '',
    "venueORlink": '',
    "trainerId": '',
  });
  const apiURL = global.config.urls.api.server + '/api/lms/AdmViewOneSession';
  const apiUrl2 = global.config.urls.api.server + '/api/lms/updateSession';
  const trainerUrl = global.config.urls.api.server + "/api/lms/viewAllTrainer";
  const navigate = useNavigate();
  const [key, setKey] = useState('')

  const updateHandler = (event) => {
    setUpdateField({ ...updateField, [event.target.name]: event.target.value })
  }

  const getTrainer = () => {
    let currentKey = sessionStorage.getItem("admkey");
    let token = sessionStorage.getItem("admtoken");
    if (currentKey !== 'lmsapp') {
      currentKey = sessionStorage.getItem("admstaffkey");
      token = sessionStorage.getItem("admstaffLogintoken");
      setKey(currentKey); // Update the state if needed
    }
    let axiosConfig = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        "token": token,
        "key": currentKey
      }
    };
    axios.post(trainerUrl, {}, axiosConfig).then(
      (response) => {
        if (response.data.Trainers) {
          setTrainers(response.data.Trainers)
        } else {
          if (response.data.status === "Unauthorized access!!") {
            { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
            sessionStorage.clear()
          } else {
            if (!response.data.Trainers) {
              setTrainers([])
            } else {
              alert(response.data.status)
            }
          }
        }
      }
    )
  }

  const readNewValue = () => {
    let currentKey = sessionStorage.getItem("admkey");
    let token = sessionStorage.getItem("admtoken");
    if (currentKey !== 'lmsapp') {
      currentKey = sessionStorage.getItem("admstaffkey");
      token = sessionStorage.getItem("admstaffLogintoken");
      setKey(currentKey); // Update the state if needed
    }
    let axiosConfig = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        "token": token,
        "key": currentKey,
      }
    }
    let data = {
      "id": sessionStorage.getItem('sessionId'),
      "sessionName": updateField.sessionName,
      "date": updateField.date,
      "time": updateField.time,
      "type": updateField.type,
      "remarks": updateField.remarks,
      "venueORlink": updateField.venueORlink,
      "trainerId": updateField.trainerId,
    }
    axios.post(apiUrl2, data, axiosConfig).then((Response) => {
      if (Response.data.status === 'success') {
        setUpdateField({
          "id": sessionStorage.getItem('sessionId'),
          "sessionName": '',
          "date": '',
          "time": '',
          "type": '',
          "remarks": '',
          "venueORlink": '',
          "trainerId": '',
        });
        alert('Session Updated Successfully');
        navigate(-1);
      } else {
        if (Response.data.status === "Validation failed" && Response.data.data.sessionName) {
          alert(Response.data.data.sessionName)
        } else {
          if (Response.data.status === "Validation failed" && Response.data.data.date) {
            alert(Response.data.data.date)
          } else {
            if (Response.data.status === "Validation failed" && Response.data.data.time) {
              alert(Response.data.data.time)
            } else {
              if (Response.data.status === "Validation failed" && Response.data.data.type) {
                alert(Response.data.data.type)
              } else {
                if (Response.data.status === "Validation failed" && Response.data.data.remarks) {
                  alert(Response.data.data.remarks)
                } else {
                  if (Response.data.status === "Validation failed" && Response.data.data.venueORlink) {
                    alert(Response.data.data.venueORlink)
                  } else {
                    if (Response.data.status === "Validation failed" && Response.data.data.trainerId) {
                      alert(Response.data.data.trainerId)
                    } else {
                      if (Response.data.status === "Unauthorized User!!") {
                        { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
                        sessionStorage.clear()
                      } else {
                        alert(Response.data.status)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  };

  const getData = () => {
    let currentKey = sessionStorage.getItem("admkey");
    let token = sessionStorage.getItem("admtoken");
    if (currentKey !== 'lmsapp') {
      currentKey = sessionStorage.getItem("admstaffkey");
      token = sessionStorage.getItem("admstaffLogintoken");
      setKey(currentKey); // Update the state if needed
    }
    let data = { "id": sessionStorage.getItem('sessionId') };
    let axiosConfig = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        "token": token,
        "key": currentKey,
      }
    }
    axios.post(apiURL, data, axiosConfig).then((response) => {
      if (response.data.data) {
        setSessionData(response.data.data);
        setUpdateField(response.data.data[0]);
      } else {
        if (response.data.status === "Unauthorized access!!") {
          { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
          sessionStorage.clear()
        } else {
          if (!response.data.data) {
            setSessionData([]);
            setUpdateField({
              "id": "",
              "sessionName": '',
              "date": '',
              "time": '',
              "type": '',
              "remarks": '',
              "venueORlink": '',
              "trainerId": '',
            });
          } else {
            alert(response.data.status)
          }
        }
      }
    });
  };

  useEffect(() => {
    const formattedDate = formatDate(updateField.date);
    setUpdateField({ ...updateField, date: formattedDate });
  }, [updateField.date]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getTrainer()
  }, [])

  // Update key state when component mounts
  useEffect(() => {
    setKey(sessionStorage.getItem("admkey") || '');
  }, []);

  return (
    <div className="container">
      {key === 'lmsapp' ? <Navbar /> : <AdmStaffNavBar />}
      <div className="row">
        <div className="col-lg-12 mb-4 mb-sm-5">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h3 className="h2 text-black mb-0">Reschedule Session</h3>
          <br></br>
          <div className="card card-style1 --bs-primary-border-subtle border-5">
            <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
              <div className="row align-items-center">
                <div className="col-lg-6 px-xl-10">
                  <ul className="list-unstyled mb-1-9">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      {/* <label htmlFor="" className="form-label">
                        Id
                      </label> */}
                      <input
                        type="hidden"
                        className="form-control"
                        name="id"
                        value={updateField.id}
                        disabled
                      />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label htmlFor="" className="form-label">
                        Session Name
                      </label>
                      <input
                        onChange={updateHandler}
                        type="text"
                        className="form-control"
                        name="sessionName"
                        value={updateField.sessionName}
                      />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label htmlFor="" className="form-label">
                        Date
                      </label>
                      <input
                        onChange={updateHandler}
                        type="date"
                        className="form-control"
                        name="date"
                        value={updateField.date}
                      />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label htmlFor="" className="form-label">
                        Time
                      </label>
                      <input
                        onChange={updateHandler}
                        type="time"
                        className="form-control"
                        name="time"
                        value={updateField.time}
                      />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label htmlFor="" className="form-label">
                        Type
                      </label>
                      <input
                        onChange={updateHandler}
                        type="text"
                        className="form-control"
                        name="type"
                        value={updateField.type}
                      />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label htmlFor="" className="form-label">
                        Remarks
                      </label>
                      <input
                        onChange={updateHandler}
                        type="text"
                        className="form-control"
                        name="remarks"
                        value={updateField.remarks}
                      />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label htmlFor="" className="form-label">
                        Venue/Link
                      </label>
                      <input
                        onChange={updateHandler}
                        type="text"
                        className="form-control"
                        name="venueORlink"
                        value={updateField.venueORlink}
                      />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label htmlFor="" className="form-label">
                        Trainer Name
                      </label>
                      <select
                        name="trainerId"
                        value={updateField.trainerId}
                        onChange={updateHandler}
                        id="trainerId"
                        className="form-control"
                      >
                        <option value="">Select</option>
                        {trainers.map((trainer) => {
                          return <option key={trainer.id} value={trainer.id}>
                            {trainer.trainerName}
                          </option>
                        })}
                      </select>
                    </div>
                    <br></br>
                    <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                      <button onClick={readNewValue} className="btn btn-warning">
                        Update
                      </button>
                    </div>
                    <br></br>
                    <div class="mb-3">
                      <button onClick={() => navigate(-1)} className="btn bg-red-500 text-white px-4 py-2 rounded-md">Back</button>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  } else {
    return '';
  }
};

export default AdminUpdateSession;
