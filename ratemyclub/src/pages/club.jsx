import React, { useState, useEffect, PureComponent } from "react";
import { Dialog } from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
let starAverage = 0;
let starArr = []
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
    console.log(data);
    let clubData = filterClub(data, id)[0];
    console.log(clubData.reviews)
    let reviewTotal = average(clubData.reviews);
    starArr = starNumber(clubData.reviews)
    starAverage = reviewTotal
    console.log(clubData.name);
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
      name: 'Awesome',
      Stars: starArr[4],
    },
    {
      name: 'Great',
      Stars: starArr[3],
    },
    {
      name: 'Good',
      Stars: starArr[2],
    },
    {
      name: 'Okay',
      Stars: starArr[1],
    },
    {
      name: 'Needs work',
      Stars: starArr[0],
    },

  ];

  return (
    <>
      <main id="club" className="py-4">
        <section className="container">
          <div className="row club">
            <div className="col clubber">
              <div className="clubTop">
                <img className="clubImg" src={club[4]}></img>
                <h1 className="clubTitle">{club[0]}</h1>
              </div>
              <div className="socials d-flex flex-row">
                <a href={club[7]} target="_blank">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href={club[6]} target="_blank">
                  <i className="fa-brands fa-facebook-square"></i>
                </a>
                <a href={`mailto:${club[3]}`}>
                  <i className="fa-regular fa-envelope"></i>
                </a>
                <a href={club[5]} target="_blank">
                  <i className="fa-solid fa-code"></i>
                </a>
              </div>
              <div className="d-flex my-3 gap-2">
                <div className="tags btn-secondary btn">tag</div>
                <div className="tags btn-secondary btn">tag</div>
              </div>
              <div className="clubDescr">
                <p>{club[1]}</p>
              </div>
              <button
                className="rateClub btn btn-primary"
                onClick={handleReview}
              >
                Rate this club!!!!!
              </button>
            </div>
            <div className="col histogram">


              <p id="Ssize">{starAverage}</p>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  layout="vertical"
                  width={1000}
                  height={300}
                  data={data}
                  margin={{
                    top: 2,
                    right: 20,
                    bottom: 100,
                    left: 20,
                  }}
                >

                  <XAxis type="number" stroke="#FFFF" />
                  <YAxis dataKey="name" type="category" scale="band" />
                  <Tooltip />



                  <Bar dataKey="Stars" barSize={20} fill="#FFD43D"><LabelList dataKey="Stars" position="right" /></Bar>

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
                    <i className="fa-regular fa-thumbs-up"></i>
                    <i className="fa-regular fa-thumbs-down"></i>
                  </div>
                  <div className="reviewInfo my-3">
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
  const { open, setReviewOpen } = props;
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      className="modalBackground"
    >
      <div className="modalContainer">
        <button
          onClick={(event) => {
            setReviewOpen(false);
          }}
          className="close"
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
        <h1>Rate: Totally fake club</h1>
        <p>Rate this club:</p>
        <form action="put" method="#">
          <section className="form">
            <label for="leaveReview">Write a review</label>
            <input type="" name="" id="" placeholder="" />
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
const average = (review) => {
  if (review == null) {
    return "No reviews yet :(";
  }
  console.log(review)
  let i = 0;
  let count = 0;
  for (let j = 0; j <= review.length - 1; j++) {
    i += review[j].stars
    count++
  }
  let ratio = i / count
  return (Math.round(ratio * 10.0) / 10.0) + "/5";
}
const starNumber = (review) => {

  let starArray = [0, 0, 0, 0, 0]
  if (review == null) {
    return starArray;
  }
  for (let j = 0; j <= review.length - 1; j++) {
    if (review[j].stars === 1) {
      starArray[0]++
    }
    if (review[j].stars === 2) {
      starArray[1]++
    }
    if (review[j].stars === 3) {
      starArray[2]++
    }
    if (review[j].stars === 4) {
      starArray[3]++
    }
    if (review[j].stars === 5) {
      starArray[4]++
    }
  }
  return starArray
  //take in review, go to review[j] star, do check, update the count, return variables 
}

export default Club;
