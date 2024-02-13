import React, { useEffect, useState } from 'react'
import '../../config/config'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminUpdateSession = () => {
  const [sessionData, setSessionData] = useState([])
  const [updateField, setUpdateField] = useState(
    {
      "id": sessionStorage.getItem("sessionId"),
      "sessionName": "",
      "date": "",
      "time": "",
      "type": "",
      "remarks": "",
      "venueORlink": "",
      "trainerId": ""
    }
  )
  const apiURL = global.config.urls.api.server + "/api/lms/AdmViewOneSession";
  const apiUrl2 = global.config.urls.api.server + "/api/lms/updateSession";
  const navigate = useNavigate()

  const updateHandler = (event) => {
    setUpdateField({ ...updateField, [event.target.name]: event.target.value })
  }

  const readNewValue = () => {
    console.log(updateField)
    let axiosConfig = {
      headers: {
        'content-type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*",
        "token": sessionStorage.getItem("admtoken"),
        "key": sessionStorage.getItem("admkey")
      }
    }
    let data = {
      "id": sessionStorage.getItem("sessionId"),
      "sessionName": updateField.sessionName,
      "date": updateField.date,
      "time": updateField.time,
      "type": updateField.type,
      "remarks": updateField.remarks,
      "venueORlink": updateField.venueORlink,
      "trainerId": updateField.trainerId
    }
    axios.post(apiUrl2, data, axiosConfig).then(
      (Response) => {
        if (Response.data.status === "Session Details Updated") {
          setUpdateField({
            "id": sessionStorage.getItem("sessionId"),
            "sessionName": "",
            "date": "",
            "time": "",
            "type": "",
            "remarks": "",
            "venueORlink": "",
            "trainerId": ""
          })
          alert("Session Updated Successfully")
          navigate("/adminviewalltrainers")
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
    )
  }

  const getData = () => {
    let data = { "id": sessionStorage.getItem("sessionId") }
    let axiosConfig = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "token": sessionStorage.getItem("admtoken"),
        "key": sessionStorage.getItem("admkey")
      }
    }
    axios.post(apiURL, data, axiosConfig).then(
      (response) => {
        setSessionData(response.data.data)
        setUpdateField(response.data.data[0])
        console.log(response.data.data)
      }
    )
  }
  useEffect(() => {
    // Assuming updateField.date is in a different format, you can format it here
    const formattedDate = formatDate(updateField.date); // You need to implement formatDate function

    // Set the formatted date in the state
    setUpdateField({ ...updateField, date: formattedDate });
  }, [updateField.date]);


  useEffect(() => { getData() }, [])
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 mb-4 mb-sm-5">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h3 className="h2 text-black mb-0">Update Session Details</h3>
          <br></br>
          <div className="card card-style1 --bs-primary-border-subtle border-5">
            <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
              <div className="row align-items-center">
                <div className="col-lg-6 px-xl-10">
                  <ul className="list-unstyled mb-1-9">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label htmlFor="" className="form-label">Id</label>
                      <input type="text" className="form-control" name="id" value={updateField.id} disabled />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label htmlFor="" className="form-label">Session Name</label>
                      <input onChange={updateHandler} type="text" className="form-control" name="sessionName" value={updateField.sessionName} />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label htmlFor="" className="form-label">Date</label>
                      <input onChange={updateHandler} type="date" className="form-control" name="date" value={updateField.date} />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label htmlFor="" className="form-label">Time</label>
                      <input onChange={updateHandler} type="time" className="form-control" name="time" value={updateField.time} />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label htmlFor="" className="form-label">Type</label>
                      <input onChange={updateHandler} type="text" className="form-control" name="type" value={updateField.type} />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label htmlFor="" className="form-label">Remarks</label>
                      <input onChange={updateHandler} type="text" className="form-control" name="remarks" value={updateField.remarks} />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label htmlFor="" className="form-label">Venue/Link</label>
                      <input onChange={updateHandler} type="text" className="form-control" name="venueORlink" value={updateField.venueORlink} />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <label htmlFor="" className="form-label">TrainerId</label>
                      <input onChange={updateHandler} type="text" className="form-control" name="trainerId" value={updateField.trainerId} />
                    </div>
                    <br></br>
                    <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                      <button onClick={readNewValue} className="btn btn-warning">Update</button>
                    </div>
                    <br></br>
                    <div class="mb-3">
                      <a class="btn btn-danger" href="/AdminViewAllSession">Back</a>
                    </div>
                  </ul>

                  <ul className="social-icon-style1 list-unstyled mb-0 ps-0">
                    <li><a href="#!"><i className="ti-twitter-alt" /></a></li>
                    <li><a href="#!"><i className="ti-facebook" /></a></li>
                    <li><a href="#!"><i className="ti-pinterest" /></a></li>
                    <li><a href="#!"><i className="ti-instagram" /></a></li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

// Define a function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Ensure the date is valid
  if (!isNaN(date.getTime())) {
    // Get the year, month, and day
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    // Return the formatted date in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
  } else {
    return ''; // Return an empty string if the date is invalid
  }
};

export default AdminUpdateSession