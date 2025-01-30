import db from "../db.js";

export const getGames = async (req, res) => {
  const userID = req.body.user;

  const query = `SELECT * from games g where g.gameid in 
	(select gameid from users_games ug 
		inner join users on ug.userid = $1)`;

  try {
    const { rows } = await db.query(query, [userID]); // Apenas os jogos
    return res.status(200).json(rows); // Retorna apenas a lista de jogos
  } catch (err) {
    console.error("Erro ao buscar jogos:", err.message);
    return res.status(500).json({ error: "Erro ao buscar jogos" });
  }
};

export const getGame = async (req, res) => {
  const gameId = req.params.id;

  // Verificar se o gameId foi passado
  if (!gameId) {
    return res.status(400).json({ error: "gameID is required" });
  }

  const query = 'SELECT * FROM games WHERE "gameid" = $1';

  try {
    const result = await db.query(query, [gameId]);

    // Verificar se um jogo foi encontrado
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Game not found" });
    }

    return res.status(200).json(result.rows[0]); // Retornar apenas o jogo encontrado
  } catch (err) {
    console.error("Database query error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createGame = async (req, res) => {
  const { title, description, developer, category, coverURL, userID } =
    req.body;
  const query = `
    INSERT INTO games (title, description, developer, category, coverurl) 
    VALUES ($1, $2, $3, $4, $5) RETURNING *;
  `;

  try {
    const { rows } = await db.query(query, [
      title,
      description,
      developer,
      category,
      coverURL,
    ]);

    // Acessa apenas o ID do jogo recém-criado
    const gameID = rows[0].gameid;

    const query2 = `INSERT INTO users_games (userID, gameID) VALUES ($1, $2);`;

    const result = await db.query(query2, [userID, gameID]);

    return res.status(201).json(rows);
  } catch (err) {
    console.error("Erro ao criar jogo:", err.message);
    return res.status(500).json({ error: "Erro ao criar jogo" });
  }
};

export const updateGame = async (req, res) => {
  const gameId = req.params.id;
  const { title, description, developer, category, coverURL } = req.body;
  const query =
    "UPDATE games SET title = $1, description = $2, developer = $3, category = $4, coverurl = $5 WHERE gameID = $6";

  db.query(
    query,
    [title, description, developer, category, coverURL, gameId],
    (err, data) => {
      if (err) return res.json(err);

      return res.status(201).json(data);
    }
  );
};

export const deleteGame = async (req, res) => {
  const gameId = req.params.id;

  // Verificar se o gameId foi fornecido
  if (!gameId) {
    return res.status(400).json({ error: "gameID is required" });
  }

  const query = 'DELETE FROM games WHERE "gameid" = $1';
  const query2 = 'DELETE FROM users_games WHERE "gameid" = $1';

  try {
    const result = await db.query(query, [gameId]);
    const result2 = await db.query(query2, [gameId]);

    // Verificar se algum registro foi afetado
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Game not found" });
    }

    return res.status(200).json({ message: "Game deleted successfully" });
  } catch (err) {
    console.error("Database query error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
