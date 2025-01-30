import axios from "axios";
import { toast } from "react-toastify";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export async function createUser({ username, email, password }) {
  try {
    const response = await axios.post(`${REACT_APP_BACKEND_URL}/register`, {
      username,
      email,
      password,
    });

    if (response.status === 201) {
      toast.success("Usuário criado com sucesso!");
      return response.data.user;
    }
  } catch (error) {
    console.error(
      "Erro ao criar usuário:",
      error.response?.data.error || error.message
    );
    toast.error(error.response?.data.error);
  }
}
