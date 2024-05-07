import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../config/config';
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar';
import Navbar from './Navbar';

const AdminUpdateSession = () => {

  const [sessionData, setSessionData] = useState([]);
  const [trainers, setTrainers] = useState([])
  const [errors, setErrors] = useState({})
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

  const [showWaitingModal, setShowWaitingModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false); // New state for overlay

  const updateHandler = (event) => {
    setErrors({})
    setUpdateField({ ...updateField, [event.target.name]: event.target.value })
  }

  const closeWaitingModal = () => {
    setShowOverlay(false)
    setShowWaitingModal(false)
  }

  const getTrainer = () => {
    // Retrieve key and token from sessionStorage without providing the key
    let currentKey, token;
    Object.entries(sessionStorage).forEach(([key, value]) => {
      if (key.includes('key')) {
        currentKey = value;
      } else if (key.includes('token')) {
        token = value;
      }
    });

    // Update the state with the current key
    setKey(currentKey);
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
    // Retrieve key and token from sessionStorage without providing the key
    let currentKey, token;
    Object.entries(sessionStorage).forEach(([key, value]) => {
      if (key.includes('key')) {
        currentKey = value;
      } else if (key.includes('token')) {
        token = value;
      }
    });

    // Update the state with the current key
    setKey(currentKey);
    let updatedBy;
    if (currentKey === 'lmsapp') {
      updatedBy = 0
    } else {
      updatedBy = sessionStorage.getItem("admstaffId")
    }
    const validationErrors = validateForm(updateField);
    if (Object.keys(validationErrors).length === 0) {
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
        "remarks": updateField.remarks ? updateField.remarks : null,
        "venueORlink": updateField.venueORlink,
        "trainerId": updateField.trainerId,
        "updatedby": updatedBy
      }
      setShowWaitingModal(true)
      setShowOverlay(true)
      axios.post(apiUrl2, data, axiosConfig).then((Response) => {
        if (Response.data.status === 'success') {
          closeWaitingModal()
          setTimeout(() => {
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
          }, 500)
        } else if (Response.data.status === "Validation failed" && Response.data.data.sessionName) {
          closeWaitingModal()
          setTimeout(() => { alert(Response.data.data.sessionName) }, 500)
        } else if (Response.data.status === "Validation failed" && Response.data.data.date) {
          closeWaitingModal()
          setTimeout(() => { alert(Response.data.data.date) }, 500)
        } else if (Response.data.status === "Validation failed" && Response.data.data.time) {
          closeWaitingModal()
          setTimeout(() => { alert(Response.data.data.time) }, 500)
        } else if (Response.data.status === "Validation failed" && Response.data.data.type) {
          closeWaitingModal()
          setTimeout(() => { alert(Response.data.data.type) }, 500)
        } else if (Response.data.status === "Validation failed" && Response.data.data.remarks) {
          closeWaitingModal()
          setTimeout(() => { alert(Response.data.data.remarks) }, 500)
        } else if (Response.data.status === "Validation failed" && Response.data.data.venueORlink) {
          closeWaitingModal()
          setTimeout(() => { alert(Response.data.data.venueORlink) }, 500)
        } else if (Response.data.status === "Validation failed" && Response.data.data.trainerId) {
          closeWaitingModal()
          setTimeout(() => { alert(Response.data.data.trainerId) }, 500)
        } else if (Response.data.status === "Unauthorized User!!") {
          { key === 'lmsapp' ? navigate("/") : navigate("/admstafflogin") }
          sessionStorage.clear()
        } else {
          closeWaitingModal()
          setTimeout(() => {
            alert(Response.data.status)
          }, 500)
        }

      });
    } else {
      setErrors(validationErrors)
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.sessionName.trim()) {
      errors.sessionName = 'Session name is required';
    }
    if (!data.date.trim()) {
      errors.date = 'Date is required';
    }
    if (!data.venueORlink.trim()) {
      errors.venueORlink = 'Venue or Link is required';
    }
    if (!data.trainerId) {
      errors.trainerId = 'Trainer Name is required';
    }
    if (!data.time.trim()) {
      errors.time = 'Time is required';
    }
    if (!data.type.trim()) {
      errors.type = 'Type is required';
    } else if (data.type === "Online") {
      // If type is Online, ensure there's a link and it's either Google Meet or Zoom
      if (!data.venueORlink.trim()) {
        errors.venueORlink = 'Meeting Link is required';
      } else {
        const isGoogleMeetLink = data.venueORlink.includes('meet.google.com/');
        const isZoomLink = data.venueORlink.includes('zoom.us/');
        const isTeamsLink = data.venueORlink.includes('teams.microsoft.com/');

        // Check if the link is not a Google Meet or Zoom link
        if (!isGoogleMeetLink && !isZoomLink && !isTeamsLink) {
          errors.venueORlink = 'Please provide a valid google meet, zoom or teams link';
        }
      }
    } else if (data.type === "Recorded") {
      if (!data.venueORlink.trim()) {
        errors.venueORlink = 'Recorded Video Link is required';
      } else {
        const isYouTubeLink = data.venueORlink.includes('youtube.com/');
        const isVimeoLink = data.venueORlink.includes('vimeo.com/');

        if (!isYouTubeLink && !isVimeoLink) {
          errors.venueORlink = 'Please provide a valid link';
        }
      }
    } else if (data.type === "Offline" && !data.venueORlink.trim()) {
      errors.venueORlink = 'Please provide a valid venue';
    }

    return errors;
  }

  const getData = () => {
    // Retrieve key and token from sessionStorage without providing the key
    let currentKey, token;
    Object.entries(sessionStorage).forEach(([key, value]) => {
      if (key.includes('key')) {
        currentKey = value;
      } else if (key.includes('token')) {
        token = value;
      }
    });

    // Update the state with the current key
    setKey(currentKey);
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

  return (
    <div>
      {key === 'lmsappadmstaff' ? <AdmStaffNavBar /> : <Navbar />}
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-4 mb-sm-5">
            <br></br>
            <div className="flex justify-between items-center mx-4 my-4">
              <button onClick={() => navigate(-1)} className="btn bg-gray-500 text-white px-4 py-2 rounded-md">Back</button>

              <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Reschedule Session</p>

              <div></div>
            </div>
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
                        {errors.sessionName && (<span style={{ color: 'red' }} className="error">{errors.sessionName}</span>)}
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
                        {errors.date && (<span style={{ color: 'red' }} className="error">{errors.date}</span>)}
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
                        {errors.time && (<span style={{ color: 'red' }} className="error">{errors.time}</span>)}
                      </div>
                      <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <label htmlFor="" className="form-label">
                          Type
                        </label>
                        <select
                          className="form-select"
                          name="type"
                          id="type"
                          value={updateField.type}
                          onChange={updateHandler}
                        >
                          <option value="">Select Type</option>
                          <option value="Online">Online</option>
                          <option value="Offline">Offline</option>
                          <option value="Recorded">Recorded</option>
                        </select>
                        {errors.type && (<span style={{ color: 'red' }} className="error">{errors.type}</span>)}
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
                        {errors.remarks && (<span style={{ color: 'red' }} className="error">{errors.remarks}</span>)}
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
                        {errors.venueORlink && (<span style={{ color: 'red' }} className="error">{errors.venueORlink}</span>)}
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
                        {errors.trainerId && (<span style={{ color: 'red' }} className="error">{errors.trainerId}</span>)}
                      </div>
                      <br></br>
                      <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                        <button onClick={readNewValue} className="btn btn-warning">
                          Update
                        </button>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showWaitingModal && (
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
                </div>
                <div className="modal-body">
                  <>
                    <div className="mb-3">
                      <p>Processing Request. Do Not Refresh.</p>
                    </div>
                  </>
                </div>
                <div className="modal-footer">
                </div>
              </div>
            </div>
          </div>
        )}
        {showOverlay && (
          <div
            className="modal-backdrop fade show"
            onClick={() => {
              setShowWaitingModal(false);
              setShowOverlay(false);
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1040, // Ensure this is below your modal's z-index
            }}
          ></div>
        )}
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
