import axios from "axios";
import { toast } from "react-toastify";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export async function doLogin({ email, password }) {
  try {
    const response = await axios.post(`${REACT_APP_BACKEND_URL}/login`, {
      email,
      password,
    });

    if (response.data.user) {
      toast.success("Usuário logado com sucesso!");
      return response.data.user;
    }
  } catch (error) {
    console.error(
      "Erro ao logar usuário:",
      error.response?.data.error || error.message
    );
    toast.error(error.response?.data.error);
  }
}
