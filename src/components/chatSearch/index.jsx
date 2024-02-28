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
    <div className="chat-head-search-container">
      <div
        className={`d-flex flex-row align-item-center p-1 px-2 chat-head-search`}
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
    </div>
  );
}

export default ChatSearch;
