import React, { useState } from "react";

export const User = ({
  id,
  name,
  email,
  onEdit,
  onDelete,
  editUserId,
  setEditUserId,
}) => {
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición

  const handleEdit = () => {
    setIsEditing(true);
    setEditUserId(id);
  };

  const handleSave = () => {
    onEdit(id, updatedName, updatedEmail);
    setIsEditing(false); // Ocultar botones de editar y eliminar
    setEditUserId(null);
  };

  const handleCancel = () => {
    setIsEditing(false); // Ocultar botones de editar y eliminar
    setEditUserId(null);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {isEditing ? ( // Mostrar inputs y botones de guardado/cancelación
        <div>
          <input className="me-2"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Name"
          />
          <input className="me-2"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            placeholder="Email"
          />
          <span>
            <button className="btn btn-sm btn-success me-2" onClick={handleSave}>
              {/* SVG del ícono check */}
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-check"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l5 5l10 -10" />
              </svg>
            </button>

            <button className="btn btn-sm btn-danger me-2" onClick={handleCancel}>
              {/* SVG del ícono de cancelar */}
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-x"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </span>
        </div>
      ) : (
        // Mostrar nombre y email con botones de editar y eliminar
        <div>
          <h5>{name}</h5>
          <p>{email}</p>
          <span>
            <button
              className="btn btn-outline-primary me-2"
              onClick={handleEdit}
            >
              {/* SVG del ícono de lápiz */}
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-pencil"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                <path d="M13.5 6.5l4 4" />
              </svg>
            </button>
            <button
              className="btn btn-outline-danger me-2"
              onClick={() => onDelete(id)}
            >
              {/* SVG del ícono - */}
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-minus"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
              </svg>
            </button>
          </span>
        </div>
      )}
    </li>
  );
};
