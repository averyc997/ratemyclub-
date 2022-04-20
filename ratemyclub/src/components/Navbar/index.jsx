import React, { useState } from "react";
import "./Modal.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <Modal isOpen={setIsOpen} />}
      <nav>
        <a href="../">
          <img src="./img/logo-header.png" alt="" />
        </a>
        <ul>
          <li>
            <a href="">Categories</a>
          </li>
          <li>
            <a href="./create">Club Organizer?</a>
          </li>
        </ul>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Log In
        </button>
        <button className="btn btn-primary">Sign Up</button>
      </nav>
    </>
  );
};

const suModal = ({ isOpen }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="close" onClick={() => isOpen(false)}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
        <h1>Sign Up</h1>
        <label for="email">Email</label>
        <input type="email" placeholder="Email" />
        <label for="password">Password</label>
        <input type="password" placeholder="password" />
        <button className="btn btn-primary">Continue</button>
        <div>
          <p>Dont have an account yet?</p>
          <a href="" onClick={() => isOpen(false)}>
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};
const Modal = ({ isOpen }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="close" onClick={() => isOpen(false)}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
        <h1>Log In</h1>
        <label for="email">Email</label>
        <input type="email" placeholder="Email" />
        <label for="password">Password</label>
        <input type="password" placeholder="password" />
        <button className="btn btn-primary">Continue</button>
        <div>
          <p>Dont have an account yet?</p>
          <a href="">Sign Up!</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
