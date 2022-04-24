import React from "react";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import { Dialog } from "@material-ui/core";
import "./Modal.scss";

const Club = () => {

  const [reviewOpen, setReviewOpen] = useState(false);

  const handleReview = (event) => {
    setReviewOpen(true);
  };

    return (
        <>
          <Navbar />
          <main id="club" className="py-4">
            <section className="container">
              <div className="club">
                <div className="clubLeft">
                  <div className="row">
                    <img className="clubImg"></img>
                    <h1 className="clubTitle">Completely Fake Club</h1>
                    <img className="share"></img>
                  </div>
                  <div className="row">
                    <img className="fb"></img>
                    <img className="email"></img>
                    <img className="insta"></img>
                    <img className="website"></img>
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
                <reviewDialog
                  open={reviewOpen}
                  setReviewOpen={setReviewOpen}
                />
                <div className="clubRight">
                  <div className="histContainer">
                    <img className="clubHist"></img>
                  </div>
                </div>
                <div className="reviewContainer">

                </div>
              </div>
            </section>
          </main>
        </>
      );
}

function reviewDialog(props) {
  const { open, setReviewOpen} = props;

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
        <form action="put" method="#">
          <section className="form">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Email" />
            <label for="password">Password</label>
            <input type="password" placeholder="Password" />
            <button className="btn btn-primary">Continue</button>
          </section>
        </form>
      </div>
    </Dialog>
  );
}



export default Club;
