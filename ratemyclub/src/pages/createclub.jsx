import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { set, ref } from "@firebase/database";
import axios from "axios";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import Upload from "../components/Upload";

const API_URL = "https://ratemyclubunc-default-rtdb.firebaseio.com/clubs.json";

const CreateClub = () => {
  const params = useParams;

  const history = useNavigate();
  const [posts, setPosts] = useState([]);
  // Define the function that fetches the data from API
  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setPosts(data);
  };
  let [searchParams, setSearchParams] = useSearchParams();

  // Trigger the fetchData after the initial render by using the useEffect hook
  useEffect(() => {
    fetchData();
  }, []);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDesc] = useState("");
  const [fb, setFB] = useState("");
  const [insta, setInsta] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
    setLink(e.target.value.replace(/\s+/g, ""));
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
    setCount(e.target.value.length);
  };
  const handleInstaChange = (e) => {
    setInsta(e.target.value);
  };
  const handleFBChange = (e) => {
    setFB(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleWebsiteChange = (e) => {
    setWebsite(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const postDB = (e) => {
    let errors = {};
    e.preventDefault();
  
    if (!name.trim()) {
      errors.name = "Club name required";
    }
    if (!category) {
      errors.category = "Please select category";
    }
    if (!email) {
      errors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please check email format";
    }
    if (!description) {
      errors.description = "Description is required";
    } else if (description.length < 20) {
      errors.description = "Description needs to be 20 characters or more";
    }
    if (Object.keys(errors).length !== 0) {
      alert(`Invalid entry: ${Object.values(errors)[0]}`);
      return;
    }
    const img = window.location.search.slice(1)
    set(ref(db, `/clubs/${posts.length}`), {
      name,
      description,
      website,
      email,
      link,
      fb,
      category,
      insta,
      img
    });
    setName("");
    setCategory("");
    setInsta("");
    setDesc("");
    setFB("");
    setWebsite("");
    setEmail("");
    setLink("");
    setCount(0);
    alert(`${name} has been added`);
    history(`/club/${link}`);
  };

  return (
    <>
      <main id="create" className="py-4">
        <section className="container">
          <div className="intro">
            <h1 className="mt-4">Create your club!</h1>
            <p>
              Are you an executive member of a UNC club? Do you want to promote
              your club to reach it’s highest potential? Looking for more
              members to keep the club exciting? Rate my club! allows you as a
              club leader to add
            </p>
          </div>
          <section className="create-form">
            <div className="row">
              <div className="col">
                <label>
                  Club Name<span className="text-danger">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  className="form-control"
                  placeholder="Club Name"
                  aria-label="First name"
                  id="name-input"
                  onChange={handleNameChange}
                />
              </div>
              <div className="col">
                <label for="categoryInput">
                  Club Category<span className="text-danger">*</span>
                </label>
                <select
                  name="category"
                  id=""
                  className="form-select"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option selected>Select Category</option>
                  <option value="Academic">Academic</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Greek">Greek Life</option>
                  <option value="Sports">Sports</option>
                  <option value="Service">Service</option>
                </select>
              </div>
            </div>
            <Upload />

            <div className="row">
              <strong>Contact Information</strong>
              <div className="col socials">
                <i className="fa-solid fa-envelope-open-text"></i>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Club Email"
                  aria-label="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="col socials">
                <i className="fa-solid fa-code"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Website"
                  aria-label="Website"
                  value={website}
                  onChange={handleWebsiteChange}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col socials">
                <i className="fa-brands fa-facebook-square"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Facebook Link"
                  aria-label="Facebook"
                  value={fb}
                  onChange={handleFBChange}
                />
              </div>
              <div className="col socials">
                <i className="fa-brands fa-instagram-square"></i>
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder="Instagram Link"
                  aria-label="Instagram"
                  value={insta}
                  onChange={handleInstaChange}
                />
              </div>
            </div>
            <div>
              <div className="form-outline w-100">
                <label className="form-label" for="textArea">
                  Club Description<span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="textArea"
                  rows="5"
                  maxLength="500"
                  value={description}
                  onChange={handleDescChange}
                ></textarea>
                <p className="text-end mt-2 mb-0 text-black-50">
                  {count} / 500
                </p>
              </div>
            </div>
            <button onClick={postDB} className="btn btn-primary mb-3">
              Submit Form
            </button>
          </section>
        </section>
      </main>
    </>
  );
};

export default CreateClub;
