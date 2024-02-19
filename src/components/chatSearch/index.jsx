import React from "react";
import "./index.css";
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
        className={`d-flex flex-row w-100 ${headerColor} col-12 align-item-center p-1 rounded`}
      >
        <div className="col-11">
          <input
            className={`col-12 border-0 ${headerColor} search-input outline-none ${iconColor}`}
            type="text"
            onChange={onHandleChange}
            value={searchValue}
            placeholder="Search....."
          />
        </div>
        <div
          className={`col-1 ${headerColor} d-flex justify-content-center align-item-center`}
        >
          <span
            class={`material-symbols-outlined ${iconColor}`}
            onClick={onClickSearch}
          >
            search
          </span>
        </div>
      </div>
    </>
  );
}

export default ChatSearch;
