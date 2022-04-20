import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CreateClub = () => {
  return (
    <>
      <Navbar />
      <main id="create" className="py-4">
        <section className="container">
          <div className="intro">
            <h1>Create your club!</h1>
            <p>
              Are you an executive member of a UNC club? Do you want to promote
              your club to reach it’s highest potential? Looking for more
              members to keep the club exciting? Rate my club! allows you as a
              club leader to add
            </p>
          </div>
          <section className="create-form">
            {/*  <form onSubmit={this.handleSubmit}>*/}
            <div className="row">
              <div className="col">
                <label>Club Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Club Name"
                  aria-label="First name"
                />
              </div>
              <div className="col">
                <label for="categoryInput">Club Category</label>
                <select name="category" id="" className="form-select">
                  <option selected>Select Category</option>
                  <option value="Sports">Sports</option>
                  <option value="Academic">Academic</option>
                  <option value="Greek">Greek</option>
                </select>
              </div>
            </div>

            <div className="w-75">
              <label for="formFile" className="form-label">
                Upload club image
              </label>
              <input className="form-control" type="file" id="formFile" />
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
                />
              </div>
              <div className="col socials">
                <i class="fa-solid fa-code"></i>{" "}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Website"
                  aria-label="Website"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col socials">
              <i class="fa-brands fa-facebook-square"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Facebook Handle"
                  aria-label="Facebook"
                />
              </div>
              <div className="col socials">
                <i class="fa-brands fa-instagram-square"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Instagram Handle"
                  aria-label="Instagram"
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
                ></textarea>
              </div>
            </div>
            {/*</form>*/}
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
