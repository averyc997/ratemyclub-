import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Dialog } from "@material-ui/core";

const Club = () => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const handleReview = (event) => {
    setReviewOpen(true);
  };
  return (
    <>
      <main id="club" className="py-4">
        <section className="container">
          <div className="row club">
            <div className="col clubLeft">
              <div className="row">
                <div className="col">
                  <img className="clubImg"></img>
                </div>
                <div className="col">
                  <h1 className="clubTitle">Completely Fake Club</h1>
                </div>
                <div className="col">
                  <img className="share"></img>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <a href=""><i class="fa-brands fa-instagram-square"></i></a>
                </div>
                <div className="col">
                  <a href=""><i class="fa-brands fa-facebook-square"></i></a>
                </div>
                <div className="col">
                  <a href=""><i class="fa-solid fa-envelope-open-text"></i></a>
                </div>
                <div className="col">
                  <a href=""><i class="fa-solid fa-code"></i></a>
                </div>
              </div>
              <div className="row">
                <div className="tags">
                  <p>tag</p>
                </div>
                <div className="tags">
                  <p>tag</p>
                </div>
              </div>
              <p className="clubDescrip">A club description.</p>
              <button className="rateClub" onClick={handleReview}>Rate this club!</button>
            </div>
            <ReviewDialog
              open={reviewOpen}
              setReviewOpen={setReviewOpen}
            />
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
}

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
          <i class="fa fa-times" aria-hidden="true"></i>
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

export default Club;