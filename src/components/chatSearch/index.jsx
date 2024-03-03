import React from "react";
import "./index.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { IconButton } from "@mui/material";
function ChatSearch({
  onHandleChange,
  searchValue,
  onClickSearch,
  headerColor = "bg-light",
  iconColor = "",
  onBlurHandler,
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
          onBlur={onBlurHandler}
        />
        <IconButton
          sx={{width: "30px", height: "30px"}}
          onClick={onClickSearch}
          disabled={!searchValue}
        >
          <SearchRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatSearch;
