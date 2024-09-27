import React, { useState } from "react";
import axios from "axios"; // Para obtener los usuarios del JSON
import { useNavigate } from "react-router-dom"; // Para redireccionar después del login

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para mostrar errores
  const navigate = useNavigate(); // Para redirigir después de un login exitoso

  // Función para manejar el envío del formulario
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Hacer la solicitud para obtener el archivo JSON con los usuarios
      const response = await axios.get("/path/to/your/users.json"); // Cambia esta ruta por la correcta
      const users = response.data;

      // Verificar si las credenciales coinciden con algún usuario en el JSON
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        // Si el usuario es encontrado, redirige a la página de clients
        navigate("/clients");
      } else {
        // Si las credenciales no son correctas, muestra un mensaje de error
        setError("Credenciales incorrectas. Por favor, intenta de nuevo.");
      }
    } catch (err) {
      // Si hay algún error con la solicitud al JSON
      console.error("Error al autenticar:", err);
      setError("Error al conectar con el servidor. Inténtalo más tarde.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">User</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Get started</button>
      </form>
    </div>
  );
};
