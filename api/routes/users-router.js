import express from "express";

import {
  createUser,
  doLogin,
  logout,
} from "../controllers/users-controller.js";

const router = express.Router();

//router.get("/register", getAllUsers);
router.post("/register", createUser);
router.post("/login", doLogin);
router.post("/logout", logout);

export default router;
