import React, { useState, useEffect } from "react";
import { Dialog } from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from 'axios';

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
    console.log(clubData.name)
    let reviewsArr = clubData.reviews

    const arr = reviewsArr.map((element) => {
      return [element.review, element.stars, element.tags];
    });
    console.log(arr)
   setClub([
      clubData.name,
      clubData.description,
      clubData.category,
      clubData.email,
      clubData.img,
      clubData.website,
      clubData.fb,
      clubData.insta
    ]);
    setReview(arr)
  };

  useEffect(() => {
    fetchClub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main id="club" className="py-4">
        <section className="container">
          <div className="row club">
            <div>
              <div className = "clubTop">
                  <img className="clubImg" src={club[4]}></img>
                  <h1 className="clubTitle">{club[0]}</h1>
              </div>
              <div className="socials d-flex flex-row">
                  <a href="">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="">
                    <i className="fa-brands fa-facebook-square"></i>
                  </a>
                  <a href="">
                    <i className="fa-regular fa-envelope"></i>
                  </a>
                  <a href="">
                    <i className="fa-solid fa-code"></i>
                  </a>
              </div>
              <div className="d-flex my-3 gap-2">
                <div className="tags btn-secondary btn">
                  tag
                </div>
                <div className="tags btn-secondary btn">
                  tag
                </div>
              </div>
              <div className="clubDescr"><p>{club[1]}</p></div>
              <button className="rateClub btn btn-primary" onClick={handleReview}>
                Rate this club!
              </button>
            </div>
            {review.map((element) => (
            <div className="categoryList my-4">
              <h3>{element[0]}</h3> {element[1]}{element[2]}
            </div>
          ))}
            <ReviewDialog open={reviewOpen} setReviewOpen={setReviewOpen} />
            <div className="col clubRight">
              <div className="histContainer">
                <img className="clubHist"></img>
              </div>
            </div>
            <div className="reviewContainer">
              <h2>Reviews</h2>
            </div>
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
  return arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)));
}

export default Club;
