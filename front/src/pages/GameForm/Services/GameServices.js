import axios from "axios";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const categories = [
  "Ação e Aventura",
  "Esporte",
  "Corrida",
  "RPG",
  "FPS",
  "Luta",
  "Simulação",
  "Estratégia",
  "Plataforma",
];

export const getGameById = async (id) => {
  try {
    const response = await axios.get(`${REACT_APP_BACKEND_URL}/update/${id}`);
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

export const updateGame = async (id, gameData) => {
  try {
    await axios.put(`${REACT_APP_BACKEND_URL}/update/${id}`, gameData);
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

export const createGame = async (gameData) => {
  try {
    await axios.post(`${REACT_APP_BACKEND_URL}/form`, gameData);
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

export const fetchGameCover = async (title) => {
  try {
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: "9abafff436824bf3a1640143b627b58a",
        search: title,
      },
    });

    if (response.data.results.length > 0) {
      return response.data.results[0].background_image;
    }
    return null;
  } catch (error) {
    console.error(`Erro ao buscar a capa para o jogo ${title}:`, error);
    return null;
  }
};
