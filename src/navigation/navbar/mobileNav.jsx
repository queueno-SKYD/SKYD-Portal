import React from "react";
import { Link } from "react-router-dom";
import { TextMessage } from "../../helper/constants/textMessage.ts";
import { PathName } from "../../helper/constants/pathNames.ts";
import LogoutIcon from '@mui/icons-material/Logout';

const MobileNav = ({ setOpenLogoutModel }) => {
  const currentPath = window.location.pathname;
  const compare = (path) => {
    return currentPath.split("/")?.[1] === path.split("/")?.[1];
  };
  return (
    <nav className="nav nav-tabs nav-justified bg-light" id="mobile-nav">
      <div className={`nav-item nav-link ${compare(PathName.homePath) ? "active" : ""}`}>
        <i class="fa fa-home"></i>
        <br />
        <Link
          className="nav-link-1"
          aria-current="page"
          to={PathName.homePath}
        >
          Group
        </Link>
      </div>
      <div className={`nav-item nav-link ${
            compare(PathName.userListPath) ? "active" : ""
          }`}>
        <i class="fa fa-users"></i>
        <br />
        <Link
          className="nav-link-1"
          to={PathName.userListPath}
        >
          Users
        </Link>
      </div>
      <div className={`nav-item nav-link ${
            compare(PathName.documentListPath) ? "active" : ""
          }`}>
        <i class="fa fa-file"></i>
        <br />
        <Link
          className="nav-link-1"
          to={PathName.documentListPath}
        >
          Documents
        </Link>
      </div>
      <div className={`nav-item nav-link ${compare(PathName.logoutPath) ? "active" : ""}`}>
        <LogoutIcon />
        <br />
        <Link
          className="nav-link-1"
          tabIndex="-1"
          aria-disabled="true"
          onClick={() => setOpenLogoutModel(true)}
        >
          {TextMessage.LOGOUT}
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
