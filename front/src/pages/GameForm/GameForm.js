import { Navigate, useNavigate, useParams } from "react-router-dom";
import styles from "./GameForm.module.css";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { categories, fetchGameCover } from "./Services/GameServices.js";

import { toast, ToastContainer } from "react-toastify";

import Loader from "../../components/Loader/Loader.js";

import { useAuth } from "../../AuthContext/AuthContext.js";
import Background from "../../components/Background/Background.js";
import Footer from "../../components/Footer/Footer.js";
function isSomeFieldMissing(game) {
  if (
    !game.title.value ||
    !game.description.value ||
    !game.category.value ||
    !game.developer.value
  ) {
    return toast.warn("Preencha todos os campos!");
  }
}

function GameForm() {
  const [developers, setDevelopers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDeveloper, setSelectedDeveloper] = useState("");

  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiDevelopers = await axios.get(
          "https://api.rawg.io/api/developers",
          {
            params: {
              key: "9abafff436824bf3a1640143b627b58a",
              page_size: 200,
            },
          }
        );

        if (apiDevelopers.data.results.length > 0) {
          setDevelopers(apiDevelopers.data.results);
          setIsLoading(false);
        } else {
          console.warn(`Nenhuma informação encontrada`);
        }
      } catch (error) {
        if (error.response) {
          console.error(
            `Erro na requisição: ${error.response.data || error.message}`
          );
          setDevelopers([]);
        } else {
          console.error(`Erro ao buscar jogo: ${error.message}`);
        }
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const params = useParams();

  // Será true se for detectado um ID nos parâmetros da URL, que indica que um jogo está sendo editado
  const isUpdating = Boolean(params.id);

  // Armazena o game que está sendo editado
  const [updatedGame, setUpdatedGame] = useState({});

  // Há um ref dentro do formulário, que é utilizado para acessar os campos do formulário
  const ref = useRef();
  // Atribui esse ref do formulário à variável game para facilitar o manuseio dos dados
  const game = ref.current;

  // Se estiver atualizando, busca o jogo no banco de dados para obter os seus dados, e utilizando o setUpdatedGame
  // Salva o jogo em updatedGame
  useEffect(() => {
    if (isUpdating) {
      const getGame = async () => {
        try {
          const response = await axios.get(
            `${REACT_APP_BACKEND_URL}/update/${params.id}`
          );
          setUpdatedGame(response.data);
        } catch (error) {
          toast.error(
            `Erro ao buscar jogo: ${error.response.data || error.message}`
          );
        }
      };
      getGame();
    }
  }, [isUpdating, params.id]);

  // Se algum jogo estiver sendo atualizado, preenche os campos do formulário
  useEffect(() => {
    if (isUpdating) {
      ref.current.title.value = updatedGame.title;
      ref.current.description.value = updatedGame.description;
      ref.current.category.value = updatedGame.category;
      setSelectedDeveloper(updatedGame.developer);
    }
  }, [updatedGame, isUpdating]); // Isso são as dependências do useEffect

  const handleUpdate = async (e) => {
    e.preventDefault();

    isSomeFieldMissing(game);

    let gameURL = await fetchGameCover(game.title.value);

    try {
      await axios.put(`${REACT_APP_BACKEND_URL}/update/${params.id}`, {
        title: game.title.value,
        description: game.description.value,
        category: game.category.value,
        developer: game.developer.value,
        coverURL: gameURL,
      });
      toast.success(game.title.value + " atualizado com sucesso!");
      game.reset();
      navigate("/");
    } catch (error) {
      toast.error("Erro ao atualizar jogo: " + error.response || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    isSomeFieldMissing(game);

    let gameURL = await fetchGameCover(game.title.value);

    try {
      await axios.post(`${REACT_APP_BACKEND_URL}/form`, {
        title: game.title.value,
        description: game.description.value,
        category: game.category.value,
        developer: game.developer.value,
        coverURL: gameURL,
        userID: user.id,
      });
      toast.success(game.title.value + " adicionado com sucesso!");
      game.reset();
      navigate("/");
    } catch (error) {
      toast.error("Erro ao cadastrar jogo: " + error.response || error.message);
    }
  };

  if (!user) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <title>
        {isUpdating ? `Atualização de ${updatedGame.title}` : "Novo Jogo"}
      </title>

      {isUpdating ? <Background url={updatedGame.coverurl} /> : null}

      <div className={styles.header}>
        <h1 className={styles.h1}>
          {isUpdating ? `${updatedGame.title}` : "Adição de Novo Jogo"}
        </h1>
        <text id="subtitle" className={styles.text}>
          {isUpdating
            ? `Atualize as informações de ${updatedGame.title}`
            : "Adicione o seu jogo favorito a sua lista"}
        </text>
      </div>
      <section>
        <form
          className={styles.form}
          ref={ref}
          onSubmit={isUpdating ? handleUpdate : handleSubmit}
        >
          <label className={styles.label}>Titulo</label>
          <input
            className={styles.input}
            type="text"
            name="title"
            placeholder="Digite o titulo do jogo"
            required
          />
          <label className={styles.label}>Descrição</label>
          <textarea
            rows={4}
            cols={50}
            className={styles.input}
            type="text"
            name="description"
            placeholder="Digite a descrição do jogo"
            required
          />

          <label className={styles.label}>Categoria</label>

          <select className={styles.category} name="category" required>
            <option value="-">Escolha a categoria do jogo</option>
            {categories.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </select>

          <label className={styles.label}>Desenvolvedora</label>

          {isLoading ? (
            <Loader />
          ) : (
            <>
              <select
                value={selectedDeveloper}
                onChange={(e) => setSelectedDeveloper(e.target.value)}
                className={styles.category}
                name="developer"
                required
              >
                <option value="-">Escolha a desenvolvedora do jogo</option>
                {developers.map((developer) => {
                  return (
                    <option key={developer.name} value={developer.name}>
                      {developer.name}
                    </option>
                  );
                })}
              </select>
            </>
          )}

          <button className={styles.button} type="submit">
            {isUpdating ? "Atualizar" : "Enviar"}
          </button>
          <button
            type="button"
            className={styles.backbutton}
            onClick={() => (isUpdating ? navigate(-1) : navigate("/"))}
          >
            Voltar
          </button>
        </form>

        <ToastContainer autoClose={3000} position="bottom-left" />
      </section>
    </>
  );
}

export default GameForm;
