import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import Clients from "./components/Clients";
// Asumo que tienes un componente para "/clients"

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para /login */}
        <Route path="/login" element={<Login/>} />

        {/* Ruta para /clients */}
        <Route path="/clients" element={<Clients/>} />

        {/* Redireccionar cualquier ruta desconocida a /login (ruta por defecto) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

