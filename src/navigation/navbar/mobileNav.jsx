import React from "react";
import { Link } from "react-router-dom";
import { TextMessage } from "../../helper/constants/textMessage.ts";
import { PathName } from "../../helper/constants/pathNames.ts";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import DifferenceRoundedIcon from '@mui/icons-material/DifferenceRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import "./index.css"
const MobileNav = ({ setOpenLogoutModel, isOpneLogoutModel }) => {
  const currentPath = window.location.pathname;
  const compare = (path) => {
    return currentPath.split("/")?.[1] === path.split("/")?.[1];
  };
  return (
    <nav className="nav nav-tabs nav-justified bg-light" id="mobile-nav">
      <div className={`sidebar-item nav-item nav-link ${!isOpneLogoutModel && compare(PathName.homePath) ? "active" : ""}`}>
        <Link
          className={`sidebar-icon-container link_text ${!isOpneLogoutModel && compare(PathName.homePath) ? "active-color" : ""}`}
          aria-current="page"
          to={PathName.homePath}
        >
          <HomeRoundedIcon />

        </Link>
      </div>
      <div className={`sidebar-item nav-item nav-link ${
            !isOpneLogoutModel && compare(PathName.userListPath) ? "active" : ""
          }`}>
        <Link
          className={`sidebar-icon-container link_text ${!isOpneLogoutModel && compare(PathName.userListPath) ? "active-color" : ""}`}
          to={PathName.userListPath}
        >
        <GroupsRoundedIcon />
        </Link>
      </div>
      <div className={`sidebar-item nav-item nav-link ${
            !isOpneLogoutModel && compare(PathName.documentListPath) ? "active" : ""
          }`}>
        <Link
          className={`sidebar-icon-container link_text ${!isOpneLogoutModel && compare(PathName.documentListPath) ? "active-color" : ""}`}
          to={PathName.documentListPath}
        >
          <DifferenceRoundedIcon />
        </Link>
      </div>
      <div className={`sidebar-item nav-item nav-link ${isOpneLogoutModel ? "active" : ""}`}>
        <Link
          className={`sidebar-icon-container link_text ${isOpneLogoutModel ? "active-color" : ""}`}
          tabIndex="-1"
          aria-disabled="true"
          onClick={() => setOpenLogoutModel(true)}
        >
          <LogoutRoundedIcon />
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
