import React from "react";
import { Link } from "react-router-dom";
import { PathName } from "../../helper/constants/pathNames.ts";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import DifferenceRoundedIcon from '@mui/icons-material/DifferenceRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import "./index.css"
import { useAppContext } from "../../context/app.context.jsx";
const MobileNav = ({ setOpenLogoutModel, isOpneLogoutModel }) => {
  const currentPath = window.location.pathname;
  const compare = (path) => {
    return currentPath.split("/")?.[1] === path.split("/")?.[1];
  };
  const { isMobilenavHideen } = useAppContext();
  return (
    <nav className={`nav nav-tabs nav-justified bg-light ${isMobilenavHideen ? "slide-down-mobile-nav" : "slide-up-mobile-nav"}`} id="mobile-nav">
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
      <div className={`sidebar-item nav-item nav-link ${
            !isOpneLogoutModel && compare(PathName.documentListPath) ? "active" : ""
          }`}>
        <Link
          className={`sidebar-icon-container link_text ${!isOpneLogoutModel && compare(PathName.manageProfile) ? "active-color" : ""}`}
          to={PathName.manageProfile}
        >
          <ManageAccountsRoundedIcon />
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
