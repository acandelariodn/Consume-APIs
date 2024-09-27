//import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const AddUs = ({ addUser }) => {
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;

    // Validar que ambos campos estén llenos
    if (!name || !email) {
      alert("Please complete both fields.");
      return;
    }

    // Validar que el email tenga un formato correcto
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Si pasa las validaciones, agregar el usuario
    addUser(name, email);
    e.target.name.value = "";
    e.target.email.value = "";
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <h3>Add Client</h3>
        <input
          placeholder="Name"
          name="name"
          required
          className="form-control mb-2"
        />
        <input
          placeholder="Email"
          name="email"
          type="email"
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-outline-primary me-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
        </button>
        <hr />
      </form>
    </div>
  );
};
