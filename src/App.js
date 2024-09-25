import React , { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import {BrowserRoute, Routes, Route} from 'react-router-dom'

function App() {
  const [users, setUsers] = useState([]);

  // Llamada a la API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Users List</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {users.map((user) => (
          <div className="col" key={user.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="card-text">
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p className="card-text">
                  <strong>Company:</strong> {user.company.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
