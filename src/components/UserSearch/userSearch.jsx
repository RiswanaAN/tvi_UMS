import React from "react";
import { BsSearch } from "react-icons/bs";
import "./UserSearch.css";
function UserSearch(props) {
  return (
    <div className="input-field flex justify-center">
      <input
        type="text"
        id="search"
        placeholder="Search here..."
        className="input-control bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 rounded-s-md block w-full p-1 mb-2"
        value={props.SearchWord}
        onChange={(e)=> props.setSearchWord(e.target.value)}
      ></input>
      
        <button type="button" onClick={props.searchUser} className=" text-wte flex justify-center items-center pr-2 pl-2 rounded-r-md mb-2 bg-gray-700 hover:bg-gray-600">
          <BsSearch />
        </button>
      
    </div>
  );
}

export default UserSearch;
