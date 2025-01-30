import styles from "./Metacritic.module.css";

function Metacritic({ score }) {
  return (
    <>
      <h1 className={styles.h1}> Avaliação | Metacritic </h1>
      <div className={styles.metacriticContainer}>
        <div
          className={styles.metacriticScore}
          style={{
            backgroundColor:
              score > 75
                ? "green"
                : score > 50 && score < 75
                ? "#ffcc00"
                : "red",
          }}
        >
          <h1>{score}</h1>
        </div>
        <h1>
          {score > 75
            ? "Excelente"
            : score > 50 && score < 75
            ? "Mediano"
            : "Ruim"}
        </h1>
      </div>
    </>
  );
}

export default Metacritic;
