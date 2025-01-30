import express from "express";

import {
  getGames,
  createGame,
  deleteGame,
  getGame,
  updateGame,
} from "../controllers/games-controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("API rodando corretamente!");
});

router.post("/", getGames);

router.post("/form", createGame);

//Rotas de Update
router.get("/update/:id", getGame);
router.put("/update/:id", updateGame);

// Rotas de Delete
router.get("/delete/:id", getGame);
router.delete("/delete/:id", deleteGame);

//Informações do Jogo
router.get("/game/:id/:title", getGame);

export default router;
