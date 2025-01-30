import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useRef, useState } from "react";
import { createUser } from "./userService.js";
import { ToastContainer } from "react-toastify";
import Footer from "../../components/Footer/Footer.js";

function Register() {
  const navigate = useNavigate();

  const ref = useRef();
  const game = ref.current;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar dados ao backend
    const newUser = await createUser({ username, email, password });

    // Resetar o formulário
    setUsername("");
    setEmail("");
    setPassword("");

    if (newUser) {
      navigate("/login");
    }

    game.name.value = "";
    game.email.value = "";
    game.password.value = "";
  };

  return (
    <div className="Register">
      <title>Criar Conta</title>
      <>
        <div className={styles.background}></div>
        <h1 className={styles.h1}>Criar Conta</h1>

        <form
          ref={ref}
          className={styles.container}
          onSubmit={handleSubmit}
          method="post"
        >
          <div className={styles.msg}>
            <p>Preencha os campos abaixo para criar sua conta</p>
          </div>

          <label htmlFor="name">Nome</label>
          <input
            className={styles.input}
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome"
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">E-mail</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu e-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Senha</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            placeholder="Digite sua senha"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={styles.button}
            type="submit"
            onClick={handleSubmit}
          >
            Criar Conta
          </button>

          <button
            type="button"
            className={styles.backbutton}
            onClick={() => {
              navigate("/login");
            }}
          >
            Voltar
          </button>
        </form>
      </>
      <Footer />
      <ToastContainer autoClose={3000} position="bottom-left" />
    </div>
  );
}

export default Register;
