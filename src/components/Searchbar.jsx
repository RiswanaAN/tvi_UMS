import React from "react";
import { ImSearch } from "react-icons/im";
function Searchbar() {
  return (
    <div className="flex items-center justify-center md:visible invisible">
      <input
        type="text"
        id="search"
        placeholder="Search for..."
        className="p-1 text-black rounded-s-sm text-[15px] focus:outline-none focus:ring-5 focus:border-[#007bff] "
      ></input>
      <label htmlFor="search" className="bg-[#007bff] flex justify-center p-2 rounded-r-sm">
        <button type="button">
          <ImSearch />
        </button>
      </label>
    </div>
  );
}

export default Searchbar;
// focus:border-blue-500