import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";

import gamesRoutes from "./routes/games-router.js";
import userRoutes from "./routes/users-router.js";

const app = express();

app.use(bodyParser.json());
app.use(express.json());

//app.use(
//cors({
//origin: ["https://gameslist-two.vercel.app"],
// methods: ["GET", "POST"], // Permite os métodos necessários
credentials: true,
  //})
  //);

  app.use(cors());

app.use(
  session({
    secret: "sua-chave-secreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      httpOnly: true,
    },
  })
);

app.use(gamesRoutes);
app.use(userRoutes);

//export default app;
app.listen(8800);
