import { Navigate, useNavigate, useParams } from "react-router-dom";
import styles from "./DeleteConfirmation.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContext/AuthContext.js";

import { useEffect, useState } from "react";

function DeleteConfirmation() {
  const params = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState({});

  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const { user } = useAuth();

  useEffect(() => {
    const getGame = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_BACKEND_URL}/delete/${params.id}`
        );
        const gameData = response.data.length > 0 ? response.data[0] : null; // Extrai o primeiro jogo do array
        setGame(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error(
          `Erro ao buscar jogo: ${error.response?.data || error.message}`
        );
      }
    };
    getGame();
  }, [params.id]); // Incluímos apenas params.id como dependência

  const handleDelete = async () => {
    await axios
      .delete(`${REACT_APP_BACKEND_URL}/delete/${params.id}`)
      .then(({ data }) => {
        toast.success("Jogo excluído com sucesso!");
      });
    navigate("/");
  };

  if (!user) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <title>{`Excluir ${game.title}`}</title>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1.0)), url(${game.coverurl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1, // Garante que fique atrás de todo o conteúdo
        }}
      ></div>

      <div className={styles.container}>
        <h2>
          Tem certeza que deseja excluir <strong>{game.title}</strong>?
        </h2>
        <text className={styles.text}>
          Esta é uma ação irreversível e será necessário adicionar o jogo
          novamente à sua lista
        </text>
        <div className={styles.buttonContainer}>
          <button
            className={styles.deleteButton}
            onClick={() => {
              handleDelete();
            }}
          >
            Excluir
          </button>

          <button
            className={styles.backButton}
            onClick={() => {
              navigate(-1);
            }}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
