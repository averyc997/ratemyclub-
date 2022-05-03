import React, { useState, useEffect, PureComponent } from "react";
import { Dialog } from "@material-ui/core";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { db, storage } from "../firebase";
import { set, ref } from "@firebase/database";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const average = (review) => {
  if (review == null) {
    return "No reviews yet :/";
  }
  console.log(review);
  let i = 0;
  let count = 0;
  for (let j = 0; j <= review.length - 1; j++) {
    i += review[j].stars;
    count++;
  }
  let ratio = i / count;
  return Math.round(ratio * 10.0) / 10.0;
};
const starNumber = (review) => {
  let starArray = [0, 0, 0, 0, 0];
  if (review == null) {
    return starArray;
  }
  for (let j = 0; j <= review.length - 1; j++) {
    if (review[j].stars === 1) {
      starArray[0]++;
    }
    if (review[j].stars === 2) {
      starArray[1]++;
    }
    if (review[j].stars === 3) {
      starArray[2]++;
    }
    if (review[j].stars === 4) {
      starArray[3]++;
    }
    if (review[j].stars === 5) {
      starArray[4]++;
    }
  }
  return starArray;
  //take in review, go to review[j] star, do check, update the count, return variables
};

let starAverage = 0;
let starArr = [];
const Club = () => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [club, setClub] = useState([]);
  const [review, setReview] = useState([]);
  const { id } = useParams();
  const handleReview = (event) => {
    setReviewOpen(true);
  };

  const fetchClub = async () => {
    const { data } = await axios.get(
      `https://ratemyclubunc-default-rtdb.firebaseio.com/clubs.json`
    );
    let clubData = filterClub(data, id)[0];
    console.log(data.indexOf(filterClub(data, id))[0]);
    let reviewTotal = average(clubData.reviews);
    starArr = starNumber(clubData.reviews);
    starAverage = reviewTotal;
    if (clubData.reviews) {
      let reviewsArr = clubData.reviews;

      const arr = reviewsArr.map((element) => {
        return [element.review, element.stars, element.tags];
      });

      setReview(arr);
    }
    setClub([
      clubData.name,
      clubData.description,
      clubData.category,
      clubData.email,
      clubData.img,
      clubData.website,
      clubData.fb,
      clubData.insta,
    ]);
  };

  useEffect(() => {
    fetchClub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = [
    {
      name: "Awesome",
      Count: starArr[4],
    },
    {
      name: "Great",
      Count: starArr[3],
    },
    {
      name: "Good",
      Count: starArr[2],
    },
    {
      name: "Okay",
      Count: starArr[1],
    },
    {
      name: "Needs work",
      Count: starArr[0],
    },
  ];
  return (
    <>
      <main id="club" className="py-4">
        <section className="container mt-2">
          <div className="row club">
            <div className="col-lg-7 col-md-12 clubber">
              <div className="clubTop">
                <img className="clubImg" src={club[4]}></img>
                <h1 className="clubTitle">{club[0]}</h1>
              </div>
              <div className="socials d-flex flex-row">
                <a
                  href={club[7]}
                  target="_blank"
                  className={`${club[7] ? "" : "d-none"}`}
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href={club[6]}
                  target="_blank"
                  className={`${club[6] ? "" : "d-none"}`}
                >
                  <i className="fa-brands fa-facebook-square"></i>
                </a>
                <a
                  href={`mailto:${club[3]}`}
                  className={`${club[3] ? "" : "d-none"}`}
                >
                  <i className="fa-regular fa-envelope"></i>
                </a>
                <a
                  href={club[5]}
                  target="_blank"
                  className={`${club[5] ? "" : "d-none"}`}
                >
                  <i className="fa-solid fa-code"></i>
                </a>
              </div>
              <div className="d-flex my-3 gap-2">
              {review.length > 0 &&
              Array.from(new Set(review.map((element) => (
                element[2]
              )))).map((element) => (
                <div className="tags btn-secondary btn">{element}</div>
              ))}
              </div>
              <div className="clubDescr">
                <p>{club[1]}</p>
              </div>
              <button
                className="rateClub btn btn-primary mb-4"
                onClick={handleReview}
              >
                Rate this club!
              </button>
            </div>
            <div className="col-lg-5 col-md-12 histogram">
              <p id="Ssize">
                <span>{starAverage}</span> {/\d/.test(starAverage) ? "/ 5" : ""}
              </p>
              <ResponsiveContainer>
                <ComposedChart
                  layout="vertical"
                  width={1000}
                  data={data}
                  margin={{
                    top: 2,
                    right: 60,
                    bottom: 80,
                    left: 60,
                  }}
                >
                  <XAxis type="number" stroke="#FFFF" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    scale="band"
                    fontWeight="bold"
                  />
                  <Tooltip />
                  <Bar dataKey="Count" barSize={20} fill="#FFD43D">
                    <LabelList dataKey="Count" position="right" />
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="mt-4 mb-3 fw-bold">Reviews</h3>
            {review.length > 0 &&
              review.map((element) => (
                <div className="categoryList my-3">
                  <div className="votes px-5">
                    <button className="like">
                      <i className="fa-regular fa-thumbs-up"></i>
                    </button>
                    <button className="dislike">
                      <i className="fa-regular fa-thumbs-down"></i>
                    </button>
                  </div>
                  <div className="reviewInfo my-3 pe-4">
                    <strong className="mt-3">Anonymous</strong>
                    <p className="stars">{"★".repeat(element[1])}</p>
                    <p>{element[0]}</p>
                    <div className="btn btn-secondary">{element[2]}</div>
                  </div>
                </div>
              ))}
            <ReviewDialog open={reviewOpen} setReviewOpen={setReviewOpen} />

            <div className="reviewContainer"></div>
          </div>
        </section>
      </main>
    </>
  );
};

function ReviewDialog(props) {
  const [club, setClub] = useState([]);
  const { open, setReviewOpen } = props;
  const { id } = useParams();
  const [idx, setIdx] = useState(0);
  const [stars, setStars] = useState(1);
  const [review, setReview] = useState("");
  const [tags, setTags] = useState("");
  const history = useNavigate();
  const [count, setCount] = useState(0);

  const fetchClub2 = async () => {
    const { data } = await axios.get(
      `https://ratemyclubunc-default-rtdb.firebaseio.com/clubs.json`
    );
    const theidx = data.indexOf(filterClub(data, id)[0]);
    const idx = filterClub(data, id)[0];

    setIdx(theidx);
    const clubData = filterClub(data, id)[0];
    setClub([clubData.name, clubData.link, clubData.reviews]);
  };

  useEffect(() => {
    fetchClub2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStarsChange = (e) => {
    e.preventDefault();

    setStars(parseInt(e.target.value));
  };
  const handleReviewChange = (e) => {
    setReview(e.target.value);
    setCount(e.target.value.length);
  };
  const handleTagChange = (e) => {
    e.preventDefault();

    setTags(e.target.value);
  };

  const postDB = (e) => {
    e.preventDefault();
    let current = club[2] ? club[2].length : 0;
    set(ref(db, `/clubs/${idx}/reviews/${current}`), {
      stars,
      review,
      tags,
    });
    setStars(0);
    setReview("");
    setTags("");
    setCount(0);
    setReviewOpen(false);
    console.log(club[1]);
    window.location.reload();
  };
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      className="modalBackground"
    >
      <div className="modalContainer reviewContainer">
        <button
          onClick={(event) => {
            setReviewOpen(false);
          }}
          className="close"
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
        <h1>{club[0]}</h1>
        <form className="reviewModal mb-3">
          <section className="form">
            <label for="leaveReview">Rate this club:</label>
            <fieldset value={stars} onChange={handleStarsChange} id="group1">
              <span class="star-cb-group">
                <input type="radio" id="rating-5" name="rating" value="5" />
                <label for="rating-5">5</label>
                <input type="radio" id="rating-4" name="rating" value="4" />
                <label for="rating-4">4</label>
                <input type="radio" id="rating-3" name="rating" value="3" />
                <label for="rating-3">3</label>
                <input type="radio" id="rating-2" name="rating" value="2" />
                <label for="rating-2">2</label>
                <input type="radio" id="rating-1" name="rating" value="1" />
                <label for="rating-1">1</label>
                <input
                  type="radio"
                  id="rating-0"
                  name="rating"
                  value="0"
                  class="star-cb-clear"
                />
                <label for="rating-0">0</label>
              </span>
            </fieldset>
            <label for="leaveReview">
              Select a descriptive tag: <span className="text-danger">*</span>
            </label>
            <fieldset
              value={tags}
              id="group2"
              onChange={handleTagChange}
              className="tagsReviewFieldset"
            >
              <span class="tagsReview">
                <input
                  type="radio"
                  id="tags-0"
                  name="tag"
                  value="Friendly"
                />
                <label for="tags-0">
                  <div className="btn btn-secondary">Friendly</div>
                </label>
                <input
                  type="radio"
                  id="tags-1"
                  name="tag"
                  value="Networking"
                />
                <label for="tags-1">
                  <div className="btn btn-secondary">Networking</div>
                </label>
                <input
                  type="radio"
                  id="tags-2"
                  name="tag"
                  value="Fun"
                />
                <label for="tags-2">
                  <div className="btn btn-secondary">Fun</div>
                </label>
                <input
                  type="radio"
                  id="tags-3"
                  name="tag"
                  value="Laid Back"
                />
                <label for="tags-3">
                  <div className="btn btn-secondary">Laid Back</div>
                </label>
                <input type="radio" id="tags-4" name="tag" value="Active" />
                <label for="tags-4">
                  <div className="btn btn-secondary">Active</div>
                </label>
                <input
                  type="radio"
                  id="tags-5"
                  name="tag"
                  value="Lots of Work"
                />
                <label for="tags-5">
                  <div className="btn btn-secondary">Lots of Work</div>
                </label>
                <input
                  type="radio"
                  id="tags-6"
                  name="tag"
                  value="Inactive"
                />
                <label for="tags-6">
                  <div className="btn btn-secondary">Inactive</div>
                </label>
                <input
                  type="radio"
                  id="tags-7"
                  name="tag"
                  value="Project Focused"
                />
                <label for="tags-7">
                  <div className="btn btn-secondary">Project Focused</div>
                </label>
              </span>
              
            </fieldset>
            <label for="leaveReview" className="mt-2">
              Write a review: <span className="text-danger">*</span>
            </label>
            <textarea
              className="leaveReviewText"
              id="textArea"
              rows="4"
              maxLength="250"
              value={review}
              placeholder="Leave your thoughts"
              style={{ padding: 10 }}
              onChange={handleReviewChange}
            ></textarea>
            <p className="text-end mt-2 mb-0 text-black-50 counter">
              {count} / 250
            </p>
            <button onClick={postDB} className="btn btn-primary submit-btn">
              Submit
            </button>
          </section>
        </form>
      </div>
    </Dialog>
  );
}

const filterClub = (arr, searchKey) => {
  return arr.filter((obj) =>
    Object.keys(obj).some((key) => obj[key].includes(searchKey))
  );
};

export default Club;
