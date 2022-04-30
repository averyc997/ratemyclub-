import React, {useState , useEffect} from "react";
import Searchbar from "../components/Searchbar";
import Intro from "../components/Intro";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL='https://ratemyclubunc-default-rtdb.firebaseio.com/clubs.json';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const history = useNavigate();

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setPosts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main>
      <section className="hero">
        <img src={"../img/logo-hero.png"} alt="RMC Logo" />
        <h3>UNC's unofficial club review site!</h3>
       <Searchbar data={posts} />
      </section>
      <Intro />
    </main>
    </>
  );
};

export default Home;
