import React from "react";
import url from "../../api/url.ts";
import { useLogin } from "../../context/login.context";
import { useEffect } from "react";
import { POST, getHeaders } from "../../api/restClient.ts";
import { useState } from "react";
import MyModal from "../../components/Model/index.jsx";
import {customToast} from '../../components/customToast/index.js'

function UserList() {
  const [AllUserData, setAllUserData] = useState([]);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [notFound, setnotFound] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [SelectedID, setSelectedID] = useState([]);
  const [openModel, setOpenModel] = useState(false);

  const loginStore = useLogin();

  useEffect(()=>{
    setIsLoading(true);
    CallToAllUsers();
  },[SelectedID]);

  /*
    get all Users List by  Api 
  */
  const CallToAllUsers = async ()=>{
    try {
      const token = loginStore.token
      const response = await POST(url.AllUsers, getHeaders(token), {pIndex : 0});
      if(response.data.statusCode === 200){
        let output = response.data.data;
        if(output){
          setAllUserData(output);
        }else{
          setErrorMessage("Users not Found !")
        }
      }else{

      }
    } catch (error) {
      console.log("error -->",error)
    }
  }
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
      const token = loginStore.token;
      const response = await POST(url.DeleteUserByAdmin, getHeaders(token), {
        userIds: SelectedID,
      });
      if (response.data.statusCode === 200) {
        let output = response.data;
        let message = output.message;
        if(output.data){
          setSelectedID([]);
          customToast("success",message, 2000);

        }else{
          setSelectedID([]);
          alert(message);
        }
      }else{
        let message = response.data.message;
        alert(message);
      }
    } catch (error) {
      alert(error.message)
      console.log("Error ---> ", error);
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
                      <td>
                        <a href="">Edit</a>
                        <span> | </span>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={() => {
                            setSelectedID([item.userId]);
                            setOpenModel(true);
                          }}
                        >
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
