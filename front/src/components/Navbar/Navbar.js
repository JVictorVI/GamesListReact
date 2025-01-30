import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../AuthContext/AuthContext.js";

/* eslint-disable jsx-a11y/anchor-is-valid */
function Navbar() {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // Chama a função de logout do contexto
    navigate("/login"); // Redireciona para a página de login após o logout
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <span>GamesList</span>
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favoritos</Link>
        <Link to="#" onClick={handleLogout}>
          Sair
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
