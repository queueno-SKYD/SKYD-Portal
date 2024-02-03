import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { TextMessage } from "../../helper/constants/textMessage.ts";
import { PathName } from "../../helper/constants/pathNames.ts";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../context/login.context.jsx";

function Navbar() {
  const navigate = useNavigate();
  const {
    logout,
    token
  } = useLogin();
  return (
    <>
      {!!token && <nav className="nav nav-pills nav-justified bg-light">
        <Link className="nav-link" aria-current="page" to={PathName.homePath}>{TextMessage.GROUP_CHAT}</Link>
        <Link className="nav-link" to={PathName.userListPath}>{TextMessage.MANAGE_USER}</Link>
        <Link className="nav-link" to={PathName.documentListPath}>{TextMessage.MANAGEMENT_DOCUMENTS}</Link>
        <Link
          className="nav-link"
          to={PathName.loginPath}
          tabIndex="-1"
          aria-disabled="true"
          onClick={logout}
        >{TextMessage.LOGOUT}</Link>
      </nav>}
      
      {/* All outlets */}
      <Outlet />
    </>
  );
}

export default Navbar;
