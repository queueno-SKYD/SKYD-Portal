import React from "react";
import { Link } from "react-router-dom";
import { TextMessage } from "../../helper/constants/textMessage.ts";
import { PathName } from "../../helper/constants/pathNames.ts";
import LogoutIcon from '@mui/icons-material/Logout';
import "./index.css"
const MobileNav = ({ setOpenLogoutModel }) => {
  const currentPath = window.location.pathname;
  const compare = (path) => {
    return currentPath.split("/")?.[1] === path.split("/")?.[1];
  };
  return (
    <nav className="nav nav-tabs nav-justified bg-light" id="mobile-nav">
      <div className={`nav-item nav-link ${compare(PathName.homePath) ? "active" : ""}`}>
        <Link
          className="nav-link-1 link_text"
          aria-current="page"
          to={PathName.homePath}
        >
          <i class="fa fa-home"></i>

        </Link>
      </div>
      <div className={`nav-item nav-link ${
            compare(PathName.userListPath) ? "active" : ""
          }`}>
        <Link
          className="nav-link-1 link_text"
          to={PathName.userListPath}
        >
        <i class="fa fa-users"></i>
        </Link>
      </div>
      <div className={`nav-item nav-link ${
            compare(PathName.documentListPath) ? "active" : ""
          }`}>
        <Link
          className="nav-link-1 link_text"
          to={PathName.documentListPath}
        >
          <i class="fa fa-file"></i>
        </Link>
      </div>
      <div className={`nav-item nav-link ${compare(PathName.logoutPath) ? "active" : ""}`}>
        <Link
          className="nav-link-1 link_text"
          tabIndex="-1"
          aria-disabled="true"
          onClick={() => setOpenLogoutModel(true)}
        >
          <LogoutIcon  />
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
