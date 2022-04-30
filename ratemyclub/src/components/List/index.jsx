import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const List = () => {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const history = useNavigate();

  const fetchCategory = async () => {
    const { data } = await axios.get(
      `https://ratemyclubunc-default-rtdb.firebaseio.com/clubs.json`
    );
    let categoryData = filterCategory(data, id);

    const arr = categoryData.map((element) => {
      return [element.name, element.description, element.link];
    });
    setCategory(arr);
  };

  useEffect(() => {
    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main id="category">
        <div className="container pt-4 pb-5">
          <p className = "num">
            {category.length} Organizations related to "{id}"
          </p>

          <div className="d-flex align-items-center btn-group">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle rounded"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    A-Z
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Z-A
                  </a>
                </li>
              </ul>
            </div>
            <button className="btn btn-primary mx-4 my-3" onClick={() => history(`/create`)}>
              Club not found? Add it through this form!
            </button>
          </div>
          {category.map((element) => (
            <div className="categoryList my-4">
              <h3>{element[0]}</h3> {element[1]}{" "}
              <button
                className="btn btn-primary my-3"
                onClick={() => history(`/club/${element[2]}`)}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

const filterCategory = (arr, searchKey) => {
  return arr.filter((obj) =>
    Object.keys(obj).some((key) => obj[key].includes(searchKey))
  );
};
export default List;
