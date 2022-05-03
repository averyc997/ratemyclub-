import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const List = () => {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [categoryReverse, setcategoryReverse] = useState([]);
  const [order, setOrder] = useState(true);
  const history = useNavigate();

  const fetchCategory = async () => {
    const { data } = await axios.get(
      `https://ratemyclubunc-default-rtdb.firebaseio.com/clubs.json`
    );
    let categoryData = filterCategory(data, id);
    const arr = categoryData
      .map((element) => {
        return [
          element.name,
          element.description,
          element.link,
          element.reviews,
        ];
      })
      .sort(function (a, b) {
        var nameA = a[0].toLowerCase(),
          nameB = b[0].toLowerCase();
        if (nameA < nameB)
          //sort string ascending
          return -1;
        if (nameA > nameB) return 1;
        return 0; //default return value (no sorting)
      });
    let reversed = categoryData
      .map((element) => {
        return [
          element.name,
          element.description,
          element.link,
          element.reviews,
        ];
      })
      .sort(function (a, b) {
        var nameA = a[0].toLowerCase(),
          nameB = b[0].toLowerCase();
        if (nameA < nameB)
          //sort string ascending
          return 1;
        if (nameA > nameB) return -1;
        return 0; //default return value (no sorting)
      });
    setCategory(arr);
    setcategoryReverse(reversed);
  };
  //let reviewTotal = average(clubData.reviews);
  useEffect(() => {
    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main id="category">
        <div className="container pt-4 pb-5">
          <p className="num">
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
                <li onClick={() => setOrder(true)}>
                  <a className="dropdown-item">A-Z</a>
                </li>
                <li onClick={() => setOrder(false)}>
                  <a className="dropdown-item">Z-A</a>
                </li>
              </ul>
            </div>
            <button
              className="btn btn-primary mx-4 my-3"
              onClick={() => history(`/create`)}
            >
              Club not found? Add it through this form!
            </button>
          </div>
          {(order ? category : categoryReverse).map((element) => (
            <div className="categoryList mt-4 mb-2">
              <div className="rating">
                <h3>
                  <span className="color">
                    {!isNaN(average(element[3]))
                      ? `${average(element[3])}`
                      : ""}
                  </span>
                  <span className="no-reviews">
                  {isNaN(average(element[3]))
                    ? "0 ratings"
                    : ""}
                    </span>
                  {!isNaN(average(element[3])) ? " / 5" : ""}
                </h3>
                <p>{count(element[3])&& count(element[3]) > 0 ? `${count(element[3])} ratings` : ""}</p>
              </div>
              <div className="info">
                <h3>{element[0]}</h3>
                <p>{element[1]}</p>
                <button
                  className="btn btn-primary my-1"
                  onClick={() => history(`/club/${element[2]}`)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
const average = (review) => {
  if (review == null) {
    return "No reviews yet :/";
  }
  let i = 0;
  let count = 0;
  for (let j = 0; j <= review.length - 1; j++) {
    i += review[j].stars;
    count++;
  }
  let ratio = i / count;
  return (Math.round(ratio * 10.0) / 10.0).toFixed(1);
};
const count = (review) => {
  let count = 0;
  if (review == null) {
    return "0";
  }
  for (let i = 0; i <= review.length - 1; i++) {
    count++;
  }
  return count;
};
const filterCategory = (arr, searchKey) => {
  return arr.filter((obj) =>
    Object.keys(obj).some((key) => obj[key].includes(searchKey))
  );
};
export default List;
