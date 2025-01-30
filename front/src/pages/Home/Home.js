import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import styles from "./Home.module.css";
import Container from "../../components/Container/Container.js";
import GamesGrid from "../../components/GamesGrid/GamesGrid.js";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader.js";
import Navbar from "../../components/Navbar/Navbar.js";
import Background from "../../components/Background/Background.js";

import { useAuth } from "../../AuthContext/AuthContext.js";

function Home() {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [background, setBackground] = useState("");

  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const { user } = useAuth();

  const getGames = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${REACT_APP_BACKEND_URL}`, {
        user: user.id,
      });
      setGames(response.data);
    } catch (error) {
      toast.error("Erro ao buscar jogos: " + error.response || error.message);
    }
    setLoading(false);
  };

  // Busca os usuários ao carregar a página
  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="App">
      <Background url={background} />
      <Container>
        <title>Home</title>
        <Navbar />
        {loading ? (
          <Loader />
        ) : (
          <GamesGrid games={games} setBackground={setBackground} />
        )}
      </Container>
      <Link to="/form">
        <button className={styles.floatbutton}>Adicionar</button>
      </Link>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </div>
  );
}

export default Home;
