import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const Searchbar = ({ data }) => {
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
    <form
      id="hero-search"
      className="p-1 bg-light rounded rounded-pill shadow-sm mt-4"
    >
      <div className="input-group">
        <div className="input-group-prepend">
          <button
            id="button-addon2"
            type="submit"
            className="btn btn-link text-muted"
            onClick={() => history(`/search/${wordEntered}`)}
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="searchInputs">
        <input
            type="search"
            placeholder = "Search for clubs..."            
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
    </form>
  );
};
export default Searchbar;
