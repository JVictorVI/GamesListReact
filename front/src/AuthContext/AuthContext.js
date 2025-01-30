import axios from "axios";
import React, { createContext, useContext, useState } from "react";

// Cria o contexto
const AuthContext = createContext();

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Hook personalizado para acessar o contexto
export function useAuth() {
  return useContext(AuthContext);
}

// Provedor de autenticação
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Recupera o usuário do localStorage ao carregar o app
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Função para salvar os dados do usuário após login
  const serializeUser = (userData) => {
    setUser(userData); // Armazena os dados do usuário no estado
    localStorage.setItem("user", JSON.stringify(userData)); // Salva no localStorage
  };

  const logout = async () => {
    try {
      await axios.post(`${REACT_APP_BACKEND_URL}/logout`); // Logout no servidor
      setUser(null); // Limpa o estado do usuário
      localStorage.removeItem("user"); // Remove do armazenamento local
    } catch (error) {
      console.error(
        "Erro ao fazer logout:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <AuthContext.Provider value={{ user, serializeUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
