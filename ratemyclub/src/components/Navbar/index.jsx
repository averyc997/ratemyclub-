import React, { useState } from "react";
import { Dialog } from "@material-ui/core";
import "./Modal.scss";
import { useNavigate } from 'react-router-dom';

function LoginDialog(props) {
  const { open, setLoginOpen, setSignupOpen } = props;

  const switchSignup = (event) => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      className="modalBackground"
    >
      <div className="modalContainer">
        <button
          onClick={(event) => {
            setLoginOpen(false);
          }}
          className="close"
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
        <h1>Log In</h1>
        <form action="put" method="#">
          <section className="form">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Email" />
            <label for="password">Password</label>
            <input type="password" placeholder="Password" />
            <button className="btn btn-primary">Continue</button>
          </section>
        </form>
        <section className="footer">
          <p>Dont have an account yet?</p>
          <button onClick={switchSignup}>Sign Up</button>
        </section>
      </div>
    </Dialog>
  );
}

function SignupDialog(props) {
  const { open, setLoginOpen, setSignupOpen } = props;

  const switchLogin = (event) => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      className="modalBackground"
    >
      <div className="modalContainer">
        <button
          className="close"
          onClick={(event) => {
            setSignupOpen(false);
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
        <h1>Sign Up</h1>
        <form action="put" method="#">
          <div className="form">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Email" />
            <label for="password">Password</label>
            <input type="password" placeholder="Password" />
            <button className="btn btn-primary">Continue</button>
          </div>
        </form>

        <section className="footer">
          <p>Already have an account?</p>
          <button onClick={switchLogin}>Log In</button>
        </section>
      </div>
    </Dialog>
  );
}

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const handleLogin = (event) => {
    setLoginOpen(true);
  };

  const handleSignup = (event) => {
    setSignupOpen(true);
  };
  const history = useNavigate();

  return (
    <>
      <nav>
        <a href="../">
          <img src="https://ratemyclubunc.web.app/img/logo-header.png" alt="" />
        </a>
        <ul>
          <li>
            <div className="btn-group">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="defaultDropdown"
                data-bs-toggle="dropdown"
                data-bs-auto-close="true"
                aria-expanded="false"
              >
                Categories
              </button>
              <ul className="dropdown-menu" aria-labelledby="defaultDropdown">
                <li onClick={() => history(`/categories/Academic`)}>
                  <a className="dropdown-item" href="">
                    Academic
                  </a>
                </li>
                <li onClick={() => history(`/categories/Cultural`)}>
                  <a className="dropdown-item" href="">
                    Cultural
                  </a>
                </li>
                <li onClick={() => history(`/categories/Gaming`)}>
                  <a className="dropdown-item" href="">
                    Gaming
                  </a>
                </li>
                <li onClick={() => history(`/categories/Greek`)}>
                  <a className="dropdown-item" href="">
                    Greek Life
                  </a>
                </li>
                <li onClick={() => history(`/categories/Service`)}>
                  <a className="dropdown-item" href="">
                    Service
                  </a>
                </li>
                <li onClick={() => history(`/categories/Sports`)}>
                  <a className="dropdown-item" href="">
                    Sports
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a onClick={() => history(`/create`)} href="create">Club Organizer?</a>
          </li>
        </ul>
        <button className="btn btn-secondary" onClick={handleLogin}>
          Log In
        </button>
        <button className="btn btn-primary" onClick={handleSignup}>
          Sign Up
        </button>
        <LoginDialog
          open={loginOpen}
          setLoginOpen={setLoginOpen}
          setSignupOpen={setSignupOpen}
        />
        <SignupDialog
          open={signupOpen}
          setLoginOpen={setLoginOpen}
          setSignupOpen={setSignupOpen}
        />
      </nav>
    </>
  );
};

export default Navbar;
