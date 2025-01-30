import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import GameForm from "./pages/GameForm/GameForm.js";
import DeleteConfirmation from "./pages/DeleteConfirmation/DeleteConfirmation.js";
import NotFound from "./pages/NotFound/NotFound.js";
import Game from "./pages/Game/Game.js";
import Login from "./pages/Login/Login.js";
import Register from "./pages/Register/Register.js";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/form" element={<GameForm />} />
        <Route path="/update/:id" element={<GameForm />} />
        <Route path="/delete/:id" element={<DeleteConfirmation />} />
        <Route path="/game/:id/:title" element={<Game />} />'
        <Route path="*" element={<NotFound />} />'
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
