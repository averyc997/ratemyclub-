import React, {useState, useEffect} from "react";
import {db} from "../firebase";
import { set , ref } from "@firebase/database";
import axios from 'axios';

const API_URL='https://ratemyclubunc-default-rtdb.firebaseio.com/clubs.json';
const CreateClub = () => {
  const [posts, setPosts] = useState([]);
  // Define the function that fetches the data from API
  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setPosts(data);
  };

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
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const handleNameChange = (e) =>{
    setName(e.target.value)
    setLink(e.target.value.replace(/\s+/g, ''))
  }
  const handleDescChange = (e) =>{
    setDesc(e.target.value)
    setCount(e.target.value.length)
  }
  const handleInstaChange = (e) =>{
    setInsta(e.target.value)
  }
  const handleFBChange = (e) =>{
    setFB(e.target.value)
  }
  const handleEmailChange = (e) =>{
    setEmail(e.target.value)
  }
  const handleWebsiteChange = (e) =>{
    setWebsite(e.target.value)
  }
  const handleImgChange = (e) =>{
    setImg(e.target.value)
  }
  const handleCategoryChange = (e) =>{
    setCategory(e.target.value)
  }

  const postDB = () =>{
    set(ref(db, `/clubs/${posts.length}`),{
      name,
      description,
      website,
      email,
      link,
      fb,
      category,
      insta,
    });
    setName("");
    setCategory("");
    setInsta("");
    setDesc("");
    setFB("");
    setWebsite("");
    setEmail("");
  }

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
                <label>Club Name</label>
                <input
                  type="text"
                  value={name}
                  className="form-control"
                  placeholder="Club Name"
                  aria-label="First name"
                  onChange={handleNameChange}
                />
              </div>
              <div className="col">
                <label for="categoryInput">Club Category</label>
                <select name="category" id="" className="form-select"
                                  value={category}
                                  onChange={handleCategoryChange}>
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
            <div className="w-75">
              <label for="formFile" className="form-label">
                Upload club image
              </label>
              <input className="form-control" type="file" id="formFile"
          />
            </div>

            <div className="row">
              <strong>Contact Information</strong>
              <div className="col socials">
                <i class="fa-solid fa-envelope-open-text"></i>
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
                <i class="fa-solid fa-code"></i>
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
              <i class="fa-brands fa-facebook-square"></i>
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
                <i class="fa-brands fa-instagram-square"></i>
                <input
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
                  Club Description
                </label>
                <textarea
                  className="form-control"
                  id="textArea"
                  rows="5"
                  maxLength="350"
                  value={description}
                  onChange={handleDescChange}
                ></textarea>
                <p className= "text-end mt-2 mb-0 text-black-50">{count} / 350</p>
              </div>
            </div>
            <button onClick = {postDB} className="btn btn-primary mb-3">Submit Form</button>
          </section>
        </section>
      </main>
    </>
  );
};

export default CreateClub;

{
  /*
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  className="form-control"
                  id="nameImput"
                  placeholder="Club Name"
                />
              </div>
              <div className="form-group">
                <label for="categoryImput">Club Category</label>
                <input
                  name="text"
                  type="category"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="form-control"
                  id="emailImput"
                  placeholder="Club Category"
                />
*/
}
