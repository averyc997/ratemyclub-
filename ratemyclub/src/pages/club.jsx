import React, { useState, useEffect } from "react";
import { Dialog } from "@material-ui/core";
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';

const Club = () => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [club, setClub] = useState([]);
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
                    <i className="fa-brands fa-instagram-square"></i>
                  </a>
                  <a href="">
                    <i className="fa-brands fa-facebook-square"></i>
                  </a>
                  <a href="">
                    <i className="fa-solid fa-envelope-open-text"></i>
                  </a>
                  <a href="">
                    <i className="fa-solid fa-code"></i>
                  </a>
              </div>
              <div className="row">
                <div className="tags">
                  <p>tag</p>
                </div>
                <div className="tags">
                  <p>tag</p>
                </div>
              </div>
              <p className="clubDescrip">{club[1]}</p>
              <button className="rateClub" onClick={handleReview}>
                Rate this club!
              </button>
            </div>
            <ReviewDialog open={reviewOpen} setReviewOpen={setReviewOpen} />
            <div className="col clubRight">
              <div className="histContainer">
                <img className="clubHist"></img>
              </div>
            </div>
            <div className="reviewContainer">
              <h1>Reviews</h1>
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
