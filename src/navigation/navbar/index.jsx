import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { TextMessage } from "../../helper/constants/textMessage.ts";
import { PathName } from "../../helper/constants/pathNames.ts";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../context/login.context.jsx";
import MyModal from "../../components/Model";

function Navbar() {
  const {
    token,
    logout
  } = useLogin();
  const onLogout = () => {
    logout();
    setOpenLogoutModel(false)
  }
  const currentPath = window.location.pathname;
  const compare = (path) => {
    return currentPath.split("/")?.[1] === path.split("/")?.[1]
  }
  const [isOpneLogoutModel, setOpenLogoutModel] = useState(false)
  return (
    <section className="vh-100">
      {!!token && <nav className="nav nav-pills nav-justified bg-light">
        <Link className={`nav-link mx-5 my-2 ${compare(PathName.homePath) ? "active" : ""}`} aria-current="page" to={PathName.homePath}>{TextMessage.GROUP_CHAT}</Link>
        <Link className={`nav-link mx-5 my-2 ${compare(PathName.userListPath) ? "active" : ""}`} to={PathName.userListPath}>{TextMessage.MANAGE_USER}</Link>
        <Link className={`nav-link mx-5 my-2 ${compare(PathName.documentListPath) ? "active" : ""}`} to={PathName.documentListPath}>{TextMessage.MANAGEMENT_DOCUMENTS}</Link>
        <Link
          className={`nav-link mx-5 my-2 ${compare(PathName.logoutPath) ? "active" : ""}`}
          tabIndex="-1"
          aria-disabled="true"
          onClick={() => setOpenLogoutModel(true)}
        >{TextMessage.LOGOUT}</Link>
        <MyModal
          openModal={isOpneLogoutModel}
          closeModal={() => setOpenLogoutModel(false)}
          title={"Logout confirmation"}
          closeOnBackdropClick={true}
          isCenter={true}
          onSave={onLogout}
          saveButtonTitle={"Logout"}
          cancelButtonTitle={"Cancel"}
          type="danger"
        >
          <p >Are you sure, you want to logout!</p>
        </MyModal>
      </nav>}
      
      {/* All outlets */}
      <Outlet />
    </section>
  );
}

export default Navbar;
