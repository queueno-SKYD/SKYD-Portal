import React from 'react'
import { Link } from 'react-router-dom';
import { PathName } from '../../helper/constants/pathNames.ts';
import { TextMessage } from '../../helper/constants/textMessage.ts';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import DifferenceRoundedIcon from '@mui/icons-material/DifferenceRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const SideBar = ({setOpenLogoutModel, isOpneLogoutModel}) => {

  const currentPath = window.location.pathname;
  const compare = (path) => {
    return currentPath.split("/")?.[1] === path.split("/")?.[1]
  }

  return (
    <nav className='d-flex flex-column' id="desk-nav">
      <div id="desk-nav-top">
        <div className='sidebar-item'>
          <Link className={` sidebar-icon-container ${!isOpneLogoutModel && compare(PathName.homePath) ? "active" : ""}`} aria-current="page" to={PathName.homePath}>
            <HomeRoundedIcon />
          </Link>
        </div>
        <div className='sidebar-item'>
          <Link className={` sidebar-icon-container ${!isOpneLogoutModel && compare(PathName.userListPath) ? "active" : ""}`} to={PathName.userListPath}>
            <GroupsRoundedIcon />
          </Link>
        </div>
        <div className='sidebar-item'>
          <Link className={` sidebar-icon-container ${!isOpneLogoutModel && compare(PathName.documentListPath) ? "active" : ""}`} to={PathName.documentListPath}>
            <DifferenceRoundedIcon />
          </Link>
        </div>
      </div>
      <div id="desk-nav-bottom">
        <div className='sidebar-item sidebar-item-last'>
          <Link className={` sidebar-icon-container ${isOpneLogoutModel ? "active" : ""}`}
            tabIndex="-1"
            aria-disabled="true"
            onClick={() => setOpenLogoutModel(true)}
          >
            <LogoutRoundedIcon />
          </Link>
        </div>
      </div>
  </nav>
  )
}

export default SideBar;
