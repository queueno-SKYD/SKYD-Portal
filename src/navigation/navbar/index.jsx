import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/app.context.jsx";
import MyModal from "../../components/Model";
import MobileNav from "./mobileNav";
import SideBar from "./sideBar.jsx";
import Loader from "../../components/Loder/index.jsx";

function Navbar({loading}) {
  const {
    logout
  } = useAppContext();
  const onLogout = () => {
    logout();
    setOpenLogoutModel(false)
  }

  const [isOpneLogoutModel, setOpenLogoutModel] = useState(false)
  return (
    <>
      {/* All outlets */}
      <div id="main">
        <SideBar setOpenLogoutModel={setOpenLogoutModel} isOpneLogoutModel={isOpneLogoutModel} />
        <main className="inner overflow-auto" id="main-area">
          <Outlet />
        </main>
      </div>
      <MobileNav setOpenLogoutModel={setOpenLogoutModel} isOpneLogoutModel={isOpneLogoutModel}/>
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
      <Loader isLoading={loading} />
    </>
  );
}

export default Navbar;
