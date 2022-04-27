import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

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
  const history = useNavigate();


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
              <button className="btn dataItem" onClick={() => history(`/club/${value.link}`)} target="_blank">
                  <p><span>{value.name}</span> - {value.category}</p>
              </button>
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
  </div>
  
  
        <div className="wrapper">
      {data.length > 0 ? (
        <div className="content">
          {data.map((data) => (
            <div className="post">
              <h2>{data.name}</h2>
            </div>
          ))}
        </div>
      ) : (
        <p className="loading">Loading... </p>
      )}
    </div>
  */
}
