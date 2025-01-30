import styles from "./GamesGrid.module.css";
import notfound from "../../assets/notfound.jpeg";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext.js";
import { useState } from "react";

function GamesGrid({ games, setBackground }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className={styles.subcontainer}>
        <h1 className={styles.h1}>Meus jogos</h1>
        <h2 className={styles.h2p}>Olá, {user.username}</h2>
      </div>

      {games.length > 0 ? (
        <div className={styles.grid}>
          {games.map((game, index) => (
            <div
              key={index}
              className={styles.card}
              onMouseEnter={() => setBackground(game.coverurl)}
              onMouseLeave={() => setBackground("")}
              onClick={() => navigate(`/game/${game.gameid}/${game.title}`)}
            >
              <img
                src={game.coverurl || notfound}
                alt={`Capa de ${game.title}`}
                className={styles.img}
              />
              <h2 className={styles.h2}>{game.title}</h2>
            </div>
          ))}
        </div>
      ) : (
        <h3>Nenhum jogo cadastrado. Tente adicionar um à sua lista!</h3>
      )}
    </>
  );
}

export default GamesGrid;
