import React, { useState } from "react";
import {AiOutlineSearch, AiOutlineClose} from "react-icons/ai";

function SearchBar({ placeholder, data, handleSkillClick }) {

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="w-full h-12 p-2 mb-3 bg-gray-100 rounded-md">
      <div className="flex justify-between">
        <input
          className="w-min ml-2 px-3 font-semibold mt-2 outline-none bg-blue-100 text-clueless-blue rounded-md text-sm placeholder-blue-400"
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div>
          {filteredData.length === 0 ? (
            <AiOutlineSearch className="text-xl mt-2 ml-2"/>
          ) : (
            <AiOutlineClose className="text-xl mt-2 ml-2" id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="absolute w-2/12 h-20 mt-4 p-1  bg-gray-100 shadow-md overflow-hidden overflow-y-auto z-10">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a onClick={clearInput} className="w-full h-8 ml-1 flex text-black font-thin text-sm bg-gray-100 cursor-pointer" href={value.link} target="_blank">
                <span onClick={() => handleSkillClick(value)} className="cursor-pointer font-semibold mb-2 px-3 mr-2 bg-red-100 text-blue-600 rounded-md text-sm hover:bg-red-200">{value.name}<span className="text-red-400 text-sm"> +</span></span>

              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;