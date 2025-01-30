import { useRef, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { doLogin } from "./loginService.js";
import { useAuth } from "../../AuthContext/AuthContext.js";
import { ToastContainer } from "react-toastify";

import Footer from "../../components/Footer/Footer.js";

function Login() {
  const navigate = useNavigate();
  const ref = useRef();
  const user = ref.current;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serializeUser } = useAuth(); // Acessa a função login do contexto

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar dados ao backend
    const loginResponse = await doLogin({ email, password });

    // Resetar o formulário
    setEmail("");
    setPassword("");

    if (loginResponse) {
      serializeUser(loginResponse); // Salva os dados do usuário no contexto
      navigate("/");
    }

    user.email.value = "";
    user.password.value = "";
  };

  return (
    <div className="Login">
      <title>Login</title>
      <>
        <div className={styles.background}></div>

        <h1 className={styles.h1}>Login</h1>

        <form ref={ref} className={styles.container} onSubmit={handleSubmit}>
          <div className={styles.msg}>
            <p>Insira suas credenciais para prosseguir</p>
          </div>

          <label htmlFor="email">E-mail</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Senha</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className={styles.button} type="submit">
            Login
          </button>

          <button
            className={styles.backbutton}
            onClick={() => {
              navigate("/register");
            }}
          >
            Criar Conta
          </button>
        </form>
        <ToastContainer autoClose={3000} position="bottom-left" />
        <Footer />
      </>
    </div>
  );
}

export default Login;
