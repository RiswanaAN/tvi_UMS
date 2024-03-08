import React from "react";
import "./UserSearch.css";
function UserSearch() {
  return (
    <div className="input-field flex items-center justify-center">
      <input
        type="text"
        id="search"
        placeholder="Search here..."
        className="input-control bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 rounded-md block w-full p-1 mb-2"
      ></input>
    </div>
  );
}

export default UserSearch;
