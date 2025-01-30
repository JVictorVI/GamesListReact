import db from "../db.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validação simples
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir o usuário no banco de dados
    const query = `
          INSERT INTO users (username, email, password)
          VALUES ($1, $2, $3) RETURNING id, username, email;
      `;
    const values = [username, email, hashedPassword];
    const result = await db.query(query, values);

    // Retornar sucesso
    res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: result.rows[0] });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res
      .status(500)
      .json({ error: "O usuário ou e-mail já estão sendo utilizados." });
  }
};

// Rota de login
export const doLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    // Consulta ao banco de dados para buscar o usuário pelo email
    const query =
      "SELECT id, email, username, password FROM users WHERE email = $1";
    const values = [email];

    const { rows } = await db.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const user = rows[0];

    // Validar a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    res.status(200).json({ message: "Login bem-sucedido", user: user });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const logout = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao finalizar a sessão" });
      }
      res.clearCookie("connect.sid"); // Limpa o cookie da sessão
      res.status(200).json({ message: "Logout bem-sucedido" });
      console.log("Sessão finalizada");
    });
  } else {
    res.status(400).json({ error: "Nenhuma sessão ativa encontrada" });
  }
};
