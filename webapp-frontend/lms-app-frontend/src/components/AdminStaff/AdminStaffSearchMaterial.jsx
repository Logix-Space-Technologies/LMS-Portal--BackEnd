import axios from 'axios'
import '../../config/config'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdmStaffNavBar from '../AdminStaff/AdmStaffNavBar'
import Navbar from '../Admin/Navbar'

const AdminStaffSearchMaterial = () => {

  const navigate = useNavigate()

  const [inputField, setInputField] = useState(
    {
      "materialQuery": ""
    }
  )

  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [updateField, setUpdateField] = useState([])
  const [curriculumPerPage] = useState(10); // Number of curriculum per page
  const [deleteId, setDeleteId] = useState(null);
  const apiLink = global.config.urls.api.server + "/api/lms/searchMaterial";
  const apiLink2 = global.config.urls.api.server + "/api/lms/adminStaffDeleteMaterial";


  const inputHandler = (event) => {
    setInputField({ ...inputField, [event.target.name]: event.target.value });
  };

  const readValue = () => {
    setIsLoading(true);
    let axiosConfig = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "token": sessionStorage.getItem("admstaffLogintoken"),
        "key": sessionStorage.getItem("admstaffkey")
      }
    };

    axios.post(apiLink, inputField, axiosConfig).then(
      (response) => {
        setUpdateField(response.data.data);
        setIsLoading(false);
        setInputField({
          "materialQuery": ""
        });
      }
    );
  };


  // Logic for displaying current curriculum
  const indexOfLastMaterial = currentPage * curriculumPerPage;
  const indexOfFirstMaterial = indexOfLastMaterial - curriculumPerPage;
  const currentMaterial = updateField ? updateField.slice(indexOfFirstMaterial, indexOfLastMaterial) : [];

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Total pages
  const pageNumbers = [];
  if (updateField && updateField.length > 0) {
    updateField.forEach((curriculum, index) => {
      const pageNumber = index + 1;
      pageNumbers.push(pageNumber);
    });
  }

  const handleClick = (id) => {
    setDeleteId(id);
  };

  const handleDeleteClick = () => {
    let data = { "id": deleteId };
    console.log(data)
    let axiosConfig2 = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "token": sessionStorage.getItem("admstaffLogintoken"),
        "key": sessionStorage.getItem("admstaffkey")
      }
    };

    axios.post(apiLink2, data, axiosConfig2).then(
      (response) => {
        if (response.data.status === "success") {
          alert("Curriculum deleted!!");
          // Remove the deleted curriculum from updateField state
          setUpdateField(updateField.filter(curriculum => curriculum.id !== deleteId))
        } else {
          alert(response.data.status);
        }
      }
    );
  };

  const UpdateClick = (id) => {
    let data = id
    console.log(data)
    sessionStorage.setItem("materialId", data)
    navigate("/AdminStaffUpdateMaterial")

  }

  return (
    <div>
      <AdmStaffNavBar/>
      <strong style={{ paddingLeft: '30px' }}>Search Material</strong>

      <div className="flex justify-between items-center mx-4 my-4">
        <div className="container">
          <div className="row g-3">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <label htmlFor="" className="form-label"></label>
              <input onChange={inputHandler} type="text" className="form-control" name="materialQuery" value={inputField.materialQuery} placeholder='Search By fileName/Description/Batch Name' />
            </div>
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <button onClick={readValue} className="btn btn-warning">Search</button>
            </div>
          </div>
        </div>
      </div>
      <br /><br />
      {isLoading ? (
        <div className="col-12 text-center">
          <p></p>
        </div>
      ) : (updateField ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S/N
                </th>
                <th scope="col" className="px-6 py-3">
                  File Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Upload File
                </th>
                <th scope="col" className="px-6 py-3">
                  Remarks
                </th>

                <th scope="col" className="px-6 py-3">
                  Batch Name
                </th>
                <th scope="col" className="px-6 py-3">

                </th>
              </tr>
            </thead>
            <tbody>
              {currentMaterial.map(
                (value, index) => {
                  return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      {value.fileName}
                    </td>
                    <td className="px-6 py-4">
                      {value.materialDesc}
                    </td>
                    <td className="px-6 py-4">
                      {value.uploadFile}
                    </td>
                    <td className="px-6 py-4">
                      {value.remarks}
                    </td>
                    <td className="px-6 py-4">
                      {value.batchName}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal3" onClick={() => handleClick(value.id)}>
                        Delete
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <button onClick={() => { UpdateClick(value.id) }} className="font-medium text-blue-600 dark:text-blue-500">Update Material</button>
                    </td>
                  </tr>
                }
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="col-12 text-center">No Material Found!!</div>
      ))}
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex list-style-none">
            {currentPage > 1 && (
              <li onClick={() => paginate(currentPage - 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                Previous
              </li>
            )}
            {pageNumbers.map(number => (
              <li key={number} onClick={() => paginate(number)} className={`cursor-pointer px-3 py-1 mx-1 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {number}
              </li>
            ))}
            {currentPage < pageNumbers.length && (
              <li onClick={() => paginate(currentPage + 1)} className="cursor-pointer px-3 py-1 mx-1 bg-gray-200 text-gray-800">
                Next
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Delete Confirmation Modal */}
      <div className="modal fade" id="deleteConfirmationModal3" tabIndex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteConfirmationModalLabel">Delete Confirmation</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this Material?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeleteClick}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStaffSearchMaterial