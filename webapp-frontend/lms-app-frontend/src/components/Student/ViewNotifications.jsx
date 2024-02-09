import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../config/config'
import StudNavBar from './StudNavBar';
import { useNavigate } from 'react-router-dom';

const NotificationView = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

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
          if (response.data.status === "Unauthorized User") {
            navigate("/studentLogin")
            sessionStorage.removeItem("studentkey");
            sessionStorage.removeItem("studentId");
            sessionStorage.removeItem("studemail");
            sessionStorage.removeItem("studBatchId");
            sessionStorage.removeItem("studLoginToken");
            sessionStorage.removeItem("subtaskId");
          } else {
            if (!response.data.data) {
              console.log(response.data.status)
            } else {
              alert(response.data.status);
            }
          }
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
    <div>
      <StudNavBar />
      {loading ? (
        <p>Loading...</p>
      ) : notifications.length > 0 ? (
        notifications.map((value, index) => (
          <div key={index} className="my-6"> {/* Reduced margin */}
            <div className="lg:w-2/5 sm:w-3/5 w-11/12 bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto border p-10 shadow-sm">
              <div className="inline-flex items-center justify-between w-full">
                <h3 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-white">Notifications</h3><br /><br />
              </div>
              {/* Apply inline CSS here for the message container */}
              <div className="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full" style={{ maxHeight: '200px', overflowY: 'auto', wordWrap: 'break-word' }}>
                <div className="inline-flex items-center justify-between w-full">
                  <div className="inline-flex items-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/893/893257.png" alt="Messages Icon" className="w-6 h-6 mr-3" />
                    <div>
                      <h3 className="font-bold text-base text-gray-800">{value.title}</h3>
                      <p className="text-xs text-gray-500">Team Link Ur Codes</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {value.formattedDateTime}
                  </p>
                </div>
                <p className="mt-1 text-sm">
                  {value.message}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-10">No Notifications!!!</p>
      )}
    </div>

  );
};

export default NotificationView;