import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../config/config'

const NotificationView = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    const apiUrl = global.config.urls.api.server + "/api/lms/studentNofificationView";
    const studentId = sessionStorage.getItem("studentId");
    const token = sessionStorage.getItem("studLoginToken");

    let axiosConfig = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "token": token,
        "key": sessionStorage.getItem("studentkey")
      }
    };

    axios.post(apiUrl, { studId: studentId }, axiosConfig)
      .then(response => {
        if (response.data.status === 'success') {
          setNotifications(response.data.data);
        } else {
          console.log(response.data.status);
        }
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 col-xxl-8">
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
              <div className="row gy-3 gy-md-4 overflow-hidden">
                <div className="col-12">
                  <h3>Notifications</h3>
                </div>
                {loading ? (
                  <div className="col-12 text-center">Loading...</div>
                ) : (
                  notifications.length === 0 ? (
                    <div className="col-12 text-center">No notifications found!</div>
                  ) : (
                    notifications.map((notification, index) => (
                      <div key={index} className="col-12">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{notification.title}</h5>
                            <p className="card-text">{notification.message}</p>
                            <p className="card-text">Sent by: {notification.sendBy}</p>
                            <p className="card-text">Sent on: {notification.addedDate}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationView;