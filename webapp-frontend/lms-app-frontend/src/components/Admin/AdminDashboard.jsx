import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export const AdminDashboard = () => {
  
  const [adminData, setAdminData]= useState(
    []
  ) 

  
  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      {/* Spinner Start */}
      {/* <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div> */}
      {/* Spinner End */}
      {/* Sidebar Start */}
      <div className="sidebar pe-4 pb-3">
        <nav className="navbar bg-light navbar-light">
          <a href="/admdashboard" className="navbar-brand mx-4 mb-3">
            <img src="https://www.linkurcodes.com/images/logo.png" alt="" height="50px" width="180px" />
          </a>
          {/* <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img className="rounded-circle" src="img/user.jpg" alt style={{ width: 40, height: 40 }} />
              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
            </div>
            <div className="ms-3">
              <h6 className="mb-0">Jhon Doe</h6>
              <span>Admin</span>
            </div>
          </div> */}
          <div className="navbar-nav w-100">
            <a href="/admdashboard" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2" />Dashboard</a>
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2" />Features</a>
              <div className="dropdown-menu bg-transparent border-0">
                <a href="#" className="dropdown-item">Add Admin Staff</a>
                <a href="#" className="dropdown-item">View All Admin Staff</a>
                <a href="#" className="dropdown-item">Search Admin Staff</a>
                <a href="#" className="dropdown-item">Update Admin Staff</a>
                <a href="#" className="dropdown-item">Delete Admin Staff</a>
                <a href="#" className="dropdown-item">Add College</a>
                <a href="#" className="dropdown-item">View College</a>
                <a href="#" className="dropdown-item">Search College</a>
                <a href="#" className="dropdown-item">Update College</a>
                <a href="#" className="dropdown-item">Delete College</a>
                <a href="#" className="dropdown-item">Add College Staff</a>
                <a href="#" className="dropdown-item">View College Staff</a>
                <a href="#" className="dropdown-item">Search College Staff</a>
                <a href="#" className="dropdown-item">Update College Staff</a>
                <a href="#" className="dropdown-item">Delete College Staff</a>
                <a href="#" className="dropdown-item">Add Batch</a>
                <a href="#" className="dropdown-item">View Batch</a>
                <a href="#" className="dropdown-item">Search Batch</a>
                <a href="#" className="dropdown-item">Update Batch</a>
                <a href="#" className="dropdown-item">Delete Batch</a>
                <a href="#" className="dropdown-item">Add Task</a>
                <a href="#" className="dropdown-item">View Task</a>
                <a href="#" className="dropdown-item">Search Task</a>
                <a href="#" className="dropdown-item">Update Task</a>
                <a href="#" className="dropdown-item">Delete Task</a>
                <a href="#" className="dropdown-item">View All Student</a>
                <a href="#" className="dropdown-item">Search Student</a>
                <a href="#" className="dropdown-item">View All Refund Request</a>
                <a href="#" className="dropdown-item">View Succesfull Refund</a>

              </div>
            </div>
            {/* <a href="widget.html" className="nav-item nav-link"><i className="fa fa-th me-2" />Widgets</a>
            <a href="form.html" className="nav-item nav-link"><i className="fa fa-keyboard me-2" />Forms</a>
            <a href="table.html" className="nav-item nav-link"><i className="fa fa-table me-2" />Tables</a>
            <a href="chart.html" className="nav-item nav-link"><i className="fa fa-chart-bar me-2" />Charts</a> */}
            {/* <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="far fa-file-alt me-2" />Pages</a>
              <div className="dropdown-menu bg-transparent border-0">
                <a href="signin.html" className="dropdown-item">Sign In</a>
                <a href="signup.html" className="dropdown-item">Sign Up</a>
                <a href="404.html" className="dropdown-item">404 Error</a>
                <a href="blank.html" className="dropdown-item">Blank Page</a>
              </div>
            </div> */}
          </div>
        </nav>
      </div>
      {/* Sidebar End */}
      {/* Content Start */}
      <div className="content">
        {/* Navbar Start */}
        <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
          <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
            <h2 className="text-primary mb-0"><i className="fa fa-hashtag" /></h2>
          </a>
          {/* <a href="#" className="sidebar-toggler flex-shrink-0">
            <i className="fa fa-bars" />
          </a>
          <form className="d-none d-md-flex ms-4">
            <input className="form-control border-0" type="search" placeholder="Search" />
          </form> */}
          <div className="navbar-nav align-items-center ms-auto">
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                <i className="fa fa-envelope me-lg-2" />
                <span className="d-none d-lg-inline-flex">Message</span>
              </a>
              <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                <a href="#" className="dropdown-item">
                  <div className="d-flex align-items-center">
                    <img className="rounded-circle" src="img/user.jpg" alt style={{ width: 40, height: 40 }} />
                    <div className="ms-2">
                      <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                      <small>15 minutes ago</small>
                    </div>
                  </div>
                </a>
                <hr className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <div className="d-flex align-items-center">
                    <img className="rounded-circle" src="img/user.jpg" alt style={{ width: 40, height: 40 }} />
                    <div className="ms-2">
                      <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                      <small>15 minutes ago</small>
                    </div>
                  </div>
                </a>
                <hr className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <div className="d-flex align-items-center">
                    <img className="rounded-circle" src="img/user.jpg" alt style={{ width: 40, height: 40 }} />
                    <div className="ms-2">
                      <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                      <small>15 minutes ago</small>
                    </div>
                  </div>
                </a>
                <hr className="dropdown-divider" />
                <a href="#" className="dropdown-item text-center">See all message</a>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                <i className="fa fa-bell me-lg-2" />
                <span className="d-none d-lg-inline-flex">Notificatin</span>
              </a>
              <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                <a href="#" className="dropdown-item">
                  <h6 className="fw-normal mb-0">Profile updated</h6>
                  <small>15 minutes ago</small>
                </a>
                <hr className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <h6 className="fw-normal mb-0">New user added</h6>
                  <small>15 minutes ago</small>
                </a>
                <hr className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <h6 className="fw-normal mb-0">Password changed</h6>
                  <small>15 minutes ago</small>
                </a>
                <hr className="dropdown-divider" />
                <a href="#" className="dropdown-item text-center">See all notifications</a>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                <img className="rounded-circle me-lg-2" src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-HD-Photo.png" alt style={{ width: 40, height: 40 }} />
                <span className="d-none d-lg-inline-flex">Admin</span>
              </a>
              <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                <a href="#" className="dropdown-item">My Profile</a>
                <a href="#" className="dropdown-item">Settings</a>
                <a href="#" className="dropdown-item">Log Out</a>
              </div>
            </div>
          </div>
        </nav>
        {/* Navbar End */}
        {/* Sale & Revenue Start */}
        <div class="container-fluid pt-4 px-4">
          <div class="row g-4">
            <div class="col-sm-6 col-xl-3">
              <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-line fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Today Sale</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-bar fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Total Sale</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-area fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Today Revenue</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-pie fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Total Revenue</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-line fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Today Sale</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-bar fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Total Sale</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-area fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Today Revenue</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-pie fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Total Revenue</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-line fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Today Sale</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-bar fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Total Sale</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-area fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Today Revenue</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-pie fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Total Revenue</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-6">
              <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-area fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Today Revenue</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-6">
              <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-pie fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Total Revenue</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        {/* <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="p-4 border rounded shadow-md">
            <div className="d-flex justify-content-between mb-4">
              <h6 className="mb-0">Calendar</h6>
              <a href="#" className="text-primary">Show All</a>
            </div>
            <div id="calendar" style={{ width: '100%' }}>
              <Calendar />
            </div>
          </div>
        </div> */}

        {/* Sale & Revenue End */}
        {/* Sales Chart Start */}
        {/* <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl-6">
              <div className="bg-light text-center rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h6 className="mb-0">Worldwide Sales</h6>
                  <a href>Show All</a>
                </div>
                <canvas id="worldwide-sales" />
              </div>
            </div>
            <div className="col-sm-12 col-xl-6">
              <div className="bg-light text-center rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h6 className="mb-0">Salse &amp; Revenue</h6>
                  <a href>Show All</a>
                </div>
                <canvas id="salse-revenue" />
              </div>
            </div>
          </div>
        </div> */}
        {/* Sales Chart End */}
        {/* Recent Sales Start */}
        <div className="container-fluid pt-4 px-4">
          <div className="bg-light text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Recent Salse</h6>
              <a href>Show All</a>
            </div>
            <div className="table-responsive">
              <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr className="text-dark">
                    <th scope="col"><input className="form-check-input" type="checkbox" /></th>
                    <th scope="col">Date</th>
                    <th scope="col">Invoice</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input className="form-check-input" type="checkbox" /></td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td><a className="btn btn-sm btn-primary" href>Detail</a></td>
                  </tr>
                  <tr>
                    <td><input className="form-check-input" type="checkbox" /></td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td><a className="btn btn-sm btn-primary" href>Detail</a></td>
                  </tr>
                  <tr>
                    <td><input className="form-check-input" type="checkbox" /></td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td><a className="btn btn-sm btn-primary" href>Detail</a></td>
                  </tr>
                  <tr>
                    <td><input className="form-check-input" type="checkbox" /></td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td><a className="btn btn-sm btn-primary" href>Detail</a></td>
                  </tr>
                  <tr>
                    <td><input className="form-check-input" type="checkbox" /></td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td><a className="btn btn-sm btn-primary" href>Detail</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Recent Sales End */}
        {/* Widgets Start */}
        {/* <div className="container-fluid pt-4 px-4">
          <div className="row g-4"> */}
        {/* <div className="col-sm-12 col-md-6 col-xl-4"> */}
        {/* <div className="h-100 bg-light rounded p-4"> */}
        {/* <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">Messages</h6>
                  <a href>Show All</a>
                </div> */}
        {/* <div className="d-flex align-items-center border-bottom py-3">
                  <img className="rounded-circle flex-shrink-0" src="img/user.jpg" alt style={{ width: 40, height: 40 }} />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-0">Jhon Doe</h6>
                      <small>15 minutes ago</small>
                    </div>
                    <span>Short message goes here...</span>
                  </div>
                </div> */}
        {/* <div className="d-flex align-items-center border-bottom py-3">
                  <img className="rounded-circle flex-shrink-0" src="img/user.jpg" alt style={{ width: 40, height: 40 }} />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-0">Jhon Doe</h6>
                      <small>15 minutes ago</small>
                    </div>
                    <span>Short message goes here...</span>
                  </div>
                </div> */}
        {/* <div className="d-flex align-items-center border-bottom py-3">
                  <img className="rounded-circle flex-shrink-0" src="img/user.jpg" alt style={{ width: 40, height: 40 }} />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-0">Jhon Doe</h6>
                      <small>15 minutes ago</small>
                    </div>
                    <span>Short message goes here...</span>
                  </div>
                </div> */}
        {/* <div className="d-flex align-items-center pt-3">
                  <img className="rounded-circle flex-shrink-0" src="img/user.jpg" alt style={{ width: 40, height: 40 }} />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-0">Jhon Doe</h6>
                      <small>15 minutes ago</small>
                    </div>
                    <span>Short message goes here...</span>
                  </div>
                </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* <div className="col-sm-12 col-md-6 col-xl-4">
              <div className="h-100 bg-light rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h6 className="mb-0">To Do List</h6>
                  <a href>Show All</a>
                </div>
                <div className="d-flex mb-2">
                  <input className="form-control bg-transparent" type="text" placeholder="Enter task" />
                  <button type="button" className="btn btn-primary ms-2">Add</button>
                </div>
                <div className="d-flex align-items-center border-bottom py-2">
                  <input className="form-check-input m-0" type="checkbox" />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <span>Short task goes here...</span>
                      <button className="btn btn-sm"><i className="fa fa-times" /></button>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center border-bottom py-2">
                  <input className="form-check-input m-0" type="checkbox" />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <span>Short task goes here...</span>
                      <button className="btn btn-sm"><i className="fa fa-times" /></button>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center border-bottom py-2">
                  <input className="form-check-input m-0" type="checkbox" defaultChecked />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <span><del>Short task goes here...</del></span>
                      <button className="btn btn-sm text-primary"><i className="fa fa-times" /></button>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center border-bottom py-2">
                  <input className="form-check-input m-0" type="checkbox" />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <span>Short task goes here...</span>
                      <button className="btn btn-sm"><i className="fa fa-times" /></button>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center pt-2">
                  <input className="form-check-input m-0" type="checkbox" />
                  <div className="w-100 ms-3">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <span>Short task goes here...</span>
                      <button className="btn btn-sm"><i className="fa fa-times" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
        {/* </div>
        </div> */}
        {/* Widgets End */}
        {/* Footer Start */}
        <div className="container-fluid pt-4 px-4">
          <div className="bg-light rounded-top p-4">
            <div className="row">
              <div className="col-12 col-sm-6 text-center text-sm-start">
                &copy; 2024 Link Ur Codes. All rights reserved.
              </div>
            </div>
          </div>
        </div>
        {/* Footer End */}
      </div>
      {/* Content End */}
      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
    </div>

  )
}
