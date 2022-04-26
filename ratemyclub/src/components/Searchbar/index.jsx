import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";

const Searchbar = ({ placeholder, data }) => {
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
    <div
      id="hero-search"
      className="p-1 bg-light rounded rounded-pill shadow-sm mt-4"
    >
      <div className="input-group">
        <div className="input-group-prepend">
          <button
            id="button-addon2"
            type="submit"
            className="btn btn-link text-muted"
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="searchInputs">
        <input
            type="search"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
            aria-describedby="home search"
            className="form-control border-0 bg-light"
          />
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank">
                  <p><span>{value.name}</span> - {value.category}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Searchbar;
{
  /*<div className="input-group">

    <input
      type="search"
      placeholder="Search for a club..."
      aria-describedby="button-addon2"
      className="form-control border-0 bg-light"
    />
  </div>*/
}
