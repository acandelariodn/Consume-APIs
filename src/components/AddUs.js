import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const AddUs = ({ addUser }) => {
  const handleOnSummit = (e) => {
    e.preventDefault();
    addUser(e.target.name.value, e.target.email.value);
    e.target.name.value = "";
    e.target.email.value = "";
  };

  return (
    <div>
      <form onSubmit={handleOnSummit}>
        <h3>Add Client</h3>
        <input placeholder="Name" name="name" /> {/* Corregido: name="name" */}
        <input placeholder="Email" name="email" />{" "}
        {/* Corregido: name="email" */}
        <button className="btn btn-outline-primary me-2">
          {/* SVG del ícono + */}
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
