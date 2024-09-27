import React from "react";
import { User } from "./User";
import { AddUs } from "./AddUs";
import "../App.css";
import logo from "../logo.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Clients() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  // Traer lista de usuarios
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
      console.log("Usuarios iniciales:", response.data); // Muestra los usuarios al cargar
    } catch (err) {
      console.log(err);
    }
  };

  // Agregar usuario
  const addUser = async (name, email) => {
    try {
      const maxId = Math.max(...users.map((user) => user.id), 0);
      const newUser = { id: maxId + 1, name, email };

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        { name, email }
      );

      const createdUser = { ...response.data, id: newUser.id };
      setUsers((prevUsers) => [...prevUsers, createdUser]);
      console.log("Usuario agregado:", createdUser);
    } catch (err) {
      console.log(err);
    }
  };

  // Editar usuario
  const editUser = async (id, updatedName, updatedEmail) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        { name: updatedName, email: updatedEmail }
      );
      setUsers((users) =>
        users.map((user) =>
          user.id === id
            ? { ...user, name: updatedName, email: updatedEmail }
            : user
        )
      );
      console.log(`Usuario con ID ${id} actualizado:`, response.data);
      setEditUserId(null);
    } catch (err) {
      console.error("Error al editar usuario:", err);
      setUsers((users) =>
        users.map((user) =>
          user.id === id
            ? { ...user, name: updatedName, email: updatedEmail }
            : user
        )
      );
      setEditUserId(null);
    }
  };

  // Eliminar usuario
  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      console.log(`Usuario con ID ${id} eliminado.`);
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
    }
  };

  // Función para navegar al login
  const handleGoToLogin = () => {
    navigate("/login"); // Redirigir a /login
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          <div className="d-flex flex-column justify-content-center align-items-center mb-4">
            <h2 className="mb-2">Client Contacts</h2>
            {/* Botón con el ícono centrado */}
            <button onClick={handleGoToLogin} className="btn btn-outline-light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                <path d="M15 12h-12l3 -3" />
                <path d="M6 15l-3 -3" />
              </svg>
            </button>
          </div>
        </div>
        <AddUs addUser={addUser} />
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {users.map((user) => (
              <div className="col" key={user.id}>
                <div className="card h-100">
                  <div className="card-header">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-subtitle mb-2 text-muted">
                      {user.email}
                    </p>
                  </div>
                  <div className="card-body">
                    <User
                      key={user.id}
                      id={user.id}
                      name={user.name}
                      email={user.email}
                      onEdit={editUser}
                      onDelete={deleteUser}
                      setEditUserId={setEditUserId}
                      editUserId={editUserId}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Clients;
