import React, {useState , useEffect} from "react";
import Searchbar from "../components/Searchbar";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL='https://ratemyclubunc-default-rtdb.firebaseio.com/clubs.json';

const Home = () => {
  const history = useNavigate();
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

  return (
    <>
      <main>
      <section className="hero">
        <img src={"../img/logo-hero.png"} alt="RMC Logo" />
        <h3>UNC's unofficial club review site!</h3>
       <Searchbar placeholder = "Search for clubs..." data={posts} />
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
          <div className="px-4 text-center" onClick={() => history(`/categories/Sports`, {id: 'Sports'})}>
            <a href="">
              <img src={"../img/sports.png"} alt="" />
            </a>
            <a href="">
              <strong>Sports</strong>
            </a>
          </div>
          <div className="px-4 text-center" onClick={() => history(`/categories/Gaming`)}>
            <a href="">
              <img src={"../img/gaming.png"} alt="" />
            </a>
            <a href="">
              <strong>Gaming</strong>
            </a>
          </div>

          <div className="px-4 text-center" onClick={() => history(`/categories/Service`)} >
            <a href="">
              <img src={"../img/service.png"} alt="" />
            </a>
            <a href="">
              <strong>Service</strong>
            </a>
          </div>
        </div>
        <div className="d-flex intro-cntnr">
          <div className="px-4 text-center" onClick={() => history(`/categories/Greek`)}>
            <a href="">
              <img src={"../img/greek.png"} alt="" />
            </a>
            <a href="">
              <strong>Greek Life</strong>
            </a>
          </div>
          <div className="px-4 text-center" onClick={() => history(`/categories/Academic`)}>
            <a href="">
              <img src={"../img/academic.png"} alt="" />
            </a>
            <a href="">
              <strong>Academic</strong>
            </a>
          </div>

          <div className="px-4 text-center" onClick={() => history(`/categories/Cultural`)}>
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
    </>
  );
};

export default Home;
