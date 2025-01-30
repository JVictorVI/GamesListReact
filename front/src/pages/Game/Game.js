import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Game.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import Loader from "../../components/Loader/Loader.js";
import Metacritic from "../../components/Metacritic/Metacritic.js";
import Background from "../../components/Background/Background.js";
import Footer from "../../components/Footer/Footer.js";

function formatDateToBR(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

function Game() {
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(true);

  const [gameDB, setGameDB] = useState({});
  const [gameAPI, setGameAPI] = useState({});

  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch game data from RAWG API
        const apiResponse = await axios.get("https://api.rawg.io/api/games", {
          params: {
            key: "9abafff436824bf3a1640143b627b58a",
            search: params.title,
            page_size: 100,
          },
        });

        if (apiResponse.data.results.length > 0) {
          const gameAPIData = apiResponse.data.results[0];
          // console.log(gameAPIData);
          setGameAPI(gameAPIData);
        } else {
          console.warn(
            `Nenhum jogo encontrado na RAWG API para: ${params.title}`
          );
        }

        // Fetch game data from local backend
        const dbResponse = await axios.get(
          `${REACT_APP_BACKEND_URL}/game/${params.id}/${params.title}`
        );

        // console.log(dbResponse.data);
        setGameDB(dbResponse.data);

        setLoading(false);
      } catch (error) {
        if (error.response) {
          console.error(
            `Erro na requisição: ${error.response.data || error.message}`
          );
          toast.error(
            `Erro ao buscar jogo: ${error.response.data || error.message}`
          );
        } else {
          console.error(`Erro ao buscar jogo: ${error.message}`);
          toast.error(`Erro ao buscar jogo: ${error.message}`);
        }
      }
    };

    fetchData();
  }, [params.id, params.title]);

  return (
    <>
      <title>{gameAPI.name}</title>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.Game}>
          <Background url={gameDB.coverurl} />

          <div className={styles.CoverContainer}>
            <div className={styles.ImageAndText}>
              <img
                className={styles.GameCover}
                src={gameAPI.background_image}
                alt={gameAPI.name}
              />

              <div className={styles.TextContainer}>
                <h1>{gameAPI.name}</h1>
                <p>{gameDB.description}</p>

                <h3>Data de Lançamento</h3>
                <p>{formatDateToBR(gameAPI.released)}</p>

                <h3>Plataformas</h3>
                <p>
                  {gameAPI.platforms.map((platform, index) => (
                    <span key={platform.platform.id}>
                      {platform.platform.name.split("  ")[0]}
                      {index < gameAPI.platforms.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <h4>Desenvolvedora</h4>
                <p>{gameDB.developer}</p>

                <h4>Categoria</h4>
                <p>
                  {gameAPI.genres.map((genre, index) => (
                    <span key={genre.id}>
                      {genre.name.split("  ")[0]}
                      {index < gameAPI.genres.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className={styles.buttonsContainer}>
              <button
                className={styles.BackButton}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Voltar
              </button>
              <Link to={`/update/${gameDB.gameid}`}>
                <button className={styles.UpdateButton}>Atualizar</button>
              </Link>
              <Link to={`/delete/${gameDB.gameid}`}>
                <button className={styles.DeleteButton}>Deletar</button>
              </Link>
            </div>
          </div>

          <Metacritic score={gameAPI.metacritic} />

          <h1>Capturas</h1>
          <div className={styles.ScreenshotsContainer}>
            {gameAPI.short_screenshots.map((screenshot, index) =>
              index > 0 ? (
                <img src={screenshot.image} alt={screenshot.name}></img>
              ) : null
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default Game;
