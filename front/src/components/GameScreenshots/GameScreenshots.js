import styles from "./GameScreenshots.module.css";

function GameScreenshots({ gameAPI }) {
  <>
    <h1>Capturas</h1>
    <div className={styles.ScreenshotsContainer}>
      {gameAPI.short_screenshots.map((screenshot, index) =>
        index > 0 ? (
          <img src={screenshot.image} alt={screenshot.name}></img>
        ) : null
      )}
    </div>
  </>;
}

export default GameScreenshots;
