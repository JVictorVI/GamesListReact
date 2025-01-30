import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Erro 404!</h1>
      <p className={styles.p}>Esta página não foi encontrada ou não existe</p>
      <Link to="/">
        <button className={styles.button}>Voltar</button>
      </Link>
    </div>
  );
}

export default NotFound;
