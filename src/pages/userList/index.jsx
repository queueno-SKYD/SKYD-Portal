import React from "react";
import url from "../../api/url.ts";
import { useLogin } from "../../context/login.context";
import { useEffect } from "react";
import { POST, getHeaders } from "../../api/restClient.ts";
import { useState } from "react";
import MyModal from "../../components/Model/index.jsx";
import {
  dangerToast,
  infoToast,
  successToast,
} from "../../components/customToast/index.js";
import Loader from "../../components/Loder/index.jsx";

function UserList() {
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

  const loginStore = useLogin();

  useEffect(() => {
    CallToAllUsers();
  }, []);

  /*
    get all Users List by  Api 
  */
  const CallToAllUsers = async () => {
    try {
      setIsLoading(true);
      const token = loginStore.token;
      const response = await POST(url.AllUsers, getHeaders(token), {
        pIndex: 0,
      });
      if (response.data.statusCode === 200) {
        let output = response.data.data;
        if (output) {
          setAllUserData(output);
        } else {
          infoToast("Users not Found !");
        }
      } else {
        dangerToast(response.data.message);
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
      const token = loginStore.token;
      const response = await POST(url.DeleteUserByAdmin, getHeaders(token), {
        userIds: SelectedID,
      });
      if (response.data.statusCode === 200) {
        let output = response.data;
        let message = output.message;
        if (output.data) {
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...EditData, [name]: value });
  };

  const CallToEditUserByAdmin = async () => {
    try {
      const token = loginStore.token;
      const response = await POST(url.EditUserByAdmin, getHeaders(token), {
        ...EditData,
        userId: SelectedID[0],
      });
      if (response.data.statusCode === 200) {
        let output = response.data;
        let message = output.message;
        if (output.data) {
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
    <div className="w-100 d-flex flex-column align-items-center mt-3">
      <div className="card w-75">
        <div className="card-body">
          <div className="w-100 d-flex flex-column align-self-center">
            <h3>Users</h3>
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
              <p className="text-center">
                Are you sure, you want delete this user?
              </p>
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
          </div>
        </div>
      </div>

      <Loader isLoading={IsLoading} />
    </div>
  );
}

export default UserList;
