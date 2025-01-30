import mysql from "mysql";
import pkg from "pg";
const { Pool } = pkg;

const db2 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "26910",
  database: "crud_react",
});

const db = new Pool({
  host: "sensitively-wonderful-emu.data-1.use1.tembo.io",
  user: "postgres", // Seu usuário PostgreSQL
  password: "12cO7Dy3OkK6LJbw", // Sua senha do PostgreSQL
  database: "db_games", // O nome do banco de dados PostgreSQL
  port: 5432, // Porta padrão do PostgreSQL
  idleTimeoutMillis: 0, // Tempo limite para liberar conexões ociosas
  connectionTimeoutMillis: 0, // Tempo máximo para tentar conectar
  ssl: {
    rejectUnauthorized: false, // Permite conexões sem verificação de certificado
  },
});

db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });

export default db;
