import React from "react";
import "./index.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
function ChatSearch({
  onHandleChange,
  searchValue,
  onClickSearch,
  headerColor = "bg-light",
  iconColor = "",
}) {
  return (
    <>
      <div
        className={`d-flex flex-row w-100 col-12 align-item-center p-1 mt-2 px-2`}
        style={{
          backgroundColor: headerColor,
        }}
      >
        <input
          className={`col-11 border-0  search-input outline-none ${iconColor}`}
          type="text"
          onChange={onHandleChange}
          style={{ backgroundColor: headerColor }}
          value={searchValue}
          placeholder="Search....."
        />
        <div
          className={`col-1 ${headerColor} d-flex justify-content-center align-item-center`}
        >
          <SearchRoundedIcon />
        </div>
      </div>
    </>
  );
}

export default ChatSearch;
