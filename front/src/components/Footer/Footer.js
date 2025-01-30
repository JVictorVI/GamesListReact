import styles from "./Footer.module.css";

function Footer() {
  return (
    <>
      <div className={styles.content}></div>
      <footer className={styles.footer}>
        <p>Desenvolvido com React | CSS Module | PostgreeSQL | Node - 2025 ©</p>
      </footer>
    </>
  );
}

export default Footer;
