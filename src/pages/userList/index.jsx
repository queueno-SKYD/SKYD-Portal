import React from "react";
import url from "../../api/url.ts";
import { useEffect } from "react";

import { useState } from "react";
import MyModal from "../../components/Model/index.jsx";
import {
  dangerToast,
  infoToast,
  successToast,
} from "../../components/customToast/index.js";
import Loader from "../../components/Loder/index.jsx";
import Card from "../../components/Card";
import useAxios from "../../api/restClient.jsx";

function UserList() {
  const axios = useAxios();
  const [AllUserData, setAllUserData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [SelectedID, setSelectedID] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [EditData, setEditData] = useState({
    firstName: "",
    lastName: "",
    imageURL: "",
    userId: SelectedID[0],
  });

  useEffect(() => {
    CallToAllUsers();
  }, []);

  /*
    get all Users List by  Api 
  */
  const CallToAllUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(url.AllUsers, {
        pIndex: 0,
      });
      if (response?.statusCode === 200) {
        let output = response?.data;
        if (output) {
          setAllUserData(output);
        } else {
          infoToast("Users not Found !");
        }
      } else {
        dangerToast(response?.message);
      }
    } catch (error) {
      dangerToast(error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  };
  /*
    Table Header List 
  */
  const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th scope="col" className="col-3">
            Name{" "}
          </th>
          <th scope="col" className="col-7">
            User EmailId
          </th>
          <th scope="col" className="col-2"></th>
        </tr>
      </thead>
    );
  };

  /*
    Call to delete Api 
  */
  const CallToDeleteUserByAdmin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(url.DeleteUserByAdmin, {
        userIds: SelectedID,
      });
      if (response?.statusCode === 200) {
        let message = response?.message;
        if (response) {
          setSelectedID([]);
          successToast(message);
          CallToAllUsers();
        } else {
          setSelectedID([]);
          dangerToast(message);
        }
      } else {
        let message = response?.message;
        dangerToast(message);
      }
    } catch (error) {
      dangerToast(error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...EditData, [name]: value });
  };

  const CallToEditUserByAdmin = async () => {
    try {
      const response = await axios.post(url.EditUserByAdmin, {
        ...EditData,
        userId: SelectedID?.[0],
      });
      if (response?.statusCode === 200) {
        let message = response?.message;
        if (response) {
          setSelectedID([]);
          successToast(message);
          CallToAllUsers();
        } else {
          setSelectedID([]);
          dangerToast(message);
        }
      } else {
        let message = response.data.message;
        dangerToast(message);
      }
    } catch (error) {
      dangerToast(error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  };

  return (
      <Card title={"Users"}>
        <table className="w-100 table table-striped">
          <TableHeader />
          <tbody>
            {AllUserData.map((item) => {
              return (
                <tr>
                  <td>{item.firstName + " " + item.lastName}</td>
                  <td>{item.email}</td>
                  <td style={{ minWidth: "200px" }}>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => {
                            setSelectedID([item.userId]);
                            setEditData(item);
                            setOpenEditModal(true);
                          }}
                        >
                          <i className="fa fa-pen icon-space" />
                          Edit
                        </button>
                    <span> | </span>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        setSelectedID([item.userId]);
                        setOpenModel(true);
                      }}
                    >
                      <i className="fa fa-trash icon-space" />
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* <!-- Modal --> */}
        <MyModal
          openModal={openModel}
          closeModal={() => setOpenModel(false)}
          title={"Confirm For Deletion!"}
          closeOnBackdropClick={true}
          isCenter={true}
          onSave={(e) => {
            CallToDeleteUserByAdmin();
            setOpenModel(false);
          }}
          isLoading={false}
          saveButtonTitle={"Delete"}
          cancelButtonTitle={"Cancel"}
        >
          <p className="text-center">Are you sure, you want delete this user?</p>
        </MyModal>

        {/* <!-- Modal --> */}
        <MyModal
          openModal={OpenEditModal}
          closeModal={() => setOpenEditModal(false)}
          title={"Edit"}
          closeOnBackdropClick={true}
          isCenter={true}
          onSave={(e) => {
            CallToEditUserByAdmin();
            setOpenEditModal(false);
          }}
          isLoading={false}
          saveButtonTitle={"Edit"}
          cancelButtonTitle={"Cancel"}
        >
          <form>
            <div className="row mb-3">
              <label
                htmlFor="inputEmail13"
                className="col-sm-12 col-form-label"
              >
                Full Name
              </label>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail13"
                  name="firstName"
                  value={EditData.firstName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="inputEmail113"
                className="col-sm-12 col-form-label"
              >
                Last Name
              </label>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail113"
                  name="lastName"
                  value={EditData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="inputEmail123"
                className="col-sm-12 col-form-label"
              >
                Image Url
              </label>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail123"
                  name="imageURL"
                  value={EditData.imageURL}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        </MyModal>
        <Loader isLoading={IsLoading} />
      </Card>
  );
}

export default UserList;
