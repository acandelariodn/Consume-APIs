import React, { useState } from "react";
import users from "../database-simulation.json"; // Importa el archivo JSON
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para mostrar errores
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleLogin = (e) => {
    e.preventDefault();

    if (Array.isArray(users)) {
      // Verificar si las credenciales coinciden con algún usuario en el JSON importado
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        // Si las credenciales coinciden, redirige a /clients
        navigate("/clients");
      } else {
        // Si no coinciden, muestra un mensaje de error
        setError("Incorrect credentials. Please try again.");
      }
    } else {
      console.error("El archivo JSON no es un arreglo.");
      setError("Error al cargar los datos de usuarios.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                User
              </label>
              <input
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary">
              Get started
            </button>
          </form>
        </div>
      </header>
    </div>
  );
};
