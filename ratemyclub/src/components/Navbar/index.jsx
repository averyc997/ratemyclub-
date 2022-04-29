import React, { useState, useContext, useEffect } from "react";
import { Dialog } from "@material-ui/core";
import "./Modal.scss";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { ref, set, onValue } from "firebase/database";
import { AuthContext } from "../../AuthProvider";

function SignupDialog(props) {
  const { open, setLoginOpen, setSignupOpen } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const onRegister = () => {
      if (emailRegex(email)) {
        createUserWithEmailAndPassword(auth, email, pass)
          .then((userInfo) => {
            set(ref(db, "/users/" + userInfo.user.uid), {
              firstName: firstName,
              lastName: lastName,
              email: email,
            });
          })
          .catch((err) => console.log(err));
        setSignupOpen(false);
      } else {
        alert('Input Error: Must email ending in "unc.edu"')
      }
    };
    onRegister();
  };
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
        <form onSubmit={handleSubmit}>
          <div className="form">
            <label for="email">UNC Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="d-flex my-3">
              <div>
                <label for="first name">First Name</label>
                <input
                  className="me-0"
                  placeholder="First Name"
                  type="first name"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                ></input>
              </div>
              <div className="ms-0">
                <label className="ms-0" for="last name">
                  Last Name
                </label>
                <input
                  placeholder="Last Name"
                  type="last name"
                  className="ms-0"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                ></input>
              </div>
            </div>
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
              required
            />
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

function LoginDialog(props) {
  const { open, setLoginOpen, setSignupOpen } = props;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = false;
    const onRegister = () => {
      signInWithEmailAndPassword(auth, email, pass).catch((err) => {
        alert(err);
        error = true;
      });
    };
    onRegister();
    if (!error) {
      setLoginOpen(false);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <section className="form">
            <label for="email">UNC Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
              required
            />
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

const Navbar = () => {
  //username: test@test.com
  //pass: test123
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [showBtn, setShowBtn] = useState(true);

  const handleLogin = (event) => {
    setLoginOpen(true);
  };

  const handleSignup = (event) => {
    setSignupOpen(true);
  };
  const history = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      const starCountRef = ref(db, "users/" + currentUser.uid);
      onValue(starCountRef, (snapshot) => {
        if (snapshot.exists()) {
          var data = snapshot.val();
          setUsername(data.firstName + " " + data.lastName);
        }
      });
      setShowBtn(false);
    } else {
      setShowBtn(true);
    }
  }, [currentUser]);
  const clickLogin = () => {
    if (currentUser) {
      signOut(auth);
    } else {
      handleLogin();
    }
  };
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
            <a onClick={() => history(`/create`)} href="create">
              Club Organizer?
            </a>
          </li>
        </ul>
        {currentUser && <p className="mb-0 me-4">Welcome, {username}</p>}
        <button className="btn btn-secondary" onClick={clickLogin}>
          {currentUser ? "Log Out" : "Log In"}
        </button>
        <button
          className={`btn btn-primary ${showBtn ? "" : "hide"}`}
          id="signUp"
          onClick={handleSignup}
        >
          {!currentUser ? "Sign Up" : ""}
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
function emailRegex(input) {
  let regex = /unc\.edu$/i;
  console.log(regex.test(input))
  return regex.test(input);
}

export default Navbar;
