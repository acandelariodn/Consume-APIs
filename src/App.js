import React, { useState, useEffect } from "react";
import axios from "axios"; // Importa axios
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { User } from "./components/User";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import { AddUs } from "./components/AddUs";

function App() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);

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
    // Encuentra el ID más alto actual
    const maxId = Math.max(...users.map(user => user.id), 0);
    
    // Crea un nuevo usuario con un ID único
    const newUser = {
      id: maxId + 1, // Nuevo ID será el más alto + 1
      name: name,
      email: email,
    };

    // Simula el envío a la API con axios
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
    
    // Actualiza el estado con el nuevo usuario
    setUsers((prevUsers) => [...prevUsers, response.data]);
    console.log("Usuario agregado:", response.data);
  } catch (err) {
    console.log(err);
  }
};


  // Editar usuario
  const editUser = async (id, updatedName, updatedEmail) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          name: updatedName,
          email: updatedEmail,
        }
      );
      // Simula la actualización localmente
      setUsers((users) =>
        users.map((user) =>
          user.id === id
            ? { ...user, name: updatedName, email: updatedEmail }
            : user
        )
      );
      console.log(`Usuario con ID ${id} actualizado:`, response.data); // Muestra el usuario editado
      console.log("Estado actual de usuarios:", users); // Muestra los usuarios actualizados
      setEditUserId(null);
    } catch (err) {
      console.error("Error al editar usuario:", err);
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 className="mb-4">User List</h2>
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

export default App;
