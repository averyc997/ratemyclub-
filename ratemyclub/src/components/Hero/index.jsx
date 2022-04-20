import React from "react";

const Navbar = () => {
  return (
    <main>
      <section className="hero">
        <img src={"../img/logo-hero.png"} alt="RMC Logo" />
        <h3>UNC's unofficial club review site!</h3>
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
            <input
              type="search"
              placeholder="Search for a club..."
              aria-describedby="button-addon2"
              className="form-control border-0 bg-light"
            />
          </div>
        </div>
      </section>
      <section className="container">
        <h2 className="text-center pt-4 my-4">What is Rate My Club?</h2>
        <div className="d-flex intro-cntnr">
          <div className="px-4 text-center">
            <img src={"../img/intro-1.png"} alt="" />
            <p className="mt-2 p-2">
              <strong>Rate My Club!</strong> gives a platform for UNC students
              to rate UNC clubs!
            </p>
          </div>
          <div className="px-4 text-center">
            <img src={"../img/intro-2.png"} alt="" />
            <p className="mt-2 p-2">
              Are you a <strong>club leader?</strong> Add your UNC club to rate
              my club! for student feedback!
            </p>
          </div>
          <div className="px-4 text-center">
            <img src={"../img/intro-3.png"} alt="" />
            <p className="mt-2 p-2">
              <strong>Wanting to join a club?</strong> Search through rate my
              club! to find peer reviewed organizations!
            </p>
          </div>
        </div>
      </section>
      <section className="categories mb-4 pb-4">
        <h2 className="text-center pt-4 my-4">Featured Categories</h2>
        <div className="d-flex intro-cntnr">
          <div className="px-4 text-center">
            <a href="">
              <img src={"../img/sports.png"} alt="" />
            </a>
            <a href="">
              <strong>Sports</strong>
            </a>
          </div>
          <div className="px-4 text-center">
            <a href="">
              <img src={"../img/gaming.png"} alt="" />
            </a>
            <a href="">
              <strong>Gaming</strong>
            </a>
          </div>

          <div className="px-4 text-center">
            <a href="">
              <img src={"../img/service.png"} alt="" />
            </a>
            <a href="">
              <strong>Service</strong>
            </a>
          </div>
        </div>
        <div className="d-flex intro-cntnr">
          <div className="px-4 text-center">
            <a href="">
              <img src={"../img/greek.png"} alt="" />
            </a>
            <a href="">
              <strong>Greek Life</strong>
            </a>
          </div>
          <div className="px-4 text-center">
            <a href="">
              <img src={"../img/academic.png"} alt="" />
            </a>
            <a href="">
              <strong>Academic</strong>
            </a>
          </div>

          <div className="px-4 text-center">
            <a href="">
              <img src={"../img/globe.png"} alt="" />
            </a>
            <a href="">
              <strong>Cultural</strong>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Navbar;
