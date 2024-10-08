import React from "react";
import { Link } from "react-router-dom";
import { PathName } from "../../helper/constants/pathNames.ts";
import { TextMessage } from "../../helper/constants/textMessage.ts";

function NotFound({isAuthenticated}) {
  return (
    <div class="d-flex align-items-center justify-content-center vh-100">
        <div class="text-center">
            <h1 class="display-1 fw-bold">404</h1>
            <p class="fs-3"><span class="text-danger">Oops!</span> Page not found.</p>
            <p class="lead">The page you’re looking for doesn’t exist.</p>
            <Link className="nav-link text-success pb-2" to={isAuthenticated ? PathName.homePath : PathName.loginPath}>{isAuthenticated ? TextMessage.GOTOHOME : TextMessage.GOTOLOGIN}</Link>
        </div>
    </div>
  );
}

export default NotFound;
